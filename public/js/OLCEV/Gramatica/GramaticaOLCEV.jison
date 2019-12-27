/** ANALISIS LEXICO*/
%lex
%%
[ \r\t\n]+                                      {} // ESPACIOS
\/\/.([^\n])*                                   {} // COMENTARIO SIMPLE
\/\*(.?\n?)*\*\/                                {} // COMENTARIO MULTILINEA
"-"[0-9]+("."[0-9]+)                            return 'DECIMAL'
"-"[0-9]+                                       return 'ENTERO'
[0-9]+("."[0-9]+)                               return 'DECIMAL'
[0-9]+                                          return 'ENTERO'

"+"                                             return 'MAS'
"="                                             return 'IGUAL'
"-"                                             return 'MENOS'
"*"                                             return 'MULTIPLICACION'            
"/"                                             return 'DIVISION' 

"{"                                             return 'LLAVEIZQ'
"}"                                             return 'LLAVEDER'
"("                                             return 'PARIZQ'
")"                                             return 'PARDER'
";"                                             return 'PNTCOMA'
","                                             return 'COMA' 


[\'\‘\’].[\'\’\‘]                               return 'CARACTER'
[\"\“\”](([^\"\“\”\\])*([\\].)*)*[\"\“\”]       return 'CADENA'


"class"                                         return 'CLASS'    
"private"                                       return 'PRIVATE'
"public"                                        return 'PUBLIC'
"protected"                                     return 'PROTECTED'
"static"                                        return 'STATIC'
"abstract"                                      return 'ABSTRACT'
"final"                                         return 'FINAL'   
"extends"                                       return 'EXTENDS' 

"int"                                           return 'INT'
"double"                                        return 'DOUBLE'
"char"                                          return 'CHAR'
"boolean"                                       return 'BOOLEAN'
"String"                                        return 'STRING'
"true"                                          return 'TRUE'
"false"                                         return 'FALSE'

"pow"                                           return 'POW'
"print"                                         return 'PRINT'
"println"                                       return "PRINTLN"

"str"                                           return 'STR'

[A-Za-z_\ñ\Ñ][A-Za-z_0-9\ñ\Ñ]*                  return 'ID'
<<EOF>>                                         {}
.                                               { console.log("Error"); }//ERRORES
/lex

%right IGUAL
%left MAS,MENOS
%left MULTIPLICACION, DIVISION

%right PARIZQ
%left PARDER
%start inicio

%%

/*
    SINTACTICO
*/

inicio : contenido                                              { parser.arbol.raiz = new Analizar($1); }
       ;



contenido : contenido declaracionClase                          { $$ = $1; $$.push($2);}
          | contenido import_sentence
          | declaracionClase                                    { $$ = []; $$.push($1); } 
          | import_sentence
          ;

// ##############################################################
// #################### CLASES ##################################
// ##############################################################

declaracionClase : CLASS ID LLAVEIZQ  bloqueClase LLAVEDER                                          { $$ = new Clase(null,$2,$4,null,@1.first_line,@1.first_column); }
                 | CLASS ID EXTENDS ID LLAVEIZQ bloqueClase LLAVEDER                                { $$ = new Clase(null,$2,$6,$4,@1.first_line,@1.first_column);}
                 | modificador CLASS ID LLAVEIZQ bloqueClase LLAVEDER                              { $$ = new Clase($1,$3,$5,null,@1.first_line,@1.first_column); }
                 | modificador CLASS ID EXTENDS ID LLAVEIZQ bloqueClase LLAVEDER                    { $$ = new Clase($1,$3,$7,$5,@1.first_line,@1.first_column)}
                 ;

// ####################################################
// #################### MODIFICADORES #################
// ####################################################

modificador : modificador PROTECTED                                         { $$ = $1; $$.push(Modificador.PROTECTED); }
            | modificador PRIVATE                                           { $$ = $1; $$.push(Modificador.PRIVATE); }
            | modificador PUBLIC                                            { $$ = $1; $$.push(Modificador.PUBLIC); }
            | modificador STATIC                                            { $$ = $1; $$.push(Modificador.STATIC); }
            | modificador ABSTRACT                                          { $$ = $1; $$.push(Modificador.ABSTRACT); }
            | modificador FINAL                                             { $$ = $1; $$.push(Mofificador.FINAL); }
            | PROTECTED                                                     { $$ = []; $$.push(Modificador.PROTECTED); }
            | PRIVATE                                                       { $$ = []; $$.push(Modificador.PRIVATE); }
            | PUBLIC                                                        { $$ = []; $$.push(Modificador.PUBLIC); }
            | STATIC                                                        { $$ = []; $$.push(Modificador.STATIC); }
            | ABSTRACT                                                      { $$ = []; $$.push(Modificador.ABSTRACT); }
            | FINAL                                                         { $$ = []; $$.push(Modificador.FINAL); }
            ;

//#############################################################
//################### INSTRUCCIONES DE UNA CLASE ##############
//#############################################################
bloqueClase : bloqueClase bloque                            { $$ = $1; $$.push($2); }
            | bloque                                        { $$ = []; $$.push($1); }
            ;

bloque : declaracionVariable PNTCOMA                                { $$ = $1; }
       | declaracionConstructor                                     { $$ = $1; }
       ;


//########################################################################
//################# DECLARACION DE CONSTRUCTORES #########################
//########################################################################
declaracionConstructor : PUBLIC ID PARIZQ PARDER LLAVEIZQ instrucciones LLAVEDER                { $$ = new Constructor($2,[],$6,@1.first_line,@1.first_column); }
                       ;

//######################################################################################
//##################### INSTRUCCIONES PARA METODOS #####################################
//######################################################################################

instrucciones : instrucciones instruccion                                         { $$ = $1; $$ = $$.concat($2); }
              | instruccion                                                       { $$ = $1; }
              ;

instruccion : declaracionLocal PNTCOMA                                                    { $$ = $1; }
            | asignacion_statement PNTCOMA                                                { $$ = $1; }
            | print_statement PNTCOMA                                                     { $$ = $1; }
            ;




//########################################################################################
//############################### ASIGNACION #############################################
//########################################################################################
asignacion_statement : ID IGUAL expresion                               {$$ = []; $$.push(new Asignacion($1,$3,@1.first_line,@1.first_column)); }
                     ;


//########################################################################################
//##################### DECLARACION DE VARIABLES LOCALES #################################
//########################################################################################
declaracionLocal : modificador tipo ID                                  { $$ = []; $$.push(new Declaracion($3,$1,$2.tipo,$2.valor,@1.first_line,@1.first_column)); }
                 | tipo ID                                              { $$ = []; $$.push(new Declaracion($2,null,$1.tipo,$1.valor,@1.first_line,@1.first_column)); }
                 | modificador tipo ID IGUAL expresion                  { $$ = []; $$.push(new Declaracion($3,$1,$2.tipo,$2.valor,@1.first_line,@1.first_column)); $$.push(new Asignacion($3,$5,@1.first_line,@1.first_column)); }
                 | tipo ID IGUAL expresion                              { $$ = []; $$.push(new Declaracion($2,null,$1.tipo,$1.valor,@1.first_line,@1.first_column)); $$.push(new Asignacion($2,$4,@1.first_line,@1.first_column)); }
                 ;


//###################################################################
//################ DECLARACION DE VARIABLES DE CLASE ################
//###################################################################
declaracionVariable : modificador tipo ID                   { $$ = new Declaracion($3,$1,$2.tipo,$2.valor,@1.first_line,@1.first_column); }
                    | tipo ID                               { $$ = new Declaracion($2,null,$1.tipo,$1.valor,@1.first_line,@1.first_column); }
                    ;

//#######################################################################
//##################### TIPOS DE DATOS ##################################
//#######################################################################
tipo : STRING                                       { $$ = new Valor(Tipo.STRING,""); }
     | INT                                          { $$ = new Valor(Tipo.INT,""); }
     | DOUBLE                                       { $$ = new Valor(Tipo.DOUBLE,""); }
     | CHAR                                         { $$ = new Valor(Tipo.CHAR,""); }
     | BOOLEAN                                      { $$ = new Valor(Tipo.BOOLEAN,""); }
     ;



expresion : aritmetica                                          { $$ = $1; }
          | primitivo                                           { $$ = $1; }
          | casteo                                              { $$ = $1; }
          | PARIZQ expresion PARDER                             { $$ = $2; }
          | str_statement                                       { $$ = $1; }
          ;

aritmetica : expresion MAS expresion                                                { $$ = new Aritmetica($1,$3,Operacion.SUMA,@1.first_line,@1.first_column);}
           | expresion MENOS expresion                                              { $$ = new Aritmetica($1,$3,Operacion.RESTA,@1.first_line,@1.first_column);}
           | expresion MULTIPLICACION expresion                                     { $$ = new Aritmetica($1,$3,Operacion.MULTIPLICACION,@1.first_line,@1.first_column);}
           | expresion DIVISION expresion                                           { $$ = new Aritmetica($1,$3,Operacion.DIVISION,@1.first_line,@1.first_column);}
           | POW PARIZQ expresion COMA expresion PARDER                             { $$ = new Aritmetica($3,$5,Operacion.POTENCIA,@1.first_line,@1.first_column);}
           ;


//#########################################################################################
//################################# CASTEO EXPLICITO #####################################
//#######################################################################################
casteo : PARIZQ tipo PARDER expresion                                               { $$ = new Casteo($2.tipo,$2.valor,$4,@1.first_line,@1.first_column); }
       ;                                          

//#########################################################################################
//###################################### STR #############################################
//#######################################################################################
str_statement : STR PARIZQ expresion PARDER                                         { $$ = new Str($3,@1.first_line,@1.first_column); }
              ;

//#########################################################################################
//################################# DATOS PRIMITIVOS #####################################
//#######################################################################################
primitivo : ENTERO                  {$$ = new Primitivo(Tipo.INT,$1,@1.first_line,@1.first_column);}
          | DECIMAL                 {$$ = new Primitivo(Tipo.DOUBLE,$1,@1.first_line,@1.first_column);}
          | CARACTER                {$$ = new Primitivo(Tipo.CHAR,$1,@1.first_line,@1.first_column);}
          | CADENA                  {$$ = new Primitivo(Tipo.STRING,$1,@1.first_line,@1.first_column);}
          | ID                      {$$ = new Primitivo(Tipo.ID,$1,@1.first_line,@1.first_column);}
          | TRUE                    {$$ = new Primitivo(Tipo.BOOLEAN,"1",@1.first_line,@1.first_column)}
          | FALSE                   {$$ = new Primitivo(Tipo.BOOLEAN,"0",@1.first_line,@1.first_column)}
          ;  
//#########################################################################################
//################################# PRINT | PRINTLN #####################################
//#######################################################################################
print_statement : PRINT PARIZQ expresion PARDER                     { $$ = []; $$.push(new PrintlOLCEV($3,false,@1.first_line,@1.first_column)); }
                | PRINTLN PARIZQ expresion PARDER                   { $$ = []; $$.push(new PrintlOLCEV($3,true,@1.first_line,@1.first_column)); }
                ;


%%

parser.arbol ={
    raiz: null
};