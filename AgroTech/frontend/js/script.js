var uriCard_Veículos = 'http://localhost:3000/veiculo'
var uriCard_Operacoes = 'http://localhost:3000/operacao'
var uriCard_Motoristas = 'http://localhost:3000/motorista'
var uriCard_Motoristas = 'http://localhost:3000/usuarios'

var veiculos = []
var operacoes = []
var motoristas = []

var td_operacoes = document.querySelector('.operacoes')
var td_veiculos = document.querySelector('.veiculos')

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

        fetch(uriCard_Motoristas, options)
        .then(res => res.json())
        .then(res => {
            motoristas = res;
            cardDetailsMotoristas();
        }
        )
        .catch(err => console.error(err));

        fetch(uriCard_Motoristas, options)
        .then(res => res.json())
        .then(res => {
            usuarios = res;
            cardDetailsUsuarios();
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

    console.log(veiculos);


    veiculos.forEach(v => {


        if (v.disponivel == true) {

            qtd_Veiculos_Livres += 1


        }

        if (v.disponivel == false) {
            qtd_Veiculos_Manutencao += 1

        }

        var novoCardVeiculos = td_veiculos.cloneNode(true)

        novoCardVeiculos.classList.remove('model')

        novoCardVeiculos.querySelector('.placa').innerHTML = v.placa
        novoCardVeiculos.querySelector('.modelo').innerHTML = v.modelo
        novoCardVeiculos.querySelector('.marca').innerHTML = v.marca
        novoCardVeiculos.querySelector('.tipo').innerHTML = v.tipo
        novoCardVeiculos.querySelector('.disponivel').innerHTML = v.disponivel
        
        document.querySelector('.contVeiculos').appendChild(novoCardVeiculos)

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
        var novoCardOperacoes = td_operacoes.cloneNode(true)

        novoCardOperacoes.classList.remove('model')

        novoCardOperacoes.querySelector('.id_operacao').innerHTML = o.id_operacao
        novoCardOperacoes.querySelector('.motorista').innerHTML = o.id_motorista
        novoCardOperacoes.querySelector('.data_saida').innerHTML = o.data_saida
        novoCardOperacoes.querySelector('.data_retorno').innerHTML = o.data_retorno
        novoCardOperacoes.querySelector('.descricao').innerHTML = o.descricao
        
        document.querySelector('.contOperacoes').appendChild(novoCardOperacoes)
    })

    document.querySelector('.qtd_operacoes_andamento').innerHTML = qtd_Operacoes_Andamento

}

function cardDetailsMotoristas() {
    document.querySelector('.qtd_motoristas').innerHTML = motoristas.length

    motoristas.forEach(o => {
        
    })

    document.querySelector('.qtd_operacoes_andamento').innerHTML = qtd_Operacoes_Andamento
}

function cardDetailsUsuarios() {
    document.querySelector('.qtd_usuarios').innerHTML = usuarios.length

    
}

var tabela_veiculos = document.querySelector('.veiculos_table')
var tabela_operacoes = document.querySelector('.opeacoes_table')

function filtroRelatorios() {

    var select = document.querySelector('.tipo_tabela')

    let tipo = select.options[select.selectedIndex].value;

    if (tipo == 'r_veiculos') {
        tabela_veiculos.classList.remove('model')
        tabela_operacoes.classList.add('model')


    } else if (tipo == 'r_operacoes') {
        tabela_veiculos.classList.add('model')
        tabela_operacoes.classList.remove('model')


    } else {
        var valorTotal = 'R$ 20,00'

    }
}