var Auxiliar = /** @class */ (function () {
    function Auxiliar() {
    }
    /**
     * METODO PARA GENERAR TEMPORALES
     */
    Auxiliar.generarTemporal = function () {
        var n = Auxiliar.temporal;
        Auxiliar.temporal++;
        return "t" + n;
    };
    /**
     * METODO QUE CREA UNA NUEVA LINEA DE CODIGO
     * @param linea CODIGO 3D
     * @param comentario COMENTARIO QUE ACOMPAÑARA A LA LINEA
     */
    Auxiliar.crearLinea = function (linea, comentario) {
        return linea + "                ;" + comentario;
    };
    /**
     * METODO QUE GENERAR NUEVAS ETIQUETAS
     */
    Auxiliar.generarEtiqueta = function () {
        var i = this.etiqueta;
        this.etiqueta++;
        return "L" + i;
    };
    /**
     * METODO QUE MOSTRARA LOS ERRORES EN CONSOLA
     * @param error clase error con toda la informacion del error
     */
    Auxiliar.agregarError = function (error) {
        console.error(error);
    };
    /**
     * METOODO QUE LLEVA EL CONTROL DE LAS POSICIONES ABSOLUTAS
     */
    Auxiliar.posicionAbsoluta = function () {
        var i = Auxiliar.posicion;
        Auxiliar.posicion++;
        return i;
    };
    /**
     * METODO ENCARGADO DE CREAR UN OBJETO ATRIBUTO
     * @param visibilidad Visivilidad del objeto
     * @param isFinal  si es final
     * @param isStatic  si es estatica
     * @param isAbstract  si es abstracta
     */
    Auxiliar.crearObjectoAtributos = function (visibilidad, isFinal, isStatic, isAbstract) {
        return { visibilidad: visibilidad, isStatic: isStatic, isFinal: isFinal, isAbstract: isAbstract };
    };
    /**
     * METODO QUE SERVIRA PARA CLONAR UN ENTORNO
     * @param entorno ENTORNO A CLONAR
     */
    Auxiliar.clonarEntorno = function (entorno) {
        var e = new Entorno(entorno.archivo);
        e.listaSimbolos = entorno.listaSimbolos;
        e.listaBreak = entorno.listaBreak;
        e.listaContinue = entorno.listaContinue;
        e.etiquetaSalida = entorno.etiquetaSalida;
        e.clase = entorno.clase;
        return e;
    };
    /**
     * METODO QUE DEVUELVE EL CODIGO 3D
     * DE LA FUNCION TRUNK
     */
    Auxiliar.funcionTrunk = function () {
        var nodo = new Nodo();
        nodo.codigo = [];
        var posicion = this.generarTemporal();
        var valor = this.generarTemporal();
        var modulo = this.generarTemporal();
        var retorno = this.generarTemporal();
        nodo.codigo.push(";#########################################################################");
        nodo.codigo.push(";############################### FUNCION TRUNK############################");
        nodo.codigo.push(";#########################################################################");
        nodo.codigo.push("proc trunk{");
        nodo.codigo.push(this.crearLinea(posicion + " = P  + 0", "posicion del numero a recibir"));
        nodo.codigo.push(this.crearLinea(valor + " = Stack[" + posicion + "]", "Obtenemos el valor numerico"));
        nodo.codigo.push(this.crearLinea(modulo + " = " + valor + " % 1 ", "Nos devuelve el residuo"));
        nodo.codigo.push(retorno + " = " + valor + " - " + modulo);
        nodo.codigo.push(this.crearLinea(posicion + " = P + 1", "Posicion del retorno"));
        nodo.codigo.push("Stack[" + posicion + "] = " + retorno);
        nodo.codigo.push("}");
        nodo.codigo.push("\n");
        nodo.codigo.push("\n");
        return nodo;
    };
    /**
     * METODO QUE CREA SALTOS CONDICIONALES
     * @param condicion CONDICION A EVALUAR
     * @param etiqueta ETIQUETA DONDE SE REALIZARA EL SALTO
     */
    Auxiliar.saltoCondicional = function (condicion, etiqueta) {
        return "if " + condicion + " goto " + etiqueta;
    };
    /**
     * METODO QUE GENERA SALTOS INCONDICIONALES
     * @param etiqueta SALTO
     */
    Auxiliar.saltoIncondicional = function (etiqueta) {
        return "goto " + etiqueta;
    };
    /**
     * METODO QUE DEVUELVE EL CODIGO 3D
     * DE CONVERTIR UN NUMERO A CADENA
     */
    Auxiliar.functionNumberToCadena = function () {
        var nodo = new Nodo();
        nodo.codigo = [];
        var posicion = this.generarTemporal();
        var valor = this.generarTemporal();
        var v1 = this.generarEtiqueta();
        var v2 = this.generarEtiqueta();
        var newValor = this.generarTemporal();
        var modulo = this.generarTemporal();
        var ascii = this.generarTemporal();
        var salto = this.generarEtiqueta();
        var division = this.generarTemporal();
        nodo.codigo.push(";#########################################################################");
        nodo.codigo.push(";######################### FUNCION NUMBERTOCADENA ########################");
        nodo.codigo.push(";#########################################################################");
        nodo.codigo.push("proc numberToCadena{");
        nodo.codigo.push(this.crearLinea(posicion + " = P + 0", "Posicion del parametro 1"));
        nodo.codigo.push(this.crearLinea(valor + " = Stack[" + posicion + "]", "Almacenamos el valor del numero en un temporal"));
        nodo.codigo.push(this.crearLinea(this.saltoCondicional(valor + " >= 0", v1), "Si el numero es mayor a cero hacemos un salto"));
        nodo.codigo.push(this.crearLinea(valor + " = " + valor + " * -1 ", "Convertirmos a positivo el numero"));
        nodo.codigo.push(this.crearLinea("Heap[H] = 45", "Guardamos un - en el heap"));
        nodo.codigo.push(this.crearLinea("H = H + 1", "Aumentamos el Heap"));
        nodo.codigo.push(v1 + ":");
        nodo.codigo.push(this.crearLinea(this.saltoCondicional(valor + " < 10 ", v2), ""));
        nodo.codigo.push(this.crearLinea("P = P + 1", "Simulacion de cambio de ambito"));
        nodo.codigo.push(this.crearLinea(posicion + " = P + 0", ""));
        nodo.codigo.push(this.crearLinea(division + " = " + valor + " / 10", ""));
        nodo.codigo.push(this.crearLinea("Stack[" + posicion + " ] = " + division, "Pasamos el parametro"));
        nodo.codigo.push(this.crearLinea("call trunk", "Llamamos a la funcion trunk para obtener el numero entero"));
        nodo.codigo.push(this.crearLinea(posicion + " = P + 1", "Posicion del return"));
        nodo.codigo.push(this.crearLinea(newValor + " = Stack[" + posicion + "]", "Obtenemos el valor de retorno"));
        nodo.codigo.push(this.crearLinea("P = P - 1", "Fin de simulacion de cambio de ambito"));
        nodo.codigo.push(this.crearLinea("P = P + 1", "Simulacion de cambio de ambito"));
        nodo.codigo.push(this.crearLinea(posicion + " = P + 0", "Posicion del primer parametro"));
        nodo.codigo.push(this.crearLinea("Stack[" + posicion + "] = " + newValor, "Seteamos el valor del primer parametro"));
        nodo.codigo.push("call numberToCadena");
        nodo.codigo.push(this.crearLinea("P = P - 1", "Fin de simulacion de cambio de ambito"));
        nodo.codigo.push(this.crearLinea(modulo + " = " + valor + " % 10", ""));
        nodo.codigo.push(this.crearLinea(ascii + " = " + modulo + " + 48", "Le sumamos 48 para obtener su ascii"));
        nodo.codigo.push(this.crearLinea("Heap[H] = " + ascii, "Almacenamos el valor en el Heap"));
        nodo.codigo.push(this.crearLinea("H = H + 1", "Aumentamos el Heap"));
        nodo.codigo.push(this.crearLinea(this.saltoIncondicional(salto), ""));
        nodo.codigo.push(";############################## SI EL NUMERO ES MENOR A 10 #########################");
        nodo.codigo.push(v2 + ":");
        nodo.codigo.push(this.crearLinea(ascii + " = " + valor + " + 48", "Le sumamos 48 para obtener su ascii"));
        nodo.codigo.push(this.crearLinea("Heap[H] = " + ascii, "Almacenamos el valor en el Heap"));
        nodo.codigo.push(this.crearLinea("H = H + 1", "Aumentamos el Heap"));
        nodo.codigo.push(salto + ":");
        nodo.codigo.push("}");
        nodo.codigo.push("\n");
        nodo.codigo.push("\n");
        return nodo;
    };
    /**
     * METODO QUE ESCRIBE LAS ETIQUETAS EN 3D
     * @param etiquetas ETIQUETAS A ESCRIBIR
     */
    Auxiliar.escribirEtiquetas = function (etiquetas) {
        var nodo = new Nodo();
        nodo.codigo = [];
        etiquetas.forEach(function (element) {
            nodo.codigo.push(element + ":");
        });
        return nodo;
    };
    Auxiliar.temporal = 0;
    Auxiliar.posicion = 0;
    Auxiliar.etiqueta = 0;
    return Auxiliar;
}());
