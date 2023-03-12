var uriCard_Veículos = 'http://localhost:3000/veiculo'
var uriCard_Operacoes = 'http://localhost:3000/operacao'
var uriCard_Motoristas = 'http://localhost:3000/motorista'
var uriCard_Manutencoes = 'http://localhost:3000/manutencao'
var uriCard_Usuarios = 'http://localhost:3000/usuarios'

var usuarios = []
var veiculos = []
var operacoes = []
var motoristas = []
var manutencao = []

function carregar() {


    trocarTables()

    const options = { method: 'GET' };

    fetch(uriCard_Motoristas, options)
        .then(res => res.json())
        .then(res => {
            motoristas = res;
        }
        )
        .catch(err => console.error(err));


    fetch(uriCard_Manutencoes, options)
        .then(res => res.json())
        .then(res => {
            manutencao = res;
        }
        )
        .catch(err => console.error(err));


    fetch(uriCard_Veículos, options)
        .then(res => res.json())
        .then(res => {
            veiculos = res;
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

    fetch(uriCard_Operacoes, options)
        .then(res => res.json())
        .then(res => {
            operacoes = res;
            preencherTabelas();
        }
        )
        .catch(err => console.error(err));

    fetch(uriCard_Veículos, options)
        .then(res => res.json())
        .then(res => {
            veiculos = res;
            // cardDetails();
        }
        )
        .catch(err => console.error(err));
}

function VerificarAcesso() {
    var userinfo = JSON.parse(localStorage.getItem("info"));

    if (userinfo == null) {
        window.location.href = 'pages/login/login.html '
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
    window.location.href = "pages/login/login.html"
}

var qtd_Veiculos_Livres = 0
var qtd_Veiculos_Manutencao = 0

var qtd_Operacoes_Andamento = 0
var qtd_Veiculos_Terminadas = 0

var soma = 0

var disponivel = [0, 0]
var disponivelMotorista = [0, 0]

var disponivelVeiculos = [0,0,0]


function preencherTabelas() {

    var linhaOperacoes = document.querySelector('.operacoes')

    operacoes.forEach(o => {

        if (o.status == true) {

            var novaLinhaOperacoes = linhaOperacoes.cloneNode(true)

            novaLinhaOperacoes.classList.remove('model')

            novaLinhaOperacoes.querySelector('.id_operacao').innerHTML = o.id_opeacao


            if (o.data_retorno != "") {
                disponivel[1]++
            }

            if (o.data_retorno == "") {
                disponivel[0]++
            }


            motoristas.forEach(m => {

                


                if (o.id_motorista == m.id_motorista) {
                    novaLinhaOperacoes.querySelector('.motorista').innerHTML = m.nome

                }
            })
            veiculos.forEach(v => {
                if (o.id_veiculo == v.id_veiculo) {
                    novaLinhaOperacoes.querySelector('.veiculo').innerHTML = v.modelo

                }
            })
            novaLinhaOperacoes.querySelector('.data_saida').innerHTML = o.data_saida
            novaLinhaOperacoes.querySelector('.data_retorno').innerHTML = o.data_retorno

            document.querySelector('.contOperac').appendChild(novaLinhaOperacoes)
        }

    })

    var linhaVeiculos = document.querySelector('.veiculos')


    motoristas.forEach(m => {

        if(m.disponivel == "Ativo") {
            disponivelMotorista[0]++
        }

        if(m.disponivel == "Em Operação") {
            disponivelMotorista[1]++
        }
    })

    veiculos.forEach(v => {

        var novaLinhaVeiculos = linhaVeiculos.cloneNode(true)

        novaLinhaVeiculos.classList.remove('model')

        novaLinhaVeiculos.querySelector('.id_veiculo').innerHTML = v.id_veiculo
        novaLinhaVeiculos.querySelector('.placa').innerHTML = v.placa
        novaLinhaVeiculos.querySelector('.modelo').innerHTML = v.modelo
        novaLinhaVeiculos.querySelector('.marca').innerHTML = v.marca


        if (v.disponivel == "Ativo") {
            novaLinhaVeiculos.querySelector('.img_situation').src = 'img/icons/cicle_on.png'
            disponivelVeiculos[0]++
        }

        if (v.disponivel == "Em Operação") {
            novaLinhaVeiculos.querySelector('.img_situation').src = 'img/icons/cicle_in_operacao.png'
            disponivelVeiculos[1]++
        }
        if (v.disponivel == "Em Manutencao") {
            novaLinhaVeiculos.querySelector('.img_situation').src = 'img/icons/cicle_manutencao.png'
            disponivelVeiculos[2]++

        }

        // novaLinhaVeiculos.querySelector('.situacao').innerHTML = v.disponivel

        document.querySelector('.contVeiculos').appendChild(novaLinhaVeiculos)
    })

    console.log(disponivelVeiculos);
    Graficos(disponivel,disponivelVeiculos,disponivelMotorista)
    GraficoDeLinha()
}

function Graficos(disponivel,disponivelVeiculos) {

    var ctx = document.getElementById('myChart').getContext('2d');
    var myDoughnutChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Operações em Andamento ' , 'Operações Finalizadas'],
            datasets: [{
                data: disponivel,
                backgroundColor: [
                    // 'rgb(54, 162, 235)',
                    '#009CE6',
                    '#212124'
                ]
            }]
        },
        options: {
            cutoutPercentage: 50
        }
    });

    var ctx = document.getElementById('myChartMotorista').getContext('2d');
    var myDoughnutChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Motoristas Em Operação ', 'Motoristas Disponiveis '],
            datasets: [{
                data: disponivelMotorista,
                backgroundColor: [
                    // 'rgb(54, 162, 235)',
                    '#009CE6',
                    '#90ee90'
                ]
            }]
        },
        options: {
            cutoutPercentage: 50
        }
    });


    var ctx = document.getElementById('myDonultVeiculo').getContext('2d');
    var myDoughnutChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Veiculos Disponiveis ' , 'Veiculos Em Operação', 'Veiculos Na Manutenção'],
            datasets: [{
                data: disponivelVeiculos,
                backgroundColor: [
                    // 'rgb(54, 162, 235)',
                    '#90ee90',
                    '#009CE6',
                    'Yellow'
                ]
            }]
        },
        options: {
            cutoutPercentage: 50
        }
    });

    

}

