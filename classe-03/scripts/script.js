const inputNome = document.querySelector('#name-search');
const imagem = document.querySelector('#sprites');
const idInfo = document.querySelector('#id-info b');
const habilidades = document.querySelector('#abilities');
const outputNome = document.querySelector('#name');
const id = document.querySelector('.id-info b');


const url = 'https://pokeapi.co/api/v2/pokemon/';

function criarElementoHtml(elemento, valor){
    const element = document.createElement(elemento);
    element.textContent = valor;
    
    return element;
}

function clearInput(){
    const divAbilities = document.querySelector('#abilities');
    const divName = document.querySelector('#name');

    while(divAbilities.firstChild){
        divAbilities.removeChild(divAbilities.lastChild);
    }

    while(divName.firstChild){
        divName.removeChild(divName.lastChild);
    }
}

inputNome.addEventListener('keydown', function(event){

    if(event.key !== 'Enter' || inputNome.value === ''){
        return;
    }

    clearInput();

    const nomePokemon = inputNome.value;
    if(typeof nomePokemon !== 'string') {
        return;
    }

    try {
        const promessa = fetch(`${url}${nomePokemon}`);
        promessa.then(function (response){
            const corpoPromessa = response.json();

            corpoPromessa.then(function (corpo){
                const arrayDeHabilidades = corpo.abilities;
                const speciesName = corpo.species.name;

                const elemento = criarElementoHtml('b', speciesName);
                outputNome.append(elemento);

                const sprites = corpo.sprites.front_default;
                imagem.src = sprites;

                arrayDeHabilidades.forEach((objHabilidade, index) => {
                    const objDeNome = objHabilidade.ability; 
                    const elemento = criarElementoHtml('b', `${index+1}: ${objDeNome.name}`);
                    
                    habilidades.append(elemento);
                });

                id.textContent = corpo.id;
            });
        });
    } catch (error) {
        alert('favor use tecla Tab');
        console.log(error);
    }
});