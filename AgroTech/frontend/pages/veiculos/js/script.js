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
            novoCardVeiculos.querySelector('.img_situation').src = 'img/icons/cicle_on.png'


        }

        if (v.disponivel == true) {
            novoCardVeiculos.querySelector('.img_situation').src = 'img/icons/cicle_off.png'


        }

        document.querySelector('.contTickets').appendChild(novoCardVeiculos)
    })

    document.querySelector('.qtd_veiculos').innerHTML = veiculos.length
}

var soma = 0

function editarCliente(e) {

    var id = e.parentNode.parentNode.querySelector('.id_veiculos').innerHTML

    var mostrarModal = document.querySelector('.m-editar')

    soma += 1

    mostrarModal.classList.remove('model')


    if (soma == 1) {
        carregarManutencoes(id)
    }

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

            novoCardManutencao.querySelector('.id_manutencao_hidden').innerHTML = m.id_manutencao

            novoCardManutencao.querySelector('.descricao').value = m.descricao
            novoCardManutencao.querySelector('.valor').value = m.valor
            novoCardManutencao.querySelector('.data_entrada').value = m.data_inicio

            if (m.data_fim != '---') {
                novoCardManutencao.querySelector('.data_fim_inp').value = m.data_fim
                novoCardManutencao.querySelector('.btn_finalizar_card').classList.add('model')
                novoCardManutencao.querySelector('.data_fim_inp').classList.remove('model')

            }

            document.querySelector('.cont_manutencao').appendChild(novoCardManutencao)

        }
    })


}

function HabilitarEdicaoManu(e) {

    var id_veiculo = e.parentNode.parentNode.parentNode.parentNode.parentNode.querySelector('.id_veiculo').innerHTML
    var card_descri_manutencao = e.parentNode.parentNode.parentNode.querySelector('.inps_descri')

    manutencao.forEach(m => {

        if (m.id_veiculo == id_veiculo) {

            card_descri_manutencao.classList.remove('model')

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

function salvarEdicaoCard(e) {

    var id_manutencao = e.parentNode.parentNode.querySelector('.id_manutencao_hidden').innerHTML
    var id_veiculo = e.parentNode.parentNode.parentNode.parentNode.parentNode.querySelector('.id_veiculo').innerHTML


    console.log(id_manutencao);
    var descricao_manutencao = e.parentNode.parentNode.querySelector('.descricao').value
    var valor = e.parentNode.parentNode.querySelector('.valor').value
    var data_entrada = e.parentNode.parentNode.querySelector('.data_entrada').value
    var data_saida = e.parentNode.parentNode.querySelector('.data_fim_inp').value

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

    fetch('http://localhost:3000/manutencao/' + id_manutencao, {
        "method": "PUT",
        "headers": {
            "Content-Type": "application/json"
        },
        "body": JSON.stringify(data)
    })
        .then(resp => resp.status)
        .then(resp => {
            if (resp == 200) {

                alert('Atualizado com Sucesso')
                window.location.reload()
            }

        })
}

