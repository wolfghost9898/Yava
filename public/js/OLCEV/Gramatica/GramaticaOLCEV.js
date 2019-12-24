/* parser generated by jison 0.4.18 */
/*
  Returns a Parser object of the following structure:

  Parser: {
    yy: {}
  }

  Parser.prototype: {
    yy: {},
    trace: function(),
    symbols_: {associative list: name ==> number},
    terminals_: {associative list: number ==> name},
    productions_: [...],
    performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate, $$, _$),
    table: [...],
    defaultActions: {...},
    parseError: function(str, hash),
    parse: function(input),

    lexer: {
        EOF: 1,
        parseError: function(str, hash),
        setInput: function(input),
        input: function(),
        unput: function(str),
        more: function(),
        less: function(n),
        pastInput: function(),
        upcomingInput: function(),
        showPosition: function(),
        test_match: function(regex_match_array, rule_index),
        next: function(),
        lex: function(),
        begin: function(condition),
        popState: function(),
        _currentRules: function(),
        topState: function(),
        pushState: function(condition),

        options: {
            ranges: boolean           (optional: true ==> token location info will include a .range[] member)
            flex: boolean             (optional: true ==> flex-like lexing behaviour where the rules are tested exhaustively to find the longest match)
            backtrack_lexer: boolean  (optional: true ==> lexer regexes are tested in order and for each matching regex the action code is invoked; the lexer terminates the scan when a token is returned by the action code)
        },

        performAction: function(yy, yy_, $avoiding_name_collisions, YY_START),
        rules: [...],
        conditions: {associative list: name ==> set},
    }
  }


  token location info (@$, _$, etc.): {
    first_line: n,
    last_line: n,
    first_column: n,
    last_column: n,
    range: [start_number, end_number]       (where the numbers are indexes into the input string, regular zero-based)
  }


  the parseError function receives a 'hash' object with these members for lexer and parser errors: {
    text:        (matched text)
    token:       (the produced terminal token, if any)
    line:        (yylineno)
  }
  while parser (grammar) errors will also provide these members, i.e. parser errors deliver a superset of attributes: {
    loc:         (yylloc)
    expected:    (string describing the set of expected tokens)
    recoverable: (boolean: TRUE when the parser has a error recovery rule available for this particular error)
  }
*/
var GramaticaOLCEV = (function(){
var o=function(k,v,o,l){for(o=o||{},l=k.length;l--;o[k[l]]=v);return o},$V0=[1,5],$V1=[1,7],$V2=[1,8],$V3=[1,9],$V4=[1,10],$V5=[1,11],$V6=[1,12],$V7=[1,6,7,14,15,16,17,18,19],$V8=[1,17],$V9=[1,18],$Va=[1,19],$Vb=[1,20],$Vc=[1,21],$Vd=[1,22],$Ve=[7,14,15,16,17,18,19,24,25,26,27,28],$Vf=[1,31],$Vg=[1,32],$Vh=[1,33],$Vi=[1,34],$Vj=[1,35],$Vk=[11,14,15,16,17,18,19,24,25,26,27,28];
var parser = {trace: function trace () { },
yy: {},
symbols_: {"error":2,"inicio":3,"contenido":4,"declaracionClase":5,"import_sentence":6,"CLASS":7,"ID":8,"LLAVEIZQ":9,"bloqueClase":10,"LLAVEDER":11,"EXTENDS":12,"modificador":13,"PROTECTED":14,"PRIVATE":15,"PUBLIC":16,"STATIC":17,"ABSTRACT":18,"FINAL":19,"bloque":20,"declaracionVariable":21,"PNTCOMA":22,"tipo":23,"STRING":24,"INT":25,"DOUBLE":26,"CHAR":27,"BOOLEAN":28,"expresion":29,"aritmetica":30,"primitivo":31,"MAS":32,"ENTERO":33,"DECIMAL":34,"CARACTER":35,"CADENA":36,"$accept":0,"$end":1},
terminals_: {2:"error",6:"import_sentence",7:"CLASS",8:"ID",9:"LLAVEIZQ",11:"LLAVEDER",12:"EXTENDS",14:"PROTECTED",15:"PRIVATE",16:"PUBLIC",17:"STATIC",18:"ABSTRACT",19:"FINAL",22:"PNTCOMA",24:"STRING",25:"INT",26:"DOUBLE",27:"CHAR",28:"BOOLEAN",32:"MAS",33:"ENTERO",34:"DECIMAL",35:"CARACTER",36:"CADENA"},
productions_: [0,[3,1],[4,2],[4,2],[4,1],[4,1],[5,5],[5,7],[5,6],[5,8],[13,2],[13,2],[13,2],[13,2],[13,2],[13,2],[13,1],[13,1],[13,1],[13,1],[13,1],[13,1],[10,2],[10,1],[20,2],[21,3],[21,2],[23,1],[23,1],[23,1],[23,1],[23,1],[29,1],[29,1],[30,3],[31,1],[31,1],[31,1],[31,1],[31,1]],
performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate /* action[1] */, $$ /* vstack */, _$ /* lstack */) {
/* this == yyval */

var $0 = $$.length - 1;
switch (yystate) {
case 1:
 parser.arbol.raiz = new Analizar($$[$0]); 
break;
case 2:
 this.$ = $$[$0-1]; this.$.push($$[$0]);
break;
case 4: case 23:
 this.$ = []; this.$.push($$[$0]); 
break;
case 6:
 this.$ = new Clase(null,$$[$0-3],$$[$0-1],null,_$[$0-4].first_line,_$[$0-4].first_column); 
break;
case 7:
 this.$ = new Clase(null,$$[$0-5],$$[$0-1],$$[$0-3],_$[$0-6].first_line,_$[$0-6].first_column);
break;
case 8:
 this.$ = new Clase($$[$0-5],$$[$0-3],$$[$0-1],null,_$[$0-5].first_line,_$[$0-5].first_column); 
break;
case 9:
 this.$ = new Clase($$[$0-7],$$[$0-5],$$[$0-1],$$[$0-3],_$[$0-7].first_linea,_$[$0-7].first_column)
break;
case 10:
 this.$ = $$[$0-1]; this.$.push(Modificador.PROTECTED); 
break;
case 11:
 this.$ = $$[$0-1]; this.$.push(Modificador.PRIVATE); 
break;
case 12:
 this.$ = $$[$0-1]; this.$.push(Modificador.PUBLIC); 
break;
case 13:
 this.$ = $$[$0-1]; this.$.push(Modificador.STATIC); 
break;
case 14:
 this.$ = $$[$0-1]; this.$.push(Modificador.ABSTRACT); 
break;
case 15:
 this.$ = $$[$0-1]; this.$.push(Mofificador.FINAL); 
break;
case 16:
 this.$ = []; this.$.push(Modificador.PROTECTED); 
break;
case 17:
 this.$ = []; this.$.push(Modificador.PRIVATE); 
break;
case 18:
 this.$ = []; this.$.push(Modificador.PUBLIC); 
break;
case 19:
 this.$ = []; this.$.push(Modificador.STATIC); 
break;
case 20:
 this.$ = []; this.$.push(Modificador.ABSTRACT); 
break;
case 21:
 this.$ = []; this.$.push(Modificador.FINAL); 
break;
case 22:
 this.$ = $$[$0-1]; this.$.push($$[$0]); 
break;
case 24:
 this.$ = $$[$0-1]; 
break;
case 25:
 this.$ = new Declaracion($$[$0],$$[$0-2],$$[$0-1].tipo,$$[$0-1].valor,_$[$0-2].first_linea,_$[$0-2].first_column); 
break;
case 26:
 this.$ = new Declaracion($$[$0],null,$$[$0-1].tipo,$$[$0-1].valor,_$[$0-1].first_linea,_$[$0-1].first_column); 
break;
case 27:
 this.$ = new Valor(Tipo.STRING,""); 
break;
case 28:
 this.$ = new Valor(Tipo.INT,""); 
break;
case 29:
 this.$ = new Valor(Tipo.DOUBLE,""); 
break;
case 30:
 this.$ = new Valor(Tipo.CHAR,""); 
break;
case 31:
 this.$ = new Valor(Tipo.BOOLEAN,""); 
break;
case 32: case 33:
 this.$ = $$[$0]; 
break;
case 34:
 this.$ = new Aritmetica($$[$0-2],$$[$0],Operacion.SUMA,_$[$0-2].first_linea,_$[$0-2].first_column);
break;
case 35:
this.$ = new Primitivo(Tipo.INT,$$[$0],_$[$0].first_line,_$[$0].first_column);
break;
case 36:
this.$ = new Primitivo(Tipo.DOUBLE,$$[$0],_$[$0].first_line,_$[$0].first_column);
break;
case 37:
this.$ = new Primitivo(Tipo.CHAR,$$[$0],_$[$0].first_line,_$[$0].first_column);
break;
case 38:
this.$ = new Primitivo(Tipo.STRING,$$[$0],_$[$0].first_line,_$[$0].first_column);
break;
case 39:
this.$ = new Primitivo(Tipo.ID,$$[$0],_$[$0].first_line,_$[$0].first_column);
break;
}
},
table: [{3:1,4:2,5:3,6:[1,4],7:$V0,13:6,14:$V1,15:$V2,16:$V3,17:$V4,18:$V5,19:$V6},{1:[3]},{1:[2,1],5:13,6:[1,14],7:$V0,13:6,14:$V1,15:$V2,16:$V3,17:$V4,18:$V5,19:$V6},o($V7,[2,4]),o($V7,[2,5]),{8:[1,15]},{7:[1,16],14:$V8,15:$V9,16:$Va,17:$Vb,18:$Vc,19:$Vd},o($Ve,[2,16]),o($Ve,[2,17]),o($Ve,[2,18]),o($Ve,[2,19]),o($Ve,[2,20]),o($Ve,[2,21]),o($V7,[2,2]),o($V7,[2,3]),{9:[1,23],12:[1,24]},{8:[1,25]},o($Ve,[2,10]),o($Ve,[2,11]),o($Ve,[2,12]),o($Ve,[2,13]),o($Ve,[2,14]),o($Ve,[2,15]),{10:26,13:29,14:$V1,15:$V2,16:$V3,17:$V4,18:$V5,19:$V6,20:27,21:28,23:30,24:$Vf,25:$Vg,26:$Vh,27:$Vi,28:$Vj},{8:[1,36]},{9:[1,37],12:[1,38]},{11:[1,39],13:29,14:$V1,15:$V2,16:$V3,17:$V4,18:$V5,19:$V6,20:40,21:28,23:30,24:$Vf,25:$Vg,26:$Vh,27:$Vi,28:$Vj},o($Vk,[2,23]),{22:[1,41]},{14:$V8,15:$V9,16:$Va,17:$Vb,18:$Vc,19:$Vd,23:42,24:$Vf,25:$Vg,26:$Vh,27:$Vi,28:$Vj},{8:[1,43]},{8:[2,27]},{8:[2,28]},{8:[2,29]},{8:[2,30]},{8:[2,31]},{9:[1,44]},{10:45,13:29,14:$V1,15:$V2,16:$V3,17:$V4,18:$V5,19:$V6,20:27,21:28,23:30,24:$Vf,25:$Vg,26:$Vh,27:$Vi,28:$Vj},{8:[1,46]},o($V7,[2,6]),o($Vk,[2,22]),o($Vk,[2,24]),{8:[1,47]},{22:[2,26]},{10:48,13:29,14:$V1,15:$V2,16:$V3,17:$V4,18:$V5,19:$V6,20:27,21:28,23:30,24:$Vf,25:$Vg,26:$Vh,27:$Vi,28:$Vj},{11:[1,49],13:29,14:$V1,15:$V2,16:$V3,17:$V4,18:$V5,19:$V6,20:40,21:28,23:30,24:$Vf,25:$Vg,26:$Vh,27:$Vi,28:$Vj},{9:[1,50]},{22:[2,25]},{11:[1,51],13:29,14:$V1,15:$V2,16:$V3,17:$V4,18:$V5,19:$V6,20:40,21:28,23:30,24:$Vf,25:$Vg,26:$Vh,27:$Vi,28:$Vj},o($V7,[2,8]),{10:52,13:29,14:$V1,15:$V2,16:$V3,17:$V4,18:$V5,19:$V6,20:27,21:28,23:30,24:$Vf,25:$Vg,26:$Vh,27:$Vi,28:$Vj},o($V7,[2,7]),{11:[1,53],13:29,14:$V1,15:$V2,16:$V3,17:$V4,18:$V5,19:$V6,20:40,21:28,23:30,24:$Vf,25:$Vg,26:$Vh,27:$Vi,28:$Vj},o($V7,[2,9])],
defaultActions: {31:[2,27],32:[2,28],33:[2,29],34:[2,30],35:[2,31],43:[2,26],47:[2,25]},
parseError: function parseError (str, hash) {
    if (hash.recoverable) {
        this.trace(str);
    } else {
        var error = new Error(str);
        error.hash = hash;
        throw error;
    }
},
parse: function parse(input) {
    var self = this, stack = [0], tstack = [], vstack = [null], lstack = [], table = this.table, yytext = '', yylineno = 0, yyleng = 0, recovering = 0, TERROR = 2, EOF = 1;
    var args = lstack.slice.call(arguments, 1);
    var lexer = Object.create(this.lexer);
    var sharedState = { yy: {} };
    for (var k in this.yy) {
        if (Object.prototype.hasOwnProperty.call(this.yy, k)) {
            sharedState.yy[k] = this.yy[k];
        }
    }
    lexer.setInput(input, sharedState.yy);
    sharedState.yy.lexer = lexer;
    sharedState.yy.parser = this;
    if (typeof lexer.yylloc == 'undefined') {
        lexer.yylloc = {};
    }
    var yyloc = lexer.yylloc;
    lstack.push(yyloc);
    var ranges = lexer.options && lexer.options.ranges;
    if (typeof sharedState.yy.parseError === 'function') {
        this.parseError = sharedState.yy.parseError;
    } else {
        this.parseError = Object.getPrototypeOf(this).parseError;
    }
    function popStack(n) {
        stack.length = stack.length - 2 * n;
        vstack.length = vstack.length - n;
        lstack.length = lstack.length - n;
    }
    _token_stack:
        var lex = function () {
            var token;
            token = lexer.lex() || EOF;
            if (typeof token !== 'number') {
                token = self.symbols_[token] || token;
            }
            return token;
        };
    var symbol, preErrorSymbol, state, action, a, r, yyval = {}, p, len, newState, expected;
    while (true) {
        state = stack[stack.length - 1];
        if (this.defaultActions[state]) {
            action = this.defaultActions[state];
        } else {
            if (symbol === null || typeof symbol == 'undefined') {
                symbol = lex();
            }
            action = table[state] && table[state][symbol];
        }
                    if (typeof action === 'undefined' || !action.length || !action[0]) {
                var errStr = '';
                expected = [];
                for (p in table[state]) {
                    if (this.terminals_[p] && p > TERROR) {
                        expected.push('\'' + this.terminals_[p] + '\'');
                    }
                }
                if (lexer.showPosition) {
                    errStr = 'Parse error on line ' + (yylineno + 1) + ':\n' + lexer.showPosition() + '\nExpecting ' + expected.join(', ') + ', got \'' + (this.terminals_[symbol] || symbol) + '\'';
                } else {
                    errStr = 'Parse error on line ' + (yylineno + 1) + ': Unexpected ' + (symbol == EOF ? 'end of input' : '\'' + (this.terminals_[symbol] || symbol) + '\'');
                }
                this.parseError(errStr, {
                    text: lexer.match,
                    token: this.terminals_[symbol] || symbol,
                    line: lexer.yylineno,
                    loc: yyloc,
                    expected: expected
                });
            }
        if (action[0] instanceof Array && action.length > 1) {
            throw new Error('Parse Error: multiple actions possible at state: ' + state + ', token: ' + symbol);
        }
        switch (action[0]) {
        case 1:
            stack.push(symbol);
            vstack.push(lexer.yytext);
            lstack.push(lexer.yylloc);
            stack.push(action[1]);
            symbol = null;
            if (!preErrorSymbol) {
                yyleng = lexer.yyleng;
                yytext = lexer.yytext;
                yylineno = lexer.yylineno;
                yyloc = lexer.yylloc;
                if (recovering > 0) {
                    recovering--;
                }
            } else {
                symbol = preErrorSymbol;
                preErrorSymbol = null;
            }
            break;
        case 2:
            len = this.productions_[action[1]][1];
            yyval.$ = vstack[vstack.length - len];
            yyval._$ = {
                first_line: lstack[lstack.length - (len || 1)].first_line,
                last_line: lstack[lstack.length - 1].last_line,
                first_column: lstack[lstack.length - (len || 1)].first_column,
                last_column: lstack[lstack.length - 1].last_column
            };
            if (ranges) {
                yyval._$.range = [
                    lstack[lstack.length - (len || 1)].range[0],
                    lstack[lstack.length - 1].range[1]
                ];
            }
            r = this.performAction.apply(yyval, [
                yytext,
                yyleng,
                yylineno,
                sharedState.yy,
                action[1],
                vstack,
                lstack
            ].concat(args));
            if (typeof r !== 'undefined') {
                return r;
            }
            if (len) {
                stack = stack.slice(0, -1 * len * 2);
                vstack = vstack.slice(0, -1 * len);
                lstack = lstack.slice(0, -1 * len);
            }
            stack.push(this.productions_[action[1]][0]);
            vstack.push(yyval.$);
            lstack.push(yyval._$);
            newState = table[stack[stack.length - 2]][stack[stack.length - 1]];
            stack.push(newState);
            break;
        case 3:
            return true;
        }
    }
    return true;
}};


parser.arbol ={
    raiz: null
};/* generated by jison-lex 0.3.4 */
var lexer = (function(){
var lexer = ({

EOF:1,

parseError:function parseError(str, hash) {
        if (this.yy.parser) {
            this.yy.parser.parseError(str, hash);
        } else {
            throw new Error(str);
        }
    },

// resets the lexer, sets new input
setInput:function (input, yy) {
        this.yy = yy || this.yy || {};
        this._input = input;
        this._more = this._backtrack = this.done = false;
        this.yylineno = this.yyleng = 0;
        this.yytext = this.matched = this.match = '';
        this.conditionStack = ['INITIAL'];
        this.yylloc = {
            first_line: 1,
            first_column: 0,
            last_line: 1,
            last_column: 0
        };
        if (this.options.ranges) {
            this.yylloc.range = [0,0];
        }
        this.offset = 0;
        return this;
    },

// consumes and returns one char from the input
input:function () {
        var ch = this._input[0];
        this.yytext += ch;
        this.yyleng++;
        this.offset++;
        this.match += ch;
        this.matched += ch;
        var lines = ch.match(/(?:\r\n?|\n).*/g);
        if (lines) {
            this.yylineno++;
            this.yylloc.last_line++;
        } else {
            this.yylloc.last_column++;
        }
        if (this.options.ranges) {
            this.yylloc.range[1]++;
        }

        this._input = this._input.slice(1);
        return ch;
    },

// unshifts one char (or a string) into the input
unput:function (ch) {
        var len = ch.length;
        var lines = ch.split(/(?:\r\n?|\n)/g);

        this._input = ch + this._input;
        this.yytext = this.yytext.substr(0, this.yytext.length - len);
        //this.yyleng -= len;
        this.offset -= len;
        var oldLines = this.match.split(/(?:\r\n?|\n)/g);
        this.match = this.match.substr(0, this.match.length - 1);
        this.matched = this.matched.substr(0, this.matched.length - 1);

        if (lines.length - 1) {
            this.yylineno -= lines.length - 1;
        }
        var r = this.yylloc.range;

        this.yylloc = {
            first_line: this.yylloc.first_line,
            last_line: this.yylineno + 1,
            first_column: this.yylloc.first_column,
            last_column: lines ?
                (lines.length === oldLines.length ? this.yylloc.first_column : 0)
                 + oldLines[oldLines.length - lines.length].length - lines[0].length :
              this.yylloc.first_column - len
        };

        if (this.options.ranges) {
            this.yylloc.range = [r[0], r[0] + this.yyleng - len];
        }
        this.yyleng = this.yytext.length;
        return this;
    },

// When called from action, caches matched text and appends it on next action
more:function () {
        this._more = true;
        return this;
    },

// When called from action, signals the lexer that this rule fails to match the input, so the next matching rule (regex) should be tested instead.
reject:function () {
        if (this.options.backtrack_lexer) {
            this._backtrack = true;
        } else {
            return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).\n' + this.showPosition(), {
                text: "",
                token: null,
                line: this.yylineno
            });

        }
        return this;
    },

// retain first n characters of the match
less:function (n) {
        this.unput(this.match.slice(n));
    },

// displays already matched input, i.e. for error messages
pastInput:function () {
        var past = this.matched.substr(0, this.matched.length - this.match.length);
        return (past.length > 20 ? '...':'') + past.substr(-20).replace(/\n/g, "");
    },

// displays upcoming input, i.e. for error messages
upcomingInput:function () {
        var next = this.match;
        if (next.length < 20) {
            next += this._input.substr(0, 20-next.length);
        }
        return (next.substr(0,20) + (next.length > 20 ? '...' : '')).replace(/\n/g, "");
    },

// displays the character position where the lexing error occurred, i.e. for error messages
showPosition:function () {
        var pre = this.pastInput();
        var c = new Array(pre.length + 1).join("-");
        return pre + this.upcomingInput() + "\n" + c + "^";
    },

// test the lexed token: return FALSE when not a match, otherwise return token
test_match:function(match, indexed_rule) {
        var token,
            lines,
            backup;

        if (this.options.backtrack_lexer) {
            // save context
            backup = {
                yylineno: this.yylineno,
                yylloc: {
                    first_line: this.yylloc.first_line,
                    last_line: this.last_line,
                    first_column: this.yylloc.first_column,
                    last_column: this.yylloc.last_column
                },
                yytext: this.yytext,
                match: this.match,
                matches: this.matches,
                matched: this.matched,
                yyleng: this.yyleng,
                offset: this.offset,
                _more: this._more,
                _input: this._input,
                yy: this.yy,
                conditionStack: this.conditionStack.slice(0),
                done: this.done
            };
            if (this.options.ranges) {
                backup.yylloc.range = this.yylloc.range.slice(0);
            }
        }

        lines = match[0].match(/(?:\r\n?|\n).*/g);
        if (lines) {
            this.yylineno += lines.length;
        }
        this.yylloc = {
            first_line: this.yylloc.last_line,
            last_line: this.yylineno + 1,
            first_column: this.yylloc.last_column,
            last_column: lines ?
                         lines[lines.length - 1].length - lines[lines.length - 1].match(/\r?\n?/)[0].length :
                         this.yylloc.last_column + match[0].length
        };
        this.yytext += match[0];
        this.match += match[0];
        this.matches = match;
        this.yyleng = this.yytext.length;
        if (this.options.ranges) {
            this.yylloc.range = [this.offset, this.offset += this.yyleng];
        }
        this._more = false;
        this._backtrack = false;
        this._input = this._input.slice(match[0].length);
        this.matched += match[0];
        token = this.performAction.call(this, this.yy, this, indexed_rule, this.conditionStack[this.conditionStack.length - 1]);
        if (this.done && this._input) {
            this.done = false;
        }
        if (token) {
            return token;
        } else if (this._backtrack) {
            // recover context
            for (var k in backup) {
                this[k] = backup[k];
            }
            return false; // rule action called reject() implying the next rule should be tested instead.
        }
        return false;
    },

// return next match in input
next:function () {
        if (this.done) {
            return this.EOF;
        }
        if (!this._input) {
            this.done = true;
        }

        var token,
            match,
            tempMatch,
            index;
        if (!this._more) {
            this.yytext = '';
            this.match = '';
        }
        var rules = this._currentRules();
        for (var i = 0; i < rules.length; i++) {
            tempMatch = this._input.match(this.rules[rules[i]]);
            if (tempMatch && (!match || tempMatch[0].length > match[0].length)) {
                match = tempMatch;
                index = i;
                if (this.options.backtrack_lexer) {
                    token = this.test_match(tempMatch, rules[i]);
                    if (token !== false) {
                        return token;
                    } else if (this._backtrack) {
                        match = false;
                        continue; // rule action called reject() implying a rule MISmatch.
                    } else {
                        // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
                        return false;
                    }
                } else if (!this.options.flex) {
                    break;
                }
            }
        }
        if (match) {
            token = this.test_match(match, rules[index]);
            if (token !== false) {
                return token;
            }
            // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
            return false;
        }
        if (this._input === "") {
            return this.EOF;
        } else {
            return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. Unrecognized text.\n' + this.showPosition(), {
                text: "",
                token: null,
                line: this.yylineno
            });
        }
    },

