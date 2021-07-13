import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    loader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        width: '100%',
      },
      spinnerTextStyle: {
        color: '#04abbb',
        marginTop: 20,
        // fontFamily: 'monospace',
      },
      activeTab: {
        width: 40, 
        height: 40, 
        marginBottom: 30,
        shadowColor: 'red',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 6,
        borderWidth: 1,
        elevation: 4,
        borderRadius: 15,
        borderBottomColor: 'red'
      }
})
