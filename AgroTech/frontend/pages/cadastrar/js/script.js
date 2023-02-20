var teste = 0
function cad() {



    let inptNome = document.querySelector("#nome").value;
    let inptEmail = document.querySelector("#email").value;
    let inptSenha = document.querySelector("#senha").value;
    let inptConfirmar_senha = document.querySelector("#confirmar_senha").value;

    if (inptNome == "" || inptEmail == "" || inptSenha == "" || inptConfirmar_senha == "" ) {
        teste += 1
        console.log('erro1');

    }

    if(inptSenha != inptConfirmar_senha) {
        teste += 1
        
        console.log('erro2s');
    
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
                    var modalCerto = document.querySelector('.modal-certo')
                    modalCerto.classList.remove('model')
                }
            })
    }

}

function esconderModalCheck() {
    var modalCerto = document.querySelector('.modal-certo')

    modalCerto.classList.add('model')

    window.location.reload();

}

function esconderModalError() {
    var modalErro = document.querySelector('.modal-errado')

    modalErro.classList.add('model')

    window.location.reload();

}