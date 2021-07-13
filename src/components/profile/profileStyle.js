import { StyleSheet } from 'react-native';

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
        paddingTop: 15,
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
    cardView: {
        display: 'flex', 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        shadowColor: '#000',
        shadowOffset: { width: 7, height: 7 },
        shadowOpacity: 0.4,
        shadowRadius: 10,
        borderRadius: 10,
        borderColor: '#c8ccd0',
        // borderTopColor: '#c8ccd0',
        paddingHorizontal: 10,
        paddingVertical: 10,
        // borderWidth: 1,
        elevation: 8,
        marginBottom: 10,
        marginTop: 10,
        backgroundColor: '#ffffff',
        marginHorizontal: 10
    },
    carouselView: {
        width: "100%", 
        // height: 180, 
        backgroundColor: '#ffffff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 10,
        borderColor: '#c8ccd0',
        // borderTopColor: '#c8ccd0',
        borderWidth: 1,
        elevation: 4,
        borderRadius: 15,
        paddingVertical: 15,
        paddingTop: 10
      },
      assetDetailsCard: {
        display: 'flex', 
        flexDirection: 'row', 
        marginTop: 7
      },
      nameText: {
        fontWeight: 'bold', 
        color: '#838682', 
        overflow: 'hidden', 
        fontSize: 14,
        width: 120
      },
      dataText: {
        fontWeight: 'bold', 
        color: '#000000', 
        overflow: 'hidden', 
        fontSize: 14
      },
      dotStyle: {
        fontWeight: 'bold', 
        color: '#838682', 
        overflow: 'hidden', 
        fontSize: 14,
      }
})
