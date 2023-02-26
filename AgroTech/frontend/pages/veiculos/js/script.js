var uriVeiculos = 'http://localhost:3000/veiculo'
var uriEditar = 'http://localhost:3000/veiculo'
var uriManutencao = 'http://localhost:3000/manutencao'

var veiculos = []
var manutencao = []

var cardVeiculos = document.querySelector('.tickets')
var cardManutencoes = document.querySelector('.manutencao')


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

    fetch(uriManutencao, options)
        .then(res => res.json())
        .then(res => {
            manutencao = res;
            manutencao();
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

    carregarManutencoes(id)

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

        manutencao.forEach(m => {

            if (v.id_veiculo == m.id_veiculo) {

                var data_saida = document.querySelector('.h_saida')
                var btn_manutencao = document.querySelector('.btn_finalizar_manutencao')

                data_saida.classList.remove('model')
                btn_manutencao.classList.add('model')

                data_saida.style.textAlign = "center"

                document.querySelector('.descricao').value = m.descricao
                document.querySelector('.valor').value = m.valor
                document.querySelector('.h_entrada').value = m.data_inicio
                document.querySelector('.h_saida').value = m.data_inicio


            }
        })

    })




    mostrarModal.classList.remove('model')

}

// function selecionarDisponibilidade() {

//     var select_status = document.querySelector(".select_status")
//     let seleStatus = select_status.options[select_status.selectedIndex].value;
//     if (seleStatus == 'sim') { var disponivel = true; }
//     if (seleStatus == 'nao') { var disponivel = false; }


//     var inpDataEntrada = document.querySelector('.data_entrada')

//     var hoje = new Date()
//     var dia = String(hoje.getDate()).padStart(2, '0')
//     var mes = String(hoje.getMonth() + 1).padStart(2, '0')
//     var ano = hoje.getFullYear()

//     var hora = hoje.getHours()
//     var minutos = hoje.getMinutes()
//     var segundos = hoje.getSeconds()
//     // var segundos = hoje.getSeconds()

//     dataAtual = dia + '/' + mes + '/' + ano;

//     console.log(seleStatus);

//     if (seleStatus == 'nao') {

//         var menutencao_descri = document.querySelector('.inps_descri')
//         var menutencao_btns = document.querySelector('.cont_button_c_manutencao')
//         var btn_salvar = document.querySelector('.cont_button')

//         document.querySelector('.h_entrada').value = dataAtual
//         document.querySelector('.h_entrada').style.textAlign = "center"


//         btn_salvar.classList.add('model')
//         menutencao_descri.classList.remove('model')
//         menutencao_btns.classList.remove('model')


//     }
//     else {
//         var menutencao_descri = document.querySelector('.inps_descri')
//         var menutencao_btns = document.querySelector('.cont_button_c_manutencao')
//         var btn_salvar = document.querySelector('.cont_button')

//         menutencao_descri.classList.add('model')
//         menutencao_btns.classList.add('model')
//         btn_salvar.classList.remove('model')


//     }

// }

var disponivel = true

var soma = 0

function MudarSection(e) {

    var select = e.querySelector('.title').innerHTML
    var select_id = e.parentNode.parentNode.querySelector('.id_veiculo').innerHTML

    if (select == 'Manutenções') {

        document.querySelector('.information').classList.add('model')
        document.querySelector('.cont_manutencao').classList.remove('model')




    }

    if (select == 'Informações') {
        document.querySelector('.information').classList.remove('model')
        document.querySelector('.cont_manutencao').classList.add('model')

    }

}

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

function salvarCManutenção(e) {

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

                funcaoCadManutencao()
                // window.location.reload()
            }

        })
}

