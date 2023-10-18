const desplazamiento = document.getElementById("desplazamiento");
const texto = document.getElementById("texto");
const textoCifrado = document.getElementById("cifrado")

const desplazamiento2 = document.getElementById("desplazamiento2");
const texto2 = document.getElementById("texto2");
const textoDescifrado = document.getElementById("descifrado")

//vamos a crear una función para poder cifrar

function cifrado(){
    //declarar el texto que se va a ingresar
    const textoIngresado = texto.value;
    textoCifrado.value = textoIngresado.split('').map(c =>{
        let mayus = (c === c.toUpperCase()) ? true : false;
        let valorEntero = c.toLowerCase().charCodeAt(0);
        if(valorEntero >= 97 && valorEntero <= 122){
            const valorDesplazamieto = parseInt(desplazamiento.value);

            if(valorEntero + valorDesplazamieto > 122){
                valorEntero = 97 + (valorEntero - 122) + valorDesplazamieto - 1
            }else{
                valorEntero = valorEntero + valorDesplazamieto;
            }
        }
        let cifrado = String.fromCharCode(valorEntero)
        return mayus ? cifrado.toUpperCase() : cifrado;
    }).join('');
}

function descifrado(){
    //declarar el texto que se va a ingresar
    const textoIngresado2 = texto2.value;
    textoDescifrado.value = textoIngresado2.split('').map(c =>{
        let mayus2 = (c === c.toUpperCase()) ? true : false;
        let valorEntero2 = c.toLowerCase().charCodeAt(0);
        if(valorEntero2 >= 97 && valorEntero2 <= 122){
            const valorDesplazamieto2 = parseInt(desplazamiento2.value);

            if(valorEntero2 - valorDesplazamieto2 < 97){
                valorEntero2 = 122 + (valorEntero2 -97 ) - valorDesplazamieto2 + 1
            }else{
                valorEntero2 = valorEntero2 - valorDesplazamieto2;
            }
        }
        let descifrado = String.fromCharCode(valorEntero2)
        return mayus2 ? descifrado.toUpperCase() : descifrado;
    }).join('');
}

texto.addEventListener("keyup", cifrado);
desplazamiento.addEventListener("change", cifrado);
texto2.addEventListener("keyup", descifrado);
desplazamiento2.addEventListener("change", descifrado);