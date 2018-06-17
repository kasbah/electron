import { IToken } from 'chevrotain'

export enum DiagnosticSeverity {
    Error,
    Warning,
    Info,
}

export enum DiagnosticType {
    TokenError,
    ParserError,
    SyntaxError,
    TypeError,
}

export interface IDiagnostic {
    message: string,
    src: ISrcLoc,
    severity: DiagnosticSeverity,
    errorType: DiagnosticType,
}

export interface ISrcLoc {
    startLine: number
    startColumn: number
    endLine: number
    endColumn: number
}

export function tokenToSrcLoc(token: IToken): ISrcLoc {
    return {
        startLine: token.startLine || 0,
        startColumn: token.startColumn || 0,
        endLine: token.endLine || 0,
        endColumn: token.endColumn || 0,
    }
}
