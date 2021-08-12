const inputCep = document.querySelector('#cep');
const inputRua = document.querySelector('#rua');
const inputCidade = document.querySelector('#cidade');

inputCep.addEventListener('keydown', function(event){
    const cep = inputCep.value;
    if (event.key === 'Tab' || event.key === 'Enter') {
        if(cep.length < 8 || typeof Number(cep) !== 'number'){
            alert('Favor informar cep válido');
            return;
        }

        const promessa = fetch(`https://viacep.com.br/ws/${cep}/json/`);
        promessa.then(function (resposta){
            const corpoPromessa = resposta.json();

            corpoPromessa.then(function (corpo){
                inputCidade.value = corpo.localidade;
                inputRua.value = corpo.bairro;
            });
        });
    }
});