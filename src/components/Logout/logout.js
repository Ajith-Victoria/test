import React from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text, Alert,
    StatusBar,
    Image, AsyncStorage,
    TouchableOpacity,
    TextInput,
    ImageBackground,
    ToastAndroid,
} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

class Logout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            phonenum: "",
            logout: 'logout',
        }
    }

    componentDidMount() {
        this.logout()
    }

    goLogout = () => {
         AsyncStorage.setItem("logout", JSON.stringify(this.state.logout));
        this.props.navigation.navigate('Login')
    }

    gotoHome = () => {
        console.log("home ffff")
        this.props.navigation.navigate('Home', { details: "hello" })
    }

    logout = () => {
        Alert.alert(
            'Are you sure want to Logout',
            '',
            [
                { text: 'YES', onPress: () => this.goLogout() },
                { text: 'cancel', onPress: () => this.gotoHome() },
            ],
            { cancelable: false },
        );
    }

    render() {
        return (
            <View style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ color: '#02bcb1', fontSize: 20, fontWeight:'bold' }}>LOGOUT</Text>
            </View>
        )
    }
}
export default Logout;
