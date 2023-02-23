var uriVeiculos = 'http://localhost:3000/veiculo'
var uriEditar = 'http://localhost:3000/veiculo'

var veiculos = []

var cardVeiculos = document.querySelector('.tickets')


function carregar() {

    const options = { method: 'GET' };

    fetch(uriVeiculos, options)
        .then(res => res.json())
        .then(res => {
            veiculos = res;
            preencherTabela();
        }
        )
        .catch(err => console.error(err));

}

function preencherTabela() {

    console.log(veiculos);

    veiculos.forEach(v => {

        var novoCardVeiculos = cardVeiculos.cloneNode(true)

        novoCardVeiculos.classList.remove('model')

        novoCardVeiculos.querySelector('.id_veiculos').innerHTML = v.id_veiculo
        novoCardVeiculos.querySelector('.placas').innerHTML = v.placa
        novoCardVeiculos.querySelector('.modelo').innerHTML = v.modelo
        novoCardVeiculos.querySelector('.marca').innerHTML = v.marca
        novoCardVeiculos.querySelector('.tipo').innerHTML = v.tipo

        if (v.disponivel == false) {
            novoCardVeiculos.querySelector('.disponivel').innerHTML = 'Não'

        }

        if (v.disponivel == true) {
            novoCardVeiculos.querySelector('.disponivel').innerHTML = 'Sim'

        }

        document.querySelector('.contTickets').appendChild(novoCardVeiculos)
    })
}

function editarCliente(e) {

    var mostrarModal = document.querySelector('.m-editar')

    mostrarModal.classList.toggle('model')
    document.querySelector('body').style.background = '#5e5e5e27';


    //PREENCHER OS INPUTS COM AS INFORMAÇÕES DO CLIENTE DESEJADO

    var id = e.parentNode.parentNode.querySelector('.cpf-clientes').innerHTML


    clientes.forEach(c => {
        if (id == c.cpf_cli) {


            console.log(c.cpf_cli)

            var id_vaga = document.querySelector('.id_vaga').innerHTML = c.number_vaga

            document.querySelector('.ticket-id').value = c.ticket_id
            document.querySelector('.cpf').value = c.cpf_cli
            document.querySelector('.placa').value = c.placa_car
            document.querySelector('.data_entrada').value = c.data_est
            document.querySelector('.h_entrada').value = c.h_entrada

            var categoria_veiculo = c.categoria_carro

            if (categoria_veiculo == 'Pequeno' || categoria_veiculo == 'Veículo Pequeno' || categoria_veiculo == 'Ve?culo Pequeno') {
                var categoria_veiculo = document.querySelector('.categoria_veiculo').value = 'Pequeno'
            }

            if (categoria_veiculo == 'Médio' || categoria_veiculo == 'Veículo Médio' || categoria_veiculo == 'Ve?culo M?dio') {
                var categoria_veiculo = document.querySelector('.categoria_veiculo').value = 'Médio'

            }
            if (categoria_veiculo == 'Grande' || categoria_veiculo == 'Veículo Pequeno' || categoria_veiculo == 'Ve?culo Grande') {
                var categoria_veiculo = document.querySelector('.categoria_veiculo').value = 'Grande'
            }
        }

    })

}

function ativar(e) {

    var id = e.parentNode.parentNode.querySelector('.id_veiculos').innerHTML

    const options = { method: 'GET' };

    fetch(uriVeiculos, options)
        .then(res => res.json())
        .then(res => {
            veiculos = res;
            editarCliente(e);
        }
        )
        .catch(err => console.error(err));
}

function editarCliente(e) {

    var id = e.parentNode.parentNode.querySelector('.id_veiculos').innerHTML

    var mostrarModal = document.querySelector('.m-editar')

    veiculos.forEach(v => {

        if (id == v.id_veiculo) {


            document.querySelector('.id_veiculo').innerHTML = v.id_veiculo
            document.querySelector('.placa_veiculo').value = v.placa
            document.querySelector('.modelo_veiculo').value = v.modelo
            document.querySelector('.marca_veiculo').value = v.marca
            document.querySelector('.tipo_veiculo').value = v.tipo

            if (v.disponivel == false) {
                document.querySelector('.disponibilidade').value = 'Não'

            }

            if (v.disponivel == true) {
                document.querySelector('.disponibilidade').value = 'Sim'

            }

        }

    })

    mostrarModal.classList.remove('model')


    // veiculos.forEach(v => {
    //   if(id == c.cpf_cli) {
    //     console.log(c.cpf_cli)

    //         var id_vaga = document.querySelector('.id_vaga').innerHTML  = c.number_vaga

    //         document.querySelector('.ticket-id').value = c.ticket_id
    //         document.querySelector('.cpf').value = c.cpf_cli
    //         document.querySelector('.placa').value = c.placa_car
    //         document.querySelector('.data_entrada').value = c.data_est
    //         document.querySelector('.h_entrada').value = c.h_entrada

    //         var categoria_veiculo = c.categoria_carro

    //         if(categoria_veiculo == 'Pequeno' || categoria_veiculo == 'Veículo Pequeno' || categoria_veiculo == 'Ve?culo Pequeno') {
    //           var categoria_veiculo = document.querySelector('.categoria_veiculo').value = 'Pequeno'
    //         }

    //         if(categoria_veiculo == 'Médio' || categoria_veiculo == 'Veículo Médio' || categoria_veiculo == 'Ve?culo M?dio') {
    //           var categoria_veiculo = document.querySelector('.categoria_veiculo').value = 'Médio'

    //         }
    //         if(categoria_veiculo == 'Grande'|| categoria_veiculo == 'Veículo Pequeno' || categoria_veiculo == 'Ve?culo Grande') {
    //           var categoria_veiculo = document.querySelector('.categoria_veiculo').value = 'Grande'           
    //         }
    //   }

    // })

}

function selecionarDisponibilidade() {

    var select_status = document.querySelector(".select_status")
    let seleStatus = select_status.options[select_status.selectedIndex].value;
    if (seleStatus == 'sim') { var disponivel = true; }
    if (seleStatus == 'nao') { var disponivel = false; }

    console.log(seleStatus);

    if(seleStatus == 'nao') {

        var menutencao_descri = document.querySelector('.inps_descri')

        menutencao_descri.classList.remove('model')
    }
    else {
        var menutencao_descri = document.querySelector('.inps_descri')

        menutencao_descri.classList.add('model')
    }
    
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

