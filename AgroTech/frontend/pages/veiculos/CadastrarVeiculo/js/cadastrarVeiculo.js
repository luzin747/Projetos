var uriVeiculos = 'http://localhost:3000/veiculo'
var uriCard_Usuarios = 'http://localhost:3000/usuarios'

var usuarios = []
var veiculo = []

var erro = false

function carregar() {

    const options = { method: 'GET' };

    fetch(uriVeiculos, options)
        .then(res => res.json())
        .then(res => {
            veiculo = res;
        }
        )
        .catch(err => console.error(err));

    fetch(uriCard_Usuarios, options)
        .then(res => res.json())
        .then(res => {
            usuarios = res;
            VerificarAcesso()
        }
        )
        .catch(err => console.error(err));

}

function VerificarAcesso() {

    var userinfo = JSON.parse(localStorage.getItem("info"));

    if (userinfo == null) {
        window.location.href = '../../login/login.html '
    }
    else {

        usuarios.forEach(u => {
            if (u.id == userinfo.id_user) {

                if (u.tipo == "usuario") {

                    document.querySelector('.link_painel_controle').style.display = "none"
                    document.querySelector('.link_area_gerencial').style.display = "none"
                    document.querySelector('.link_motoristas').style.display = "none"
                    document.querySelector('.link_veiculos').style.display = "none"
                }
            }
        })

    }
}

function logout() {

    window.localStorage.removeItem("info")
    window.location.href = "../../login/login.html"
}

function cadastrarVeiculos() {

    var erro = false;
    var erroPlaca = false;

    document.querySelector('.erro_tipo_vazio').classList.add('model')

    document.querySelector('.erro_modelo_vazio').classList.add('model')
    document.querySelector('.erro_marca_vazio').classList.add('model')

    document.querySelector('.erro_placa_vazio').classList.add('model')
    document.querySelector('.erro_placa_existe').classList.add('model')
    document.querySelector('.erro_placa_invalida').classList.add('model')


    var modelo = document.querySelector('.modelo').value
    var marca = document.querySelector('.marca').value
    var placa = document.querySelector('.placa-veiculo').value

    var select_tipo_veiculo = document.querySelector(".tipo-Veiculo_tipo")
    let seleTipoVeiculo = select_tipo_veiculo.options[select_tipo_veiculo.selectedIndex].value;
    if (seleTipoVeiculo == 'default') {
        erro = true;
        document.querySelector('.erro_tipo_vazio').classList.remove('model')

    }


    if (modelo.trim() == "") {
        document.querySelector('.erro_modelo_vazio').classList.remove('model')
        erro = true;
    }

    if (marca.trim() == "") {
        document.querySelector('.erro_marca_vazio').classList.remove('model')
        erro = true;
    }

    if (placa.trim() == "") {
        document.querySelector('.erro_placa_vazio').classList.remove('model')
        erro = true;
        erroPlaca = true;
    }

    //Validando a Placa

    if (erroPlaca == false) {

        erroPlaca = true

        var resposta = "placa inválida";
        const regexPlaca = /^[a-zA-Z]{3}[0-9]{4}$/;
        const regexPlacaMercosulCarro = /^[a-zA-Z]{3}[0-9]{1}[a-zA-Z]{1}[0-9]{2}$/;
        const regexPlacaMercosulMoto = /^[a-zA-Z]{3}[0-9]{2}[a-zA-Z]{1}[0-9]{1}$/;


        if (regexPlaca.test(placa.trim())) {
            resposta = "Placa válida no formato atual";

            erroPlaca = false;
        }
        if (regexPlacaMercosulCarro.test(placa.trim())) {
            resposta = "Placa válida (padrão Mercosul - carro)";
            erroPlaca = false;

        }
        if (regexPlacaMercosulMoto.test(placa.trim())) {
            resposta = "Placa válida (padrão Mercosul - moto)";
            erroPlaca = false;

        }

        if (erroPlaca == true) {
            document.querySelector('.erro_placa_invalida').classList.remove('model')
            erro = true;
        }

    }

    console.log(erroPlaca);
    if (erroPlaca == false) {

        veiculo.forEach(v => {

            if (v.placa == placa) {
                document.querySelector('.erro_placa_existe').classList.remove('model')

                erroPlaca = true;

                erro = true;
            }


        })

    }

   





    // var valor_hora = document.querySelector('.valor-Hora').value

    if (erro == false) {

        let data = {
            "modelo": modelo.trim(),
            "marca": marca.trim(),
            "placa": placa.trim(),
            "tipo": seleTipoVeiculo,
            "disponivel": "Ativo",
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