function GraficoDeLinha() {




    



    const manutencoesPorMes = [0,0,0,0,0,0,0,0,0,0,0,0]
    const manutencoesValorPorMes = [0,0,0,0,0,0,0,0,0,0,0,0]

    const operacoesPorMes = [0,0,0,0,0,0,0,0,0,0,0,0]

    manutencao.forEach(m => {
        const dataDaManutencao = new Date(m.data_inicio)
        const mesDaManutencao = dataDaManutencao.getMonth()
        manutencoesPorMes[mesDaManutencao]++

        manutencoesValorPorMes[mesDaManutencao] += m.valor
        console.log(m.valor);
        console.log(manutencoesValorPorMes);
    })

    operacoes.forEach(o => {

        const dataDaOperacao = new Date(o.data_saida)
        const mesDaOperacao = dataDaOperacao.getMonth()
        
        operacoesPorMes[mesDaOperacao]++
      

        
    })


    var ctx = document.getElementById('meuGrafico').getContext('2d');
    var meuGrafico = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun','Jul','Ago','Set','Out','Nov','Dez'],
            datasets: [{
                label: 'Manutenções', 
                data: manutencoesPorMes,
                backgroundColor: 'Yellow',
                borderColor: '#212124',
                borderWidth: 1
            },

            {
                label: 'Valor Manutenções', 
                data: manutencoesValorPorMes,
                backgroundColor: 'Yellow',
                borderColor: '#212124',
                borderWidth: 1
            },
        
        
        ],
            
        },
        
        options: {}
    });

    var ctx = document.getElementById('graficoLineOperacao').getContext('2d');
    var meuGrafico = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun','Jul','Ago','Set','Out','Nov','Dez'],
            datasets: [{
                label: 'Operações', 
                data: operacoesPorMes,
                backgroundColor: 'Yellow',
                borderColor: '#212124',
                borderWidth: 1
            }]
        },
        options: {}
    });





}


