import React from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View, AsyncStorage,
    Text, BackHandler,
    StatusBar, Modal,
    Image, Dimensions,
    TouchableOpacity,
    TextInput, Linking,
    ImageBackground,
    ToastAndroid, 
    Platform,
    AlertIOS,
} from 'react-native';
import styles from './homeStyle';
import mainStyles from '../mainStyle';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import Settings from '../settings/settings';
import Carousel, { Pagination } from 'react-native-snap-carousel';
const SLIDER_1_FIRST_ITEM = 1;

let deviceWidth = Dimensions.get('window').width
// const imageLink = https://meddbot.com/product_files/
const MovieCardData = [
    {
        image:
            "https://images.unsplash.com/photo-1573914801487-b7f3ac3ded18?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=882&q=80",
        title: 'Lockhead Martyn',
        data: "F-22 Raptor",
        id: '243647'
    },
    {
        image:
            "https://images.unsplash.com/photo-1573914801487-b7f3ac3ded18?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=882&q=80",
        title: 'PLAN',
        data: "Shandong",
        id: '343647'
    },
    {
        image:
            "https://images.unsplash.com/photo-1573914801487-b7f3ac3ded18?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=882&q=80",
        title: 'H.W Bush',
        data: "USS Nimitz",
        id: '443647'
    }
];