// return next match that has a token
lex:function lex () {
        var r = this.next();
        if (r) {
            return r;
        } else {
            return this.lex();
        }
    },

// activates a new lexer condition state (pushes the new lexer condition state onto the condition stack)
begin:function begin (condition) {
        this.conditionStack.push(condition);
    },

// pop the previously active lexer condition state off the condition stack
popState:function popState () {
        var n = this.conditionStack.length - 1;
        if (n > 0) {
            return this.conditionStack.pop();
        } else {
            return this.conditionStack[0];
        }
    },

// produce the lexer rule set which is active for the currently active lexer condition state
_currentRules:function _currentRules () {
        if (this.conditionStack.length && this.conditionStack[this.conditionStack.length - 1]) {
            return this.conditions[this.conditionStack[this.conditionStack.length - 1]].rules;
        } else {
            return this.conditions["INITIAL"].rules;
        }
    },

// return the currently active lexer condition state; when an index argument is provided it produces the N-th previous condition state, if available
topState:function topState (n) {
        n = this.conditionStack.length - 1 - Math.abs(n || 0);
        if (n >= 0) {
            return this.conditionStack[n];
        } else {
            return "INITIAL";
        }
    },

// alias for begin(condition)
pushState:function pushState (condition) {
        this.begin(condition);
    },

