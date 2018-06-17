import {expect} from 'chai'
import { IAstImport, IAstDeclaration, AstType, AstLiteralType} from './ast'
import {render, IDoc, emitDesign, emitImport, emitModule,
        emitStatement, emitExpression} from './printer'

function expectPretty(doc: IDoc, text: string) {
    expect(render(80, doc)).to.deep.equal(text);
}

describe('Pretty Printer', () => {
    it('should emit attributes', () => {
        const attributes = [
            {
                name: 'bom',
                parameters: [
                    {
                        name: null,
                        value: {
                            value: 'Yago',
                            literalType: AstLiteralType.Symbol,
                        }
                    },
                    {
                        name: null,
                        value: {
                            value: 'XYZ',
                            literalType: AstLiteralType.Symbol,
                        }
                    }
                ]
            }
        ]

        expectPretty(emitModule({
            attributes,
            exported: false,
            declaration: false,
            name: 'mod',
            statements: [],
        }), "@bom('Yago, 'XYZ)\nmodule mod {}\n")

        expectPretty(emitStatement({
            attributes,
            identifier: {id: 'a'},
            'type': {ty: AstType.Cell, width: 1, signed: false},
        }), "@bom('Yago, 'XYZ)\ncell a")

        expectPretty(emitStatement({
            attributes,
            fqn: ['a', 'b', 'c'],
        }), "@bom('Yago, 'XYZ)\na.b.c")
    })

    describe('should emit expressions', () => {
        it('should emit references', () => {
            expectPretty(emitExpression({
                identifier: { attributes: [], id: 'a' },
                'from': 2,
                to: 2,
            }), 'a[2]')

            expectPretty(emitExpression({
                identifier: { attributes: [], id: 'a' },
                'from': 0,
                to: 1,
            }), 'a[0:1]')
        })

        it('should emit concatenations', () => {
            expectPretty(emitExpression({
                expressions: [
                    { id: 'a' },
                    { id: 'b' },
                    { id: 'c' },
                ],
            }), '(a, b, c)')
        })

        it('should emit cells', () => {
            expectPretty(emitExpression({
                cellType: '$R',
                width: 2,
                parameters: [{
                    name: null,
                    value: {
                        value: '10k',
                        literalType: AstLiteralType.Symbol,
                    }
                }],
                assignments: [
                    {
                        lhs: { id: 'A' },
                        rhs: { id: 'a' },
                    }
                ]
            }), "$R('10k)[2] {\n  A = a\n}")

            expectPretty(emitExpression({
                cellType: '$R',
                width: 2,
                parameters: [{
                    name: null,
                    value: {
                        value: '10k',
                        literalType: AstLiteralType.Symbol,
                    }
                }],
                assignments: [
                    {
                        lhs: { id: 'A' },
                        rhs: { id: 'a' },
                    },
                    {
                        lhs: { id: 'B' },
                        rhs: { id: 'b' },
                    }
                ]
            }), "$R('10k)[2] {\n  A = a,\n  B = b\n}")
        })
    })

    describe('should emit statements', () => {

        it('should emit declaration', () => {
            expectPretty(emitStatement({
                attributes: [],
                identifier: { id: 'a' },
                'type': {
                    attributes: [],
                    width: 1,
                    signed: false,
                    ty: AstType.Input,
                }
            }), 'input a')

            expectPretty(emitStatement({
                attributes: [],
                identifier: { id: 'a' },
                'type': {
                    attributes: [],
                    width: 1,
                    signed: false,
                    ty: AstType.Inout,
                }
            }), 'inout a')

            expectPretty(emitStatement({
                attributes: [],
                identifier: { id: 'a' },
                'type': {
                    width: 1,
                    signed: false,
                    ty: AstType.Output,
                }
            }), 'output a')

            expectPretty(emitStatement({
                attributes: [],
                identifier: { id: 'a' },
                'type': {
                    width: 1,
                    signed: false,
                    ty: AstType.Net,
                }
            }), 'net a')

            expectPretty(emitStatement({
                attributes: [],
                identifier: { id: 'a' },
                'type': {
                    width: 2,
                    signed: false,
                    ty: AstType.Cell,
                }
            }), 'cell[2] a')
        })

        it('should emit assignments', () => {
            expectPretty(emitStatement({
                lhs: { id: 'a' },
                rhs: { id: 'b' },
            }), 'a = b')

            expectPretty(emitStatement({
                lhs: { id: 'a' },
                rhs: {
                    identifier: {id : 'b' },
                    'from': 0,
                    'to': 0,
                },
            }), 'a = b[0]')
        })

        it('should emit fully qualified names', () => {
            expectPretty(emitStatement({
                attributes: [],
                fqn: ['a', 'b', 'c'],
            }), 'a.b.c')
        })
    })

    it('should emit imports', () => {
        expectPretty(emitImport({
            'import': 'a',
            'from': 'package'
        }), 'import a from "package"\n')
    })

    it('should emit modules', () => {
        expectPretty(emitModule({
            attributes: [],
            declaration: false,
            exported: false,
            name: 'mod',
            statements: [
                {
                    attributes: [],
                    identifier: {
                        id: 'a',
                    },
                    'type': {
                        width: 1,
                        signed: false,
                        ty: AstType.Net,
                    }
                }
            ],
        }), 'module mod {\n  net a\n}\n')

        expectPretty(emitModule({
            attributes: [],
            exported: true,
            declaration: false,
            name: 'mod',
            statements: []
        }), 'export module mod {}\n')

        expectPretty(emitModule({
            attributes: [],
            exported: true,
            declaration: true,
            name: 'mod',
            statements: []
        }), 'export declare module mod {}\n')
    })

    it('should emit designs', () => {
        expectPretty(emitDesign({
            imports: [
                {
                    'import': 'a',
                    'from': 'b',
                }
            ],
            modules: [
                {
                    attributes: [],
                    exported: false,
                    declaration: false,
                    name: 'mod',
                    statements: []
                }
            ],
        }), 'import a from "b"\nmodule mod {}\n')
    })
})