import React from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView, FlatList,
    View, AsyncStorage, Alert,
    Text, BackHandler,
    StatusBar, Modal,
    Image, Dimensions,
    TouchableOpacity,
    TextInput, Linking,
    ImageBackground,
    ToastAndroid, Platform,
    AlertIOS,
} from 'react-native';
import styles from './homeStyle';
import mainStyles from '../mainStyle';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import Settings from '../settings/settings';
import MoreNotificationCard from './moreNotificationCard'
import Carousel, { Pagination } from 'react-native-snap-carousel';
const SLIDER_1_FIRST_ITEM = 1;

let deviceWidth = Dimensions.get('window').width

class MoreNotification extends React.Component {
    constructor(props) {
        super(props);
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
        this.state = {
            phonenum: "",
            error: false,
            connection_Status: true,
            firstName: 'dd',
            lastName: '',
            spinner: true,
            activeIndex: 0,
            slider1ActiveSlide: SLIDER_1_FIRST_ITEM,
            userId: '',
            departmentId: '',
            MovieCardData: [],
            numberNew: '',
            availableDays: '',
            modalVisible: false,
            notificationId: '',
            selectedId: '',
            selectedProductName: '',
            selectedDepartmentName: '',
            selectedPhoto: '',
            notificationLength: '',
            logout: 'no',
            availablitySubmited: '',
            RequestId: ''
        }
        this.clickAvailable = this.clickAvailable.bind(this);
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
                userId: res.id,
                departmentId: res.department
            })
            this.requestNotification(res.id, res.department)
        });
    }

    requestNotification = (id, departmentiId) => {
        fetch('https://meddbot.com/api_department_request', {
            method: 'post',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: 'admin_id=' + id + '&department_id=' + departmentiId
        }).then((response) => response.json())
            .then(async (responseJson) => {
                console.log(responseJson, 'delivery requestNotification');
                if (responseJson.status == true) {
                    this.setState({
                        MovieCardData: responseJson.notificationlist,
                        spinner: false,
                        notificationLength: responseJson.notificationlist.length,
                    })
                }
                else {
                    this.setState({
                        spinner: false,
                    })
                }

            }).catch((error) => {
                console.warn(error, 'error');
            });
    }

    clickAvailable(item) {
        this.setState({
            modalVisible: true,
            selectedId: item.notificationid,
            selectedProductName: item.product_name,
            selectedDepartmentName: item.name,
            selectedPhoto: item.photo,
            RequestId: item.request_id
        });
    }

    reCallNotification = () => {
        console.log('mr ajith')
        var ref = this;
        AsyncStorage.getItem('userdetails', async (err, result) => {
            var res = await JSON.parse(result);
            console.log(res, 'responseJson userdetails service engin')
            this.setState({
                firstName: res.first_name,
                lastName: res.last_name,
                userId: res.id,
                departmentId: res.department
            })
            this.requestNotification(res.id, res.department)
        });
    }

    issueProduct = (item) => {
        fetch('https://meddbot.com/api_myrequest_details_issued', {
            method: 'post',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: 'id=' + item.notificationid

        }).then((response) => response.json())
            .then(async (responseJson) => {
                console.log(responseJson, 'delivery requestNotification issue product');
                if (responseJson.status == true) {
                    this.setState({
                        spinner: true,
                    })
                    if (Platform.OS === "android") {
                        ToastAndroid.show(
                          "Waiting for the confirmation",
                          ToastAndroid.SHORT
                        );
                      } else {
                        alert("Waiting for the confirmation");
                      }
                    this.reCallNotification()
                }
                else {
                    this.setState({
                        spinner: true,
                    })
                    this.reCallNotification()
                }

            }).catch((error) => {
                console.warn(error, 'error');
            });
    }

    clickUnAvailable = (item) => {
        fetch('https://meddbot.com/api_request_inavailibilty', {
            method: 'post',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: 'admin_id=' + this.state.userId + '&notification_id=' + item.notificationid + '&department_id=' + this.state.departmentId
                + '&request_id=' + item.request_id
        }).then((response) => response.json())
            .then(async (responseJson) => {
                console.log(responseJson, 'app delivery update availabilety');
                if (responseJson.status == true) {
                    this.setState({
                        spinner: true,
                    })
                    this.reCallNotification()
                }
                else {
                    this.setState({
                        spinner: true,
                    })
                    this.reCallNotification()
                }

            }).catch((error) => {
                console.warn(error, 'error');
            });
    }

    updateStatus = () => {
        fetch('https://meddbot.com/api_request_availibilty', {
            method: 'post',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: 'admin_id=' + this.state.userId + '&notification_id=' + this.state.selectedId + '&days=' + this.state.availableDays
                + '&department_id=' + this.state.departmentId + '&request_id=' + this.state.RequestId

        }).then((response) => response.json())
            .then(async (responseJson) => {
                console.log(responseJson, 'app delivery update availabilety koy');
                if (responseJson.status == true) {
                    this.setState({
                        spinner: true,
                        modalVisible: false,
                        availableDays: ''
                    })
                    this.reCallNotification()
                }
                else {
                    this.setState({
                        spinner: true,
                    })
                    this.reCallNotification()
                }

            }).catch((error) => {
                console.warn(error, 'error');
            });
    }

    clickScan = (item) => {
        this.props.navigation.navigate('ScanProduct', { item: item })
    }

    setModalVisible = (visible) => {
        this.setState({ modalVisible: false });
    }

    render() {
        console.log(this.state.MovieCardData, 'delivery MovieCardData');
        const { modalVisible } = this.state;
        let selectedUrl = 'https://meddbot.com/product_files/' + this.state.selectedPhoto
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
                    <View>
                        <ScrollView contentContainerStyle={{ flexGrow: 1, position: 'relative' }}>
                            <View>
                                <View style={{ width: '100%', height: 200, backgroundColor: '#003c69', overflow: 'hidden' }} >
                                    <ImageBackground source={require('../../assets/images/banner.png')} style={styles.backgroundImage}>
                                        <View style={styles.loginForm}>
                                            <Text style={{ color: '#ffffff', fontSize: 18, fontWeight: 'bold', letterSpacing: 0.5 }}>Good Morning, {this.state.firstName} !</Text>
                                        </View>
                                        <View style={{ right: 20, top: 30, position: 'absolute' }}>

                                            <Image
                                                source={require('../../assets/images/notifi.png')}
                                                style={{ width: 15, height: 20 }} />
                                        </View>
                                    </ImageBackground>
                                </View>

                                <View style={{ marginTop: -70, marginBottom: 50 }}>
                                    {this.state.MovieCardData.map(item =>

                                        <View style={styles.thirdCarouselView} >
                                            <View style={styles.fourthCarouselView}>
                                                <View style={{ alignItems: 'center' }}>
                                                    {this.state.selectedPhoto == '' ?
                                                        <Image
                                                            source={require('../../assets/images/DummyImage.png')}
                                                            style={{ width: 90, height: 90 }} />
                                                        :
                                                        <Image
                                                            source={{ uri: selectedUrl }}
                                                            style={{ width: 90, height: 90 }}
                                                        />
                                                    }
                                                </View>
                                                <View style={{ marginLeft: 10 }}>
                                                    <View style={styles.assetDetailsCard}>
                                                        <Text style={styles.nameText}>Department Name</Text>
                                                        <Text style={styles.dotStyle}>:  </Text>
                                                        <Text style={styles.dataText}>{item.departmentname}</Text>
                                                    </View>

                                                    <View style={styles.assetDetailsCard}>
                                                        <Text style={styles.nameText}>Product Name</Text>
                                                        <Text style={styles.dotStyle}>:  </Text>
                                                        <Text style={styles.dataText}>{item.product_name}</Text>
                                                    </View>

                                                    {item.confirm_status == 'Issued' &&
                                                        <View style={styles.assetDetailsCard}>
                                                            <Text style={styles.nameText}>Status</Text>
                                                            <Text style={styles.dotStyle}>:  </Text>
                                                            <Text style={styles.dataText}>Waiting for confirmation</Text>
                                                        </View>
                                                    }
                                                    {item.confirm_status == 'Reject' &&
                                                        <View style={styles.assetDetailsCard}>
                                                            <Text style={styles.nameText}>Status</Text>
                                                            <Text style={styles.dotStyle}>:  </Text>
                                                            <Text style={styles.dataText}>Rejected</Text>
                                                        </View>
                                                    }
                                                    {item.confirm_status == 'Success' &&
                                                        <View style={styles.assetDetailsCard}>
                                                            <Text style={styles.nameText}>Status</Text>
                                                            <Text style={styles.dotStyle}>:  </Text>
                                                            <Text style={styles.dataText}>Success</Text>
                                                        </View>
                                                    }

                                                    {item.notificationstatus !== 0 &&
                                                        <View style={styles.assetDetailsCard}>
                                                            <Text style={styles.nameText}>Availability submitted</Text>
                                                            <Text style={styles.dotStyle}>:  </Text>
                                                            <Text style={styles.dataText}>{item.number_days} days</Text>
                                                        </View>
                                                    }


                                                    {item.confirm_status == 'Confirmed' &&
                                                        <View style={{ display: 'flex', flexDirection: 'row', marginTop: 10, justifyContent: 'space-around' }}>
                                                            <View>
                                                                <TouchableOpacity onPress={() => this.issueProduct(item)} style={styles.issueProductButton}>
                                                                    <Text style={{ color: '#ffffff', fontSize: 14 }}>ISSUE PRODUCT</Text>
                                                                </TouchableOpacity>
                                                            </View>
                                                        </View>
                                                    }

                                                    {item.confirm_status == 'Accept' &&
                                                        <View style={{ display: 'flex', flexDirection: 'row', marginTop: 10, justifyContent: 'space-around' }}>
                                                            <View>
                                                                <TouchableOpacity onPress={() => this.clickScan(item)} style={styles.issueProductButton}>
                                                                    <Text style={{ color: '#ffffff', fontSize: 14, textTransform: 'uppercase' }}>product issued</Text>
                                                                </TouchableOpacity>
                                                            </View>
                                                        </View>
                                                    }

                                                    {item.confirm_status == 'Confirmed' || item.confirm_status == 'Accept' ?
                                                        <View>
                                                            <Text></Text>
                                                        </View>
                                                        :
                                                        <View style={styles.assetDetailsCard}>
                                                            <Text style={styles.nameText}>Loan Period</Text>
                                                            <Text style={styles.dotStyle}>:  </Text>
                                                            <Text style={styles.dataText}>{item.loan_period_days} Days   {item.loan_period_hours}</Text>
                                                        </View>
                                                    }

                                                    {item.notificationstatus == 0 &&
                                                        <View style={{ display: 'flex', flexDirection: 'row', marginTop: 15 }}>
                                                            <View>
                                                                <TouchableOpacity onPress={() => this.clickUnAvailable(item)} style={styles.unavailableButton}>
                                                                    <Text style={{ color: '#02bcb1', fontSize: 14 }}>UNAVAILABLE</Text>
                                                                </TouchableOpacity>
                                                            </View>

                                                            <View style={{ marginLeft: 25 }}>
                                                                <TouchableOpacity onPress={() => this.clickAvailable(item)} style={styles.availableButton}>
                                                                    <Text style={{ color: '#ffffff', fontSize: 14 }}>AVAILABLE</Text>
                                                                </TouchableOpacity>
                                                            </View>
                                                        </View>
                                                    }

                                                </View>
                                            </View>
                                        </View>


                                    )}
                                    {/* <FlatList
                                        data={this.state.MovieCardData}
                                        keyExtractor={(item, index) => index.toString()}
                                        // numColumns={2}
                                        renderItem={({ item }) => <MoreNotificationCard NotificationData={item} navigation={this.props.navigation}
                                        />}
                                    /> */}
                                </View>


                                <Modal
                                    animationType="slide"
                                    transparent={true}
                                    visible={this.state.modalVisible}
                                    onRequestClose={() => {
                                        Alert.alert("Modal has been closed.");
                                        this.setModalVisible(!modalVisible);
                                    }}
                                >
                                    <View style={styles.centeredView}>
                                        <View style={styles.modalView}>


                                            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                                <View>

                                                    {/* {uri: 'file://' + RNFS.DocumentDirectoryPath + '/directory/my.png' */}

                                                    <Image
                                                        source={{ uri: selectedUrl }}
                                                        style={{ width: 80, height: 80 }}
                                                    />


                                                    {/* // <Image source={{ uri: item.image }} style={{ height: 80, borderRadius: 10, width: 100 }} /> */}
                                                </View>

                                                <View style={{ marginLeft: 10, width: "60%" }}>
                                                    <Text style={{ fontWeight: 'bold', color: '#000000', overflow: 'hidden', fontSize: 14 }}>{this.state.selectedProductName}</Text>
                                                    <Text style={{ fontWeight: 'bold', color: '#838682', overflow: 'hidden', fontSize: 14, marginTop: 5 }}>{this.state.selectedDepartmentName}</Text>
                                                    {/* <Text style={{ fontWeight: 'bold', color: '#838682', overflow: 'hidden', fontSize: 14, marginTop: 5 }}>{this.state.selectedId}</Text> */}
                                                </View>
                                            </View>


                                            <Text style={styles.modalText}>AVAILABLE DAYS</Text>
                                            <View style={styles.textAreaContainer} >
                                                <TextInput
                                                    style={styles.textArea}
                                                    underlineColorAndroid="transparent"
                                                    placeholder="Enter Days"
                                                    placeholderTextColor="grey"
                                                    keyboardType='numeric'
                                                    numberOfLines={10}
                                                    multiline={true}
                                                    value={this.state.availableDays}
                                                    onChangeText={(descriptionString) => { this.setState({ availableDays: descriptionString }) }}
                                                />
                                            </View>
                                            {this.state.modalError &&
                                                <View>
                                                    {this.state.availableDays == "" ? <Text style={{ color: 'red', fontSize: 10, marginTop: 3 }}>please enter the message</Text> :
                                                        <Text style={{ display: 'none' }}></Text>
                                                    }
                                                </View>
                                            }

                                            <View style={{ display: 'flex', flexDirection: 'row' }}>
                                                <TouchableOpacity onPress={() => this.setModalVisible(!modalVisible)} style={styles.closeButton}>
                                                    <Text style={{ color: '#ffffff', marginLeft: 5, letterSpacing: 0.5 }}>CLOSE</Text>
                                                </TouchableOpacity>

                                                <TouchableOpacity onPress={this.updateStatus} style={styles.modalUpdateButton}>
                                                    <Text style={{ color: '#ffffff', marginLeft: 5, letterSpacing: 0.5 }}>SEND</Text>
                                                </TouchableOpacity>
                                            </View>

                                        </View>
                                    </View>
                                </Modal>


                            </View>
                        </ScrollView>
                    </View>
                }
            </View>
        )
    }
}
export default MoreNotification;