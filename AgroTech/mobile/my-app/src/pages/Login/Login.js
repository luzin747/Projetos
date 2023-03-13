import { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Button, TextInput, ImageBackground } from 'react-native';
import * as React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
// import AsyncStorage from '@react-native-async-storage/async-storage';

import MineIcon from './img/iconLogin.png'
import AgroTecLogo from './img/icon_logo.png'
import style from './style';

import Home from '../Home/Home'

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

export default function LogoutPage({ navigation }) {
    const [input, setInput] = useState('')
    const [hidePass, sideHidePass] = useState(true);


    const [usuario, setUsuario] = useState("");
    const [password, setPassword] = useState("");


    function logar() {


        console.log('logando');

        let data = {
            "email": usuario,
            "senha": input
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

                console.log(data.erro);

                if (data.erro === undefined) {
                    console.log(data)
                    localStorage.setItem("info", JSON.stringify({ "id_user": data.uid, "nome": data.uname, "token": data.token }));


                    navigation.navigate("Home")

                    // usuarios.forEach(u => {
                    //     if(u.id == data.uid) {


                    //         if(u.tipo == "usuario") {
                    //             window.location.href = '../AreaComum/areaComum.html'
                    //             console.log('useres');

                    //         }

                    //         if(u.tipo == "gerente") {
                    //         console.log('geres');

                    //              window.location.href = '../../home.html'

                    //         }
                    //     }
                    // })

                }
            })
    }

    return (
        <View style={style.container}>

            <View style={style.containerLogin}>
                <Image style={style.imgLogin} source={AgroTecLogo} />

                <Text style={style.titleLogin}>LOGIN AgroTec</Text>

                <View>
                    <TextInput style={style.inputs} placeholder='Insira seu Usuario' onChangeText={(value) => { setUsuario(value) }} />
                    <TextInput style={style.inputs} placeholder='Insira sua Senha' placeholderTextColor='black' value={input} onChangeText={(texto) => setInput(texto)} secureTextEntry={hidePass} />
                </View>

                <TouchableOpacity style={style.containerBtnLogin} onPress={logar}>
                    <Text style={style.titleBtnLogin}>Logar</Text>
                    {/* <Image style={style.creeperIcon} source={CreeperIcon} /> */}
                </TouchableOpacity>

                {/* <Text style={style.containerTitleFacaLogin}>Ou Faça Login com:</Text>
                    <View style={style.containerIcons}>
                        <TouchableOpacity><Ionicons style={style.iconIon} name={'logo-google'} /></TouchableOpacity>
                        <TouchableOpacity><Ionicons style={style.iconIon} name={'logo-facebook'} /></TouchableOpacity>
                        <TouchableOpacity><Ionicons style={style.iconIon} name={'logo-twitter'} /></TouchableOpacity>
                    </View> */}

            </View>
        </View>

    );

}
