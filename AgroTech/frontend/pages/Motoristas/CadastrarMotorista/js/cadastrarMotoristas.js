var uriMotorista = 'http://localhost:3000/motorista'

var motorista = []

function carregar() {
    const options = { method: 'GET' };

    fetch(uriMotorista, options)
        .then(res => res.json())
        .then(res => {
            motorista = res;
        }
        )
        .catch(err => console.error(err));
}

function cadastrarMotorista() {

    var erroCpf = false;
    var erro = false



    document.querySelector('.erro_nome_vazio').classList.add('model')

    document.querySelector('.erro_cpf_ja_vazio').classList.add('model')
    document.querySelector('.erro_cpf_invalido').classList.add('model')
    document.querySelector('.erro_cpf_ja_cadastrado').classList.add('model')

    document.querySelector('.erro_cnh_ja_vazia').classList.add('model')
    document.querySelector('.erro_cnh_invalida').classList.add('model')
    document.querySelector('.erro_cnh_ja_cadastrada').classList.add('model')



    var nome = document.querySelector('.nome').value
    var cpf = document.querySelector('.cpf').value
    var cnh = document.querySelector('.cnh').value


    if (nome.trim().length == "") {
        document.querySelector('.erro_nome_vazio').classList.remove('model')
        erro = true
    }

    //************** Validação do CPF ***************** //
    if (cpf.trim().length == "") {
        document.querySelector('.erro_cpf_ja_vazio').classList.remove('model')
        erro = true;
        erroCpf = true;
    }

    if (erroCpf == false) {
        motorista.forEach(m => {

            if (m.cpf == cpf) {
                document.querySelector('.erro_cpf_ja_cadastrado').classList.remove('model')
                erro = true
                erroCpf = true
            }
        })
    }

    var Soma;
    var Resto;
    Soma = 0;

    if (erroCpf == false) {

        var strCPF = cpf;
        if (strCPF == "00000000000" || strCPF == "11111111111" || strCPF == "22222222222" || strCPF == "33333333333" || strCPF == "44444444444" || strCPF == "55555555555" || strCPF == "6666666666" || strCPF == "77777777777" || strCPF == "88888888888" || strCPF == "99999999999") {
            document.querySelector('.erro_cpf_invalido').classList.remove('model');
            erro = true;
            console.log('1')
        }

        for (i = 1; i <= 9; i++) Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (11 - i);
        Resto = (Soma * 10) % 11;

        if ((Resto == 10) || (Resto == 11)) Resto = 0; {

            if (Resto != parseInt(strCPF.substring(9, 10))) {
                document.querySelector('.erro_cpf_invalido').classList.remove('model');
                erro = true; console.log('2');
            }
        }

        Soma = 0;
        for (i = 1; i <= 10; i++) Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (12 - i);
        Resto = (Soma * 10) % 11;

        if ((Resto == 10) || (Resto == 11)) Resto = 0; {

            if (Resto != parseInt(strCPF.substring(10, 11))) {

                document.querySelector('.erro_cpf_invalido').classList.remove('model');
                erro = true;
                console.log('3');;
            }
        }

        // var valor_hora = document.querySelector('.valor-Hora').value
    }

    //************** fim da Validação do CPF ***************** //

    //************* Validação da CNH ***************/

    var char1 = cnh.charAt(0);

    if (cnh.replace(/[^\d]/g, '').length !== 11 || char1.repeat(11) === cnh) {
        document.querySelector('.erro_cnh_invalida').classList.remove('model');
        erro = true;

        console.log('erro cnh1');

        return;
    }

    for (var i = 0, j = 9, v = 0; i < 9; ++i, --j) {
        v += +(cnh.charAt(i) * j);
    }

    var dsc = 0,
        vl1 = v % 11;

    if (vl1 >= 10) {
        vl1 = 0;
        dsc = 2;
    }

    for (i = 0, j = 1, v = 0; i < 9; ++i, ++j) {
        v += +(cnh.charAt(i) * j);
    }

    var x = v % 11;
    var vl2 = (x >= 10) ? 0 : x - dsc;

    // console.log('' + vl1 + vl2) === cnh.substr(-2);


    console.log(erro);

    if (erro == false) {
        let data = {
            "nome": nome,
            "cpf": cpf,
            "cnh": cnh,
            "disponivel": "Ativo"
        };

        console.log(data);

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

function erros(id) {

    if (id == 1) {

        var modalErro = document.querySelector('.modal-errado')
        modalErro.classList.remove('model')
    }


}


// function esconderModalCheck() {
//     var modalErradoCpf = document.querySelector('.modal-errado')
//     var modalErradoVagas = document.querySelector('.modal-errado-vagas')
//     var modalErradoCpf = document.querySelector('.modal-errado')
//     var modalErradoCpf = document.querySelector('.modal-errado')
//     modalErradoCpf.classList.add('model')
//     window.location.reload();
// }