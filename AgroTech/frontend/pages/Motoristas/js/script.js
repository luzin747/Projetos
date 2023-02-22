var uriMotorista = 'http://localhost:3000/motorista'
var uriEditar = 'http://localhost:3000/motorista'

var motorista = []

var cardMotorista = document.querySelector('.tickets')


function carregar() {

    const options = { method: 'GET' };

    fetch(uriMotorista, options)
        .then(res => res.json())
        .then(res => {
            motorista = res;
            preencherTabela();
        }
        )
        .catch(err => console.error(err));

}

function preencherTabela() {

    motorista.forEach(m => {

        var novoCardMotorista = cardMotorista.cloneNode(true)

        novoCardMotorista.classList.remove('model')
        novoCardMotorista.querySelector('.id_motorista').innerHTML = m.id_motorista
        novoCardMotorista.querySelector('.cpf').innerHTML = m.cpf
        novoCardMotorista.querySelector('.cnh').innerHTML = m.cnh
        novoCardMotorista.querySelector('.nome').innerHTML = m.nome

        document.querySelector('.contTickets').appendChild(novoCardMotorista)
    })
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

function editar(e) {

    var id = e.parentNode.parentNode.querySelector('.id_motorista').innerHTML

    var mostrarModal = document.querySelector('.m-editar')

    motorista.forEach(m => {

        if (id == m.id_motorista) {

            document.querySelector('.id_editar').innerHTML = m.id_motorista
            document.querySelector('.n_editar').value = m.nome
            document.querySelector('.cpf_editar').value = m.cpf
            document.querySelector('.cnh_tipo').value = m.cnh

        }

    })

    mostrarModal.classList.remove('model')

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

