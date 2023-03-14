var uriVeiculos = 'http://localhost:3000/veiculo'
var uriEditar = 'http://localhost:3000/veiculo'
var uriManutencao = 'http://localhost:3000/manutencao'
var uriCard_Usuarios = 'http://localhost:3000/usuarios'
var uriCard_Usuarios = 'http://localhost:3000/usuarios'

var usuarios = []
var usuarios = []
var veiculos = []
var manutencao = []

var cardVeiculos = document.querySelector('.tickets')
var cardManutencoes = document.querySelector('.manutencao')

var userinfo = JSON.parse(localStorage.getItem("info"));

document.querySelector('.name_user').innerHTML = userinfo.nome

function carregar() {

    const options = { method: 'GET' };


    fetch(uriVeiculos, options)
        .then(res => res.json())
        .then(res => {
            veiculos = res;
            preencherTabela();
        }
        )
        .catch(err => console.error(err));

    fetch(uriManutencao, options)
        .then(res => res.json())
        .then(res => {
            manutencao = res;
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

var qtd_disponiveis = 0;
function preencherTabela() {

    console.log(veiculos);

    veiculos.forEach(v => {

        if (v.disponivel != "Inativo") {


            var novoCardVeiculos = cardVeiculos.cloneNode(true)

            novoCardVeiculos.classList.remove('model')

            novoCardVeiculos.querySelector('.id_veiculos').innerHTML = v.id_veiculo
            novoCardVeiculos.querySelector('.placas').innerHTML = v.placa
            novoCardVeiculos.querySelector('.modelo').innerHTML = v.modelo
            novoCardVeiculos.querySelector('.marca').innerHTML = v.marca
            novoCardVeiculos.querySelector('.tipo').innerHTML = v.tipo


            if (v.disponivel == "Ativo") {
                novoCardVeiculos.querySelector('.img_situation').src = 'img/icons/cicle_on.png'
                qtd_disponiveis += 1

            }

            if (v.disponivel == "Em Operação") {
                novoCardVeiculos.querySelector('.img_situation').src = 'img/icons/cicle_in_operacao.png'

            }
            if (v.disponivel == "Em Manutencao") {
                novoCardVeiculos.querySelector('.img_situation').src = 'img/icons/cicle_manutencao.png'
                console.log('asadad');
            }

            document.querySelector('.contTickets').appendChild(novoCardVeiculos)
        }

    })

    console.log(document.querySelector('.qtd_veiculos'));
    document.querySelector('.qtd-veiculos-tool').innerHTML = veiculos.length
    document.querySelector('.qtd-disponiveis').innerHTML = qtd_disponiveis



}

var soma = 0

function editarCliente(e) {

    var id = e.parentNode.parentNode.querySelector('.id_veiculos').innerHTML

    var mostrarModal = document.querySelector('.m-editar')

    soma += 1

    mostrarModal.classList.remove('model')

    var optionDisponivel = document.createElement('option')
    optionDisponivel.value = "Ativo"
    optionDisponivel.innerHTML = "Disponivel"

    var optionManutencao = document.createElement('option')
    optionManutencao.value = "Em Manutencao"
    optionManutencao.innerHTML = "Em Manutencao"


    if (soma == 1) {
        carregarManutencoes(id)
    }

    veiculos.forEach(v => {
        if (id == v.id_veiculo) {

            if (v.disponivel == "Em Operação") {
                document.querySelector('.cont_trash').classList.add('model')
                document.querySelector('.selects_inps_disp').classList.add('model')


            }

            if (v.disponivel == "Em Manutencao") {
                document.querySelector('.cont_trash').classList.add('model')
                document.querySelector('.select_status').appendChild(optionManutencao)
                document.querySelector('.select_status').appendChild(optionDisponivel)

            }

            if (v.disponivel == "Ativo") {
                document.querySelector('.select_status').appendChild(optionDisponivel)
                document.querySelector('.select_status').appendChild(optionManutencao)

            }

            document.querySelector('.id_veiculo').innerHTML = v.id_veiculo
            document.querySelector('.placa_veiculo').value = v.placa
            document.querySelector('.modelo_veiculo').value = v.modelo
            document.querySelector('.marca_veiculo').value = v.marca
            document.querySelector('.tipo_veiculo').value = v.tipo
            document.querySelector('.disponibilidade').value = v.disponivel

        }

        manutencao.forEach(m => {

            if (v.id_veiculo == m.id_veiculo) {

                var data_saida = document.querySelector('.h_saida')
                var btn_manutencao = document.querySelector('.btn_finalizar_manutencao')

                data_saida.classList.remove('model')
                btn_manutencao.classList.add('model')

                data_saida.style.textAlign = "center"

                document.querySelector('.descricao').value = m.descricao
                document.querySelector('.valor').value = m.valor
                document.querySelector('.h_entrada').value = m.data_inicio

                var data_saida = m.data_inicio

                const [day, month, year] = data_saida.split('/')

                var data_final = day + '-' + month + '-' + year

                document.querySelector('.h_saida').value = data_final


            }
        })

    })

}

// function selecionarDisponibilidade() {

//     var select_status = document.querySelector(".select_status")
//     let seleStatus = select_status.options[select_status.selectedIndex].value;
//     if (seleStatus == 'sim') { var disponivel = "Disponivel"; }
//     if (seleStatus == 'nao') { var disponivel = "Na Manutenção";; }


//     var inpDataEntrada = document.querySelector('.data_entrada')

//     var hoje = new Date()
//     var dia = String(hoje.getDate()).padStart(2, '0')
//     var mes = String(hoje.getMonth() + 1).padStart(2, '0')
//     var ano = hoje.getFullYear()

//     var hora = hoje.getHours()
//     var minutos = hoje.getMinutes()
//     var segundos = hoje.getSeconds()
//     // var segundos = hoje.getSeconds()

//     dataAtual = dia + '/' + mes + '/' + ano;

//     console.log(seleStatus);

//     if (seleStatus == 'nao') {

//         var menutencao_descri = document.querySelector('.inps_descri')
//         var menutencao_btns = document.querySelector('.cont_button_c_manutencao')
//         var btn_salvar = document.querySelector('.cont_button')

//         document.querySelector('.h_entrada').value = dataAtual
//         document.querySelector('.h_entrada').style.textAlign = "center"


//         btn_salvar.classList.add('model')
//         menutencao_descri.classList.remove('model')
//         menutencao_btns.classList.remove('model')


//     }
//     else {
//         var menutencao_descri = document.querySelector('.inps_descri')
//         var menutencao_btns = document.querySelector('.cont_button_c_manutencao')
//         var btn_salvar = document.querySelector('.cont_button')

//         menutencao_descri.classList.add('model')
//         menutencao_btns.classList.add('model')
//         btn_salvar.classList.remove('model')


//     }

// }

var disponivel = true

var soma = 0

function MudarSection(e) {

    var select = e.querySelector('.title').innerHTML
    var select_id = e.parentNode.parentNode.querySelector('.id_veiculo').innerHTML

    if (select == 'Manutenções') {

        document.querySelector('.information').classList.add('model')
        document.querySelector('.cont_manutencao').classList.remove('model')

    }

    if (select == 'Informações') {
        document.querySelector('.information').classList.remove('model')
        document.querySelector('.cont_manutencao').classList.add('model')

    }

}

function salvar(e) {

    var erro = false
    var erroPlaca = true;
    var erroPlacaVazia = false;

    e.parentNode.parentNode.parentNode.querySelector('.erro_placa_vazio').classList.add('model')
    e.parentNode.parentNode.parentNode.querySelector('.erro_placa_invalida').classList.add('model')
    e.parentNode.parentNode.parentNode.querySelector('.erro_modelo_vazio').classList.add('model')
    e.parentNode.parentNode.parentNode.querySelector('.erro_marca_vazio').classList.add('model')

    var select_status = document.querySelector(".select_status")
    let seleStatus = select_status.options[select_status.selectedIndex].value;

    var id_veiculo = document.querySelector('.id_editar').innerHTML
    var placa = document.querySelector('.pv_editar').value
    var modelo = document.querySelector('.mv_editar').value
    var marca = document.querySelector('.m_editar').value
    var tipo = document.querySelector('.m_tipo').value

    if (placa.trim().length == "") {
        document.querySelector('.erro_placa_vazio').classList.remove('model')
        erro = true
        erroPlacaVazia = true;
    }

    if (modelo.trim().length == "") {
        document.querySelector('.erro_modelo_vazio').classList.remove('model')
        erro = true
    }

    if (marca.trim().length == "") {
        document.querySelector('.erro_marca_vazio').classList.remove('model')
        erro = true
    }



    //Validando a Placa

    if (erroPlacaVazia == false) {

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

        }

    }



    if (erro == false && erroPlaca == false) {

        let data = {
            "placa": placa.trim(),
            "modelo": modelo.trim(),
            "marca": marca.trim(),
            "tipo": tipo.trim(),
            "disponivel": seleStatus
        }

        console.log(data);

        fetch('http://localhost:3000/veiculos/' + id_veiculo, {
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

}

function salvarCManutenção(e) {

    var select_status = document.querySelector(".select_status")
    let seleStatus = select_status.options[select_status.selectedIndex].value;
    if (seleStatus == 'sim') { var disponivel = true; }
    if (seleStatus == 'nao') { var disponivel = false; }

    var id_veiculo = document.querySelector('.id_editar').innerHTML
    var placa = document.querySelector('.pv_editar').value
    var modelo = document.querySelector('.mv_editar').value
    var marca = document.querySelector('.m_editar').value
    var tipo = document.querySelector('.m_tipo').value

    let data = {
        "placa": placa,
        "modelo": modelo,
        "marca": marca,
        "tipo": tipo,
        "disponivel": disponivel,
    }

    console.log(data);

    fetch('http://localhost:3000/veiculos/' + id_veiculo, {
        "method": "PUT",
        "headers": {
            "Content-Type": "application/json"
        },
        "body": JSON.stringify(data)
    })
        .then(resp => resp.status)
        .then(resp => {
            if (resp == 200) {

                funcaoCadManutencao()
                // window.location.reload()
            }

        })
}

function funcaoCadManutencao(e) {

    var erro = 0

    document.querySelector('.erro_dec_vazio').classList.add('model')
    document.querySelector('.erro_valor_vazio').classList.add('model')

    var id_veiculo = e.parentNode.parentNode.parentNode.parentNode.querySelector('.id_veiculo').innerHTML
    var descricao_manutencao = document.querySelector('.descricao_man').value
    var valor = document.querySelector('.valor_man').value
    var data_entrada = document.querySelector('.h_entrada_inp').value
    var data_saida = document.querySelector('.h_saida_inp').value

    if (descricao_manutencao.trim() == "") {
        document.querySelector('.erro_dec_vazio').classList.remove('model')
        erro = true;
    }

    if (valor.trim() == "") {
        document.querySelector('.erro_valor_vazio').classList.remove('model')
        erro = true;
    }

    if (data_saida.trim() == "") {
        var data_finalizada = "---"
    }
    else {

        const [day, month, year] = data_saida.split('/')

        var data_final = year + '-' + month + '-' + day

        data_finalizada = data_final

        console.log(data_finalizada);
    }


    const [day, month, year] = data_entrada.split('/')

    var data_final = year + '-' + month + '-' + day

    var data_formatada_entrada = data_final


    if (erro == true) {

        return;
    }


    let data = {
        "id_veiculo": Number(id_veiculo),
        "data_inicio": data_formatada_entrada,
        "data_fim": data_finalizada,
        "valor": Number(valor),
        "descricao": descricao_manutencao,
    }

    console.log(data);

    fetch('http://localhost:3000/manutencao', {
        "method": "POST",
        "headers": {
            "Content-Type": "application/json"
        },
        "body": JSON.stringify(data)
    })
        .then(resp => resp.status)
        .then(resp => {
            if (resp == 200) {


                document.querySelector('.descricao_man').value = ""
                document.querySelector('.valor_man').value = ""
                document.querySelector('.h_saida_inp').value = ""
                document.querySelector('.btn_finalizar_manutencao_inp').classList.remove('model')
                document.querySelector('.h_saida_inp').classList.add('model')

                alert('inserido com Sucesso')

                var menutencao_descri = document.querySelector('.inps_descri_section_create_manu')
                var menutencao_btns = document.querySelector('.cont_button_c_manutencao')

                menutencao_descri.classList.add('model')
                menutencao_btns.classList.add('model')

                const options = { method: 'GET' };

                fetch(uriManutencao, options)
                    .then(res => res.json())
                    .then(res => {
                        manutencao = res;
                        carregarManutencoes(id_veiculo);

                    }
                    )
                    .catch(err => console.error(err));

            }

        })
}

function finalizarManutencao() {

    console.log('asdada');
    var hoje = new Date()
    var dia = String(hoje.getDate()).padStart(2, '0')
    var mes = String(hoje.getMonth() + 1).padStart(2, '0')
    var ano = hoje.getFullYear()

    var hora = hoje.getHours()
    var minutos = hoje.getMinutes()
    var segundos = hoje.getSeconds()

    dataAtual = dia + '/' + mes + '/' + ano;

    var data_saida = document.querySelector('.h_saida_inp')
    var btn_manutencao = document.querySelector('.btn_finalizar_manutencao_inp')

    data_saida.classList.remove('model')
    btn_manutencao.classList.add('model')

    data_saida.value = dataAtual
    data_saida.style.textAlign = "center"

}
function finalizarManutencaoCard(e) {
    var hoje = new Date()
    var dia = String(hoje.getDate()).padStart(2, '0')
    var mes = String(hoje.getMonth() + 1).padStart(2, '0')
    var ano = hoje.getFullYear()

    var hora = hoje.getHours()
    var minutos = hoje.getMinutes()
    var segundos = hoje.getSeconds()

    dataAtual = dia + '/' + mes + '/' + ano;

    var data_saida = e.parentNode.querySelector('.data_fim_inp')
    var btn_manutencao = e.parentNode.querySelector('.btn_finalizar_card')

    console.log(data_saida);
    console.log(btn_manutencao);


    data_saida.classList.remove('model')
    btn_manutencao.classList.add('model')

    data_saida.value = dataAtual
    data_saida.style.textAlign = "center"
}

function fecharEditarCliente() {
    var mostrarModal = document.querySelector('.m-editar')
    mostrarModal.classList.toggle('model')

    window.location.reload();

}

function fecharModaisDaManutencao(e) {

    var teste = e.parentNode.parentNode.parentNode.parentNode.querySelector('.inps_descri_section_create_manu')
    var cardManutencao = e.parentNode.parentNode.parentNode.querySelector('.inps_descri')

    teste.classList.add('model')
    cardManutencao.classList.add('model')


    document.querySelector('.descricao_man').value = ""
    document.querySelector('.valor_man').value = ""
    document.querySelector('.h_saida_inp').value = ""
    document.querySelector('.btn_finalizar_manutencao_inp').classList.remove('model')
    document.querySelector('.h_saida_inp').classList.add('model')



}

function fecharModaisCardDaManutencao(e) {

    var teste = e.parentNode.parentNode.parentNode.parentNode.querySelector('.inps_descri_section_create_manu')
    var cardManutencao = e.parentNode.parentNode.parentNode.querySelector('.inps_descri')

    teste.classList.add('model')
    cardManutencao.classList.add('model')

    var id_manutencao = e.parentNode.parentNode.querySelector('.id_manutencao_hidden').innerHTML

    manutencao.forEach(m => {

        if (id_manutencao == m.id_manutencao) {


            if (m.data_fim == "---") {
                e.parentNode.parentNode.querySelector('.btn_finalizar_card').classList.add('model')
                e.parentNode.parentNode.querySelector('.data_fim_inp').classList.remove('model')
            }
            else {
                e.parentNode.parentNode.querySelector('.btn_finalizar_card').classList.remove('model')
                e.parentNode.parentNode.querySelector('.data_fim_inp').classList.add('model')
            }
        }

    })


}

function carregarManutencoes(e) {

    var cardManutencao = document.querySelector('.manutencao')
    var btn_add_manutencao = document.querySelector('.btn_add_manutencao')
    var inps_descri_section_create_manu = document.querySelector('.inps_descri_section_create_manu')

    var novoCardManutencaoTeste = cardManutencao.cloneNode(true)
    var novo_btn_add_manutencao = btn_add_manutencao.cloneNode(true)
    var novo_inps_descri_section_create_manu = inps_descri_section_create_manu.cloneNode(true)

    document.querySelector('.cont_manutencao').innerHTML = ""

    document.querySelector('.cont_manutencao').appendChild(novo_btn_add_manutencao)

    document.querySelector('.cont_manutencao').appendChild(novo_inps_descri_section_create_manu)

    console.log(document.querySelector('.cont_manutencao'));


    manutencao.forEach(m => {

        if (m.id_veiculo == e) {

            var novoCardManutencao = novoCardManutencaoTeste.cloneNode(true)

            novoCardManutencao.classList.remove('model')

            novoCardManutencao.querySelector('.id_manu').innerHTML = m.id_manutencao
            novoCardManutencao.querySelector('.date_manu_entrada').innerHTML = m.data_inicio

            novoCardManutencao.querySelector('.id_manutencao_hidden').innerHTML = m.id_manutencao

            novoCardManutencao.querySelector('.descricao').value = m.descricao
            novoCardManutencao.querySelector('.valor').value = m.valor

            var data = m.data_inicio

            const [year, month, day] = data.split('-')

            var data_final = day + '/' + month + '/' + year

            var data_entrada_formatada = data_final

            console.log(data);


            novoCardManutencao.querySelector('.data_entrada').value = data_entrada_formatada

            if (m.data_fim != '---') {

                var data = m.data_fim

                const [year, month, day] = data.split('-')

                var data_final = day + '/' + month + '/' + year

                var data_fim_formatada = data_final

                novoCardManutencao.querySelector('.data_fim_inp').value = data_fim_formatada
                novoCardManutencao.querySelector('.btn_finalizar_card').classList.add('model')
                novoCardManutencao.querySelector('.data_fim_inp').classList.remove('model')
            }else {
                novoCardManutencao.querySelector('.btn_finalizar_card').classList.remove('model')
                novoCardManutencao.querySelector('.data_fim_inp').classList.add('model')
            }
            
            document.querySelector('.cont_manutencao').appendChild(novoCardManutencao)

        }
    })

}

function HabilitarEdicaoManu(e) {

    var id_veiculo = e.parentNode.parentNode.parentNode.parentNode.parentNode.querySelector('.id_veiculo').innerHTML
    var card_descri_manutencao = e.parentNode.parentNode.parentNode.querySelector('.inps_descri')

    manutencao.forEach(m => {

        if (m.id_veiculo == id_veiculo) {


            card_descri_manutencao.classList.remove('model')

            // if (m.data_fim == "---") {

            //    var teste0 = e.parentNode.parentNode.parentNode.querySelector('.btn_finalizar_card')
            //    var teste1 = e.parentNode.parentNode.parentNode.querySelector('.data_fim_inp')

            //     teste0.classList.remove('model')
            //     teste1.classList.add('model')

            //     console.log(e.parentNode.parentNode.parentNode.querySelector('.btn_finalizar_card'));

            // }
            // if (m.data_fim !== "---") {
            //     var teste2 = e.parentNode.parentNode.parentNode.querySelector('.btn_finalizar_card')
            //     var teste = e.parentNode.parentNode.parentNode.querySelector('.data_fim_inp')

            //     teste2.classList.add('model')
            //     teste.classList.remove('model')

            // }
        }
    })

}

function mostrarModalManutencao() {

    var hoje = new Date()
    var dia = String(hoje.getDate()).padStart(2, '0')
    var mes = String(hoje.getMonth() + 1).padStart(2, '0')
    var ano = hoje.getFullYear()

    dataAtual = dia + '/' + mes + '/' + ano;


    var menutencao_descri = document.querySelector('.inps_descri_section_create_manu')
    var menutencao_btns = document.querySelector('.cont_button_c_manutencao')
    var btn_salvar = document.querySelector('.cont_button')

    menutencao_descri.classList.remove('model')
    menutencao_btns.classList.remove('model')


    document.querySelector('.h_entrada_inp').value = dataAtual
}

function salvarEdicaoCard(e) {

    var erro = false;

    document.querySelector('.erro_descricao_vazia').classList.add('model')
    document.querySelector('.erro_valores_vazia').classList.add('model')


    var id_manutencao = e.parentNode.parentNode.querySelector('.id_manutencao_hidden').innerHTML
    var id_veiculo = e.parentNode.parentNode.parentNode.parentNode.parentNode.querySelector('.id_veiculo').innerHTML

    console.log(id_manutencao);
    var descricao_manutencao = e.parentNode.parentNode.querySelector('.descricao').value
    var valor = e.parentNode.parentNode.querySelector('.valor').value
    var data_entrada = e.parentNode.parentNode.querySelector('.data_entrada').value
    var data_saida = e.parentNode.parentNode.querySelector('.data_fim_inp').value



    if (descricao_manutencao.trim() == "") {
        e.parentNode.parentNode.querySelector('.erro_descricao_vazia').classList.remove('model')
        erro = true;
    }

    if (valor.trim() == "") {
        e.parentNode.parentNode.querySelector('.erro_valores_vazia').classList.remove('model')
        erro = true;
    }

    if (data_saida == "") {
        var data_finalizada_fim = "---"
    }

    else {
        const [day, month, year] = data_saida.split('/')

        var data_final = year + '-' + month + '-' + day

        data_finalizada_fim = data_final

        console.log(data_finalizada_fim);

    }

    const [day, month, year] = data_entrada.split('/')

    var data_final = year + '-' + month + '-' + day

    var data_formatada_entrada = data_final


    console.log(erro);
    if (erro == true) {
        return;
    }

    let data = {
        "id_veiculo": Number(id_veiculo),
        "data_inicio": data_formatada_entrada,
        "data_fim": data_finalizada_fim,
        "valor": Number(valor),
        "descricao": descricao_manutencao,
    }

    console.log(data);

    fetch('http://localhost:3000/manutencao/' + id_manutencao, {
        "method": "PUT",
        "headers": {
            "Content-Type": "application/json"
        },
        "body": JSON.stringify(data)
    })
        .then(resp => resp.status)
        .then(resp => {
            if (resp == 200) {

                alert('Atualizado com Sucesso')

                console.log(e.parentNode.parentNode.parentNode.parentNode);

                var cardManutencao = e.parentNode.parentNode.parentNode.querySelector('.inps_descri')

                cardManutencao.classList.add('model')



            }

        })
}

function inativarFunction() {

    var id_veiculo = document.querySelector('.id_editar').innerHTML
    var placa = document.querySelector('.pv_editar').value
    var modelo = document.querySelector('.mv_editar').value
    var marca = document.querySelector('.m_editar').value
    var tipo = document.querySelector('.m_tipo').value

    let data = {
        "placa": placa,
        "modelo": modelo,
        "marca": marca,
        "tipo": tipo,
        "disponivel": "Inativo"
    }

    console.log(data);

    fetch('http://localhost:3000/veiculos/' + id_veiculo, {
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