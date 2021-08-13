const input = document.querySelector('.input #moeda-input');
const high = document.querySelector('.high-ultimas24h');
const vol = document.querySelector('.vol-ultimas24h');
const buy = document.querySelector('.buy-ultimas24h');


// O teclado 'Enter' gerra erro no input
input.addEventListener('keydown', function (event) {
    console.log(event.key);
    if (!teclouEnter(event.key)) {
        return;
    }

    const {value} = input.value;
    console.log(input);
    try {
        const promessa = fetch(`https://www.mercadobitcoin.net/api/btc/ticker/`);
        
        promessa.then(function (resposta){
            const corpoPromessa = resposta.json();
    
            corpoPromessa.then(function (corpo){
                console.log(corpo);
                high.textContent = corpo.ticker.high;
                vol.textContent = corpo.ticker.vol;
                buy.textContent = corpo.ticker.buy;
            });
        });
    } catch (error) {
        console.log(error);
    }
    // console.log(input.value);
    
});

function teclouEnter(tecla) {
	return (tecla === 'Enter' || tecla === 'Tab');
}