function funcaoCadManutencao(e) {

    var id_veiculo = e.parentNode.parentNode.parentNode.parentNode.querySelector('.id_veiculo').innerHTML

    var descricao_manutencao = document.querySelector('.descricao_man').value
    var valor = document.querySelector('.valor_man').value
    var data_entrada = document.querySelector('.h_entrada_inp').value
    var data_saida = document.querySelector('.h_saida_inp').value

    if (data_saida == "") {
        var data_finalizada = "---"
    }

    else {
        data_finalizada = data_saida
    }

    let data = {
        "id_veiculo": Number(id_veiculo),
        "data_inicio": data_entrada,
        "data_fim": data_finalizada,
        "valor": Number(valor),
        "descricao": descricao_manutencao,
    }



    console.log(data);

    fetch('http://localhost:3000/manutencao', {
        "method": "POST",
        "headers": {
            "Content-Type": "application/json"
        },
        "body": JSON.stringify(data)
    })
        .then(resp => resp.status)
        .then(resp => {
            if (resp == 200) {

                alert('inserido com Sucesso')
                window.location.reload()
            }

        })
}

function finalizarManutencao() {

    console.log('asdada');
    var hoje = new Date()
    var dia = String(hoje.getDate()).padStart(2, '0')
    var mes = String(hoje.getMonth() + 1).padStart(2, '0')
    var ano = hoje.getFullYear()

    var hora = hoje.getHours()
    var minutos = hoje.getMinutes()
    var segundos = hoje.getSeconds()
    // var segundos = hoje.getSeconds()

    dataAtual = dia + '/' + mes + '/' + ano;

    var data_saida = document.querySelector('.h_saida_inp')
    var btn_manutencao = document.querySelector('.btn_finalizar_manutencao_inp')

    data_saida.classList.remove('model')
    btn_manutencao.classList.add('model')

    data_saida.value = dataAtual
    data_saida.style.textAlign = "center"

}

function fecharEditarCliente() {
    var mostrarModal = document.querySelector('.m-editar')
    mostrarModal.classList.toggle('model')

    window.location.reload();

}



function carregarManutencoes(e) {

    var id = e;

    console.log(manutencao);


    manutencao.forEach(m => {


        if (m.id_veiculo == id) {

            var novoCardManutencao = cardManutencoes.cloneNode(true)

            novoCardManutencao.classList.remove('model')

            novoCardManutencao.querySelector('.id_manu').innerHTML = m.id_manutencao
            novoCardManutencao.querySelector('.date_manu_entrada').innerHTML = m.data_inicio


            novoCardManutencao.querySelector('.descricao').value = m.descricao
            novoCardManutencao.querySelector('.valor').value = m.valor
            novoCardManutencao.querySelector('.h_entrada').value = m.data_inicio

            document.querySelector('.cont_manutencao').appendChild(novoCardManutencao)

        }
    })


}

function HabilitarEdicaoManu(e) {

    var id_veiculo = e.parentNode.parentNode.parentNode.parentNode.parentNode.querySelector('.id_veiculo').innerHTML
    var card_descri_manutencao = e.parentNode.parentNode.parentNode.querySelector('.inps_descri')

    console.log(card_descri_manutencao)

    manutencao.forEach(m => {

        if (m.id_veiculo == id_veiculo) {

            card_descri_manutencao.classList.remove('model')


            document.querySelector('.descricao').innerHTML = m.descricao
        }
    })

}

function mostrarModalManutencao() {

    var hoje = new Date()
    var dia = String(hoje.getDate()).padStart(2, '0')
    var mes = String(hoje.getMonth() + 1).padStart(2, '0')
    var ano = hoje.getFullYear()

    dataAtual = dia + '/' + mes + '/' + ano;


    var menutencao_descri = document.querySelector('.inps_descri_section_create_manu')
    var menutencao_btns = document.querySelector('.cont_button_c_manutencao')
    var btn_salvar = document.querySelector('.cont_button')

    menutencao_descri.classList.remove('model')
    menutencao_btns.classList.remove('model')


    document.querySelector('.h_entrada_inp').value = dataAtual
}

