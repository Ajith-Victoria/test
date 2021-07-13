import React from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View, BackHandler,
    Text, Picker,
    StatusBar,
    Image,
    TouchableOpacity,
    TextInput,
    ImageBackground, AsyncStorage,
    ToastAndroid, Platform,
    AlertIOS,
} from 'react-native';
import styles from './requestAssetStyle';
import mainStyles from '../mainStyle';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import DocumentPicker from 'react-native-document-picker';

class RequestAsset extends React.Component {
    constructor(props) {
        super(props);
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
        this.state = {
            LoanPeriodDays: "",
            LoanPeriodHours: "",
            assetNameList: [],
            assetNameId: '',
            assetNameSelected: '',
            Hours: 'Hours',
            Days: 'Days',
            departmentList: [],
            departmentId: '',
            departmentSelected: '',
            spinner: true,

            userId: '',
            error: false,
            connection_Status: true,
            userDepartmentId: ''
            // default_department: 'Department',
            // defaultNumber: 1,
            // productName: '',
            // productCode: '',
            // category: '',
            // creatingDate: '',
            // updatedDate: '',
            // productWarranty: '',
            // description: '',
            // productCatalogue: 'Select file',
            // productCertificates: 'Select file',
        }
    }
    // #14a852

    componentDidMount() {
        console.log('didmount')
        var ref = this;
        AsyncStorage.getItem('userdetails', async (err, result) => {
            var res = await JSON.parse(result);
            console.log(res, 'responseJson userdetails service engin')
            this.setState({
                userId: res.id,
                userDepartmentId: res.department
            })
            this.productList()
        });
    }

    componentWillReceiveProps() {
        console.log('willreceive')
    }

