var uriCard_Veículos = 'http://localhost:3000/veiculo'
var uriCard_Operacoes = 'http://localhost:3000/operacao'

var veiculos = []
var operacoes = []



function carregar() {

    const options = { method: 'GET' };

    fetch(uriCard_Veículos, options)
        .then(res => res.json())
        .then(res => {
            veiculos = res;
            cardDetails();
        }
        )
        .catch(err => console.error(err));

    fetch(uriCard_Operacoes, options)
        .then(res => res.json())
        .then(res => {
            operacoes = res;
            cardDetaisOperacoes();
        }
        )
        .catch(err => console.error(err));


}

var qtd_Veiculos_Livres = 0
var qtd_Veiculos_Manutencao = 0

var qtd_Operacoes_Andamento = 0
var qtd_Veiculos_Terminadas = 0

var soma = 0
function cardDetails() {

    soma += 1

    document.querySelector('.qtd_veiculos').innerHTML = veiculos.length

    veiculos.forEach(v => {

        if (v.disponivel == true) {

            qtd_Veiculos_Livres += 1


        }

        if (v.disponivel == false) {
            qtd_Veiculos_Manutencao += 1

        }



    })

    document.querySelector('.qtd_veiculos_livres').innerHTML = qtd_Veiculos_Livres
    document.querySelector('.qtd_veiculos_manutencao').innerHTML = qtd_Veiculos_Manutencao

}

function cardDetaisOperacoes() {

    document.querySelector('.qtd_operacoes').innerHTML = operacoes.length

    operacoes.forEach(o => {
        if (o.data_retorno == null) {

            qtd_Operacoes_Andamento += 1


        }

        // if(v.disponivel == false) {
        //     qtd_Veiculos_Terminadas += 1

        // } 
    })

    document.querySelector('.qtd_operacoes_andamento').innerHTML = qtd_Operacoes_Andamento

}