var viggenere = viggenere || (function(){
    var doStaff = function(txt, desp, action){
        var replace =(function(){
            var abc = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
            var l = abc.length;

            return function(c){
                var i = abc.indexOf(c.toLowerCase());
                if(i != -1){
                    var pos = i;
                    if(action){
                        //cifrar
                        pos += desp;
                        pos = (pos >= l) ? pos-l : pos;
                    }else{
                        //descifrar
                        pos -= desp;
                        pos = (pos < 0) ? l+pos : pos;
                    }
                    return abc[pos];
                }
                return c;
            };
        })();

        var re = (/([a-z])/ig);
        return String(txt).replace(re, function(match){
            return replace(match);
        });
    };
    return{
        encode : function(txt, desp){
            return doStaff(txt, desp, true);
        },
        decode : function(txt, desp){
            return doStaff(txt, desp, false);
        }

    };
})();

function longitudCifrar(){
    camposVacios();
    var texto = document.getElementById("txt").value;
    var clave = document.getElementById("txtClave").value;
    if(clave.length > texto.length){
        alert("La clave no puede ser mayor al texto a cifrar")
    }else{
        codificar(texto, clave);
    }
}

function longitudDescifrar(){
    camposVacios();
    var texto = document.getElementById("txt").value;
    var clave = document.getElementById("txtClave").value;
    if(clave.length > texto.length){
        alert("La clave no puede ser mayor al texto a cifrar")
    }else{
        decodificar(texto, clave);
    }
}

function codificar(texto, clave){
    var resultado = "";
    var indiceClave = 0;
    var charATexto = texto.split('');

    for(var i = 0; i < charATexto.length; i++){
        var des = obIndiceClave(clave.charAt(indiceClave));
        var charTexto = charATexto[i];

        resultado += viggenere.encode(charTexto, (des >= 26) ? des%26 : des);
        indiceClave++;

        if(indiceClave >= clave.length){
            indiceClave=0;
        }
    }
    document.getElementById("res").value = resultado;
}

function decodificar(texto, clave){
    var resultado = "";
    var indiceClave = 0;
    var charATexto = texto.split('');

    for(var i = 0; i < charATexto.length; i++){
        var des = obIndiceClave(clave.charAt(indiceClave));
        var charTexto = charATexto[i];

        resultado += viggenere.decode(charTexto, (des >= 26) ? des%26 : des);
        indiceClave++;

        if(indiceClave >= clave.length){
            indiceClave=0;
        }
    }
    document.getElementById("res").value = resultado;
}

function obIndiceClave(reco){
    var abc = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
    return abc.indexOf(reco.toLowerCase());
}

function camposVacios(){
    var texto = document.getElementById("txt").value;
    var clave = document.getElementById("txtClave").value;
    if(texto == ""){
        alert("Ingrese un texto para cifrar")
    }
    if(clave == ""){
        alert("Ingrese una clave para cifrar");
    }
}

function camposVacios2(){
    var texto = document.getElementById("txt").value;
    if(texto == ""){
        alert("Ingrese un texto para cifrar")
    }
}

function colocar(){
    var copiar = document.getElementById("res").value;
    document.getElementById("txt").value = copiar
}

function colocar2(){
    var copiar = document.getElementById("cifradoC").value;
    document.getElementById("txt").value = copiar
}

function reiniciar(){
    document.getElementById("txt").value = "";
    document.getElementById("txtClave").value = "";
    document.getElementById("res").value = "";
}

function reiniciar2(){
    document.getElementById("txt").value = "";
    document.getElementById("desplazamiento").value = 13;
    document.getElementById("cifradoC").value = "";
}

const value = document.querySelector("#value");
const input = document.querySelector("#desplazamiento");
value.textContent = input.value;
input.addEventListener("input", (event) => {
  value.textContent = event.target.value;
});

const desplazamiento = document.getElementById("desplazamiento");
const texto = document.getElementById("txt");
const textoCifrado = document.getElementById("cifradoC")

//vamos a crear una función para poder cifrar

function cifrado(){
    //declarar el texto que se va a ingresar
    camposVacios2()
    const textoIngresado = texto.value;
    textoCifrado.value = textoIngresado.split('').map(c =>{
        let mayus = (c === c.toUpperCase()) ? true : false;
        let valorEntero = c.toLowerCase().charCodeAt(0);
        if(valorEntero >= 97 && valorEntero <= 122){
            const valorDesplazamieto = parseInt(desplazamiento.value);
                valorEntero = valorEntero - 97;
                valorEntero = (valorEntero + valorDesplazamieto)%26;
                valorEntero = valorEntero + 97;
        }
        let cifrado = String.fromCharCode(valorEntero)
        return mayus ? cifrado.toUpperCase() : cifrado;
    }).join('');
}

function descifrado(){
    //declarar el texto que se va a ingresar
    camposVacios2()
    const textoIngresado = texto.value;
    textoCifrado.value = textoIngresado.split('').map(c =>{
        let mayus = (c === c.toUpperCase()) ? true : false;
        let valorEntero = c.toLowerCase().charCodeAt(0);
        if(valorEntero >= 97 && valorEntero <= 122){
            const valorDesplazamieto = parseInt(desplazamiento.value);

            valorEntero = valorEntero-97;
            valorEntero = (valorEntero - valorDesplazamieto)%26;
           if(valorEntero<0){
            valorEntero = valorEntero + 123;
           }else{
            valorEntero = valorEntero + 97;
           }
            
        }
        let descifrado = String.fromCharCode(valorEntero)
        return mayus ? descifrado.toUpperCase() : descifrado;
    }).join('');
}