class Home extends React.Component {
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
        this._renderItem = this._renderItem.bind(this);
        this.clickAvailable = this.clickAvailable.bind(this);
    }

    componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    handleBackButtonClick() {
        // this.props.navigation.goBack(null);
        BackHandler.exitApp();
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
        AsyncStorage.setItem("logout", JSON.stringify(this.state.logout));
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

    clickUnAvailable = (item) => {
        console.log(this.state.userId, 'app delivery update this.state.userId')
        console.log(item.notificationid, 'app delivery update this.state.selectedId ')
        console.log(this.state.departmentId, 'app delivery update this.state.departmentId')
        console.log(item.request_id, 'app delivery update this.state.RequestId')
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
                console.log(responseJson, 'app delivery update availabilety');
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

    _renderItem({ item, index }) {
        let url = 'https://meddbot.com/product_files/' + item.photo
        return (
            <View style={styles.carouselView} >
                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    <View>
                        {item.photo == '' ?
                            <Image
                                source={require('../../assets/images/DummyImage.png')}
                                style={{ width: 80, height: 80 }} />
                            :
                            <Image
                                source={{ uri: url }}
                                style={{ width: 80, height: 80 }}
                            />
                        }
                    </View>
                    <View style={{ marginLeft: 10, width: "60%" }}>
                        <Text style={{ fontWeight: 'bold', color: '#000000', overflow: 'hidden', fontSize: 14 }}>{item.departmentname}</Text>
                        <Text style={{ fontWeight: 'bold', color: '#838682', overflow: 'hidden', fontSize: 14, marginTop: 5 }}>{item.product_name}</Text>
                        {item.confirm_status == 'Issued' &&
                            <View style={{ display: 'flex', flexDirection: 'row' }}>
                                <Text style={{ fontWeight: 'bold', color: '#000000', overflow: 'hidden', fontSize: 12, marginTop: 5 }}>Status:</Text>
                                <Text style={{ fontWeight: 'bold', color: '#02bcb1', overflow: 'hidden', fontSize: 12, marginTop: 5 }}> Waiting for confirmation</Text>
                            </View>
                        }
                        {item.confirm_status == 'Reject' &&
                            <View style={{ display: 'flex', flexDirection: 'row' }}>
                                <Text style={{ fontWeight: 'bold', color: '#000000', overflow: 'hidden', fontSize: 14, marginTop: 5 }}>Status:</Text>
                                <Text style={{ fontWeight: 'bold', color: 'red', overflow: 'hidden', fontSize: 14, marginTop: 5 }}> Rejected</Text>
                            </View>
                        }
                        {item.confirm_status == 'Success' &&
                            <View style={{ display: 'flex', flexDirection: 'row' }}>
                                <Text style={{ fontWeight: 'bold', color: '#000000', overflow: 'hidden', fontSize: 14, marginTop: 5 }}>Status:</Text>
                                <Text style={{ fontWeight: 'bold', color: '#02bcb1', overflow: 'hidden', fontSize: 14, marginTop: 5 }}> Success</Text>
                            </View>
                        }
                    </View>
                </View>

                {item.notificationstatus == 0 ?
                    <View style={{ display: 'flex', flexDirection: 'row', marginTop: 5, justifyContent: 'space-around', alignItems: 'center' }}>
                        <View>
                            <TouchableOpacity onPress={() => this.clickUnAvailable(item)} style={styles.unavailableButton}>
                                <Text style={{ color: '#02bcb1', fontSize: 14 }}>UNAVAILABLE</Text>
                            </TouchableOpacity>
                        </View>

                        <View>
                            <TouchableOpacity onPress={() => this.clickAvailable(item)} style={styles.availableButton}>
                                <Text style={{ color: '#ffffff', fontSize: 14 }}>AVAILABLE</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    :
                    <View style={{}}>
                        <Text style={{ color: '#02bcb1', fontSize: 16 }}>Availability submitted: {item.number_days} days</Text>
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
                    <View style={{ display: 'flex', flexDirection: 'row', marginTop: 8 }}>
                        <Text style={{ fontWeight: 'bold', color: '#000000', overflow: 'hidden', fontSize: 14 }}>Loan Period :</Text>
                        <Text style={{ fontWeight: 'bold', color: '#838682', overflow: 'hidden', fontSize: 14, marginLeft: 10 }}>{item.loan_period_days} Days   {item.loan_period_hours}</Text>
                    </View>
                }
            </View>
        )
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
                            {this.state.notificationLength !== 0 ?
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

                                    <View style={{ marginTop: -70 }}>
                                        <Carousel
                                            layout={'default'}
                                            layoutCardOffset={`18`}
                                            ref={c => this.carousel = c}
                                            data={this.state.MovieCardData}
                                            renderItem={this._renderItem}
                                            // props
                                            sliderWidth={deviceWidth}
                                            itemWidth={deviceWidth - 70}
                                            inactiveSlideScale={0.85}
                                            firstItem={SLIDER_1_FIRST_ITEM}
                                            inactiveSlideOpacity={0.7}
                                            loop={true}
                                            containerCustomStyle={styles.slider}
                                            contentContainerCustomStyle={styles.sliderContentContainer}
                                            //   loopClonesPerSide={2}
                                            autoplay={true}
                                            autoplayDelay={500}
                                            autoplayInterval={3000}
                                            onSnapToItem={(index) => this.setState({ slider1ActiveSlide: index })}
                                        />

                                        <Pagination
                                            dotsLength={this.state.MovieCardData.length}
                                            // activeDotIndex={slider1ActiveSlide}
                                            containerStyle={styles.paginationContainer}
                                            dotColor={'rgba(255, 255, 255, 0.92)'}
                                            dotStyle={styles.paginationDot}
                                            // inactiveDotColor={colors.black}
                                            inactiveDotOpacity={0.4}
                                            inactiveDotScale={0.6}
                                            carouselRef={this.carousel}
                                            tappableDots={!!this.carousel}
                                        />
                                    </View>
                                </View>

                                :
                                <View>
                                    <View style={{ width: '100%', height: 150, backgroundColor: '#003c69', overflow: 'hidden' }} >
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
                                </View>
                            }
                            {/* onPress={() => this.props.navigation.navigate('MoreNotification', {data: this.state.MovieCardData})} */}
                            {this.state.notificationLength > 1 &&
                                <View style={{ alignItems: 'flex-end', paddingRight: 10, marginTop: -20 }}>
                                    <TouchableOpacity onPress={() => this.props.navigation.navigate('MoreNotification')} style={styles.moreButton}>
                                        <Text style={{ color: '#02bcb1', fontSize: 12 }}>MORE</Text>
                                    </TouchableOpacity>
                                </View>
                            }

                            <View style={{ paddingHorizontal: 5, paddingVertical: 15 }}>
                                <Text style={{ marginTop: 10, fontWeight: 'bold' }}>What do you need ?</Text>

                                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
                                    <View style={styles.leftView}>

                                        <TouchableOpacity onPress={() => this.props.navigation.navigate('RequestAsset')} style={styles.homeBoxViewone}>
                                            <View style={{ alignItems: 'center' }}>
                                                <Image
                                                    source={require('../../assets/images/asset.png')}
                                                    style={{ width: 70, height: 70 }} />
                                            </View>
                                            <View>
                                                <Text style={{ marginTop: 10, fontWeight: 'bold', color: '#50524f', fontSize: 12, width: 80 }}>Request</Text>
                                                <Text style={{ marginTop: -4, fontWeight: 'bold', color: '#50524f', width: 80, fontSize: 16 }}>Asset</Text>
                                            </View>
                                        </TouchableOpacity>

                                        <TouchableOpacity style={styles.homeBoxViewthree}>
                                            <View style={{ position: 'absolute', right: 15, top: 15 }}>
                                                <Image
                                                    source={require('../../assets/images/quote.png')}
                                                    style={{ width: 70, height: 70 }} />
                                            </View>
                                            <View>
                                                <Text style={{ marginTop: 10, fontWeight: 'bold', color: '#838682', fontSize: 12, width: 80 }}>Get a</Text>
                                                <Text style={{ marginTop: -4, fontWeight: 'bold', color: '#838682', width: 80, fontSize: 16 }}>Quote</Text>
                                            </View>
                                        </TouchableOpacity>
                                    </View>

                                    <View style={styles.rightView}>
                                        <TouchableOpacity onPress={() => this.props.navigation.navigate('ProductTracking')} style={styles.homeBoxViewtwo}>
                                            <View style={{ position: 'absolute', right: 15, top: 15 }}>
                                                <Image
                                                    source={require('../../assets/images/producttracking.png')}
                                                    style={{ width: 70, height: 70 }} />
                                            </View>
                                            <View style={{ marginTop: 20 }}>
                                                <Text style={{ marginTop: 10, fontWeight: 'bold', color: '#838682', fontSize: 12, width: 80 }}>My asset</Text>
                                                <Text style={{ marginTop: -4, fontWeight: 'bold', color: '#838682', width: 80, fontSize: 16 }}>Requests</Text>
                                            </View>
                                        </TouchableOpacity>

                                        <TouchableOpacity style={styles.homeBoxViewfour}>
                                            <View style={{ alignItems: 'center' }}>
                                                <Image
                                                    source={require('../../assets/images/registerproduct.png')}
                                                    style={{ width: 70, height: 70 }} />
                                            </View>
                                            <View>
                                                <Text style={{ marginTop: 5, fontWeight: 'bold', color: '#838682', fontSize: 12, width: 80 }}>Register a</Text>
                                                <Text style={{ marginTop: -4, fontWeight: 'bold', color: '#838682', width: 80, fontSize: 16 }}>Product</Text>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
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
export default Home;