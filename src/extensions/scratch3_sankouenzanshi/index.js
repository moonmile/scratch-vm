const ArgumentType = require('../../extension-support/argument-type');
const BlockType = require('../../extension-support/block-type');
const Cast = require('../../util/cast');
const log = require('../../util/log');

class Scratch3WebApiSample {
    constructor (runtime) {
        this.runtime = runtime;
        this._result = "";
    }

    getInfo () {
        return {
            id: 'sankouenzanshi',
            name: 'Sankouenzanshi.',
            blocks: [
                {
                    opcode: 'callSankou',
                    blockType: BlockType.REPORTER,
                    text: '[EXPR] ? [TRUE] : [FALSE]',
                    arguments: {
                        EXPR: {
                            type: ArgumentType.BOOLEAN,
                            defaultValue: "Expr"
                        },
                        TRUE: {
                            type: ArgumentType.STRING,
                            defaultValue: "True"
                        },
                        FALSE: {
                            type: ArgumentType.STRING,
                            defaultValue: "False"
                        },
                    }
                }
            ],
            menus: {
            }
        };
    }

    callSankou(args) {
        const expr = Cast.toBoolean(args.EXPR);
        const result_true = Cast.toString(args.TRUE);
        const result_false = Cast.toString(args.FALSE);
        return expr ? result_true : result_false ;
    }
}

module.exports = Scratch3WebApiSample;