var Asignacion = /** @class */ (function () {
    function Asignacion(id, expresion, l, c, flag) {
        this.id = id;
        this.expresion = expresion;
        this.l = l;
        this.c = c;
        this.flag = flag;
    }
    /**
     * METODO DE LA CLASE PADRE
     * @param entorno Entorno Actual
     */
    Asignacion.prototype.ejecutar = function (entorno) {
        var s = (this.flag === 0) ? entorno.buscarSimbolo(this.id) : entorno.buscarSimboloThis(this.id);
        //------------------------------------------ SI NO EXISTE EL SIMBOLO ----------------------------------------------------------------
        if (s == null) {
            var mensaje = new MensajeError("Semantico", "La variable: " + this.id + " no existe", entorno.archivo, this.l, this.c);
            Auxiliar.agregarError(mensaje);
            return mensaje;
        }
        var atributo = s.atributo;
        var isFinal = atributo['isFinal'];
        if (isFinal) {
            var mensaje = new MensajeError("Semantico", "La variable: " + this.id + " es Final no se le puede cambiar su valor", entorno.archivo, this.l, this.c);
            Auxiliar.agregarError(mensaje);
            return mensaje;
        }
        var result = this.expresion.ejecutar(entorno);
        if (result instanceof MensajeError)
            return result;
        var salida = new Nodo();
        salida.codigo = [];
        var nodo = result;
        var casteo = Asignacion.casteoImplicitoSimbolo(s, nodo, entorno, this.l, this.c);
        if (casteo instanceof MensajeError)
            return casteo;
        salida.codigo = salida.codigo.concat(nodo.codigo);
        if (s.atributo['isStatic'] == true)
            salida.codigo.push(Auxiliar.crearLinea("Stack[" + s.posAbsoluta + "] = " + nodo.resultado, " Accedemos a la variable estatica " + s.id));
        else if (s.localizacion == Localizacion.STACK) {
            var temp = Auxiliar.generarTemporal();
            salida.codigo.push(Auxiliar.crearLinea(temp + " = P + " + s.posRelativa, "Accedemos a la posicion de la variable: " + s.id));
            salida.codigo.push(Auxiliar.crearLinea("Stack[" + temp + "] = " + nodo.resultado, "Asignamos el valor a la variable: " + s.id));
        }
        else {
            var temp = Auxiliar.generarTemporal();
            var posHeap = Auxiliar.generarTemporal();
            salida.codigo.push(Auxiliar.crearLinea(temp + " = P + 0", "Accedemos al atributo this"));
            salida.codigo.push(Auxiliar.crearLinea(posHeap + " = Stack[" + temp + "]", "Obtenemos la posicion en el heap de this"));
            salida.codigo.push(Auxiliar.crearLinea(posHeap + " = " + posHeap + " + " + s.posRelativa, "Nos movemos en el heap"));
            salida.codigo.push(Auxiliar.crearLinea("Heap[" + posHeap + "] = " + nodo.resultado, "Le asignamos valor a la variable: " + s.id));
        }
        s.isNull = false;
        return salida;
    };
    /**
     * EN LA PRIMERA PASADA RETORNA UN 0 PUES NO
     * SE CREA UNA VARIABLE
     * @param entorno Entorno Actual
     */
    Asignacion.prototype.primeraPasada = function (entorno) {
        return 0;
    };
    /**
     * VERIFICA SI LOS TIPOS SON IGUALES
     * @param tipo
     * @param tipoValor
     */
    Asignacion.casteoImplicito = function (tipo, tipoValor) {
        if (tipo === Tipo.INT && tipoValor === Tipo.CHAR)
            return true;
        else if (tipo === Tipo.DOUBLE && tipoValor === Tipo.CHAR)
            return true;
        else if (tipo === Tipo.DOUBLE && tipoValor === Tipo.INT)
            return true;
        else if (tipo === Tipo.ID && tipoValor === Tipo.NULL)
            return true;
        else
            return tipo === tipoValor;
    };
    /**
     * VERIFICA SI EL TIPO DE SIMBOLO ES IGUAL
     * A LA EXPRESION A ASIGNAR
     */
    Asignacion.casteoImplicitoSimbolo = function (s, nodo, entorno, l, c) {
        if (s.tipo === Tipo.ARREGLO && nodo.tipo === Tipo.ARREGLO) {
            var arreglo = nodo.valor;
            var simArreglo = s.valor;
            if (s.dimensiones !== +(arreglo.valor)) {
                var mensaje = new MensajeError("Semantico", "El arreglo es de: " + s.dimensiones + " y se le quiere asignar uno de tamaño: " + +arreglo.valor, entorno.archivo, l, c);
                Auxiliar.agregarError(mensaje);
                return mensaje;
            }
            if (simArreglo.tipo != arreglo.tipo) {
                var mensaje = new MensajeError("Semantico", "El arreglo es de tipo " + Tipo[simArreglo.tipo] + " y se le quiere asignar una arreglo de tipo : " + Tipo[arreglo.tipo], entorno.archivo, l, c);
                Auxiliar.agregarError(mensaje);
                return mensaje;
            }
        }
        else if (s.tipo === Tipo.ID && nodo.tipo === Tipo.ID) {
            var clase1 = s.objeto;
            var clase2 = nodo.id;
            if (clase1 !== clase2) {
                var mensaje = new MensajeError("Semantico", "La clase es de tipo: " + clase1 + " y se quiere asignar una clase tipo: " + clase2, entorno.archivo, l, c);
                Auxiliar.agregarError(mensaje);
                return mensaje;
            }
        }
        else if (!(Asignacion.casteoImplicito(s.tipo, nodo.tipo))) {
            var mensaje = new MensajeError("Semantico", "No se le puede asignar un tipo: " + Tipo[nodo.tipo] + " a : " + Tipo[s.tipo], entorno.archivo, l, c);
            Auxiliar.agregarError(mensaje);
            return mensaje;
        }
        return true;
    };
    /**
     * VERIFICA QUE SI UNA EXPRESION ES IGUAL A OTRA
     * @param s
     * @param nodo
     * @param entorno
     * @param l
     * @param c
     */
    Asignacion.casteoImplicitoNodo = function (s, nodo, entorno, l, c) {
        if (s.tipo === Tipo.ARREGLO && nodo.tipo === Tipo.ARREGLO) {
            var arreglo = nodo.valor;
            var simArreglo = s.valor;
            if (+simArreglo.valor !== +(arreglo.valor)) {
                var mensaje = new MensajeError("Semantico", "El arreglo es de: " + simArreglo.valor + " y se le quiere asignar uno de tamaño: " + +arreglo.valor, entorno.archivo, l, c);
                Auxiliar.agregarError(mensaje);
                return mensaje;
            }
            if (simArreglo.tipo != arreglo.tipo) {
                var mensaje = new MensajeError("Semantico", "El arreglo es de tipo " + Tipo[simArreglo.tipo] + " y se le quiere asignar una arreglo de tipo : " + Tipo[arreglo.tipo], entorno.archivo, l, c);
                Auxiliar.agregarError(mensaje);
                return mensaje;
            }
        }
        else if (s.tipo === Tipo.ID && nodo.tipo === Tipo.ID) {
            var clase1 = s.id;
            var clase2 = nodo.id;
            if (clase1 !== clase2) {
                var mensaje = new MensajeError("Semantico", "La clase es de tipo: " + clase1 + " y se quiere asignar una clase tipo: " + clase2, entorno.archivo, l, c);
                Auxiliar.agregarError(mensaje);
                return mensaje;
            }
        }
        else if (!(Asignacion.casteoImplicito(s.tipo, nodo.tipo))) {
            var mensaje = new MensajeError("Semantico", "No se le puede asignar un tipo: " + Tipo[nodo.tipo] + " a : " + Tipo[s.tipo], entorno.archivo, l, c);
            Auxiliar.agregarError(mensaje);
            return mensaje;
        }
        return true;
        ;
    };
    return Asignacion;
}());
