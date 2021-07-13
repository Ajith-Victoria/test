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
        paddingHorizontal: 25,
        paddingVertical: 10,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'

    },
    comPage: {
        height: '100%',
        width: '100%',
        backgroundColor: '#ffffff',
        marginTop: 40,
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        paddingVertical: 20,
        paddingHorizontal: 20
    },
    productBox: {
        marginTop: 15,
        // height: '100%',
        // width: '100%',
        shadowColor: '#000',
        shadowOffset: { width: 7, height: 7 },
        shadowOpacity: 0.4,
        shadowRadius: 25,
        borderRadius: 25,
        borderColor: '#c8ccd0',
        // borderTopColor: '#c8ccd0',
        // borderWidth: 1,
        elevation: 8,
        backgroundColor: '#ffffff',
        overflow: 'hidden',
    },
    inputView: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10
    },
    nameView: {
        width: 140,
        fontSize: 11,
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
        paddingHorizontal: 10,
        backgroundColor: '#14a852',
        borderRadius: 5,
        marginTop: 35,
        alignItems: 'center',
        width: 150
    },
    textAreaContainer: {
        borderColor: '#14a852',
        borderWidth: 1,
        padding: 5,
        marginTop: 10,
        // textAlignVertical: 'top'
    },
    textArea: {
        height: 150,
        justifyContent: "flex-start",
        textAlignVertical: 'top'
    },
    ButtonChangeSection: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 25
    },
})
