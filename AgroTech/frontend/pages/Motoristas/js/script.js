var uriMotorista = 'http://localhost:3000/motorista'
var uriEditar = 'http://localhost:3000/motorista'
var uriCard_Usuarios = 'http://localhost:3000/usuarios'

var usuarios = []
var motorista = []

var cardMotorista = document.querySelector('.tickets')

var userinfo = JSON.parse(localStorage.getItem("info"));

document.querySelector('.name_user').innerHTML = userinfo.nome

function carregar() {

    const options = { method: 'GET' };

    fetch(uriMotorista, options)
        .then(res => res.json())
        .then(res => {
            motorista = res;
            preencherTabela();
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
        window.location.href = '../login/login.html '
    }

    else {

        usuarios.forEach(u => {
            if (u.id == userinfo.id_user) {

                if (u.tipo == "usuario") {
                    window.location.href = '../AreaComum/areaComum.html'

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
    window.location.href = "../login/login.html"
}

var qtdOperacao = 0
var qtdAtivo = 0

function preencherTabela() {

    motorista.forEach(m => {

        if (m.disponivel != "Inativo") {

            var novoCardMotorista = cardMotorista.cloneNode(true)

            novoCardMotorista.classList.remove('model')
            novoCardMotorista.querySelector('.id_motorista').innerHTML = m.id_motorista

            if (m.disponivel == "Ativo") {
                novoCardMotorista.querySelector('.img_situation').src = 'img/icons/cicle_on.png'
                qtdAtivo +=1

            }

            if (m.disponivel == "Em Operação") {

                novoCardMotorista.querySelector('.img_situation').src = 'img/icons/cicle_in_operacao.png'
                // qtd_disponiveis += 1
                qtdOperacao +=1
            }


            novoCardMotorista.querySelector('.cpf').innerHTML = m.cpf
            novoCardMotorista.querySelector('.cnh').innerHTML = m.cnh
            novoCardMotorista.querySelector('.nome').innerHTML = m.nome
            novoCardMotorista.querySelector('.disponivel').innerHTML = m.disponivel

            document.querySelector('.contTickets').appendChild(novoCardMotorista)

            
        }
        document.querySelector('.qtd-operacao').innerHTML = qtdOperacao
        document.querySelector('.abertos').innerHTML = qtdAtivo

    })
}

function ativar(e) {

    var id = e.parentNode.parentNode.querySelector('.id_motorista').innerHTML

    const options = { method: 'GET' };

    fetch(uriEditar, options)
        .then(res => res.json())
        .then(res => {
            motorista = res;
            editar(e);
        }
        )
        .catch(err => console.error(err));
}

function editar(e) {

    var id = e.parentNode.parentNode.querySelector('.id_motorista').innerHTML

    var mostrarModal = document.querySelector('.m-editar')

    motorista.forEach(m => {

        if (id == m.id_motorista) {

            document.querySelector('.id_editar').innerHTML = m.id_motorista
            document.querySelector('.n_editar').value = m.nome
            document.querySelector('.cpf_editar').value = m.cpf
            document.querySelector('.cnh_tipo').value = m.cnh
            document.querySelector('.disponivel_editar').value = m.disponivel

        }

    })

    mostrarModal.classList.remove('model')

}

function salvar(e) {

    // var select_status = document.querySelector(".select_status")
    // let seleStatus = select_status.options[select_status.selectedIndex].value;
    // if (seleStatus == 'sim') { var disponivel = true; }
    // if (seleStatus == 'nao') { var disponivel = false; }

    var id_motorista = document.querySelector('.id_editar').innerHTML
    var nome = document.querySelector('.n_editar').value
    var cpf = document.querySelector('.cpf_editar').value
    var cnh = document.querySelector('.cnh_tipo').value
    var disponivel = document.querySelector('.disponivel_editar').value

    let data = {
        "nome": nome,
        "cpf": cpf,
        "cnh": cnh,
        "disponivel": disponivel
    }

    console.log(data);

    fetch('http://localhost:3000/motorista/' + id_motorista, {
        "method": "PUT",
        "headers": {
            "Content-Type": "application/json"
        },
        "body": JSON.stringify(data)
    })
        .then(resp => resp.status)
        .then(resp => {
            if (resp == 200) {
                alert('Editar com Suesso')

                window.location.reload()
            }

        })
}

function fecharEditarCliente() {
    var mostrarModal = document.querySelector('.m-editar')
    mostrarModal.classList.toggle('model')

    window.location.reload();

}

function inativarFunction(e) {

    var id_veiculo = document.querySelector('.id_editar').innerHTML
    var cpf = document.querySelector('.cpf_editar').value
    var cnh = document.querySelector('.cnh_tipo').value
    var nome = document.querySelector('.n_editar').value

    let data = {
        "cpf": cpf,
        "cnh": cnh,
        "nome": nome,
        "disponivel": "Inativo"
    }

    console.log(data);

    fetch('http://localhost:3000/motorista/' + id_veiculo, {
        "method": "PUT",
        "headers": {
            "Content-Type": "application/json"
        },
        "body": JSON.stringify(data)
    })
        .then(resp => resp.status)
        .then(resp => {
            if (resp == 200) {
                alert('Editar com Suesso')
                window.location.reload()
            }

        })

}



var search_btn = document.querySelector('.btn-filter')
const INPUT_BUSCA = document.querySelector('.search')
const TABELA_CLIENTES = document.querySelector('.contTickets')

search_btn.addEventListener('click', () => {

    let expressao = INPUT_BUSCA.value

    let linhas = TABELA_CLIENTES.getElementsByTagName('tr')

    for (let posicao in linhas) {
        if (true === isNaN(posicao)) {
            continue
        }

        let conteudoDaLinha = linhas[posicao].innerHTML

        if (true === conteudoDaLinha.includes(expressao)) {
            linhas[posicao].style.display = ''
        } else {
            linhas[posicao].style.display = 'none'

        }

    }

})