// return the number of states currently on the stack
stateStackSize:function stateStackSize() {
        return this.conditionStack.length;
    },
options: {},
performAction: function anonymous(yy,yy_,$avoiding_name_collisions,YY_START) {
var YYSTATE=YY_START;
switch($avoiding_name_collisions) {
case 0:
break;
case 1:
break;
case 2:
break;
case 3:return 34
break;
case 4:return 33
break;
case 5:return 34
break;
case 6:return 33
break;
case 7:return 32
break;
case 8:return 9
break;
case 9:return 11
break;
case 10:return 22
break;
case 11:return 35
break;
case 12:return 36
break;
case 13:return 7    
break;
case 14:return 15
break;
case 15:return 16
break;
case 16:return 14
break;
case 17:return 17
break;
case 18:return 18
break;
case 19:return 19   
break;
case 20:return 12 
break;
case 21:return 25
break;
case 22:return 26
break;
case 23:return 27
break;
case 24:return 28
break;
case 25:return 24
break;
case 26:return 8
break;
case 27:
break;
case 28: console.err("Error");
break;
}
},
rules: [/^(?:[ \r\t\n]+)/,/^(?:\/\/.([^\n])*)/,/^(?:\/\*(.?\n?)*\*\/)/,/^(?:-[0-9]+(\.[0-9]+))/,/^(?:-[0-9]+)/,/^(?:[0-9]+(\.[0-9]+))/,/^(?:[0-9]+)/,/^(?:\+)/,/^(?:\{)/,/^(?:\})/,/^(?:;)/,/^(?:[\'\‘\’].[\'\’\‘])/,/^(?:[\"\“\”](([^\"\“\”\\])*([\\].)*)*[\"\“\”])/,/^(?:class\b)/,/^(?:private\b)/,/^(?:public\b)/,/^(?:protected\b)/,/^(?:static\b)/,/^(?:abstract\b)/,/^(?:final\b)/,/^(?:extends\b)/,/^(?:int\b)/,/^(?:double\b)/,/^(?:char\b)/,/^(?:boolean\b)/,/^(?:String\b)/,/^(?:[A-Za-z_\ñ\Ñ][A-Za-z_0-9\ñ\Ñ]*)/,/^(?:$)/,/^(?:.)/],
conditions: {"INITIAL":{"rules":[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28],"inclusive":true}}
});
return lexer;
})();
parser.lexer = lexer;
function Parser () {
  this.yy = {};
}
Parser.prototype = parser;parser.Parser = Parser;
return new Parser;
})();


if (typeof require !== 'undefined' && typeof exports !== 'undefined') {
exports.parser = GramaticaOLCEV;
exports.Parser = GramaticaOLCEV.Parser;
exports.parse = function () { return GramaticaOLCEV.parse.apply(GramaticaOLCEV, arguments); };
exports.main = function commonjsMain (args) {
    if (!args[1]) {
        console.log('Usage: '+args[0]+' FILE');
        process.exit(1);
    }
    var source = require('fs').readFileSync(require('path').normalize(args[1]), "utf8");
    return exports.parser.parse(source);
};
if (typeof module !== 'undefined' && require.main === module) {
  exports.main(process.argv.slice(1));
}
}