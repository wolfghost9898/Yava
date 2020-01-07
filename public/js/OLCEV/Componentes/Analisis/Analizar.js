var Analizar = /** @class */ (function () {
    function Analizar(instrucciones) {
        this.instrucciones = instrucciones;
    }
    Analizar.prototype.ejecutar = function (id) {
        var nodo = new Nodo();
        nodo.codigo = [];
        nodo.codigo = nodo.codigo.concat(Auxiliar.funcionTrunk().codigo);
        nodo.codigo = nodo.codigo.concat(Auxiliar.functionNumberToCadena().codigo);
        nodo.codigo = nodo.codigo.concat(Auxiliar.funcionPow().codigo);
        nodo.codigo = nodo.codigo.concat(Auxiliar.stringToNumber().codigo);
        nodo.codigo = nodo.codigo.concat(Auxiliar.funcionLength().codigo);
        nodo.codigo = nodo.codigo.concat(Auxiliar.toCharArray().codigo);
        nodo.codigo = nodo.codigo.concat(Auxiliar.toUpperCase().codigo);
        nodo.codigo = nodo.codigo.concat(Auxiliar.toLoweCase().codigo);
        this.instrucciones.forEach(function (clase) {
            var entorno = new Entorno(id);
            if (clase instanceof Import) {
                var resultado = clase.ejecutar(entorno);
                if (resultado instanceof MensajeError)
                    return resultado;
                var res = resultado;
                nodo.codigo = nodo.codigo.concat(res.codigo);
            }
            if (clase instanceof Clase) {
                var resultado = clase.primeraPasada(entorno);
                if (!(resultado instanceof MensajeError)) {
                    var res = resultado;
                    nodo.codigo = nodo.codigo.concat(res.codigo);
                }
            }
        });
        var temporal = Auxiliar.generarTemporal();
        nodo.codigo.push(temporal + " = P + 0");
        nodo.codigo.push("Stack[" + temporal + "] = H");
        nodo.codigo.push("H = H + 1");
        nodo.codigo.push("call constructor_hola_");
        return nodo;
    };
    return Analizar;
}());
