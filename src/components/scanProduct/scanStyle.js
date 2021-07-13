import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
    },
    backView: {
        backgroundColor: '#02bcb1',
        paddingHorizontal: 25,
        paddingVertical: 10,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: 50
        // justifyContent: 'space-between'
    },
    loginButton: {
        paddingVertical: 10,
        paddingHorizontal: 10,
        backgroundColor: '#02bcb1',
        borderRadius: 5,
        marginTop: 35,
        alignItems: 'center',
        width: 150
    },
})
