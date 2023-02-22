var uriMotorista = 'http://localhost:3000/motorista'

var erro = false

function cadastrarVeiculos() {

    var nome = document.querySelector('.nome').value
    var cpf = document.querySelector('.cpf').value
    var cnh = document.querySelector('.cnh').value

    // var valor_hora = document.querySelector('.valor-Hora').value

    if(cpf.length < 11 || cpf.length > 11){
        erro = true;
    }

    if (nome == "" || cpf == "" || cnh == "") {
        erro = true;
    }

    if (erro == false) {


        let data = {
            "nome": nome,
            "cpf": cpf,
            "cnh": cnh,
        };

        fetch(uriMotorista, {
            "method": "POST",
            "headers": {
                "Content-Type": "application/json"
            },
            "body": JSON.stringify(data)
        })
            .then(resp => resp.status)
            .then(resp => {
                if (resp == 200) {

                    alert('Motorista Cadastrado')
                    window.location.href = '../motoristas.html'
                }
                else {
                    var modalErro = document.querySelector('.modal-errado-vagas')

                    modalErro.classList.remove('model')


                }
            })
    }

}