import { StyleSheet } from 'react-native';

export default StyleSheet.create({ 
    
    ImageBackground: {
        flex: '1',
        resizeMode: 'cover',
    },

    container: {
        height: '100%',
        backgroundColor: "#212124",
    },
    containerHome: {
        backgroundColor: "#fff",
        display: 'flex',
        // alignItems: 'center',
        height: '100%',
        margin: '1%',
        padding: 10,
        borderRadius: '1%'
    },
    containerTitle: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center'
    }

    ,
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
   
    
})

