import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover', // or 'stretch'
        // opacity: 0.5
    },
    loginForm: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    logoImage: {
        width: 50,
        height: 170
    },
    loginView: {
        marginTop: -50,
        height: 230,
        width: '100%',
        // alignItems: 'center',
        justifyContent: 'center',
        // paddingVertical: 35,
        // shadowColor: '#000',
        // shadowOffset: { width: 0, height: 2 },
        // shadowOpacity: 0.8,
        // shadowRadius: 6,
        // borderColor: '#c8ccd0',
        // borderTopColor: '#c8ccd0',
        // borderWidth: 1,
        // elevation: 4,
        // borderRadius: 7,
        // backgroundColor: '#ffffff',
    },
    loginText: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    emailSection: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 25,
        // maxWidth: 10,
        maxHeight: 45,
        paddingLeft: 10,
        // paddingVertical: 5,
        // borderColor: '#8ad9f8',
        backgroundColor: '#dee4ea',
        // borderWidth: 1,
        borderRadius: 8
    },
    passwordSection: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        // maxWidth: 10,
        maxHeight: 45,
        paddingLeft: 10,
        borderRadius: 8,
        backgroundColor: '#dee4ea',
    },
    input: {
        flex: 1,
        color: '#02bcb1',
        paddingLeft: 10,
        fontSize: 16,
        // paddingVertical: 5,
    },
    loginButton: {
        // marginTop: 35,
        // backgroundColor: 'red',
        justifyContent: 'flex-end',
        alignItems: 'flex-end'
        // position: 'absolute',
        // right: 0
        // alignItems: 'center',
    }
})

// height: 200,
// width: '100%',
// paddingVertical: 30,
// shadowColor: '#000',
// shadowOffset: { width: 0, height: 2 },
// shadowOpacity: 0.4,
// shadowRadius: 2,
// borderColor: '#000',
// elevation: 3,
// borderRadius: 7,
// backgroundColor: '#ffffff',
// padding: 20,
// marginTop: 30,

// shadowColor: '#000',
// shadowOffset: { width: 0, height: 2 },
// shadowOpacity: 0.8,
// shadowRadius: 2,
// elevation: 5,
// marginTop: -30,
// height: 200,
// width: '100%',
// padding: 20,
// paddingVertical: 30,
// borderRadius: 20,
// backgroundColor: '#ffffff'