class toInt implements Instruccion{
    
    expresion:Instruccion;
    flag:Boolean;
    l:number;
    c:number;

    /**
     * CONSTRUCTOR DE LA CLASE
     * @param expresion 
     * @param l 
     * @param c 
     */
    constructor(expresion:Instruccion,flag:Boolean,l:number,c:number){
        this.expresion = expresion;
        this.flag = flag;
        this.l = l;
        this.c = c;
    }

    /**
     * METODO DE LA CLASE PADRE
     * @param entorno 
     */
    ejecutar(entorno: Entorno): Object {
        let resultado:Object = this.expresion.ejecutar(entorno);
        if(resultado instanceof MensajeError) return resultado;

        let salida:Nodo = new Nodo([]);
        let nodo:Nodo = resultado as Nodo;
        salida.codigo = salida.codigo.concat(nodo.codigo);

        if(nodo.tipo === Tipo.STRING){
            if(this.flag) salida.tipo = Tipo.INT;
            else salida.tipo = Tipo.DOUBLE;
            let posicion:String = Auxiliar.generarTemporal();
            let retorno:String = Auxiliar.generarTemporal();
            salida.codigo.push(Auxiliar.crearLinea("P = P + " + entorno.tamaño,"Simulacion de cambio de ambito"));
            salida.codigo.push(Auxiliar.crearLinea(posicion + " = P + 0","Posicion del primer parametro"));
            salida.codigo.push(Auxiliar.crearLinea("Stack[" + posicion + "] = " + nodo.resultado,"Le pasamos el apuntador de la cadena"));
            salida.codigo.push(Auxiliar.crearLinea(posicion + " = P + 1","Posicion del segundo parametro"));
            salida.codigo.push(Auxiliar.crearLinea("Stack[" + posicion + "] = 0","Pasamos un acarreo inicial"));
            salida.codigo.push("call stringToNumber");
            salida.codigo.push(Auxiliar.crearLinea(posicion + " = P + 2","Obtenemos la posicion del retorno"));
            salida.codigo.push(Auxiliar.crearLinea(retorno + " = Stack[" + posicion + "]","Obtenemos el valor numerico de la cadena"));
            salida.codigo.push(Auxiliar.crearLinea("P = P - " + entorno.tamaño,"Fin simulacion de cambio de ambito"));
            salida.resultado = retorno;
            return salida;
        }
        else{
            let mensaje:MensajeError = new MensajeError("Semantico","No se puede aplicar la funcion " + ((this.flag) ? "toInt" : "toDouble") + " al tipo: " + Tipo[nodo.tipo],entorno.archivo,this.l,this.c);
            Auxiliar.agregarError(mensaje);
            return mensaje;
        }
        
    }

    /**
     * ESTA CLASE NO POSEE PRIMERA PASADA
     * @param entorno 
     */
    primeraPasada(entorno: Entorno): Object {
        return null;
    }
}