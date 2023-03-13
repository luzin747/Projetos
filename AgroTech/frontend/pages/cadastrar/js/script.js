var teste = 0


var uriCard_Usuarios = 'http://localhost:3000/usuarios'

var usuarios = []




function cad() {

    document.querySelector('.erro_Email_Invalido').classList.add('model')
    document.querySelector('.erro_Vazio').classList.add('model')
    document.querySelector('.erro_Senha_Invalido').classList.add('model')



    let inptNome = document.querySelector("#nome").value;
    let inptEmail = document.querySelector("#email").value;
    let inptSenha = document.querySelector("#senha").value;
    let inptConfirmar_senha = document.querySelector("#confirmar_senha").value;



    if (inptNome == "" || inptEmail == "" || inptSenha == "" || inptConfirmar_senha == "") {
        teste += 1
        console.log('erro1');

        document.querySelector('.erro_Vazio').classList.remove('model')

        return;
    }

    var re = /\S+@\S+\.\S+/;

    var erroRe = re.test(inptEmail)

    if (erroRe == false) {

        document.querySelector('.erro_Email_Invalido').classList.remove('model')
        teste += 1

        return;


    }



    if (inptSenha != inptConfirmar_senha) {
        teste += 1

        document.querySelector('.erro_Senha_Invalido').classList.remove('model')
        return;

    }

    if (teste == 0) {

        let options = JSON.stringify({
            "nome": inptNome,
            "senha": inptSenha,
            "email": inptEmail,
            "tipo": "usuario"
        })

        console.log(options);


        fetch("http://localhost:3000/usuarios", {
            "method": "POST",
            "headers": {
                "Content-Type": "application/json"
            },
            "body": options
        })
            .then(res => {
                if (res.status == 200) {

                    ativar()

                }
            })
    }

}

function ativar() {
    const options = { method: 'GET' };

    fetch(uriCard_Usuarios, options)
        .then(res => res.json())
        .then(res => {
            usuarios = res;
            logar()
        }
        )
        .catch(err => console.error(err));
}


function logar() {

    var email = document.querySelector("#email").value;
    var senha = document.querySelector("#senha").value;

    let data = {
        "email": email,
        "senha": senha
    }

    console.log(data);
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
                localStorage.setItem("info", JSON.stringify({ "id_user": data.uid, "nome": data.uname, "token": data.token }));


                usuarios.forEach(u => {

                    console.log(usuarios);

                    if (u.id == data.uid) {
                        console.log('Entrandp');


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
