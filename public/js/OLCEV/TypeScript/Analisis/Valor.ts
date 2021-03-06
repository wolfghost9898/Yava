
class Valor{
    tipo : Tipo;
    valor : Object;

    constructor(tipo:Tipo,valor:Object){
        this.tipo = tipo;
        this.valor = valor;
    }


    
}


enum Tipo{
    INT,
    DOUBLE,
    STRING,
    CHAR,
    BOOLEAN,
    ID,
    ARREGLO,
    VOID,
    NULL,
    CLASE
};


enum Operacion{
    SUMA,
    RESTA,
    MULTIPLICACION,
    DIVISION,
    POTENCIA,
    NEGATIVO,
    INCREMENTOPRE,
    DECREMENTOPRE,
    INCREMENTOPOS,
    DECREMENTOPOS,
    OR,
    AND,
    NEGACION,
    MODULO
};

enum Modificador{
    PUBLIC,
    PROTECTED,
    PRIVATE,
    STATIC,
    FINAL,
    ABSTRACT
}

enum Visibilidad{
    PUBLIC,
    PROTECTED,
    PRIVATE
}

enum Localizacion{
    HEAP,
    STACK
}

enum Rol{
    CLASE,
    VARIABLE
}

