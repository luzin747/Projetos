var uriOperacao = 'http://localhost:3000/operacao'
var uriMotorista = 'http://localhost:3000/motorista'
var uriVeiculo = 'http://localhost:3000/veiculo'

var operacao = []
var motorista = []
var veiculo = []



var hoje = new Date()
var dia = String(hoje.getDate()).padStart(2, '0')
var mes = String(hoje.getMonth() + 1).padStart(2, '0')
var ano = hoje.getFullYear()


dataAtual = dia + '/' + mes + '/' + ano;

document.querySelector('.data_saida').value = dataAtual

var userinfo = JSON.parse(localStorage.getItem("info"));

document.querySelector('.name_user').innerHTML = userinfo.nome

function carregar() {
    const options = { method: 'GET' };

    fetch(uriOperacao, options)
        .then(res => res.json())
        .then(res => {
            operacao = res;
        }
        )
        .catch(err => console.error(err));

    fetch(uriMotorista, options)
        .then(res => res.json())
        .then(res => {
            motorista = res;
        }
        )
        .catch(err => console.error(err));

    fetch(uriVeiculo, options)
        .then(res => res.json())
        .then(res => {
            veiculo = res;
            preencherSelects();
        }
        )
        .catch(err => console.error(err));



}


function preencherSelects() {


    motorista.forEach(m => {


        if (m.disponivel == "Ativo") {
            var optionMotorista = document.createElement('option')
            optionMotorista.value = m.id_motorista
            optionMotorista.innerHTML = m.nome
            document.querySelector('.tipo-Motorista').appendChild(optionMotorista)

        }

    })

    veiculo.forEach(v => {

        if (v.disponivel == "Ativo") {

            var optionVeiculo = document.createElement('option')
            optionVeiculo.value = v.id_veiculo
            optionVeiculo.innerHTML = v.modelo

            document.querySelector('.tipo-Veiculo').appendChild(optionVeiculo)
        }

    })




}


function cadastrarOperacoes() {

    var erro = false

    document.querySelector('.erro_descricao_vazia').classList.add('model')
    document.querySelector('.erro_veiculo_nao_selecionado').classList.add('model')
    document.querySelector('.erro_motorista_nao_selecionado').classList.add('model')


    var data_saida = document.querySelector('.data_saida').value
    var descricao = document.querySelector('.descricao').value

    var select_status = document.querySelector(".tipo-Motorista")
    let seleMotorista = select_status.options[select_status.selectedIndex].value;
    if (seleMotorista == 'default') { var erroMotorista = true; }

    var select_status = document.querySelector(".tipo-Veiculo")
    let seleVeiculo = select_status.options[select_status.selectedIndex].value;
    if (seleVeiculo == 'default_veiculo') { var erroVeiculo = true; }

    // var valor_hora = document.querySelector('.valor-Hora').value

    var erro = false;


    if (descricao.trim() == "" || descricao.trim() == " ") {
        document.querySelector('.erro_descricao_vazia').classList.remove('model')
        erro = true
    }

    if (erroVeiculo == true) {
        document.querySelector('.erro_veiculo_nao_selecionado').classList.remove('model')
        erro = true
    }
    if (erroMotorista == true) {
        document.querySelector('.erro_motorista_nao_selecionado').classList.remove('model')
        erro = true
    }

    const [day, month, year] = data_saida.split('/')

    var data_final = year + '-' + month + '-' + day

    var data_formatada_entrada = data_final


    if (erro == false) {

        let data = {
            "id_motorista": Number(seleMotorista),
            "id_veiculo": Number(seleVeiculo),
            "data_saida": data_formatada_entrada,
            "data_retorno": "",
            "descricao": descricao,
            "status": true
        };


        fetch('http://localhost:3000/operacao', {
            "method": "POST",
            "headers": {
                "Content-Type": "application/json"
            },
            "body": JSON.stringify(data)
        })
            .then(resp => resp.status)
            .then(resp => {

                console.log(resp);
                if (resp == 200) {

                    alert('Operação Cadastrada')
                    trocarStatusMotorista(seleMotorista)
                    trocarStatusVeiculo(seleVeiculo)
                    window.location.href = '../areaGerencial.html'
                }
                else {
                    // var modalErro = document.querySelector('.modal-errado-vagas')

                    // modalErro.classList.remove('model')


                }
            })
    }



}

function trocarStatusMotorista(id) {

    var nome
    var cpf
    var cnh

    motorista.forEach(m => {


        if (m.id_motorista == id) {

            nome = m.nome
            cpf = m.cpf
            cnh = m.cnh
        }
    })

    let data = {
        "nome": nome,
        "cpf": cpf,
        "cnh": cnh,
        "disponivel": "Em Operação"
    }

    console.log(data);

    fetch('http://localhost:3000/motorista/' + id, {
        "method": "PUT",
        "headers": {
            "Content-Type": "application/json"
        },
        "body": JSON.stringify(data)
    })
        .then(resp => resp.status)
        .then(resp => {

        })



}

function trocarStatusVeiculo(id_veiculo) {


    console.log(`asdadadada`);

    var placa
    var modelo
    var marca
    var tipo

    veiculo.forEach(v => {


        if (v.id_veiculo == id_veiculo) {

            placa = v.placa
            modelo = v.placa
            marca = v.marca
            tipo = v.tipo
        }
    })

    let data = {
        "placa": placa,
        "modelo": modelo,
        "marca": marca,
        "tipo": tipo,
        "disponivel": "Em Operação"
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

        })



}