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

class Settings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            phonenum: "",
        }
    }

    render() {
        return (
            <View style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
               <Text style={{ color: '#02bcb1', fontSize: 20, fontWeight:'bold' }}>SETTINGS</Text>
            </View>
        )
    }
}
export default Settings;