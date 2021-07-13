import React from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View, AsyncStorage, Picker,
    Text, BackHandler, 
    StatusBar, CheckBox,
    Image,
    TouchableOpacity,
    TextInput, Linking,
    ImageBackground,
    ToastAndroid,
} from 'react-native';
import styles from './productTrackStyle';
import mainStyles from '../mainStyle';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import Carousel from 'react-native-snap-carousel';
import DatePicker from 'react-native-datepicker';

class ProductTracking extends React.Component {
    constructor(props) {
        super(props);
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
        this.state = {
            phonenum: "",
            error: false,
            connection_Status: true,
            firstName: 'dd',
            lastName: '',
            // spinner: true,
            productName: '',
            department: '',
            maintainace: '',
            siNo: '',
            validationDate: '',
            DiscardDate: '',
            DeliverySelected: true,
            warranty: false
        }
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

    componentDidMount() {
        var ref = this;
        AsyncStorage.getItem('userdetails', async (err, result) => {
            var res = await JSON.parse(result);
            console.log(res, 'responseJson userdetails service engin')
            this.setState({
                firstName: res.first_name,
                lastName: res.last_name,
                spinner: false,
            })
        });
    }

    render() {
        return (
            <View>
                {this.state.spinner ?
                    <View style={{ marginTop: "80%", position: 'absolute', zIndex: 99, width: "100%", paddingHorizontal: 20, height: 70 }}>
                        <View style={{ alignItems: 'center', justifyContent: 'center', height: '100%', }}>
                            <Image
                                source={require('../../assets/images/loader.gif')}
                                style={{ width: 50, height: 50 }} />
                            <Text style={mainStyles.spinnerTextStyle}>please wait</Text>
                        </View>
                    </View>
                    :
                    <View style={{ height: '100%' }}>
                        <ScrollView contentContainerStyle={{ flexGrow: 1, position: 'relative' }}>
                            <View style={{ width: '100%', height: 150, backgroundColor: '#003c69', overflow: 'hidden' }} >
                                <ImageBackground source={require('../../assets/images/banner.png')} style={styles.backgroundImage}>
                                    <View style={styles.loginForm}>
                                        <Text style={{ color: '#ffffff', fontSize: 18, letterSpacing: 0.2 }}>Tracking</Text>
                                    </View>
                                    <View style={{ left: 20, top: 20, position: 'absolute' }}>
                                        <Image
                                            source={require('../../assets/images/backarrow.png')}
                                            style={{ width: 12, height: 12 }} />
                                    </View>
                                </ImageBackground>
                            </View>

                            <View style={styles.registerProductView}>
                                <View style={{ alignItems: 'center', marginBottom: 10 }}>
                                    <TouchableOpacity style={styles.registerHeading}>
                                        <Text style={{ color: '#ffffff', fontWeight: 'bold', letterSpacing: 0.5, fontSize: 16 }}>Product Tracking</Text>
                                    </TouchableOpacity>
                                </View>

                                <View style={styles.TrackBox}> 
                                    <View style={{position: 'absolute'}}>
                                        <Image
                                            source={require('../../assets/images/registerproduct.png')}
                                            style={{ width: 50, height: 50 }} />
                                    </View>
                                    <View style={styles.productView}>
                                        <Text style={styles.nameField}>Product Name</Text>
                                        <Text style={styles.dotView}>:</Text>
                                        <Text style={styles.nameData}>ECG machine</Text>
                                    </View>
                                    <View style={styles.productView}>
                                        <Text style={styles.nameField}>Department Name</Text>
                                        <Text style={styles.dotView}>:</Text>
                                        <Text style={styles.nameData}>Cardiology</Text>
                                    </View>
                                    <View style={styles.productView}>
                                        <Text style={styles.nameField}>Loan Period</Text>
                                        <Text style={styles.dotView}>:</Text>
                                        <Text style={styles.nameData}>12 sep to 1 aug</Text>
                                    </View>
                                    <View style={styles.productView}>
                                        <Text style={styles.nameField}>Status</Text>
                                        <Text style={styles.dotView}>:</Text>
                                        <Text style={styles.nameData}>Lorem ispum</Text>
                                    </View>
                                </View>

                                <View style={styles.TrackBox}> 
                                    <View style={{position: 'absolute'}}>
                                        <Image
                                            source={require('../../assets/images/producttracking.png')}
                                            style={{ width: 50, height: 50 }} />
                                    </View>
                                    <View style={styles.productView}>
                                        <Text style={styles.nameField}>Product Name</Text>
                                        <Text style={styles.dotView}>:</Text>
                                        <Text style={styles.nameData}>ECG machine</Text>
                                    </View>
                                    <View style={styles.productView}>
                                        <Text style={styles.nameField}>Department Name</Text>
                                        <Text style={styles.dotView}>:</Text>
                                        <Text style={styles.nameData}>Cardiology</Text>
                                    </View>
                                    <View style={styles.productView}>
                                        <Text style={styles.nameField}>Loan Period</Text>
                                        <Text style={styles.dotView}>:</Text>
                                        <Text style={styles.nameData}>12 sep to 1 aug</Text>
                                    </View>
                                    <View style={styles.productView}>
                                        <Text style={styles.nameField}>Status</Text>
                                        <Text style={styles.dotView}>:</Text>
                                        <Text style={styles.nameData}>Lorem ispum</Text>
                                    </View>
                                </View>

{/* 
                                <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
                                    <TouchableOpacity onPress={this.clickLogin} style={styles.loginButton}>
                                        <Text style={{ color: '#ffffff', letterSpacing: 0.5 }}>GENERATE BARCODE</Text>
                                    </TouchableOpacity>
                                </View> */}

                            </View>
                        </ScrollView>
                    </View>
                }
            </View>
        )
    }
}
export default ProductTracking;