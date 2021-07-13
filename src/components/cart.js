import React from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    Image,
    TouchableOpacity,
    TextInput,
    ImageBackground,
    ToastAndroid,
} from 'react-native';

class Cart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            phonenum: "",
            error: false,
            connection_Status: true,
        }
    }

    render() {
        console.log(this.state.phonenum, 'tt')
        return (
            <View style={{ width: '100%', height: '100%' }}>
               <Text>Cart</Text>
            </View>
        )
    }
}
export default Cart;