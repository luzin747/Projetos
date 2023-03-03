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

        if(o.data_retorno == "") {
            somaAndamento += 1
        }

        var novaLinhaOperacoes = linhaOperacoes.cloneNode(true)

        novaLinhaOperacoes.classList.remove('model')

        novaLinhaOperacoes.querySelector('.id_operacao').innerHTML = o.id_opeacao
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

        if(o.data_retorno == "") {
            novaLinhaOperacoes.querySelector('.data_retorno').innerHTML = "Em Andamento"

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

    // veiculos.forEach(v => {
    //     if (id == v.id_veiculo) {

    //         document.querySelector('.id_veiculo').innerHTML = v.id_veiculo
    //         document.querySelector('.placa_veiculo').value = v.placa
    //         document.querySelector('.modelo_veiculo').value = v.modelo
    //         document.querySelector('.marca_veiculo').value = v.marca
    //         document.querySelector('.tipo_veiculo').value = v.tipo

    //         if (v.disponivel == false) {
    //             document.querySelector('.disponibilidade').value = 'Não'

    //         }

    //         if (v.disponivel == true) {
    //             document.querySelector('.disponibilidade').value = 'Sim'

    //         }

    //     }

    //     manutencao.forEach(m => {

    //         if (v.id_veiculo == m.id_veiculo) {

    //             var data_saida = document.querySelector('.h_saida')
    //             var btn_manutencao = document.querySelector('.btn_finalizar_manutencao')

    //             data_saida.classList.remove('model')
    //             btn_manutencao.classList.add('model')

    //             data_saida.style.textAlign = "center"

    //             document.querySelector('.descricao').value = m.descricao
    //             document.querySelector('.valor').value = m.valor
    //             document.querySelector('.h_entrada').value = m.data_inicio
    //             document.querySelector('.h_saida').value = m.data_inicio


    //         }
    //     })

    // })

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

var disponivel = true

function salvar(e) {

    var select_status = document.querySelector(".select_status")
    let seleStatus = select_status.options[select_status.selectedIndex].value;
    if (seleStatus == 'sim') { var disponivel = true; }
    if (seleStatus == 'nao') { var disponivel = false; }

    var id_veiculo = document.querySelector('.id_editar').innerHTML
    var placa = document.querySelector('.pv_editar').value
    var modelo = document.querySelector('.mv_editar').value
    var marca = document.querySelector('.m_editar').value
    var tipo = document.querySelector('.m_tipo').value

    let data = {
        "placa": placa,
        "modelo": modelo,
        "marca": marca,
        "tipo": tipo,
        "disponivel": disponivel,
    }

    console.log(data);

    fetch('http://localhost:3000/veiculos/' + id_veiculo, {
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