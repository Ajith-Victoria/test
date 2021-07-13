import React from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView, BackHandler, 
    View, AsyncStorage, Picker,
    Text,
    StatusBar, CheckBox,
    Image,
    TouchableOpacity,
    TextInput, Linking,
    ImageBackground,
    ToastAndroid,
} from 'react-native';
import styles from './registerProductStyle';
import mainStyles from '../mainStyle';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import Carousel from 'react-native-snap-carousel';
import DatePicker from 'react-native-datepicker';

class RegisterProduct extends React.Component {
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

    _renderItem({ item, index }) {
        return (
            <View style={{
                backgroundColor: 'floralwhite',
                borderRadius: 5,
                height: 250,
                padding: 50,
                marginLeft: 25,
                marginRight: 25,
            }}>
                <Text style={{ fontSize: 30 }}>{item.title}</Text>
                <Text>{item.text}</Text>
            </View>

        )
    }

    render() {
        console.log(this.state.qrCode, 'qr oce state')
        const today = new Date();
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
                                        <Text style={{ color: '#ffffff', fontSize: 18, letterSpacing: 0.2 }}>Register Product</Text>
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
                                        <Text style={{ color: '#ffffff', fontWeight: 'bold', letterSpacing: 0.5, fontSize: 16 }}>Register Product Details</Text>
                                    </TouchableOpacity>
                                </View>

                                <View style={styles.productView}>
                                    <Text style={styles.nameField}>Product Name</Text>
                                    <View style={styles.pickerView}>
                                        <Picker
                                            selectedValue={this.state.productName}
                                            onValueChange={(value) => this.setState({ productName: value })}
                                        >
                                            <Picker.Item color="#8e9292" label="Select" value="Select" />
                                            <Picker.Item color="#8e9292" label="Tissue Processor" value="Tissue Processor" />
                                            <Picker.Item color="#8e9292" label="Product Two" value="Product Two" />
                                        </Picker>
                                    </View>
                                </View>

                                <View style={styles.productView}>
                                    <Text style={styles.nameField}>Department</Text>
                                    <View style={styles.pickerView}>
                                        <Picker
                                            selectedValue={this.state.department}
                                            onValueChange={(value) => this.setState({ department: value })}
                                        >
                                            <Picker.Item color="#8e9292" label="Select" value="Select" />
                                            <Picker.Item color="#8e9292" label="Department one" value="Department one" />
                                            <Picker.Item color="#8e9292" label="Department Two" value="Department Two" />
                                        </Picker>
                                    </View>
                                </View>

                                <View style={styles.productView}>
                                    <Text style={styles.nameField}>Preventive Maintainace</Text>
                                    <View style={styles.pickerView}>
                                        <Picker
                                            selectedValue={this.state.maintainace}
                                            onValueChange={(value) => this.setState({ maintainace: value })}
                                        >
                                            <Picker.Item color="#8e9292" label="Select" value="Select" />
                                            <Picker.Item color="#8e9292" label="maintainace one" value="maintainace one" />
                                            <Picker.Item color="#8e9292" label="maintainace Two" value="maintainace Two" />
                                        </Picker>
                                    </View>
                                </View>

                                <View style={styles.productView}>
                                    <Text style={styles.nameField}>Manufacture SL No</Text>
                                    {/* <View style={styles.pickerView}> */}
                                    <TextInput
                                        style={styles.input}
                                        placeholder="Enter the number"
                                        placeholderTextColor="#8e9292"
                                        value={this.state.siNo}
                                        onChangeText={(EmailString) => { this.setState({ siNo: EmailString }) }}
                                    />
                                    {/* </View> */}
                                </View>

                                <View style={styles.productView}>
                                    <Text style={styles.nameField}>Validation Due Date</Text>
                                    <View style={styles.pickerView}>
                                        <DatePicker
                                            style={styles.Datepicker}
                                            date={this.state.validationDate}
                                            mode="date"
                                            placeholder="DD-MM-YYYY"
                                            format="DD-MM-YYYY"
                                            minDate={today}
                                            confirmBtnText="Confirm"
                                            cancelBtnText="Cancel"
                                            customStyles={{
                                                dateInput: { borderWidth: 0, alignItems: "flex-start" },
                                                dateTouchBody: { borderColor: "red", borderWidth: 0 },
                                                placeholderText: { fontSize: 12, color: "#8e9292" },
                                                dateText: { fontSize: 14, color: "#8e9292", textAlign: "left" },
                                                dateIcon: { position: 'absolute', right: 0, top: 12, bottom: 0, marginLeft: 0, height: 20, width: 20 },
                                            }}
                                            onDateChange={(date) => { this.setState({ validationDate: date }) }}
                                        />
                                        {/* {this.state.error && <View>
                                            {this.state.date == '' ? <Text style={{ color: 'red', paddingLeft: 5 }}>Date is Required</Text> : <Text style={{ display: 'none' }}></Text>}
                                        </View>} */}
                                    </View>
                                </View>

                                <View style={styles.productView}>
                                    <Text style={styles.nameField}>Product Discard Year</Text>
                                    <View style={styles.pickerView}>
                                        <DatePicker
                                            style={styles.Datepicker}
                                            date={this.state.DiscardDate}
                                            mode="date"
                                            placeholder="DD-MM-YYYY"
                                            format="DD-MM-YYYY"
                                            minDate={today}
                                            confirmBtnText="Confirm"
                                            cancelBtnText="Cancel"
                                            customStyles={{
                                                dateInput: { borderWidth: 0, alignItems: "flex-start" },
                                                dateTouchBody: { borderColor: "red", borderWidth: 0 },
                                                placeholderText: { fontSize: 12, color: "#8e9292" },
                                                dateText: { fontSize: 14, color: "#8e9292", textAlign: "left" },
                                                dateIcon: { position: 'absolute', right: 0, top: 12, bottom: 0, marginLeft: 0, height: 20, width: 20 },
                                            }}
                                            onDateChange={(date) => { this.setState({ DiscardDate: date }) }}
                                        />
                                        {/* {this.state.error && <View>
                                            {this.state.date == '' ? <Text style={{ color: 'red', paddingLeft: 5 }}>Date is Required</Text> : <Text style={{ display: 'none' }}></Text>}
                                        </View>} */}
                                    </View>
                                </View>

                                <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: 15}}>
                                    <CheckBox
                                        // disabled={!this.state.value == 0}
                                        value={this.state.warranty}
                                        onValueChange={() => this.setState({
                                            warranty: !this.state.warranty,
                                            DeliverySelected: false,
                                            value: 'store'
                                        })}
                                    />
                                    <Text style={{color: '#000000', fontWeight: 'bold'}}>AMC/CMC On warranty Expiration</Text>
                                </View>

                                <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
                                    <TouchableOpacity onPress={this.clickLogin} style={styles.loginButton}>
                                        <Text style={{ color: '#ffffff', letterSpacing: 0.5 }}>GENERATE BARCODE</Text>
                                    </TouchableOpacity>
                                </View>

                            </View>
                        </ScrollView>
                    </View>
                }
            </View>
        )
    }
}
export default RegisterProduct;