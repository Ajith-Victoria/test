import { StyleSheet, Platform } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover', // or 'stretch'
        backgroundColor: '#02bcb1'
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
    // 02bcb1
    // 0298D5
    backView: {
        backgroundColor: '#02bcb1',
        paddingHorizontal: 25,
        // paddingVertical: 10,
        paddingTop: 35,
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
        marginTop: 30,
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        paddingVertical: 20,
        paddingTop: 30,
    },
    productBox: {
        backgroundColor: '#ffffff',
        overflow: 'hidden',
        // marginTop: 15,
        marginBottom: 30
    },
    hoursPickerView: {
        ...Platform.select({
            android: {
                width: '100%',
                backgroundColor: '#efefefef',
                marginTop: 10,
                borderRadius: 8,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.4,
                shadowRadius: 6,
                borderColor: '#c8ccd0',
                borderTopColor: '#c8ccd0',
                borderWidth: 0.5,
                elevation: 4,
                borderRadius: 7,
            },
            ios: {
                marginTop: -50
            }
        })

    },
    daysInputView: {
        ...Platform.select({
            android: {
                // marginLeft: 10,
                width: '100%',
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 10,
                // maxWidth: 10,
                // maxHeight: 70,
                // paddingLeft: 10,
                // paddingVertical: 3,
                // borderColor: '#8ad9f8',
                backgroundColor: '#efefefef',
                // borderWidth: 1,
                borderRadius: 8,

                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.4,
                shadowRadius: 6,
                borderColor: '#c8ccd0',
                borderTopColor: '#c8ccd0',
                borderWidth: 0.5,
                elevation: 4,
                borderRadius: 7,
            },
            ios: {
                
            }
        })
    },
    daysInput: {
        ...Platform.select({
            androidL: {
                flex: 1,
                fontWeight: '900',
                color: '#000000',
                paddingLeft: 10,
                fontSize: 16,
                // paddingVertical: 5,
            },
            ios: {
                color: '#000000',
                height: 40,
                marginTop: 35,
                paddingLeft: 10,
                fontSize: 16,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.4,
                shadowRadius: 6,
                borderColor: '#c8ccd0',
                borderTopColor: '#c8ccd0',
                borderWidth: 0.5,
                elevation: 4,
                borderRadius: 7,
            }
        })

    },
    pickerView: {
        ...Platform.select({
            ios: {
                marginTop: -50
            },
            android: {
                width: '100%',
                backgroundColor: '#efefefef',
                marginTop: 20,
                borderRadius: 8,
                height: 40,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.4,
                shadowRadius: 6,
                borderColor: '#c8ccd0',
                borderTopColor: '#c8ccd0',
                borderWidth: 0.5,
                elevation: 4,
                borderRadius: 7,
            },
        }),
    },
    departmentView: {
        ...Platform.select({
            ios: {
                // height: 100
                marginTop: -70
            },
            android: {
                width: '100%',
                backgroundColor: '#efefefef',
                marginTop: 20,
                borderRadius: 8,
                height: 40,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.4,
                shadowRadius: 6,
                borderColor: '#c8ccd0',
                borderTopColor: '#c8ccd0',
                borderWidth: 0.5,
                elevation: 4,
                borderRadius: 7,
            },
        }),
    },
    loanPeriodText: {
        ...Platform.select({
            ios: {
                color: '#14a852',
                fontWeight: '900',
                letterSpacing: 0.3,
                marginTop: -20,
                fontSize: 16
            },
            android: {
                color: '#14a852',
                fontWeight: '900',
                letterSpacing: 0.3,
                marginTop: 20,
                fontSize: 16
            }
        })
    },
    inputView: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 25,
        // maxWidth: 10,
        maxHeight: 45,
        // paddingLeft: 10,
        // paddingVertical: 5,
        // borderColor: '#8ad9f8',
        backgroundColor: '#efefefef',
        width: '100%',
        // borderWidth: 1,
        borderRadius: 8,

        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.4,
        shadowRadius: 6,
        borderColor: '#c8ccd0',
        borderTopColor: '#c8ccd0',
        borderWidth: 0.5,
        elevation: 4,
        borderRadius: 7,
    },
    input: {
        flex: 1,
        fontWeight: '900',
        color: '#000000',
        paddingLeft: 10,
        fontSize: 14,
        // paddingVertical: 5,
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
        backgroundColor: '#02bcb1',
        borderRadius: 5,
        marginTop: 15,
        alignItems: 'center',
    }
})
