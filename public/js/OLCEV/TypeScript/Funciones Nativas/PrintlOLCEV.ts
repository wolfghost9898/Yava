class PrintlOLCEV implements Instruccion{
    expresion:Instruccion;
    salto:Boolean;
    l:number;
    c:number;

    /**
     * CONSTRUCTOR DE LA CLASE
     * @param expresion 
     * @param salto 
     * @param l 
     * @param c 
     */
    constructor(expresion:Instruccion,salto:Boolean,l:number,c:number){
        this.expresion = expresion;
        this.salto = salto;
        this.l = l;
        this.c = c;
    }



    /**
     * METODO DE LA CLASE PADRE
     * @param entorno ENTORNO ACTUAL
     */
    ejecutar(entorno: Entorno): Object {
        let result:Object = this.expresion.ejecutar(entorno);
        if(result instanceof MensajeError) return result;

        let nodo:Nodo = result as Nodo;
        let salida:Nodo = new Nodo([]);
        salida.codigo = salida.codigo.concat(nodo.codigo);
        salida.codigo.push(";######################### PRINT ##############################");
        if(nodo.tipo === Tipo.INT) salida.codigo.push("print(%e," + nodo.resultado + ")");
        else if(nodo.tipo === Tipo.DOUBLE) salida.codigo.push("print(%d," + nodo.resultado + ")");
        else if(nodo.tipo === Tipo.CHAR) salida.codigo.push("print(%c," + nodo.resultado + ")" );
        else if(nodo.tipo === Tipo.STRING) {
            let posicion:String = Auxiliar.generarTemporal();
            let valor:String = Auxiliar.generarTemporal();
            let v:String = Auxiliar.generarEtiqueta();
            let r:String = Auxiliar.generarEtiqueta();

            
            salida.codigo.push(Auxiliar.crearLinea(posicion + " = " + nodo.resultado,"Obtenemos la posicion del inicio de la cadena"));
            salida.codigo.push(r + ":");
            salida.codigo.push(Auxiliar.crearLinea(valor + "= Heap[" + posicion + "]","Obtenemos el primer caracter de la cadena"));
            salida.codigo.push(Auxiliar.crearLinea(Auxiliar.saltoCondicional(valor + " == 0",v),"Si es null ya no imprimimos nada"));
            salida.codigo.push(Auxiliar.crearLinea(posicion + " = " + posicion + " + 1","Aumentamos la posicion"));
            salida.codigo.push(Auxiliar.crearLinea("print(%c," + valor + ")","Imprimimos el caracter"));
            salida.codigo.push(Auxiliar.saltoIncondicional(r));
            salida.codigo.push(v + ":");
        }
        else if(nodo.tipo === Tipo.BOOLEAN){
            if(nodo.verdaderas === null){
                let verdadera:String = Auxiliar.generarEtiqueta();
                let salto:String = Auxiliar.generarEtiqueta();
                salida.codigo.push(Auxiliar.crearLinea(Auxiliar.saltoCondicional(nodo.resultado + " == 0",verdadera),"Si es un false"));
                salida.codigo.push(Auxiliar.crearLinea("print(%c,116)","t"));
                salida.codigo.push(Auxiliar.crearLinea("print(%c,114)","r"));
                salida.codigo.push(Auxiliar.crearLinea("print(%c,117)","u")); 
                salida.codigo.push(Auxiliar.crearLinea("print(%c,101)","e"));              
                salida.codigo.push(Auxiliar.saltoIncondicional(salto));
                salida.codigo.push(verdadera + ":");
                salida.codigo.push(Auxiliar.crearLinea("print(%c,102)","f"));
                salida.codigo.push(Auxiliar.crearLinea("print(%c,97)","a"));
                salida.codigo.push(Auxiliar.crearLinea("print(%c,108)","l"));
                salida.codigo.push(Auxiliar.crearLinea("print(%c,115)","s"));
                salida.codigo.push(Auxiliar.crearLinea("print(%c,101)","e"));
                salida.codigo.push(salto + ":");
            }
            else{
                let salto:String = Auxiliar.generarEtiqueta();
                salida.codigo = salida.codigo.concat(Auxiliar.escribirEtiquetas(nodo.verdaderas).codigo);
                salida.codigo.push(Auxiliar.crearLinea("print(%c,116)","t"));
                salida.codigo.push(Auxiliar.crearLinea("print(%c,114)","r"));
                salida.codigo.push(Auxiliar.crearLinea("print(%c,117)","u")); 
                salida.codigo.push(Auxiliar.crearLinea("print(%c,101)","e"));;
                salida.codigo.push(Auxiliar.saltoIncondicional(salto));
                salida.codigo = salida.codigo.concat(Auxiliar.escribirEtiquetas(nodo.falsas).codigo);
                salida.codigo.push(Auxiliar.crearLinea("print(%c,102)","f"));
                salida.codigo.push(Auxiliar.crearLinea("print(%c,97)","a"));
                salida.codigo.push(Auxiliar.crearLinea("print(%c,108)","l"));
                salida.codigo.push(Auxiliar.crearLinea("print(%c,115)","s"));
                salida.codigo.push(Auxiliar.crearLinea("print(%c,101)","e"));
                salida.codigo.push(salto + ":");
            }
        }
        else{
            let mensaje:MensajeError = new MensajeError("Semantico","No se puede imprimir el tipo de dato: " + Tipo[nodo.tipo],entorno.archivo,this.l,this.c );
            Auxiliar.agregarError(mensaje);
            return mensaje;
        }

        if(this.salto) salida.codigo.push("print(%c,10)");
        return salida;
        
    }    
    /**
     * ESTA CLASE EN SU PRIMERA PASADA RETORNA UN 0
     * @param entorno ENTORNO ACTUAL
     */
    primeraPasada(entorno: Entorno): Object {
        return 0;
    }


}