    productList = () => {
        fetch('https://meddbot.com/api_productlist', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }).then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson, 'delivery asset name');
                if (responseJson.status == true) {
                    this.setState({
                        assetNameList: responseJson.productlist,
                        spinner: false,
                        // assetNameId: responseJson.productlist.map(data => data.product_id),
                    })
                }
                else {
                    this.setState({
                        spinner: false,
                    })
                }
            })
            .catch((error) => {
                console.warn(error, 'error');
            });
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

    // https://meddbot.com/api_product_department
    onchangeAssetValue = (value) => {
        console.log(value, 'delivery value');
        this.setState({
            spinner: true,
            assetNameSelected: value,
            assetNameId: value
        })
        fetch('https://meddbot.com/api_product_department', {
            method: 'post',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: 'product_id=' + value
            // body: 'product_id=' + this.props.route.params.qrCode
        }).then((response) => response.json())
            .then(async (responseJson) => {
                console.log(responseJson, 'delivery department');
                if (responseJson.status == true) {
                    this.setState({
                        departmentList: responseJson.departmentlist,
                        spinner: false,
                    })
                }
                else {
                    this.setState({
                        spinner: false,
                        departmentList: []
                    })
                }

            }).catch((error) => {
                console.warn(error, 'error');
            });
    }

    onchangeDepartmentValue = (value) => {
        this.setState({
            departmentSelected: value,
            departmentId: value
        })
    }

    onchangeHoursValue = (value) => {
        this.setState({
            LoanPeriodHours: value,
        })
    }

    handleAddMore = (text, textInput) => {
        // var hh = text + textInput
        // alert(hh)
        this.setState({ LoanPeriodDays: hh })
    }

    assetRequest = () => {
        console.log(this.state.userId, 'delivery userId');
        console.log(this.state.assetNameId, 'delivery assetNameId');
        console.log(this.state.userDepartmentId, 'delivery departmentId');
        console.log(this.state.LoanPeriodDays, 'delivery LoanPeriodDays');
        console.log(this.state.LoanPeriodHours, 'delivery LoanPeriodHours');


        this.state.assetNameSelected == '' || this.state.assetNameSelected == 'Asset Name'
        this.state.departmentSelected == '' || this.state.departmentSelected == 'Department'
        this.state.LoanPeriodDays == ""
        this.state.LoanPeriodHours == ""

        this.setState({
            spinner: true,
            error: true
        })
        if (this.state.assetNameSelected == '' || this.state.assetNameSelected == 'Asset Name' || this.state.LoanPeriodDays == "" || this.state.LoanPeriodHours == "") {
            this.setState({
                spinner: false,
                error: true
            })
        }
        else {
            fetch('https://meddbot.com/api_requestasset', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: 'requested_userid=' + this.state.userId + '&product_id=' + this.state.assetNameId
                    + '&department_id=' + this.state.userDepartmentId + '&loan_period_hour=' + this.state.LoanPeriodHours
                    + '&loan_period_days=' + this.state.LoanPeriodDays
                // body: 'product_id=' + this.props.route.params.qrCode
            }).then((response) => response.json())
                .then(async (responseJson) => {
                    console.log(responseJson, 'delivery request submit response');
                    if (responseJson.status == false) {
                        if (Platform.OS === "android") {
                            ToastAndroid.show(
                              "Error",
                              ToastAndroid.SHORT
                            );
                          } else {
                            alert("Error");
                          }
                        this.setState({
                            spinner: false
                        })
                    }
                    else {
                        this.props.navigation.navigate('Home')
                        if (Platform.OS === "android") {
                            ToastAndroid.show(
                              "Successfully Requested",
                              ToastAndroid.SHORT
                            );
                          } else {
                            alert("Successfully Requested");
                          }
                        this.setState({
                            spinner: false
                        })
                    }

                }).catch((error) => {
                    console.warn(error, 'error');
                });
        }
    }

    render() {
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
                    <View style={styles.backgroundImage}>
                        <View style={styles.warForm}>
                            <View style={styles.backView}>
                                <TouchableOpacity onPress={() => this.props.navigation.goBack()}><Text style={{ fontWeight: 'bold', color: '#ffffff' }}>Back</Text></TouchableOpacity>
                            </View>

                            <View style={{ alignItems: 'center', justifyContent: 'center' }}>

                            </View>

                            <View style={styles.warPage}>
                                {/* <View style={{ alignItems: 'center', marginBottom: 10 }}>
                                    <TouchableOpacity style={styles.registerHeading}>
                                        <Text style={{ color: '#14a852', fontWeight: 'bold', letterSpacing: 0.5, fontSize: 16 }}>Register Product Details new</Text>
                                    </TouchableOpacity>
                                </View> */}
                                <View style={styles.productBox}>

                                    <ScrollView contentContainerStyle={{ flexGrow: 1, position: 'relative' }}>
                                        <View style={{ paddingHorizontal: 10 }}>

                                            {/* <Text style={{ color: '#14a852' }}>jhsg</Text> */}
                                            <View style={{ alignItems: 'center', marginBottom: 10 }}>
                                                <Text style={{ color: '#14a852', fontWeight: 'bold', letterSpacing: 0.5, fontSize: 16 }}>ASSET REQUEST</Text>
                                            </View>


                                            <View style={styles.pickerView}>
                                                <Picker
                                                    selectedValue={this.state.assetNameSelected}
                                                    onValueChange={(value) => this.onchangeAssetValue(value)}

                                                    // onValueChange={(value) => this.setState({ assetNameSelected: value })}
                                                    placeholder={{
                                                        label: 'Asset Name',
                                                        value: null,
                                                    }}
                                                    style={{
                                                        Pickerinput: {
                                                            fontSize: 22,
                                                            paddingVertical: 12,
                                                            paddingHorizontal: 10,
                                                            borderWidth: 4,
                                                            borderColor: 'gray',
                                                            borderRadius: 4,
                                                            color: 'black', height: 100, width: 100
                                                        },
                                                        iconContainer: {
                                                            top: 20,
                                                            right: 0,
                                                        },
                                                        placeholder: {
                                                            fontSize: 15, color: "#757575"
                                                        },
                                                    }}>

                                                    <Picker.Item label="Asset Name" value="Asset Name" />
                                                    {this.state.assetNameList.map(function (item, key) {
                                                        return (<Picker.Item key={key} label={item.product_name} value={item.product_id} />)
                                                    })}

                                                </Picker>
                                            </View>
                                            {this.state.error && <View>
                                                {(this.state.assetNameSelected == '' || this.state.assetNameSelected == 'Asset Name') ? <Text style={{ color: 'red', fontSize: 10, marginTop: 3 }}>Select the Asset Name</Text> : <Text style={{ display: 'none' }}></Text>}
                                            </View>}

                                            <View style={styles.departmentView}>
                                                <Picker
                                                    // selectedValue={this.state.departmentSelected}
                                                    onValueChange={(value) => this.onchangeDepartmentValue(value)}

                                                    // onValueChange={(value) => this.setState({ assetNameSelected: value })}
                                                    placeholder={{
                                                        label: 'Department',
                                                        value: null,
                                                    }}
                                                    style={{
                                                        Pickerinput: {
                                                            fontSize: 22,
                                                            paddingVertical: 12,
                                                            paddingHorizontal: 10,
                                                            borderWidth: 4,
                                                            borderColor: 'gray',
                                                            borderRadius: 4,
                                                            color: 'black',
                                                        },
                                                        iconContainer: {
                                                            top: 20,
                                                            right: 0,
                                                        },
                                                        placeholder: {
                                                            fontSize: 15, color: "#757575"
                                                        },
                                                    }}>

                                                    <Picker.Item label="View Department" value="Department" />
                                                    {this.state.departmentList.map(function (item, key) {
                                                        return (<Picker.Item key={key} label={item.name} value={item.id} />)
                                                    })}

                                                </Picker>
                                            </View>

                                            <Text style={styles.loanPeriodText}>Loan Period</Text>

                                            <View style={{ display: 'flex', flexDirection: 'row' }}>
                                                <View style={{width:'48%'}}>
                                                    <View style={styles.hoursPickerView}>
                                                        <Picker
                                                            selectedValue={this.state.LoanPeriodHours}
                                                            onValueChange={(value) => this.onchangeHoursValue(value)}

                                                            // onValueChange={(value) => this.setState({ assetNameSelected: value })}
                                                            placeholder={{
                                                                label: 'Department',
                                                                value: null,
                                                            }}
                                                            style={{
                                                                Pickerinput: {
                                                                    fontSize: 20,
                                                                    paddingVertical: 10,
                                                                    paddingHorizontal: 10,
                                                                    borderWidth: 4,
                                                                    borderColor: 'gray',
                                                                    borderRadius: 4,
                                                                    color: 'black',
                                                                },
                                                                iconContainer: {
                                                                    top: 20,
                                                                    right: 0,
                                                                },
                                                                placeholder: {
                                                                    fontSize: 15, color: "#757575"
                                                                },
                                                            }}>
                                                            <Picker.Item label="Select Hours" value="Select Hours" />
                                                            <Picker.Item label="1 Hour" value="1 Hour" />
                                                            <Picker.Item label="2 Hours" value="2 Hours" />
                                                            <Picker.Item label="3 Hours" value="3 Hours" />
                                                            <Picker.Item label="4 Hours" value="4 Hours" />
                                                            <Picker.Item label="5 Hours" value="5 Hours" />
                                                            <Picker.Item label="6 Hours" value="6 Hours" />
                                                            <Picker.Item label="7 Hours" value="7 Hours" />
                                                            <Picker.Item label="8 Hours" value="8 Hours" />
                                                            <Picker.Item label="9 Hours" value="9 Hours" />
                                                            <Picker.Item label="10 Hours" value="10 Hours" />
                                                            <Picker.Item label="11 Hours" value="11 Hours" />
                                                            <Picker.Item label="12 Hours" value="12 Hours" />
                                                            <Picker.Item label="13 Hours" value="13 Hours" />
                                                            <Picker.Item label="14 Hours" value="14 Hours" />
                                                            <Picker.Item label="15 Hours" value="15 Hours" />
                                                            <Picker.Item label="16 Hours" value="16 Hours" />
                                                            <Picker.Item label="17 Hours" value="17 Hours" />
                                                            <Picker.Item label="18 Hours" value="18 Hours" />
                                                            <Picker.Item label="19 Hours" value="19 Hours" />
                                                            <Picker.Item label="20 Hours" value="20 Hours" />
                                                            <Picker.Item label="21 Hours" value="21 Hours" />
                                                            <Picker.Item label="22 Hours" value="22 Hours" />
                                                            <Picker.Item label="23 Hours" value="23 Hours" />
                                                            <Picker.Item label="24 Hours" value="24 Hours" />
                                                        </Picker>

                                                    </View>
                                                    {this.state.error &&
                                                            <View>
                                                                {this.state.LoanPeriodHours == "" ? <Text style={{ color: 'red', fontSize: 10, marginTop: 3 }}>Select the Loan period hours</Text> :
                                                                    <Text style={{ display: 'none' }}></Text>
                                                                }
                                                            </View>
                                                        }
                                                </View>


                                                <View style={{width:'48%', marginLeft: 10}}>
                                                    <View style={styles.daysInputView}>
                                                        <TextInput
                                                            style={styles.daysInput}
                                                            placeholder="Days"
                                                            keyboardType='numeric'
                                                            placeholderTextColor='#000000'
                                                            // plac
                                                            value={this.state.LoanPeriodDays}
                                                            onChangeText={(value) => { this.setState({ LoanPeriodDays: value }) }}
                                                        // onChangeText = {(text) => { this.handleAddMore(text, ' Days'); }}
                                                        // onChangeText={this.onchangeAssetValue(value)}
                                                        />
                                                    </View>
                                                    {this.state.error &&
                                                        <View>
                                                            {this.state.LoanPeriodDays == "" ? <Text style={{ color: 'red', fontSize: 10, marginTop: 3 }}>Enter the Loan period Days</Text> :
                                                                <Text style={{ display: 'none' }}></Text>
                                                            }
                                                        </View>
                                                    }
                                                </View>
                                            </View>


                                            <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
                                                <TouchableOpacity onPress={this.assetRequest} style={styles.loginButton}>
                                                    <Text style={{ color: '#ffffff', letterSpacing: 0.5 }}>SEND REQUEST</Text>
                                                </TouchableOpacity>
                                            </View>
                                            <View style={{ height: 300 }}>

                                            </View>

                                        </View>
                                    </ScrollView>

                                </View>



                            </View>
                        </View>
                    </View>
                }
            </View>
        )
    }
}
export default RequestAsset;