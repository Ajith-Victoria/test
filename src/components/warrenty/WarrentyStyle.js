import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover', // or 'stretch'
        backgroundColor: '#14a852'
    },
    warForm: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        flex: 1,
        // alignItems: 'center',
        // justifyContent: 'center'
    },
    backView: {
        backgroundColor: '#000000',
        paddingLeft: 25,
        paddingVertical: 10
    },
    warPage: {
        height: '100%',
        width: '100%',
        backgroundColor: '#ffffff',
        marginTop: 50,
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        paddingVertical: 50,
        paddingHorizontal: 15
    },
    warBox: {
       
        shadowColor: '#000',
        shadowOffset: { width: 7, height: 7 },
        shadowOpacity: 0.4,
        shadowRadius: 15,
        borderRadius: 15,
        borderColor: '#c8ccd0',
        // borderTopColor: '#c8ccd0',
        // borderWidth: 1,
        elevation: 8,
        backgroundColor: '#ffffff',
        display: 'flex',
        overflow: 'hidden',
        flexDirection: 'row',
    },
    blueLine: {
        backgroundColor: '#03447e',
        width: 10,
        height: '100%',
        borderTopLeftRadius: 25,
        borderBottomLeftRadius: 25,
    },
    rightBlueView: {
        paddingHorizontal: 7,
        paddingVertical: 15,
        backgroundColor: '#ffffff',
       
    }
})
