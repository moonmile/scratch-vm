const ArgumentType = require('../../extension-support/argument-type');
const BlockType = require('../../extension-support/block-type');
const Cast = require('../../util/cast');
const log = require('../../util/log');

class Scratch3WebApiSample {
    constructor (runtime) {
        this.runtime = runtime;
        this._result = "" ;
        this._url = "";
        this._result = "";
    }

    getInfo () {
        return {
            id: 'webapisample',
            name: 'Web API Sample',
            blocks: [
                {
                    opcode: 'setUrl',
                    blockType: BlockType.COMMAND,
                    text: 'Set URL [TEXT]',
                    arguments: {
                        TEXT: {
                            type: ArgumentType.STRING,
                            defaultValue: "http://localhost:5000/api/Hello/"
                        }
                    }
                },
                {
                    opcode: 'getUrl',
                    blockType: BlockType.REPORTER,
                    text: 'URL'
                },
                {
                    opcode: 'getResult',
                    blockType: BlockType.REPORTER,
                    text: 'result'
                },
                {
                    opcode: 'callWebApiByGet',
                    blockType: BlockType.REPORTER,
                    text: 'Call Web API GET [TEXT]',
                    arguments: {
                        TEXT: {
                            type: ArgumentType.STRING,
                            defaultValue: "100"
                        }
                    }
                },


                /**
                 * Azure Functions の HttpTrigger を GET で呼び出す
                 */
                {
                    opcode: 'getHttpTrigger',
                    blockType: BlockType.REPORTER,
                    text: 'CALL Azure Functions by GET [URL]',
                    arguments: {
                        URL: {
                            type: ArgumentType.STRING,
                            defaultValue: "http://localhost:7071/api/Function1?name=azure"
                        }
                    }
                },
                /**
                 * Azure Functions の HttpTrigger を POST で呼び出す
                 */
                {
                    opcode: 'postHttpTrigger',
                    blockType: BlockType.REPORTER,
                    text: 'CALL Azure Functions by POST [URL] [JSON]',
                    arguments: {
                        URL: {
                            type: ArgumentType.STRING,
                            defaultValue: "http://localhost:7071/api/Function1"
                        },
                        JSON: {
                            type: ArgumentType.STRING,
                            defaultValue: "{ 'name': 'SCRATCH' } "
                        },

                    }
                },

                /**
                 * JSON文字列から指定プロパティ名の値を取得
                 */
                {
                    opcode: 'getValueFromJSON',
                    blockType: BlockType.REPORTER,
                    text: 'GET [NAME] from [JSON]',
                    arguments: {
                        JSON: {
                            type: ArgumentType.STRING,
                            defaultValue: "{ \"name\": \"SCRATCH\" }"
                        },
                        NAME: {
                            type: ArgumentType.STRING,
                            defaultValue: "name"
                        },
                    }
                },
                /**
                 * JSON文字列へ指定プロパティ名の値を設定
                 */
                {
                    opcode: 'setValueIntoJSON',
                    blockType: BlockType.REPORTER,
                    text: 'SET [NAME] to [TEXT] into [JSON]',
                    arguments: {
                        JSON: {
                            type: ArgumentType.STRING,
                            defaultValue: "{ \"name\": \"SCRATCH\" }"
                        },
                        NAME: {
                            type: ArgumentType.STRING,
                            defaultValue: "name"
                        },
                        TEXT: {
                            type: ArgumentType.STRING,
                            defaultValue: "CAT"
                        },
                    }
                },
            ],
            menus: {
            }
        };
    }

    setUrl( args ) {
        const text = Cast.toString(args.TEXT);
        this._url = text ;
    }
    getUrl() {
        return this._url ;
    }
    getResult() {
        return this._result ;
    }
    callWebApiByGet(args) {
        const text = Cast.toString(args.TEXT);
        const path = this._url + text ;
        var pr = fetch( path ) 
            .then( res => res.text() )
            .then( body => this._result = body ) ;
        return pr ;
    }

    /**
     * Azure Functions の HttpTrigger を GET で呼び出す
     */
    getHttpTrigger(args) {
        const path = Cast.toString(args.URL);
        var pr = fetch( path ) 
            .then( res => res.text() )
            .then( body => this._result = body ) ;
        return pr ;
    }
    /**
     * Azure Functions の HttpTrigger を POST で呼び出す
     */
    postHttpTrigger(args) {
        const path = Cast.toString(args.URL);
        const body = Cast.toString(args.JSON);
        const method = "POST";
        const headers = {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        };        
        var pr = fetch( path, {method, headers, body} ) 
            .then( res => res.json() )
            .then( body => this._result = body ) ;
        return pr ;
    }


    /**
     * JSON文字列から指定プロパティ名の値を取得
     */
    getValueFromJSON(args) {
        const name = Cast.toString(args.NAME);
        const json = Cast.toString(args.JSON);
        try {
            var obj = JSON.parse(json);
            return obj[ name ];
        } catch {
            return "";
        }
    }
    /**
     * JSON文字列から指定プロパティ名の値を取得
     */
    setValueIntoJSON(args) {
        const name = Cast.toString(args.NAME);
        const text = Cast.toString(args.TEXT);
        const json = Cast.toString(args.JSON);
        try {
            var obj = JSON.parse(json) ;
            obj[name] = text ;
            return JSON.stringify(obj);
        } catch {
            return json;
        }
    }
}

module.exports = Scratch3WebApiSample;