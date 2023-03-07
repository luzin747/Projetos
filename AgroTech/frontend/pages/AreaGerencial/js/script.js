var uriOperacao = 'http://localhost:3000/operacao'
var uriEditar = 'http://localhost:3000/operacao'

var uriMotoristas = 'http://localhost:3000/motorista'
var uriVeiculos = 'http://localhost:3000/veiculo'

var operacoes = []
var motoristas = []
var veiculos = []

var cardMotorista = document.querySelector('.tickets')


function carregar() {

    const options = { method: 'GET' };

    fetch(uriMotoristas, options)
        .then(res => res.json())
        .then(res => {
            motoristas = res;

        }
        )
        .catch(err => console.error(err));

    fetch(uriVeiculos, options)
        .then(res => res.json())
        .then(res => {
            veiculos = res;

        }
        )
        .catch(err => console.error(err));

    fetch(uriOperacao, options)
        .then(res => res.json())
        .then(res => {
            operacoes = res;
            preencherTabela();
        }
        )
        .catch(err => console.error(err));



}
var somaAndamento = 0
function preencherTabela() {
    var linhaOperacoes = document.querySelector('.operacoes')

    document.querySelector('.qtd-operacoes').innerHTML = operacoes.length

    operacoes.forEach(o => {

        if (o.data_retorno == "") {
            somaAndamento += 1
        }

        var novaLinhaOperacoes = linhaOperacoes.cloneNode(true)

        novaLinhaOperacoes.classList.remove('model')

        novaLinhaOperacoes.querySelector('.id_operacao').innerHTML = o.id_opeacao
        // novaLinhaOperacoes.querySelector('.id_motorista_editar').innerHTML = o.id_motorista

        document.querySelector('.id_m_editar').value = o.id_motorista
        document.querySelector('.id_v_editar').value = o.id_veiculo

        motoristas.forEach(m => {
            if (o.id_motorista == m.id_motorista) {

                novaLinhaOperacoes.querySelector('.motorista').innerHTML = m.nome

            }
        })
        veiculos.forEach(v => {
            if (o.id_veiculo == v.id_veiculo) {
                novaLinhaOperacoes.querySelector('.veiculo').innerHTML = v.modelo


            }
        })
        novaLinhaOperacoes.querySelector('.data_saida').innerHTML = o.data_saida

        if (o.data_retorno == "") {
            novaLinhaOperacoes.querySelector('.data_retorno').innerHTML = "Em Andamento"

        }
        else {
            novaLinhaOperacoes.querySelector('.data_retorno').innerHTML = o.data_retorno
        }
        // novaLinhaOperacoes.querySelector('.descricao').innerHTML = o.descricao

        document.querySelector('.contOperacao').appendChild(novaLinhaOperacoes)

    })

    document.querySelector('.qtd-andamento').innerHTML = somaAndamento



}

function ativar(e) {

    var id = e.parentNode.parentNode.querySelector('.id_motorista').innerHTML

    const options = { method: 'GET' };

    fetch(uriEditar, options)
        .then(res => res.json())
        .then(res => {
            motorista = res;
            editar(e);
        }
        )
        .catch(err => console.error(err));
}

var soma = 0;
function editarCliente(e) {

    var id = e.parentNode.parentNode.querySelector('.id_operacao').innerHTML

    var mostrarModal = document.querySelector('.m-editar')

    soma += 1

    mostrarModal.classList.remove('model')

    motoristas.forEach(m => {

        var optionMotorista = document.createElement('option')
        optionMotorista.value = m.id_motorista
        optionMotorista.innerHTML = m.nome

        document.querySelector('.tipo-Motorista').appendChild(optionMotorista)

    })

    veiculos.forEach(v => {

        if (v.disponivel == true) {

            var optionVeiculo = document.createElement('option')
            optionVeiculo.value = v.id_veiculo
            optionVeiculo.innerHTML = v.modelo

            document.querySelector('.tipo-Veiculo').appendChild(optionVeiculo)
        }

    })

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
            document.querySelector('.descricao_txt_area').innerHTML = o.descricao

            if (o.data_retorno != "" || o.data_retorno != null) {

                document.querySelector('.dr_retorno').value = o.data_retorno
                document.querySelector('.dr_retorno').style.display = "block"
                document.querySelector('.btn_finalizar_operacao').style.display = "none"
                
            }
        }

    })

}

var disponivel = true

function salvar(e) {

    var id_operacao = document.querySelector('.id_editar').innerHTML

    var motorista = document.querySelector('.id_m_editar').value
    var veiculo = document.querySelector('.id_v_editar').value

    var data_saida = document.querySelector('.ds_editar').value
    var data_retorno = document.querySelector('.dr_retorno').value

    var select_status = document.querySelector(".tipo-Motorista")
    let seleMotorista = select_status.options[select_status.selectedIndex].value;

    if (seleMotorista != 'default') {
        motorista = seleMotorista;
    }

    var select_status = document.querySelector(".tipo-Veiculo")
    let seleVeiculo = select_status.options[select_status.selectedIndex].value;

    if (seleVeiculo != 'default') {
        veiculo = seleVeiculo
    }

    let data = {
        "id_opeacao": Number(id_operacao),
        "id_motorista": Number(motorista),
        "id_veiculo": Number(veiculo),
        "data_saida": data_saida,
        "data_retorno": data_retorno,
        "descricao": "descrição teste"
    }

    console.log(data);

    fetch('http://localhost:3000/operacao/' + id_operacao, {
        "method": "PUT",
        "headers": {
            "Content-Type": "application/json"
        },
        "body": JSON.stringify(data)
    })
        .then(resp => resp.status)
        .then(resp => {
            if (resp == 200) {
                alert('Editar com Suesso')

                window.location.reload()
            }

        })
}
function fecharEditarCliente() {
    var mostrarModal = document.querySelector('.m-editar')
    mostrarModal.classList.toggle('model')

    window.location.reload();

}
function finarlizarOperacao(e) {
    var hoje = new Date()
    var dia = String(hoje.getDate()).padStart(2, '0')
    var mes = String(hoje.getMonth() + 1).padStart(2, '0')
    var ano = hoje.getFullYear()


    dataAtual = dia + '/' + mes + '/' + ano;

    document.querySelector('.dr_retorno').value = dataAtual;
    // document.querySelector('.dr-retorno').classList.remove('model')
    document.querySelector('.dr_retorno').style.display = 'block'

    document.querySelector('.btn_finalizar_operacao').classList.add('model')



}

var search_btn = document.querySelector('.btn-filter')
const INPUT_BUSCA = document.querySelector('.search')
const TABELA_CLIENTES = document.querySelector('.contOperacao')

search_btn.addEventListener('click', () => {

    let expressao = INPUT_BUSCA.value

    let linhas = TABELA_CLIENTES.getElementsByTagName('tr')



    for (let posicao in linhas) {
        if (true === isNaN(posicao)) {
            continue
        }

        let conteudoDaLinha = linhas[posicao].innerHTML

        if (true === conteudoDaLinha.includes(expressao)) {
            linhas[posicao].style.display = ''
        } else {
            linhas[posicao].style.display = 'none'

        }

    }

})