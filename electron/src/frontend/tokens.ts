import {createToken, Lexer} from 'chevrotain';

// Identifiers
export const Identifier = createToken({
    name: 'Identifier',
    pattern: /[a-zA-Z$]\w*|'[^\(\)\[\]{},:\s]+/
})

export const Attribute = createToken({
    name: 'Attribute',
    pattern: /@\w*/
})

// Keywords
export const Keyword = createToken({
    name: 'Keyword',
    pattern: Lexer.NA,
})

export const Import = createToken({
    name: 'Import',
    pattern: /import/,
    longer_alt: Identifier,
    label: 'import',
    categories: Keyword,
})

export const Export = createToken({
    name: 'Export',
    pattern: /export/,
    longer_alt: Identifier,
    label: 'export',
    categories: Keyword,
})

export const From = createToken({
    name: 'From',
    pattern: /from/,
    longer_alt: Identifier,
    label: 'from',
    categories: Keyword,
})

export const Declare = createToken({
    name: 'Declare',
    pattern: /declare/,
    longer_alt: Identifier,
    label: 'declare',
    categories: Keyword,
})

export const Module = createToken({
    name: 'Module',
    pattern: /module/,
    longer_alt: Identifier,
    label: 'module',
    categories: Keyword,
})

export const Input = createToken({
    name: 'Input',
    pattern: /input/,
    longer_alt: Identifier,
    label: 'input',
    categories: Keyword,
})

export const Output = createToken({
    name: 'Output',
    pattern: /output/,
    longer_alt: Identifier,
    label: 'output',
    categories: Keyword,
})

export const Inout = createToken({
    name: 'Inout',
    pattern: /inout/,
    longer_alt: Identifier,
    label: 'inout',
    categories: Keyword,
})

export const Analog = createToken({
    name: 'Analog',
    pattern: /analog/,
    longer_alt: Identifier,
    label: 'analog',
    categories: Keyword,
})

export const Net = createToken({
    name: 'Net',
    pattern: /net/,
    longer_alt: Identifier,
    label: 'net',
    categories: Keyword,
})

export const Cell = createToken({
    name: 'Cell',
    pattern: /cell/,
    longer_alt: Identifier,
    label: 'cell',
    categories: Keyword,
})

export const Const = createToken({
    name: 'Const',
    pattern: /const/,
    longer_alt: Identifier,
    label: 'const',
    categories: Keyword,
})

export const True = createToken({
    name: 'True',
    pattern: /true/,
    longer_alt: Identifier,
    label: 'true',
    categories: Keyword,
})

export const False = createToken({
    name: 'False',
    pattern: /false/,
    longer_alt: Identifier,
    label: 'false',
    categories: Keyword,
})

export const With = createToken({
    name: 'With',
    pattern: /with/,
    longer_alt: Identifier,
    label: 'with',
    categories: Keyword,
})

// Operators
export const Assign = createToken({
    name: 'Assign',
    pattern: /=/,
    label: '=',
})

export const Plus = createToken({
    name: 'Plus',
    pattern: /\+/,
    label: '+',
})

export const Minus = createToken({
    name: 'Minus',
    pattern: /-/,
    label: '-',
})

export const Star = createToken({
    name: 'Star',
    pattern: /\*/,
    label: '*',
})

export const ShiftLeft = createToken({
    name: 'ShiftLeft',
    pattern: /<</,
    label: '<<',
})

export const ShiftRight = createToken({
    name: 'ShiftRight',
    pattern: />>/,
    label: '>>',
})

// Separators
export const Dot = createToken({
    name: 'Dot',
    pattern: /\./,
    label: '.',
})

export const Comma = createToken({
    name: 'Comma',
    pattern: /,/,
    label: ','
})

export const Colon = createToken({
    name: 'Colon',
    pattern: /:/,
    label: ':',
})

export const Semicolon = createToken({
    name: 'Semicolon',
    pattern: /;/,
    label: ';',
})

export const OpenRound = createToken({
    name: 'OpenRound',
    pattern: /\(/,
    label: '(',
})

export const CloseRound = createToken({
    name: 'CloseRound',
    pattern: /\)/,
    label: ')',
})

export const OpenSquare = createToken({
    name: 'OpenSquare',
    pattern: /\[/,
    label: '[',
})

export const CloseSquare = createToken({
    name: 'CloseSquare',
    pattern: /]/,
    label: ']',
})

export const OpenCurly = createToken({
    name: 'OpenCurly',
    pattern: /{/,
    label: '{',
})

export const CloseCurly = createToken({
    name: 'CloseCurly',
    pattern: /}/,
    label: '}',
})

// Literals
export const BitVector = createToken({
    name: 'BitVector',
    pattern: /[1-9]\d*'[01xz]+/,
})

export const Unit = createToken({
    name: 'Unit',
    pattern: /(0|[1-9]\d*)(\.[0-9]+)?[GMKkmunpf]?[a-zA-Z]*/,
})

export const Integer = createToken({
    name: 'Integer',
    pattern: /0|[1-9]\d*/,
    longer_alt: Unit,
})

export const String = createToken({
    name: 'String',
    pattern: /"[^"]*"/,
})

export const Real = createToken({
    name: 'Real',
    pattern: /[-]?(0|[1-9]\d*)(\.[0-9]+)?([eE][+-]?[0-9]+)/,
})

// Comments
export const DesignComment = createToken({
    name: 'DesignComment',
    pattern: /\/\/!.+/,
})

export const ModuleComment = createToken({
    name: 'ModuleComment',
    pattern: /\/\/\/.+/,
})

export const Comment = createToken({
    name: 'Comment',
    pattern: /\/\/.+/,
    group: 'Comments',
})

// Whitespace
export const Whitespace = createToken({
    name: 'Whitespace',
    pattern: /\s+/,
    group: Lexer.SKIPPED,
    line_breaks: true
})

// XML fragments
export const OpenTag = createToken({
    name: 'OpenTag',
    pattern: /<[^\/><]+>/,
})

export const CloseTag = createToken({
    name: 'CloseTag',
    pattern: /<\/[^\/><]+>/,
})

export const Tag = createToken({
    name: 'Tag',
    pattern: /<[^\/><]+\/>/
})
