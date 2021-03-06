class Relacional implements Instruccion {
    izq: Instruccion;
    der: Instruccion;
    signo: String;
    l: number;
    c: number;


    /**
     * CONSTRUCTOR DE LA CLASE
     * @param izq 
     * @param der 
     * @param signo 
     * @param l 
     * @param c 
     */
    constructor(izq: Instruccion, der: Instruccion, signo: String, l: number, c: number) {
        this.izq = izq;
        this.der = der;
        this.signo = signo;
        this.l = l;
        this.c = c;
    }





    /**
     * METODO DE LA CLASE PADRE
     * @param entorno Entorno actual
     */
    ejecutar(entorno: Entorno): Object {
        let resultado: Object = this.izq.ejecutar(entorno);
        if (resultado instanceof MensajeError) return resultado;
        let nodoIzq: Nodo = resultado as Nodo;

        resultado = this.der.ejecutar(entorno);
        if (resultado instanceof MensajeError) return resultado;
        let nodoDer: Nodo = resultado as Nodo;

        let salida: Nodo = new Nodo([]);
        if (nodoIzq.tipo != Tipo.BOOLEAN) salida.codigo = salida.codigo.concat(nodoIzq.codigo);
        if (nodoDer.tipo != Tipo.BOOLEAN) salida.codigo = salida.codigo.concat(nodoDer.codigo);

        switch (this.signo) {
            case ">":
            case "<":
            case ">=":
            case "<=":
                return this.comparacionSimple(salida, nodoIzq, nodoDer, entorno);

            default:
                return Relacional.comparacionComplicada(salida, nodoIzq, nodoDer, entorno,this.l,this.c,this.signo);
        }

    }


    /**
     * METODO QUE SE ENCARGARA DE HACER UNA
     * COMPARACION DE LOS SIGNOS
     * >
     * <
     * >=
     * <=
     * @param nodo 
     * @param nodoIzq 
     * @param nodoDer 
     * @param entorno 
     */
    comparacionSimple(nodo: Nodo, nodoIzq: Nodo, nodoDer: Nodo, entorno: Entorno): Object {
        if ((nodoIzq.tipo === Tipo.INT && nodoDer.tipo === Tipo.DOUBLE) || (nodoIzq.tipo === Tipo.DOUBLE && nodoDer.tipo === Tipo.INT) || (nodoIzq.tipo === Tipo.DOUBLE && nodoDer.tipo === Tipo.CHAR) || (nodoIzq.tipo === Tipo.CHAR && nodoDer.tipo === Tipo.DOUBLE) || (nodoIzq.tipo === Tipo.INT && nodoDer.tipo === Tipo.CHAR) || (nodoIzq.tipo === Tipo.CHAR && nodoDer.tipo === Tipo.INT) || (nodoIzq.tipo === Tipo.DOUBLE && nodoDer.tipo === Tipo.DOUBLE) || (nodoIzq.tipo === Tipo.INT && nodoDer.tipo === Tipo.INT) || (nodoIzq.tipo === Tipo.CHAR && nodoDer.tipo === Tipo.CHAR)) {
            nodo.tipo = Tipo.BOOLEAN;
            let v: String = Auxiliar.generarEtiqueta();
            let f: String = Auxiliar.generarEtiqueta();
            nodo.codigo.push(Auxiliar.crearLinea("if " + nodoIzq.resultado + " " + this.signo + " " + nodoDer.resultado + " then goto " + v, "Si es verdadero salta a " + v));
            nodo.codigo.push(Auxiliar.crearLinea("goto " + f, "si no se cumple salta a: " + f));
            nodo.verdaderas = [];
            nodo.verdaderas.push(v);
            nodo.falsas = [];
            nodo.falsas.push(f);
            return nodo;
        }
        else {
            let mensaje: MensajeError = new MensajeError("Semantico", "No se puede conocer el: " + this.signo + " de los tipos: " + Tipo[nodoIzq.tipo] + " con: " + Tipo[nodoDer.tipo], entorno.archivo, this.l, this.c);
            Auxiliar.agregarError(mensaje);
            return mensaje;
        }

    }

    /**
     * METODO QUE SE ENCARGARA DE HACER LA
     * COMPARACION PARA LOS SIGNOS
     * !=
     * ==
     * @param nodo 
     * @param nodoIzq 
     * @param nodoDer 
     * @param entorno 
     */
    public static comparacionComplicada(nodo: Nodo, nodoIzq: Nodo, nodoDer: Nodo, entorno: Entorno,l:number,c:number,signo:String): Object {
        nodo.tipo = Tipo.BOOLEAN;
        if ((nodoIzq.tipo === Tipo.INT && nodoDer.tipo === Tipo.DOUBLE) || (nodoIzq.tipo === Tipo.DOUBLE && nodoDer.tipo === Tipo.INT) || (nodoIzq.tipo === Tipo.DOUBLE && nodoDer.tipo === Tipo.CHAR) || (nodoIzq.tipo === Tipo.CHAR && nodoDer.tipo === Tipo.DOUBLE) || (nodoIzq.tipo === Tipo.INT && nodoDer.tipo === Tipo.CHAR) || (nodoIzq.tipo === Tipo.CHAR && nodoDer.tipo === Tipo.INT) || (nodoIzq.tipo === Tipo.DOUBLE && nodoDer.tipo === Tipo.DOUBLE) || (nodoIzq.tipo === Tipo.INT && nodoDer.tipo === Tipo.INT) || (nodoIzq.tipo === Tipo.CHAR && nodoDer.tipo === Tipo.CHAR) || (nodoIzq.tipo === Tipo.ID && nodoDer.tipo == Tipo.ID) || (nodoIzq.tipo === Tipo.ARREGLO && nodoDer.tipo === Tipo.ARREGLO)) {
            nodo.tipo = Tipo.BOOLEAN;
            let v: String = Auxiliar.generarEtiqueta();
            let f: String = Auxiliar.generarEtiqueta();
            nodo.codigo.push(Auxiliar.crearLinea("if " + nodoIzq.resultado + " " + signo + " " + nodoDer.resultado + " then goto " + v, "Si es verdadero salta a " + v));
            nodo.codigo.push(Auxiliar.crearLinea("goto " + f, "si no se cumple salta a: " + f));
            nodo.verdaderas = [];
            nodo.verdaderas.push(v);
            nodo.falsas = [];
            nodo.falsas.push(f);
            return nodo;
        }
        else if (nodoIzq.tipo === Tipo.BOOLEAN && nodoDer.tipo === Tipo.BOOLEAN) {

            nodo.codigo = nodo.codigo.concat(nodoIzq.codigo);
            if (nodoIzq.verdaderas != null) {
                let s: String = Auxiliar.generarEtiqueta();
                let temporal: String = Auxiliar.generarTemporal();
                nodo.codigo = nodo.codigo.concat(Auxiliar.escribirEtiquetas(nodoIzq.verdaderas).codigo);
                nodo.codigo.push(Auxiliar.crearLinea(temporal + " = 1", "Valor Verdadero"));
                nodo.codigo.push(Auxiliar.saltoIncondicional(s));
                nodo.codigo = nodo.codigo.concat(Auxiliar.escribirEtiquetas(nodoIzq.falsas).codigo);
                nodo.codigo.push(Auxiliar.crearLinea(temporal + " = 0", "Valor Falso"));
                nodo.codigo.push(s + ":");
                nodoIzq.resultado = temporal;
            }

            nodo.codigo = nodo.codigo.concat(nodoDer.codigo);
            if(nodoDer.verdaderas != null){
                let s: String = Auxiliar.generarEtiqueta();
                let temporal: String = Auxiliar.generarTemporal();
                nodo.codigo = nodo.codigo.concat(Auxiliar.escribirEtiquetas(nodoDer.verdaderas).codigo);
                nodo.codigo.push(Auxiliar.crearLinea(temporal + " = 1", "Valor Verdadero"));
                nodo.codigo.push(Auxiliar.saltoIncondicional(s));
                nodo.codigo = nodo.codigo.concat(Auxiliar.escribirEtiquetas(nodoDer.falsas).codigo);
                nodo.codigo.push(Auxiliar.crearLinea(temporal + " = 0", "Valor Falso"));
                nodo.codigo.push(s + ":");
                nodoDer.resultado = temporal;
            }
            let v:String = Auxiliar.generarEtiqueta();
            let f:String = Auxiliar.generarEtiqueta();
            nodo.codigo.push(Auxiliar.crearLinea("if " + nodoIzq.resultado + " " + signo + " " + nodoDer.resultado + " goto " + v, "Si es verdadera saltar a : " + v));
            nodo.codigo.push(Auxiliar.crearLinea(Auxiliar.saltoIncondicional(f),"Si es falsa saltar a: " + f));
            nodo.verdaderas = [];
            nodo.verdaderas.push(v);
            nodo.falsas = [];
            nodo.falsas.push(f);

            return nodo;


        }
        else if(nodoIzq.tipo === Tipo.ID && nodoDer.tipo === Tipo.NULL || nodoIzq.tipo === Tipo.NULL && nodoDer.tipo === Tipo.ID ){
            nodo.codigo = nodo.codigo.concat(nodoIzq.codigo);
            nodo.codigo = nodo.codigo.concat(nodoDer.codigo);
            let v :String = Auxiliar.generarEtiqueta();
            let f:String = Auxiliar.generarEtiqueta();
            nodo.codigo.push(Auxiliar.crearLinea(Auxiliar.saltoCondicional(nodoIzq.resultado + " " + signo + " " + nodoDer.resultado,v),"Verificamos si en null"));
            nodo.codigo.push(Auxiliar.saltoIncondicional(f));
            nodo.verdaderas = [v];
            nodo.falsas = [f];
            nodo.tipo = Tipo.BOOLEAN;
            return nodo;
        }
        else if(nodoIzq.tipo === Tipo.STRING && nodoDer.tipo === Tipo.STRING){
            nodo.codigo.push(";################################## COMPARAR DOS CADENAS #########################################");
            let posIzq:String = Auxiliar.generarTemporal();
            let posDer:String = Auxiliar.generarTemporal();
            let valorIzq:String = Auxiliar.generarTemporal();
            let valorDer:String = Auxiliar.generarTemporal();
            let ciclo:String = Auxiliar.generarEtiqueta();
            let v:String = Auxiliar.generarEtiqueta();
            let f:String = Auxiliar.generarEtiqueta();
            let vv:String = Auxiliar.generarEtiqueta();

            nodo.codigo.push(Auxiliar.crearLinea(posIzq + " = " + nodoIzq.resultado,"Obtemos la posicion del inicio de la cadena izquierda"));
            nodo.codigo.push(Auxiliar.crearLinea(posDer + " = " + nodoDer.resultado,"Obtenemos la posicion del inicio de la cadena derecha"));
            nodo.codigo.push(ciclo + ":");
            nodo.codigo.push(Auxiliar.crearLinea(valorIzq + " = Heap[" + posIzq +"]","Obtenemos el caracter de la cadena Izquierda"));
            nodo.codigo.push(Auxiliar.crearLinea(valorDer + " = Heap[" + posDer + "]","Obtenemos el caracter de la cadena derecha"));
            nodo.codigo.push(Auxiliar.crearLinea(Auxiliar.saltoCondicional(valorIzq + " == " + valorDer,v),"Si es verdadero vamos a verificar si es el fin"));
            if(signo === "==") nodo.codigo.push(Auxiliar.crearLinea(Auxiliar.saltoIncondicional(f),"Etiqueta para falsa"));
            else nodo.codigo.push(Auxiliar.crearLinea(Auxiliar.saltoIncondicional(vv),"Etiqueta para verdadera"));
            nodo.codigo.push(v + ":");
            if(signo === "==") nodo.codigo.push(Auxiliar.crearLinea(Auxiliar.saltoCondicional(valorIzq + " == " +" 0",vv),"Si estamos al final entonces la cadena si es correcta"));
            else nodo.codigo.push(Auxiliar.crearLinea(Auxiliar.saltoCondicional(valorIzq + " == " +" 0",f),"Si estamos al final entonces la cadena si es incorrecta"));
            nodo.codigo.push(Auxiliar.crearLinea(posIzq + " = " + posIzq + " + 1","Aumentamos la posicion de la cadena izquierda"));
            nodo.codigo.push(Auxiliar.crearLinea(posDer + " = " + posDer + " + 1","Aumentamos la posicion de la cadena derecha"));
            nodo.codigo.push(Auxiliar.saltoIncondicional(ciclo));

            nodo.verdaderas = [vv];
            nodo.falsas = [f];


            return nodo;
        }
        
        let mensaje:MensajeError = new MensajeError("Semantico", " no se puede obtener el " + signo + " de los tipos: " + Tipo[nodoIzq.tipo] + " con: " + Tipo[nodoDer.tipo],entorno.archivo,l,c);
        Auxiliar.agregarError(mensaje);
        return mensaje;
        
    }




    /**
     * ESTA CLASE NO POSEE PRIMERA PASADA
     * @param entorno 
     */
    primeraPasada(entorno: Entorno): Object {
        throw new Error("Method not implemented.");
    }


}