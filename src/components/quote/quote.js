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
import styles from './quoteStyle';
import mainStyles from '../mainStyle';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import Carousel from 'react-native-snap-carousel';
import DatePicker from 'react-native-datepicker';

class Quote extends React.Component {
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
            checkManufacturer: false,
            checkApprovedVendor: false,
            checkVendor: false,
            checkVendorNone: false,
            checkVendorUrgent: false,
            checkVendorUnurgent: false,
            selectone: '',
            selecttwo: '',
            selectthree: '',
            selectfour: '',
            selectfive: '',
            selectsix: '',
            selectseven: '',
            description: ''
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
                                        <Text style={{ color: '#ffffff', fontSize: 18, letterSpacing: 0.2 }}>Get a Quote</Text>
                                    </View>
                                    <View style={{ left: 20, top: 20, position: 'absolute' }}>
                                        <Image
                                            source={require('../../assets/images/backarrow.png')}
                                            style={{ width: 12, height: 12 }} />
                                    </View>
                                </ImageBackground>
                            </View>

                            <View style={styles.registerProductView}>
                                <View style={styles.manufacturView}>
                                    <View style={{ marginBottom: 15 }}>
                                        <TouchableOpacity style={styles.registerHeading}>
                                            <Text style={{ color: '#ffffff', fontWeight: 'bold', letterSpacing: 0.5, fontSize: 16 }}>Manufacturer</Text>
                                        </TouchableOpacity>

                                        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: 15 }}>
                                            <CheckBox
                                                value={this.state.checkManufacturer}
                                                onValueChange={() => this.setState({
                                                    checkManufacturer: !this.state.checkManufacturer,
                                                    value: 'store'
                                                })}
                                            />
                                            <Text style={{ color: '#000000', fontWeight: 'bold' }}>All</Text>
                                        </View>

                                        <View style={{ display: 'flex', flexDirection: 'row', marginTop: 10, paddingHorizontal: 5, width: '100%', justifyContent: 'space-between' }}>
                                            <View style={styles.pickerView}>
                                                <Picker
                                                    selectedValue={this.state.selectone}
                                                    onValueChange={(value) => this.setState({ selectone: value })}
                                                >
                                                    <Picker.Item color="#8e9292" label="Select" value="Select" />
                                                    <Picker.Item color="#8e9292" label="Tissue Processor" value="Tissue Processor" />
                                                    <Picker.Item color="#8e9292" label="Product Two" value="Product Two" />
                                                </Picker>
                                            </View>

                                            <View style={styles.pickerView}>
                                                <Picker
                                                    selectedValue={this.state.selecttwo}
                                                    onValueChange={(value) => this.setState({ selecttwo: value })}
                                                >
                                                    <Picker.Item color="#8e9292" label="Select" value="Select" />
                                                    <Picker.Item color="#8e9292" label="Tissue Processor" value="Tissue Processor" />
                                                    <Picker.Item color="#8e9292" label="Product Two" value="Product Two" />
                                                </Picker>
                                            </View>
                                        </View>

                                    


                                        <View style={{ display: 'flex', flexDirection: 'row', marginTop: 10, paddingHorizontal: 5, width: '100%', justifyContent: 'space-between' }}>
                                            <View style={styles.pickerView}>
                                                <Picker
                                                    selectedValue={this.state.selectthree}
                                                    onValueChange={(value) => this.setState({ selectthree: value })}
                                                >
                                                    <Picker.Item color="#8e9292" label="Select" value="Select" />
                                                    <Picker.Item color="#8e9292" label="Tissue Processor" value="Tissue Processor" />
                                                    <Picker.Item color="#8e9292" label="Product Two" value="Product Two" />
                                                </Picker>
                                            </View>
                                        </View>
                                    </View>
                                </View>

                                <View style={styles.manufacturView}>
                                    <View style={{ marginBottom: 15 }}>
                                        <TouchableOpacity style={styles.registerHeading}>
                                            <Text style={{ color: '#ffffff', fontWeight: 'bold', letterSpacing: 0.5, fontSize: 16 }}>Vendor</Text>
                                        </TouchableOpacity>

                                        <View style={{ display: 'flex', flexDirection: 'row', paddingRight: 5, alignItems: 'center', justifyContent: 'space-between', marginTop: 15 }}>
                                            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                                <CheckBox
                                                    value={this.state.checkApprovedVendor}
                                                    onValueChange={() => this.setState({
                                                        checkApprovedVendor: !this.state.checkApprovedVendor,
                                                        value: 'store'
                                                    })}
                                                />
                                                <Text style={{ color: '#000000', fontWeight: 'bold' }}>Approved Vendors</Text>
                                            </View>
                                            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                                <CheckBox
                                                    value={this.state.checkVendor}
                                                    onValueChange={() => this.setState({
                                                        checkVendor: !this.state.checkVendor,
                                                        value: 'store'
                                                    })}
                                                />
                                                <Text style={{ color: '#000000', fontWeight: 'bold' }}>All</Text>
                                            </View>
                                            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                                <CheckBox
                                                    value={this.state.checkVendorNone}
                                                    onValueChange={() => this.setState({
                                                        checkVendorNone: !this.state.checkVendorNone,
                                                        value: 'store'
                                                    })}
                                                />
                                                <Text style={{ color: '#000000', fontWeight: 'bold' }}>None</Text>
                                            </View>
                                        </View>
    
                                        <View style={{ display: 'flex', flexDirection: 'row', marginTop: 10, paddingHorizontal: 5, width: '100%', justifyContent: 'space-between' }}>
                                            <View style={styles.pickerView}>
                                                <Picker
                                                    selectedValue={this.state.selectfour}
                                                    onValueChange={(value) => this.setState({ selectfour: value })}
                                                >
                                                    <Picker.Item color="#8e9292" label="Select" value="Select" />
                                                    <Picker.Item color="#8e9292" label="Tissue Processor" value="Tissue Processor" />
                                                    <Picker.Item color="#8e9292" label="Product Two" value="Product Two" />
                                                </Picker>
                                            </View>

                                            <View style={styles.pickerView}>
                                                <Picker
                                                    selectedValue={this.state.selectfive}
                                                    onValueChange={(value) => this.setState({ selectfive: value })}
                                                >
                                                    <Picker.Item color="#8e9292" label="Select" value="Select" />
                                                    <Picker.Item color="#8e9292" label="Tissue Processor" value="Tissue Processor" />
                                                    <Picker.Item color="#8e9292" label="Product Two" value="Product Two" />
                                                </Picker>
                                            </View>
                                        </View>

                                        <View style={{ display: 'flex', flexDirection: 'row', paddingRight: 5, alignItems: 'center', marginTop: 15 }}>
                                            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                                <CheckBox
                                                    value={this.state.checkVendorUrgent}
                                                    onValueChange={() => this.setState({
                                                        checkVendorUrgent: !this.state.checkVendorUrgent,
                                                        value: 'store'
                                                    })}
                                                />
                                                <Text style={{ color: '#000000', fontWeight: 'bold' }}>Urgent</Text>
                                            </View>
                                            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginLeft: 10 }}>
                                                <CheckBox
                                                    value={this.state.checkVendorUnurgent}
                                                    onValueChange={() => this.setState({
                                                        checkVendorUnurgent: !this.state.checkVendorUnurgent,
                                                        value: 'store'
                                                    })}
                                                />
                                                <Text style={{ color: '#000000', fontWeight: 'bold' }}>Unurgent</Text>
                                            </View>
                                        </View>

                                        <View style={{ display: 'flex', flexDirection: 'row', marginTop: 10, paddingHorizontal: 5, width: '100%', justifyContent: 'space-between' }}>
                                            <View style={styles.pickerView}>
                                                <Picker
                                                    selectedValue={this.state.selectsix}
                                                    onValueChange={(value) => this.setState({ selectsix: value })}
                                                >
                                                    <Picker.Item color="#8e9292" label="Select" value="Select" />
                                                    <Picker.Item color="#8e9292" label="Tissue Processor" value="Tissue Processor" />
                                                    <Picker.Item color="#8e9292" label="Product Two" value="Product Two" />
                                                </Picker>
                                            </View>

                                            <View style={styles.pickerView}>
                                                <Picker
                                                    selectedValue={this.state.selectseven}
                                                    onValueChange={(value) => this.setState({ selectseven: value })}
                                                >
                                                    <Picker.Item color="#8e9292" label="Select" value="Select" />
                                                    <Picker.Item color="#8e9292" label="Tissue Processor" value="Tissue Processor" />
                                                    <Picker.Item color="#8e9292" label="Product Two" value="Product Two" />
                                                </Picker>
                                            </View>
                                        </View>

                                    </View>
                                </View>

                                <View style={styles.manufacturView}>
                                    <View style={{ marginBottom: 15 }}>
                                        <TouchableOpacity style={styles.registerHeading}>
                                            <Text style={{ color: '#ffffff', fontWeight: 'bold', letterSpacing: 0.5, fontSize: 16 }}>Product Details</Text>
                                        </TouchableOpacity>

                                        <View style={{ display: 'flex', flexDirection: 'row', marginTop: 15, paddingHorizontal: 5, width: '100%', justifyContent: 'space-between' }}>

                                            <View style={styles.textareaView} >
                                                <TextInput
                                                    style={styles.textArea}
                                                    underlineColorAndroid="transparent"
                                                    placeholder="Type something"
                                                    placeholderTextColor="grey"
                                                    numberOfLines={10}
                                                    multiline={true}
                                                    value={this.state.description}
                                                    onChangeText={(descriptionString) => { this.setState({ description: descriptionString }) }}
                                                />
                                            </View>



                                        </View>

                                    </View>
                                </View>


                            </View>

                        </ScrollView>
                    </View>
                }
            </View>
        )
    }
}
export default Quote;
