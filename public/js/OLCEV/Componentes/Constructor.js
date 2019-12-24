var Constructor = /** @class */ (function () {
    /**
     * CONSTRUCTOR DE LA CLASE
     * @param id Nombre del constructor
     * @param parametros lista de parametros
     * @param instrucciones lista de instrucciones
     * @param l linea de la instruccion
     * @param c columna de la instruccion
     */
    function Constructor(id, parametros, instrucciones, l, c) {
        this.id = id;
        this.parametros = parametros;
        this.instrucciones = instrucciones;
        this.l = l;
        this.c = c;
    }
    Constructor.prototype.ejecutar = function (entorno) {
        return "";
    };
    /**
     * ESTA CLASE NO TIENE PRIMERA PASADA
     * @param entorno Entorno actual
     */
    Constructor.prototype.primeraPasada = function (entorno) {
        if (entorno.clase !== this.id) {
            var mensaje = new MensajeError("Semantico", "El nombre de la clase es: " + entorno.clase + " y el del constructor es: " + this.id, entorno.archivo, this.l, this.c);
            Auxiliar.agregarError(mensaje);
            return mensaje;
        }
        return "";
    };
    return Constructor;
}());
