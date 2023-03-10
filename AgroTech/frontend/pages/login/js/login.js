const inpUser = document.querySelector('#user')
const inpSenha = document.querySelector('#senha')

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

            if (data.erro === undefined) {
                console.log(data)
                localStorage.setItem("info", JSON.stringify({ "id_user": data.uid, "nome": data.uname, "token": data.token }));


                usuarios.forEach(u => {
                    if(u.id == data.uid) {

                        if(u.tipo == "usuario") {
                            window.location.href = '../AreaComum/areaComum.html'

                        }

                        if(u.tipo == "gerente") {
                             window.location.href = '../../home.html'

                        }
                    }
                })

            }
        })
}

