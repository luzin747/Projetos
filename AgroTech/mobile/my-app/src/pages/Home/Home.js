import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Button, TextInput, ImageBackground } from 'react-native';
import * as React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
// import AsyncStorage from '@react-native-async-storage/async-storage';

import style from './style';
import AgroTecLogo from './img/icon_logo.png'


// import Home from '../Home/HomePage'

export default function Home({ navigation }) {

    // useEffect(() => {
    //     setInterval(() => {
    //         console.log('Atualizando a Lista')
    //         listarProdutos()
    //     }, 1500)
    // }, [])

    // const [pedidos, setPedidos] = useState([]);

    // const listarProdutos = () => {
    //     fetch('http://10.87.207.23:3000/Pedidos')
    //         .then(res => { return res.json() })
    //         .then(data => {
    //             setPedidos(data);
    //         })
    // };

    // const PedidoEntregue = async (id) => {
    //     console.log(id)

    //     let data = {
    //         "id_usuario": 3,
    //         "id_perg": id,
    //         "resposta": respostaInp,
    //         "dataResp": "2022-12-14"
    //     }

    //     console.log(data)
    //     const options = {
    //         method: 'PUT',
    //         headers: { 'Content-Type': 'application/json' }
    //     };
    //     options.body = JSON.stringify(data);
    //     fetch("http://localhost:3000/Respostas", options)
    //         .then(resp => resp.status)
    //         .then(resp => {
    //             if (resp == 201) {

    //                 alert('Pedido Entregue com Sucesso')
    //             }
    //             else {
    //                 console.log("Erro Pedido")
    //             }
    //         })
    //         .catch((error) => {
    //             console.log('error', error);
    //         });
    // };


    return (

        <View style={style.container}>
            <View style={style.containerHome}>

                <View style={style.containerTitle}>
                <Image style={style.imageStar} source="https://images6.alphacoders.com/108/1082090.jpg"/> 
                    <Text style={style.titleLogin}>AgroTec</Text>
                </View>

                <View>

        <View>
            
            <View>
                <Image />

                <Text>
                    Veiculo
                </Text>
            </View>

        </View>






                    {/* <Text style={style.title_pedidos_for_you}>Pedidos para Você</Text>

                {
                    pedidos.map((p, index) => {
                        if (p.hora_entrega != ' ' ) {
                            return (

                                <View style={style.pedidos} key={index}>

                                    <View style={style.cliente_details}>
                                        <Text style={style.cliente_details_title}>Cliente</Text>
                                        <Text>{p.cliente}</Text>
                                    </View>

                                    <View style={style.cliente_details}>
                                        <Text style={style.cliente_details_title}>Hora do Pedido:</Text>
                                        <Text>{p.hora_pedido}</Text>

                                        <Text style={style.cliente_details_title}>Saiu para Entrega:</Text>
                                        <Text>{p.hora_entrega}</Text>
                                    </View>

                                    <View style={style.cliente_details}>
                                        <Text style={style.cliente_details_title}>Endereço:</Text>
                                        <Text>{p.endereco}</Text>
                                    </View>


                                    <View style={style.cont_cliente_details_pedido}>
                                        <View style={style.cliente_details_pedido}>
                                            <Text style={style.cliente_details_pedido_title}>Pedido:</Text>
                                            <Text>{p.produto}</Text>
                                        </View>

                                        <View style={style.cliente_details_pedido_preco}>
                                            <Text style={style.cliente_details_title}>Total:</Text>

                                            <Text>R${p.preco}</Text>
                                        </View>
                                    </View>

                                    <View>
                                        <TouchableOpacity style={style.btn_entrega} onPress={() => PedidoEntregue(p.id_pedido)}>
                                            <Text style={style.title_btn_entrega}>Pedido Entregue</Text>
                                        </TouchableOpacity>
                                    </View>

                                </View>
                            )
                        }


                    })
                } */}

                </View>




            </View>
        </View>

    );

}
