/**
 * Context Doctor locale dictionaries.
 * zh/en: the panel follows the DSH shell language preference (dsh-client-locale).
 */
export declare const NS = "context-doctor";
declare const copy: {
    readonly 'cd.title': 'Context Doctor';
    readonly 'cd.residentTokens': 'Context budget audit';
    readonly 'cd.instructions': 'Instruction chain';
    readonly 'cd.skills': 'Skills catalog';
    readonly 'cd.tools': 'Tool schemas';
    readonly 'cd.mcp': 'MCP tools';
    readonly 'cd.suggestions': '{n} suggestions';
    readonly 'cd.refresh': 'Refresh';
    readonly 'cd.loading': 'Auditing…';
    readonly 'cd.error': 'Audit failed';
    readonly 'cd.errorDetail': 'Audit failed: {error}';
    readonly 'cd.empty': 'No audit data yet.';
    readonly 'cd.healthy': 'Healthy';
    readonly 'cd.attention': 'Review';
    readonly 'cd.review': 'Review';
    readonly 'cd.healthyHint': 'Your context is efficient and remains within the recommended budget.';
    readonly 'cd.reviewHint': 'Some context entries are worth reviewing before they become expensive.';
    readonly 'cd.guideline': 'of 50k';
    readonly 'cd.updated': 'Last updated';
    readonly 'cd.total': 'Total';
    readonly 'cd.tokens': 'tokens';
    readonly 'cd.auditFinding': 'Review audit finding';
    readonly 'cd.justNow': 'just now';
    readonly 'cd.secondsAgo': '{n}s ago';
    readonly 'cd.minutesAgo': '{n}m ago';
    readonly 'cd.catalog': '{n} skills';
    readonly 'cd.mcpTools': '{n} tools';
    readonly 'cd.files': 'files';
    readonly 'cd.toolsCount': 'tools';
    readonly 'cd.hint': 'Open Context Doctor';
};
export declare const zh: Record<"cd.attention" | "cd.auditFinding" | "cd.catalog" | "cd.empty" | "cd.error" | "cd.errorDetail" | "cd.files" | "cd.guideline" | "cd.healthy" | "cd.healthyHint" | "cd.hint" | "cd.instructions" | "cd.justNow" | "cd.loading" | "cd.mcp" | "cd.mcpTools" | "cd.minutesAgo" | "cd.refresh" | "cd.residentTokens" | "cd.review" | "cd.reviewHint" | "cd.secondsAgo" | "cd.skills" | "cd.suggestions" | "cd.title" | "cd.tokens" | "cd.tools" | "cd.toolsCount" | "cd.total" | "cd.updated", string>;
export declare const en: {
    readonly 'cd.title': 'Context Doctor';
    readonly 'cd.residentTokens': 'Context budget audit';
    readonly 'cd.instructions': 'Instruction chain';
    readonly 'cd.skills': 'Skills catalog';
    readonly 'cd.tools': 'Tool schemas';
    readonly 'cd.mcp': 'MCP tools';
    readonly 'cd.suggestions': '{n} suggestions';
    readonly 'cd.refresh': 'Refresh';
    readonly 'cd.loading': 'Auditing…';
    readonly 'cd.error': 'Audit failed';
    readonly 'cd.errorDetail': 'Audit failed: {error}';
    readonly 'cd.empty': 'No audit data yet.';
    readonly 'cd.healthy': 'Healthy';
    readonly 'cd.attention': 'Review';
    readonly 'cd.review': 'Review';
    readonly 'cd.healthyHint': 'Your context is efficient and remains within the recommended budget.';
    readonly 'cd.reviewHint': 'Some context entries are worth reviewing before they become expensive.';
    readonly 'cd.guideline': 'of 50k';
    readonly 'cd.updated': 'Last updated';
    readonly 'cd.total': 'Total';
    readonly 'cd.tokens': 'tokens';
    readonly 'cd.auditFinding': 'Review audit finding';
    readonly 'cd.justNow': 'just now';
    readonly 'cd.secondsAgo': '{n}s ago';
    readonly 'cd.minutesAgo': '{n}m ago';
    readonly 'cd.catalog': '{n} skills';
    readonly 'cd.mcpTools': '{n} tools';
    readonly 'cd.files': 'files';
    readonly 'cd.toolsCount': 'tools';
    readonly 'cd.hint': 'Open Context Doctor';
};
declare module '@deepseek-ai/dsh-client-ui-slots' {
    interface LocaleNamespaceMap {
        'context-doctor': keyof typeof copy;
    }
}
export {};
