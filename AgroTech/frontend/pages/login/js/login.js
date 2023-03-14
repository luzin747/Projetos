var inpUser = document.querySelector('#user')
var inpSenha = document.querySelector('#senha')

var uriCard_Usuarios = 'http://localhost:3000/usuarios'

var usuarios = []

    const options = { method: 'GET' };

    fetch(uriCard_Usuarios, options)
        .then(res => res.json())
        .then(res => {
            usuarios = res;

        }
        )
        .catch(err => console.error(err));


function logar() {

    document.querySelector('.e1').classList.add('model')
    document.querySelector('.e2').classList.add('model')
    document.querySelector('.e3').classList.add('model')


    var existeEmail = false;
    var erroVazio = false;


    console.log(inpUser.value, inpSenha.value);

    if (inpUser.value.trim() == "" || inpSenha.value.trim() == "") {
        document.querySelector('.e1').classList.remove('model')
        erroVazio = true
    }

    if (erroVazio == false) {

        usuarios.forEach(u => {

            console.log('validando');

            if (u.email == inpUser.value) {
                existeEmail = true;

            }

        })

        if (existeEmail == false) {
            document.querySelector('.e2').classList.remove('model')


        }

        if (existeEmail == true) {

            let data = {
                "email": inpUser.value,
                "senha": inpSenha.value
            }
            fetch("http://localhost:3000/usuarios/login", {
                "method": "POST",
                "headers": {
                    "Content-Type": "application/json"
                },
                "body": JSON.stringify(data)
            })
                .then(res => { return res.json() })
                .then(data => {

                    if (data.erro == "Senha inválida") {
                        document.querySelector('.e3').classList.remove('model')
                    }

                    if (data.erro === undefined) {
                        console.log(data)
                        localStorage.setItem("info", JSON.stringify({ "id_user": data.uid, "nome": data.uname, "token": data.token }));


                        usuarios.forEach(u => {
                            if (u.id == data.uid) {


                                if (u.tipo == "usuario") {
                                    window.location.href = '../AreaComum/areaComum.html'
                                    console.log('useres');

                                }

                                if (u.tipo == "gerente") {
                                    console.log('geres');

                                    window.location.href = '../../home.html'

                                }
                            }
                        })

                    }
                })


        }

    }

}

