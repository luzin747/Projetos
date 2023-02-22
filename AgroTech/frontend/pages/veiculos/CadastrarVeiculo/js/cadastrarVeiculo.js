var uriVeiculos = 'http://localhost:3000/veiculo'

var veiculo = []

var erro = false

function cadastrarVeiculos() {

    var modelo = document.querySelector('.modelo').value
    var marca = document.querySelector('.marca').value
    var placa = document.querySelector('.placa-veiculo').value

    var select_status = document.querySelector(".tipo-Veiculo")
    let seleStatus = select_status.options[select_status.selectedIndex].value;
    if (seleStatus == 'Véiculo-Pequeno') { var tipo = 'Veículo Pequeno'; }
    if (seleStatus == 'Véiculo-Médio') { var tipo = 'Veículo Médio'; }
    if (seleStatus == 'Véiculo-Grande') { var tipo = 'Veículo Grande'; }

    // var valor_hora = document.querySelector('.valor-Hora').value

    if (modelo == "" || marca == "" || placa == "") {
        erro = true;
    }

    if (erro == false) {


        let data = {
            "modelo": modelo,
            "marca": marca,
            "placa": placa,
            "tipo": tipo,
            "disponivel": true,
        };

        fetch(uriVeiculos, {
            "method": "POST",
            "headers": {
                "Content-Type": "application/json"
            },
            "body": JSON.stringify(data)
        })
            .then(resp => resp.status)
            .then(resp => {
                if (resp == 200) {

                    alert('Veículo Cadastrado')
                    window.location.href = '../veiculos.html'
                }
                else {
                    var modalErro = document.querySelector('.modal-errado-vagas')

                    modalErro.classList.remove('model')


                }
            })
    }

}