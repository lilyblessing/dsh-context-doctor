import type { WebRoute } from '@deepseek-ai/dsh-host-webserver';
import type { AuditDeps } from './audit.ts';
/** 浏览器侧 API 前缀。 */
export declare const AUDIT_API_PREFIX = "/api/context-doctor";
/** 审计接口配置。 */
export interface AuditRoutesConfig {
    deps: AuditDeps;
    /**
     * 会话存储：`session=<id>` 参数存在时用它解析当前会话工作目录，
     * 使审计落在用户正在查看的会话上（技能/工具/指令链数据才完整）。
     * 缺省时回退 defaultCwd / process.cwd()。
     */
    sessions?: {
        get(id: string): {
            header: {
                cwd?: string;
            };
        } | undefined;
    };
    /**
     * Agent 注册表：`session=<id>` 时解析该会话的活跃 agent 作为审计 scope，
     * 使技能/工具统计落在模型真实可见的 agent 视图（含 MCP 工具与 scope 层技能）。
     * 缺省时回退全局视图（无 MCP 工具、无 scope 层技能）。
     */
    agents?: {
        get(id: string): {
            session?: {
                header?: {
                    cwd?: string;
                };
            };
        } | undefined;
    };
    /** 默认审计目录（cwd/session 参数都缺省时使用）。 */
    defaultCwd?: string;
    /** 结果缓存时长（毫秒）。默认 60s。 */
    cacheTtlMs?: number;
}
/** 构造审计路由（含 60s 缓存与 in-flight 复用）。 */
export declare function makeAuditRoutes(config: AuditRoutesConfig): WebRoute[];
