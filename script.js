let seuVotoPara = document.querySelector ('.d-1-1 span');
let cargo = document.querySelector('.d-1-2 span');
let descricao = document.querySelector('.d-1-4');
let aviso = document.querySelector('.d-2');
let lateral = document.querySelector('.d-1-right');
let numeros = document.querySelector('.d-1-3');


let etapaAtual = 0;
let numero = '';
let votobranco = false;
let votos = [];

function comecarEtapa(){
let etapa = etapas[etapaAtual];
let numeroHtml = '';
numero = '';
for(let i=0; i<etapa.numeros;i++){
    if (i ===0 ){
    numeroHtml += '<div class="numero pisca"></div>';
}
else{

    numeroHtml += '<div class="numero"></div>';


}

}

seuVotoPara.style.display = 'none';
cargo.innerHTML = etapa.titulo;
descricao.innerHTML = '';
aviso.style.display = 'none';
lateral.innerHTML = '';
numeros.innerHTML = numeroHtml;

}


function atualizainterface(){
console.log("Atualizando Interface");
console.log(numero);
let etapa = etapas[etapaAtual];
let candidato = etapa.candidatos.filter((item)=>{

if(item.numero === numero) {
    return true;

} else{

return false;

}

})
if(candidato.length > 0){
candidato = candidato[0];

    seuVotoPara.style.display = 'block';
    descricao.innerHTML = `Nome: ${candidato.nome} <br/> Partido: ${candidato.partido} <br/>  ` ;
    aviso.style.display = 'block';


    let fotosHtml = '';
    for(let i in candidato.fotos){
        if(candidato.fotos[i].small){

            fotosHtml += `<div class="d-1-image small"><img src="${candidato.fotos[i].url}">${candidato.fotos[i].legenda}</div>`;


        } else{
            fotosHtml += `<div class="d-1-image"><img src="${candidato.fotos[i].url}">${candidato.fotos[i].legenda}</div>`;

        }



    }
    lateral.innerHTML = fotosHtml;
    

} else{
    seuVotoPara.style.display = 'block';
    aviso.style.display = 'block';
    descricao.innerHTML = '<div class="aviso--grande pisca">VOTO NULO</div>';

}
}

function clicou(n){
    let elnumero = document.querySelector('.numero.pisca');
    if(elnumero !== null){
        elnumero.innerHTML = n;
        numero = `${numero}${n}`;

        elnumero.classList.remove('pisca');
        if(elnumero.nextElementSibling !==null){
        elnumero.nextElementSibling.classList.add('pisca');
    }
        else{
            atualizainterface();


        }

    }
}
function branco(){
    if(numero === ''){
        votobranco = true;
        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
        numeros.innerHTML = '';
        descricao.innerHTML = '<div class="aviso--grande pisca">VOTO EM BRANCO</div>';



    } else{
        alert("Para votar em branco, primeiro pressione CORRIGE")
    }

};

function corrige(){
comecarEtapa();
votobranco = false;
}

function confirma(){
    let votoConfirmado = false;

    let etapa = etapas[etapaAtual];
    if(votobranco === true){
        votoConfirmado = true;
        votos.push({etapa: etapas[etapaAtual].titulo, voto: 'branco'})
        console.log("Voto em BRANCO confirmado.")
} else if (numero.length === etapa.numeros){
   votoConfirmado = true;
   votos.push({etapa: etapas[etapaAtual].titulo, voto: numero})
    console.log("Voto em " +numero+ " Confirmado")

} else if (numero.length != etapa.numeros){
    alert("Número de digitos incorretos. Por favor, digite "+ etapa.numeros +" dígitos para votar")
} else {
    Console.log("Voto NULO confirmado.")

}

    if(votoConfirmado){
    
        etapaAtual++;
        if(etapas[etapaAtual] !== undefined){
            comecarEtapa();
        }else {
            document.querySelector('.tela').innerHTML = '<div class = "aviso--gigante pisca"> FIM </div>'
            console.log(votos);
        }
        
    }

}

comecarEtapa();