import React from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View, AsyncStorage,
    Text,
    StatusBar, BackHandler, 
    Image,
    TouchableOpacity,
    TextInput, Linking,
    ImageBackground,
    ToastAndroid, Platform,
    AlertIOS,
} from 'react-native';
import styles from './scanStyle';
import mainStyles from '../mainStyle';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

class ScanProduct extends React.Component {
    constructor(props) {
        super(props);
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
        this.state = {
            qrCode: '',
            spinner: true,
        }
    }

    componentDidMount() {
        this.setState({
            spinner: false,
        })
    }

    componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    handleBackButtonClick() {
        this.props.navigation.goBack(null);
        return true;
    }

    onSuccess = e => {
        console.log(e, 'getting code')
        var code = e.data
        var values = code.split(" ");
        var f_number = values[0];
        var l_number = values[1];
        console.log(f_number);
        console.log(l_number);
        fetch('https://meddbot.com/api_scanproduct', {
            method: 'post',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: 'product_id=' + this.props.route.params.item.product_id + '&barcode=' + l_number 
            + '&notification_id=' + this.props.route.params.item.notificationid
        }).then((response) => response.json())
            .then(async (responseJson) => {
                console.log(responseJson, 'delivery myAsset details barcodeSubmit');
                if(responseJson.status == true) {
                    if (Platform.OS === "android") {
                        ToastAndroid.show(
                          "Successfully submited",
                          ToastAndroid.SHORT
                        );
                      } else {
                        alert("Successfully submited");
                      }
                    this.props.navigation.navigate('Home', { assetId: 'fromProductDetails' })
                }
                else {
                    if (Platform.OS === "android") {
                        ToastAndroid.show(
                          "Barcode Error",
                          ToastAndroid.SHORT
                        );
                      } else {
                        alert("Barcode Error");
                      }
                    this.props.navigation.goBack(null);
                }
            }).catch((error) => {
                console.warn(error, 'error');
                if (Platform.OS === "android") {
                    ToastAndroid.show(
                      "Barcode Error",
                      ToastAndroid.SHORT
                    );
                  } else {
                    alert("Barcode Error");
                  }
            });
        // this.setState({
        //     qrCode: l_number
        // })
    };
    
    barcodeSubmit = () => {
        // this.props.navigation.navigate('ProductDetails', { qrCode: this.state.qrCode })
        console.log(this.props.route.params.item.product_id, 'delivery myAsset details product_id');
        console.log(this.state.qrCode, 'delivery myAsset details barcode');
        console.log(this.props.route.params.item.notificationid, 'delivery myAsset details notification');
        fetch('https://meddbot.com/api_scanproduct', {
            method: 'post',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: 'product_id=' + this.props.route.params.item.product_id + '&barcode=' + this.state.qrCode 
            + '&notification_id=' + this.props.route.params.item.notificationid
        }).then((response) => response.json())
            .then(async (responseJson) => {
                console.log(responseJson, 'delivery myAsset details barcodeSubmit');
                this.props.navigation.navigate('Home', { assetId: 'fromProductDetails' })
                if(responseJson.status == true) {
                    if (Platform.OS === "android") {
                        ToastAndroid.show(
                          "Successfully submited",
                          ToastAndroid.SHORT
                        );
                      } else {
                        alert("Successfully submited");
                      }
                }
                else {
                    if (Platform.OS === "android") {
                        ToastAndroid.show(
                          "Barcode Error",
                          ToastAndroid.SHORT
                        );
                      } else {
                        alert("Barcode Error");
                      }
                }
            }).catch((error) => {
                console.warn(error, 'error');
                if (Platform.OS === "android") {
                    ToastAndroid.show(
                      "Barcode Error",
                      ToastAndroid.SHORT
                    );
                  } else {
                    alert("Barcode Error");
                  }
            });
    }

    render() {
        console.log(this.state.qrCode, 'qr oce state')
        return (
            <View style={styles.container}>
                {this.state.spinner ?
                    <View style={{ marginTop: "80%", position: 'absolute', zIndex: 99, width: "100%", paddingHorizontal: 20, height: 70 }}>
                        <View style={{ alignItems: 'center', justifyContent: 'center', height: '100%', }}>
                            <Image
                                source={require('../../assets/icons/loader.gif')}
                                style={{ width: 50, height: 50 }} />
                            <Text style={mainStyles.spinnerTextStyle}>please wait</Text>
                        </View>
                    </View>
                    :
                    <View style={{ flex: 1 }}>
                        <View style={styles.backView}>
                            <TouchableOpacity style={{ position: 'absolute', left: 10, }} onPress={() => this.props.navigation.goBack()}>
                                <Image
                                    source={require('../../assets/icons/back.png')}
                                    style={{ width: 25, height: 25 }} />
                            </TouchableOpacity>
                            <View><Text style={{ color: '#ffffff', fontWeight: 'bold', letterSpacing: 0.2 }}>SCAN BARCODE</Text></View>
                        </View>
                        <View style={{ marginTop: 60 }}>
                            <QRCodeScanner
                                onRead={this.onSuccess}
                                // flashMode={RNCamera.Constants.FlashMode.torch}
                                // topContent={
                                //     <Text style={styles.centerText}>
                                //         Go to{' '}
                                //         <Text style={styles.textBold}>wikipedia.org/wiki/QR_code</Text> on
                                //         your computer and scan the QR code.
                                //     </Text>
                                // }
                                // reactivate={true}
                                showMarker={true}
                            // bottomContent={
                            //     <TouchableOpacity style={styles.buttonTouchable}>
                            //         <Text style={styles.buttonText}>OK. Got it!</Text>
                            //     </TouchableOpacity>
                            // }
                            />
                        </View>
                        {/* {this.state.qrCode !== '' &&
                        <View style={{ alignItems: 'center', position: 'absolute', bottom: 50, left: '25%', zIndex: 99 }}>
                            <TouchableOpacity onPress={this.barcodeSubmit} style={styles.loginButton}>
                                <Text style={{ color: '#ffffff', letterSpacing: 0.5 }}>SUBMIT</Text>
                            </TouchableOpacity>
                        </View>
                        } */}
                    </View>
                }
            </View>
        )
    }
}
export default ScanProduct;