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
    // #14a852
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
        // backgroundColor: '#000000',
        paddingHorizontal: 25,
        paddingVertical: 10,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'

    },
    registerHeading: {
        paddingVertical: 8,
        paddingHorizontal: 10,
        backgroundColor: '#14a852',
        borderRadius: 5,
        alignItems: 'center',
        width: '80%'
    },
    warPage: {
        height: '100%',
        width: '100%',
        backgroundColor: '#ffffff',
        marginTop: 20,
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        paddingVertical: 20,
        paddingTop: 20,
        // paddingHorizontal: 15
    },
    productBox: {
        backgroundColor: '#ffffff',
        overflow: 'hidden',
        marginTop: 15,
        marginBottom: 30
    },
    inputView: {
        display: 'flex',
        flexDirection: 'row',
        // alignItems: 'center',
        marginTop: 15
    },
    nameData: {
        color: '#8e9292',
        fontWeight: 'bold',
        // width: '55%',
    },
    nameField: {
        width: 150,
        color: '#000000',
        fontWeight: 'bold'
    },
    nameView: {
        width: 120,
        fontSize: 11,
        fontWeight: 'bold'
    },
    fieldView: {
        fontSize: 12,
        lineHeight: 18,
        fontWeight: 'bold'
    },
    pickerInput: {
        flex: 1,
        color: '#000000',
        // fontSize: 17,
        borderColor: '#14a852',
        borderWidth: 1,
        borderRadius: 5,
        height: 35,
        // paddingVertical: -40
        // width: 100
        // paddingVertical: 5,
    },
    pickerInput2: {
        flex: 1,
        color: '#000000',
        paddingLeft: 10,
        fontSize: 10,
        borderColor: '#14a852',
        borderWidth: 1,
        borderRadius: 5,
        maxHeight: 35,
        // width: 140
        // paddingVertical: 5,
    },
    input: {
        flex: 1,
        color: '#000000',
        paddingLeft: 10,
        fontSize: 12,
        borderColor: '#14a852',
        borderWidth: 1,
        borderRadius: 5,
        maxHeight: 35,
        // width: 140
        // paddingVertical: 5,
    },
    emailSection: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        maxHeight: 40,
        paddingLeft: 10,
        // paddingVertical: 5,
        borderColor: '#14a852',
        borderWidth: 1,
        borderRadius: 5
    },
    loginButton: {
        paddingVertical: 10,
        paddingHorizontal: 15,
        backgroundColor: '#14a852',
        borderRadius: 5,
        marginTop: 15,
        alignItems: 'center',
    }
})
