import { StyleSheet } from 'react-native';

export default StyleSheet.create({ 
    container: {
        backgroundColor: '#23124'
    },
    ImageBackground: {
        flex: '1',
        resizeMode: 'cover',
    },

    container: {
        backgroundColor: "White",
        height: '100%'
    },
    containerLogin: {
        display: 'flex',
        alignItems: 'center',
        marginTop: '33%',
        marginLeft: 15,
        marginRight: 15,
        padding: 10,
        borderRadius: '1%',
        boxShadow: "0px 0px 10px rgba(0,0,0,.4)"
    },

    imgLogin: {
        width: 60,
        height: 60
    },
    titleLogin: {
        color: 'black',
        marginTop: '3%',
        fontWeight: 700,
        fontSize: '16pt'
    },
    inputs: {
        margin: 10,
        marginTop: 20,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(0,0,0,.5)',
        padding: 4,
        paddingLeft: 5,
        width: '78vw',

    },
    
    containerBtnLogin: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#212124',
        color: 'white',
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 35,
        paddingRight: 35,
        borderRadius: 50,
        marginTop: '5%',
        marginBottom: '4%'

    },
    titleBtnLogin: {
        color: 'white',
        fontWeight: 700,
    },

    creeperIcon: {
        marginLeft: 5,
        width: 10,
        height: 10,
        marginTop: 1
    },

    containerIcons: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: '5%',
    },
    containerTitleFacaLogin: {
        marginTop: '7%'
    },

    iconIon: {
        margin: 4,
        fontSize: '15pt',
    }
    
})

