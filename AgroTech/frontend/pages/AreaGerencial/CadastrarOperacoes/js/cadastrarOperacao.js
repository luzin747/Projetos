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

        operacao.forEach(o => {
            if (o.id_motorista == m.id_motorista && o.data_retorno != "") {
                var optionMotorista = document.createElement('option')
                optionMotorista.value = m.id_motorista
                optionMotorista.innerHTML = m.nome
                document.querySelector('.tipo-Motorista').appendChild(optionMotorista)

            }
        })

    })

    veiculo.forEach(v => {

        if (v.disponivel == true) {

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


    if (erro == false) {

        let data = {
            "id_motorista": Number(seleMotorista),
            "id_veiculo": Number(seleVeiculo),
            "data_saida": data_saida,
            "data_retorno": "",
            "descricao": descricao,
        };

        console.log(data);

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

                    alert('Veículo Cadastrado')
                    window.location.href = '../areaGerencial.html'
                }
                else {
                    // var modalErro = document.querySelector('.modal-errado-vagas')

                    // modalErro.classList.remove('model')


                }
            })
    }

}