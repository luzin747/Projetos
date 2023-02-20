const inpUser = document.querySelector('#user')
const inpSenha = document.querySelector('#senha')

function logar() {
   let data = {
    "email": inpUser.email,
    "senha": inpSenha.value
   }
   console.log(data)
   fetch("http://localhost:3000/usuarios/login", {
    "method":"POST",
    "headers": {
        "Content-Type":"application/json"
    },
    "body": JSON.stringify(data)
})
.then(res => {return res.json()})
.then(data => {
    if(data.erro === undefined) {
        console.log(data)
        localStorage.setItem("info", JSON.stringify({"email":data.email, "id":data.id_user, "status":data.status_user}));

         window.location.href = '../../home.html'
    }
})
}

