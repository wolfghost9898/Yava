class While implements Instruccion{
    condicion:Instruccion;
    cuerpo:Array<Instruccion>;
    l:number;
    c:number;

    /**
     * CONSTRUCTOR DE LA CLASE
     * @param condicion 
     * @param cuerpo 
     * @param l 
     * @param c 
     */
    constructor(condicion:Instruccion,cuerpo:Array<Instruccion>,l:number,c:number){
        this.condicion = condicion;
        this.cuerpo = cuerpo;
        this.l = l;
        this.c = c;
    }



    /**
     * METODO DE LA CLASE PADREs
     * @param entorno 
     */
    ejecutar(entorno: Entorno): Object {
        let salida:Nodo = new Nodo([]);
        let resultado:Object = this.condicion.ejecutar(entorno);
        if(resultado instanceof MensajeError) return resultado;

        let nodoCondicion:Nodo = resultado as Nodo;
        if(nodoCondicion.tipo != Tipo.BOOLEAN){
            let mensaje:MensajeError = new MensajeError("Semantico","La condicion tiene que ser de tipo BOOLEAN no se reconoce: " + Tipo[nodoCondicion.tipo],entorno.archivo,this.l,this.c);
            Auxiliar.agregarError(mensaje);
            return mensaje;
        }
        let ciclo:String = Auxiliar.generarEtiqueta();
        let nuevo:Entorno = Auxiliar.clonarEntorno(entorno);
        nuevo.localizacion = Localizacion.STACK;

        salida.codigo.push(Auxiliar.crearLinea(ciclo + ":","Etiqueta encargada del ciclo"));
        salida.codigo = salida.codigo.concat(nodoCondicion.codigo);
        nodoCondicion = Logica.arreglarBoolean(nodoCondicion,salida);

        salida.codigo.push(";############################ VERDADERA #######################################");
        salida.codigo = salida.codigo.concat(Auxiliar.escribirEtiquetas(nodoCondicion.verdaderas).codigo);
        this.cuerpo.forEach(element => {
            let result:Object = element.ejecutar(nuevo);
            if(result instanceof MensajeError) return result;

            let nodo:Nodo = result as Nodo;
            salida.codigo = salida.codigo.concat(nodo.codigo);
            salida.saltos = salida.saltos.concat(nodo.saltos);
            salida.breaks = salida.breaks.concat(nodo.breaks);
            salida.continue = salida.continue.concat(nodo.continue);
            salida.retornos = salida.retornos.concat(nodo.retornos);
            if(nodo.retornos.length > 0){
                salida.tipo = nodo.tipo;
                salida.valor = nodo.valor;
            }
        });
        
        salida.codigo.push(";########################### CONTINUE | SALTOS | CICLO ######################");
        salida.codigo = salida.codigo.concat(Auxiliar.escribirEtiquetas(salida.continue).codigo);
        salida.codigo = salida.codigo.concat(Auxiliar.escribirEtiquetas(salida.saltos).codigo);
        salida.codigo.push(Auxiliar.saltoIncondicional(ciclo));

        salida.codigo.push(";########################### FALSAS | BREAK    ######################");
        salida.codigo = salida.codigo.concat(Auxiliar.escribirEtiquetas(nodoCondicion.falsas).codigo);
        salida.codigo = salida.codigo.concat(Auxiliar.escribirEtiquetas(salida.breaks).codigo);

        salida.breaks = [];
        salida.continue = [];
        salida.saltos = [];

        return salida;
    }    
    
    
    /**
     * BUSCAMOS DECLARACIONES 
     * @param entorno 
     */
    primeraPasada(entorno: Entorno): Object {
        let i :number = 0;
        this.cuerpo.forEach(element => {
            let x:number = +element.primeraPasada(entorno);
            i += x;
        });
        return i;
    }


}