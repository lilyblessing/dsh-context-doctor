import { runAudit } from './audit.js';
/** 浏览器侧 API 前缀。 */
export const AUDIT_API_PREFIX = '/api/context-doctor';
/** 写 JSON 响应。 */
function json(res, status, body) {
    res.writeHead(status, { 'content-type': 'application/json; charset=utf-8' });
    res.end(JSON.stringify(body));
}
/** 从查询字符串取单个参数（URL 解码；重复取首个）。 */
function parseQueryParam(url, key) {
    const query = url.includes('?') ? url.slice(url.indexOf('?') + 1) : '';
    for (const part of query.split('&')) {
        if (!part.startsWith(`${key}=`))
            continue;
        try {
            return decodeURIComponent(part.slice(key.length + 1));
        }
        catch {
            return undefined;
        }
    }
    return undefined;
}
/** 解析审计起点目录：显式 cwd > 会话 cwd > defaultCwd > 进程 cwd。 */
function resolveCwd(url, config) {
    const explicit = parseQueryParam(url, 'cwd');
    if (explicit !== undefined && explicit !== '')
        return explicit;
    const sessionId = parseQueryParam(url, 'session');
    if (sessionId !== undefined && sessionId !== '') {
        const session = config.sessions?.get(sessionId);
        if (session?.header.cwd !== undefined && session.header.cwd !== '') {
            return session.header.cwd;
        }
    }
    return config.defaultCwd ?? process.cwd();
}
/** 解析审计 scope：session=<id> 时取该会话的活跃 agent（dsh-hud 同款姿势）。 */
function resolveAgent(url, config) {
    const sessionId = parseQueryParam(url, 'session');
    if (sessionId === undefined || sessionId === '')
        return undefined;
    try {
        return config.agents?.get(sessionId);
    }
    catch {
        return undefined;
    }
}
/** 构造审计路由（含 60s 缓存与 in-flight 复用）。 */
export function makeAuditRoutes(config) {
    const { deps, cacheTtlMs = 60_000 } = config;
    const cache = new Map();
    /** 缓存条目上限：防止不同 cwd 参数让缓存无限增长（超限时淘汰最旧条目）。 */
    const MAX_CACHE_ENTRIES = 32;
    const audit = (cwd, agent) => {
        // agent 视图（scope 层技能/MCP 工具）随会话变化，缓存键须区分会话。
        const key = agent === undefined ? cwd : `${cwd}::agent`;
        const hit = cache.get(key);
        if (hit !== undefined && Date.now() - hit.at < cacheTtlMs)
            return hit.promise;
        if (cache.size >= MAX_CACHE_ENTRIES) {
            const oldest = cache.keys().next().value;
            if (oldest !== undefined)
                cache.delete(oldest);
        }
        const promise = runAudit(deps, { cwd, signal: new AbortController().signal, agent })
            .catch((error) => {
            // 失败不缓存，允许下次重试
            cache.delete(key);
            throw error;
        });
        cache.set(key, { at: Date.now(), promise });
        return promise;
    };
    return [{
            kind: 'exact',
            path: `${AUDIT_API_PREFIX}/audit`,
            handler: (req, res) => {
                if (req.method !== 'GET') {
                    json(res, 405, { ok: false, error: 'method-not-allowed' });
                    return;
                }
                const cwd = resolveCwd(req.url ?? '', config);
                const agent = resolveAgent(req.url ?? '', config);
                audit(cwd, agent).then((report) => json(res, 200, { ok: true, report }), (error) => json(res, 500, {
                    ok: false,
                    error: error instanceof Error ? error.message : String(error),
                }));
            },
        }];
}
