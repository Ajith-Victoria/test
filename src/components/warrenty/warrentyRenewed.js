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
import styles from './WarrentyStyle';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

class WarrentyRenewed extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            phonenum: "",
            error: false,
            connection_Status: true,
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.backgroundImage}>
                    <View style={styles.warForm}>
                        <View style={styles.backView}>
                        <TouchableOpacity onPress={() => this.props.navigation.goBack()}><Text style={{ color: '#ffffff' }}>Back</Text></TouchableOpacity>
                        </View>

                        <View style={styles.warPage}>

                            <TouchableOpacity onPress={() => this.props.navigation.navigate('ScanProduct')} style={styles.warBox}>
                                <View style={styles.blueLine}>
                                </View>

                                <View style={styles.rightBlueView}>
                                    <Text style={{ fontSize: 13, fontWeight: 'bold' }}>Warrenty not renewed yet, Expire on 25.12.2021</Text>
                                    <View style={{ display: 'flex', flexDirection: 'row', marginTop: 8 }}>
                                        <View style={{ display: 'flex', flexDirection: 'row' }}>
                                            <Text style={{ fontSize: 11 }}>Product Name : </Text>
                                            <Text style={{ fontSize: 11 }}>Endoscope</Text>
                                        </View>
                                        <View style={{ display: 'flex', flexDirection: 'row', marginLeft: 20 }}>
                                            <Text style={{ fontSize: 11 }}>Product ID : </Text>
                                            <Text style={{ fontSize: 11 }}>PID-112384</Text>
                                        </View>
                                    </View>
                                    <View style={{ display: 'flex', flexDirection: 'row', marginTop: 8 }}>
                                        <Text style={{ fontSize: 11, fontWeight: "900" }}>Customer Name : </Text>
                                        <Text style={{ fontSize: 11 }}>Holy Faith Hospital</Text>
                                    </View>

                                    <View style={{ display: 'flex', flexDirection: 'row', marginTop: 10 }}>
                                        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                            <Image
                                                source={require('../../assets/icons/mail.png')}
                                                style={{ width: 12, height: 8 }} />
                                            <Text style={{ fontSize: 11, marginLeft: 5 }}>25.12.2020</Text>
                                        </View>
                                        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginLeft: 20 }}>
                                            <Image
                                                source={require('../../assets/icons/mail.png')}
                                                style={{ width: 12, height: 8 }} />
                                            <Text style={{ fontSize: 11, marginLeft: 5 }}>2.30 PM - 3.30 PM</Text>
                                        </View>
                                        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginLeft: 20 }}>
                                            <Text style={{ fontSize: 11, marginLeft: 5, fontWeight: 'bold' }}>STATUS : </Text>
                                            <Text style={{ fontSize: 11, color: 'red', fontWeight: 'bold' }}>OPEN</Text>
                                        </View>
                                    </View>

                                </View>
                            </TouchableOpacity>

                        </View>
                    </View>
                </View>
            </View>
        )
    }
}
export default WarrentyRenewed;