// function cardDetails() {

//     soma += 1
//     var valor_total = 0

//     // document.querySelector('.qtd_veiculos').innerHTML = veiculos.length

//     // console.log(veiculos);

//     // veiculos.forEach(v => {


//     //     if (v.disponivel == true) {

//     //         qtd_Veiculos_Livres += 1


//     //     }

//     //     if (v.disponivel == false) {
//     //         qtd_Veiculos_Manutencao += 1

//     //     }

//     //     var novoCardVeiculos = td_veiculos.cloneNode(true)

//     //     novoCardVeiculos.classList.remove('model')

//     //     novoCardVeiculos.querySelector('.placa').innerHTML = v.placa
//     //     novoCardVeiculos.querySelector('.modelo').innerHTML = v.modelo
//     //     novoCardVeiculos.querySelector('.marca').innerHTML = v.marca
//     //     novoCardVeiculos.querySelector('.tipo').innerHTML = v.tipo
//     //     novoCardVeiculos.querySelector('.disponivel').innerHTML = v.disponivel

//     //     document.querySelector('.contVeiculos').appendChild(novoCardVeiculos)

//     // })
//     manutencao.forEach(m => { valor_total += m.valor })

//     document.querySelector('.qtd_veiculo').innerHTML = veiculos.length
//     document.querySelector('.qtd_manutencao').innerHTML = manutencao.length
//     document.querySelector('.total_manutencao').innerHTML = 'R$' + valor_total + ',00'
//     document.querySelector('.qtd_motoristas').innerHTML = motoristas.length

//     // document.querySelector('.qtd_veiculos_livres').innerHTML = qtd_Veiculos_Livres
//     // document.querySelector('.qtd_veiculos_manutencao').innerHTML = qtd_Veiculos_Manutencao

// }

function cardDetaisOperacoes() {

    document.querySelector('.qtd_operacoes').innerHTML = operacoes.length


    operacoes.forEach(o => {
        if (o.data_retorno == null) {

            qtd_Operacoes_Andamento += 1

        }
        var novoCardOperacoes = td_operacoes.cloneNode(true)

        novoCardOperacoes.classList.remove('model')

        novoCardOperacoes.querySelector('.id_operacao').innerHTML = o.id_operacao
        novoCardOperacoes.querySelector('.motorista').innerHTML = o.id_motorista
        novoCardOperacoes.querySelector('.data_saida').innerHTML = o.data_saida
        novoCardOperacoes.querySelector('.data_retorno').innerHTML = o.data_retorno
        novoCardOperacoes.querySelector('.descricao').innerHTML = o.descricao

        document.querySelector('.contOperacoes').appendChild(novoCardOperacoes)
    })

    document.querySelector('.qtd_operacoes_andamento').innerHTML = qtd_Operacoes_Andamento

}

function cardDetailsMotoristas() {
    document.querySelector('.qtd_motoristas').innerHTML = motoristas.length

    motoristas.forEach(o => {

    })

    document.querySelector('.qtd_operacoes_andamento').innerHTML = qtd_Operacoes_Andamento
}

function cardDetailsUsuarios() {
    document.querySelector('.qtd_usuarios').innerHTML = usuarios.length


}

var tabela_veiculos = document.querySelector('.veiculos_table')
var tabela_operacoes = document.querySelector('.opeacoes_table')

function filtroRelatorios() {

    var select = document.querySelector('.tipo_tabela')

    let tipo = select.options[select.selectedIndex].value;

    if (tipo == 'r_veiculos') {
        tabela_veiculos.classList.remove('model')
        tabela_operacoes.classList.add('model')


    } else if (tipo == 'r_operacoes') {
        tabela_veiculos.classList.add('model')
        tabela_operacoes.classList.remove('model')


    } else {
        var valorTotal = 'R$ 20,00'

    }
}

