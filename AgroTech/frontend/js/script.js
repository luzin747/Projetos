var uriCard_Veículos = 'http://localhost:3000/veiculo'
var uriCard_Operacoes = 'http://localhost:3000/operacao'
var uriCard_Motoristas = 'http://localhost:3000/motorista'
var uriCard_Usuarios = 'http://localhost:3000/usuarios'
var uriCard_Manutencoes = 'http://localhost:3000/manutencao'

var veiculos = []
var operacoes = []
var motoristas = []
var manutencao = []

// var td_operacoes = document.querySelector('.operacoes')
// var td_veiculos = document.querySelector('.veiculos')

function carregar() {

    const options = { method: 'GET' };

    fetch(uriCard_Motoristas, options)
        .then(res => res.json())
        .then(res => {
            motoristas = res;
        }
        )
        .catch(err => console.error(err));


    fetch(uriCard_Manutencoes, options)
        .then(res => res.json())
        .then(res => {
            manutencao = res;
        }
        )
        .catch(err => console.error(err));


    fetch(uriCard_Veículos, options)
        .then(res => res.json())
        .then(res => {
            veiculos = res;
        }
        )
        .catch(err => console.error(err));

    fetch(uriCard_Operacoes, options)
        .then(res => res.json())
        .then(res => {
            operacoes = res;
            preencherTabelas();
        }
        )
        .catch(err => console.error(err));

    fetch(uriCard_Veículos, options)
        .then(res => res.json())
        .then(res => {
            veiculos = res;
            cardDetails();
        }
        )
        .catch(err => console.error(err));

    // fetch(uriCard_Operacoes, options)
    //     .then(res => res.json())
    //     .then(res => {
    //         operacoes = res;
    //         cardDetaisOperacoes();
    //     }
    //     )
    //     .catch(err => console.error(err));

    //     fetch(uriCard_Motoristas, options)
    //     .then(res => res.json())
    //     .then(res => {
    //         motoristas = res;
    //         cardDetailsMotoristas();
    //     }
    //     )
    //     .catch(err => console.error(err));

    //     fetch(uriCard_Motoristas, options)
    //     .then(res => res.json())
    //     .then(res => {
    //         usuarios = res;
    //         cardDetailsUsuarios();
    //     }
    //     )
    //     .catch(err => console.error(err));


}

var qtd_Veiculos_Livres = 0
var qtd_Veiculos_Manutencao = 0

var qtd_Operacoes_Andamento = 0
var qtd_Veiculos_Terminadas = 0

var soma = 0
function preencherTabelas() {

    var linhaOperacoes = document.querySelector('.operacoes')

    operacoes.forEach(o => {

        var novaLinhaOperacoes = linhaOperacoes.cloneNode(true)

        novaLinhaOperacoes.classList.remove('model')

        novaLinhaOperacoes.querySelector('.id_operacao').innerHTML = o.id_opeacao
        motoristas.forEach(m => {
            if (o.id_motorista == m.id_motorista) {
                novaLinhaOperacoes.querySelector('.motorista').innerHTML = m.nome

            }
        })
        veiculos.forEach(v => {
            if(o.id_veiculo == v.id_veiculo) {
                novaLinhaOperacoes.querySelector('.veiculo').innerHTML = v.modelo

            }
        })
        novaLinhaOperacoes.querySelector('.data_saida').innerHTML = o.data_saida
        novaLinhaOperacoes.querySelector('.data_retorno').innerHTML = o.data_retorno

        document.querySelector('.contOperac').appendChild(novaLinhaOperacoes)

    })

    var linhaVeiculos = document.querySelector('.veiculos')

    veiculos.forEach(v => {

        var novaLinhaVeiculos = linhaVeiculos.cloneNode(true)

        novaLinhaVeiculos.classList.remove('model')

        novaLinhaVeiculos.querySelector('.id_veiculo').innerHTML = v.id_veiculo
        novaLinhaVeiculos.querySelector('.placa').innerHTML = v.placa
        novaLinhaVeiculos.querySelector('.modelo').innerHTML = v.modelo
        novaLinhaVeiculos.querySelector('.marca').innerHTML = v.marca
        if (v.disponivel == true) {
            novaLinhaVeiculos.querySelector('.img_situation').src = 'img/icons/cicle_on.png'

        }
        else {
            novaLinhaVeiculos.querySelector('.img_situation').src = 'img/icons/cicle_off.png'

        }

        // novaLinhaVeiculos.querySelector('.situacao').innerHTML = v.disponivel

        document.querySelector('.contVeiculos').appendChild(novaLinhaVeiculos)
    })


}

function cardDetails() {

    soma += 1
    var valor_total = 0

    // document.querySelector('.qtd_veiculos').innerHTML = veiculos.length

    // console.log(veiculos);

    // veiculos.forEach(v => {


    //     if (v.disponivel == true) {

    //         qtd_Veiculos_Livres += 1


    //     }

    //     if (v.disponivel == false) {
    //         qtd_Veiculos_Manutencao += 1

    //     }

    //     var novoCardVeiculos = td_veiculos.cloneNode(true)

    //     novoCardVeiculos.classList.remove('model')

    //     novoCardVeiculos.querySelector('.placa').innerHTML = v.placa
    //     novoCardVeiculos.querySelector('.modelo').innerHTML = v.modelo
    //     novoCardVeiculos.querySelector('.marca').innerHTML = v.marca
    //     novoCardVeiculos.querySelector('.tipo').innerHTML = v.tipo
    //     novoCardVeiculos.querySelector('.disponivel').innerHTML = v.disponivel

    //     document.querySelector('.contVeiculos').appendChild(novoCardVeiculos)

    // })
    manutencao.forEach(m => { valor_total += m.valor })

    document.querySelector('.qtd_veiculo').innerHTML = veiculos.length
    document.querySelector('.qtd_manutencao').innerHTML = manutencao.length
    document.querySelector('.total_manutencao').innerHTML = 'R$' + valor_total + ',00'
    document.querySelector('.qtd_motoristas').innerHTML = motoristas.length

    // document.querySelector('.qtd_veiculos_livres').innerHTML = qtd_Veiculos_Livres
    // document.querySelector('.qtd_veiculos_manutencao').innerHTML = qtd_Veiculos_Manutencao

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


function editarCliente(e) {

    var id = e.parentNode.parentNode.querySelector('.id_operacao').innerHTML

    var mostrarModal = document.querySelector('.m-editar')

    soma += 1

    mostrarModal.classList.remove('model')

    operacoes.forEach(o => {
        if (id == o.id_opeacao) {
            console.log('indo');

            document.querySelector('.id_editar').innerHTML = o.id_opeacao
            motoristas.forEach(m => {
                if (m.id_motorista == o.id_motorista) {
                    document.querySelector('.m_editar').value = m.nome

                }

            })

            veiculos.forEach(v => {
                if (v.id_veiculo == o.id_veiculo) {

                    document.querySelector('.v_editar').value = v.modelo
                }
            })
            document.querySelector('.ds_editar').value = o.data_saida
            document.querySelector('.dr_tipo').value = o.data_retorno
            document.querySelector('.descricao_txt_area').innerHTML = o.descricao
        }

    })

}

function fecharEditarCliente() {
    var mostrarModal = document.querySelector('.m-editar')
    mostrarModal.classList.toggle('model')

    window.location.reload();

}