function editarCliente(e) {

    var id = e.parentNode.parentNode.querySelector('.id_operacao').innerHTML

    var mostrarModal = document.querySelector('.m-editar')

    soma += 1

    mostrarModal.classList.remove('model')

    operacoes.forEach(o => {
        if (id == o.id_opeacao) {
            console.log('indo');

            document.querySelector('.id_editar').innerHTML = o.id_opeacao
            motoristas.forEach(m => {
                if (m.id_motorista == o.id_motorista) {
                    document.querySelector('.m_editar').value = m.nome

                }

            })

            veiculos.forEach(v => {
                if (v.id_veiculo == o.id_veiculo) {

                    document.querySelector('.v_editar').value = v.modelo
                }
            })
            document.querySelector('.ds_editar').value = o.data_saida
            document.querySelector('.dr_tipo').value = o.data_retorno
            document.querySelector('.descricao_txt_area').innerHTML = o.descricao
        }

    })

}

function fecharEditarCliente() {
    var mostrarModal = document.querySelector('.m-editar')
    mostrarModal.classList.toggle('model')

    window.location.reload();

}

function trocarTables() {

    console.log('indo');

    var select_status = document.querySelector(".select_status")
    let seleMotorista = select_status.options[select_status.selectedIndex].value;

    console.log(seleMotorista);
    if (seleMotorista == 'operacao_table') {
        document.querySelector('.table_operacao').style.display = "block"
        document.querySelector('.table_veiculo').style.display = "none"

    }

    if (seleMotorista == 'veiculos_table') {
        document.querySelector('.table_operacao').style.display = "none"
        document.querySelector('.table_veiculo').style.display = "block"

    }
}   

// function movalVeiculo(e) {

//     var id = e.parentNode.parentNode.querySelector('.id_veiculos').innerHTML

//     var mostrarModal = document.querySelector('.m-editar')

//     soma += 1

//     mostrarModal.classList.remove('model')

//     var optionDisponivel = document.createElement('option')
//     optionDisponivel.value = "Ativo"
//     optionDisponivel.innerHTML = "Disponivel"

//     var optionManutencao = document.createElement('option')
//     optionManutencao.value = "Em Manutencao"
//     optionManutencao.innerHTML = "Em Manutencao"


//     if (soma == 1) {
//         carregarManutencoes(id)
//     }

//     veiculos.forEach(v => {
//         if (id == v.id_veiculo) {

//             if (v.disponivel == "Em Operação") {
//                 document.querySelector('.cont_trash').classList.add('model')
//                 document.querySelector('.selects_inps_disp').classList.add('model')


//             }

//             if (v.disponivel == "Em Manutencao") {
//                 document.querySelector('.cont_trash').classList.add('model')
//                 document.querySelector('.select_status').appendChild(optionManutencao)
//                 document.querySelector('.select_status').appendChild(optionDisponivel)

//             }

//             if (v.disponivel == "Ativo") {
//                 document.querySelector('.select_status').appendChild(optionDisponivel)
//                 document.querySelector('.select_status').appendChild(optionManutencao)

//             }

//             document.querySelector('.id_veiculo').innerHTML = v.id_veiculo
//             document.querySelector('.placa_veiculo').value = v.placa
//             document.querySelector('.modelo_veiculo').value = v.modelo
//             document.querySelector('.marca_veiculo').value = v.marca
//             document.querySelector('.tipo_veiculo').value = v.tipo
//             document.querySelector('.disponibilidade').value = v.disponivel

//         }

//         manutencao.forEach(m => {

//             if (v.id_veiculo == m.id_veiculo) {

//                 var data_saida = document.querySelector('.h_saida')
//                 var btn_manutencao = document.querySelector('.btn_finalizar_manutencao')

//                 data_saida.classList.remove('model')
//                 btn_manutencao.classList.add('model')

//                 data_saida.style.textAlign = "center"

//                 document.querySelector('.descricao').value = m.descricao
//                 document.querySelector('.valor').value = m.valor
//                 document.querySelector('.h_entrada').value = m.data_inicio
//                 document.querySelector('.h_saida').value = m.data_inicio


//             }
//         })

//     })

// }