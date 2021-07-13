import React from 'react';
import {
    SafeAreaView,
    StyleSheet, AsyncStorage,
    ScrollView, FlatList,
    View, BackHandler,
    Text,
    StatusBar,
    Image,
    TouchableOpacity,
    TextInput,
    ImageBackground,
    ToastAndroid, Platform,
    AlertIOS,
} from 'react-native';
import mainStyles from '../mainStyle';
import styles from './productTrackingStyle';
import ProductTrackDetailsCard from './productTrackDetailsCard';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

class ProductTrackDetails extends React.Component {
    constructor(props) {
        super(props);
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
        this.state = {
            firstName: '',
            lastName: '',
            spinner: true,
            userId: '',
            departmentId: '',
            assetDetailsArray: [],
            image: ''
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
        console.log('delivery myAsset details did mount')
        this.assetDetails();
    }

    componentWillReceiveProps() {
        console.log(this.props.route.params.AssetId, 'delivery myAsset details will receive')
        this.assetDetails();
    }

    assetDetails = () => {
        var ref = this;
        AsyncStorage.getItem('userdetails', async (err, result) => {
            var res = await JSON.parse(result);
            console.log(res, 'delivery userdetails asset details')
            this.setState({
                firstName: res.first_name,
                lastName: res.last_name,
                userId: res.id,
                departmentId: res.department,
            })
            this.myAssetRequest(res.id, res.department)
        });
    }

    myAssetRequest = (id, departmentiId) => {
        console.log(id, 'delivery myAsset details id');
        console.log(departmentiId, 'delivery myAsset details departmentiId');
        console.log(this.props.route.params.AssetId, 'delivery myAsset details this.props.AssetDetails.id');
        fetch('https://meddbot.com/api_myrequest_details', {
            method: 'post',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: 'admin_id=' + id + '&department_id=' + departmentiId + '&notification_id=' + this.props.route.params.AssetId
        }).then((response) => response.json())
            .then(async (responseJson) => {
                console.log(responseJson, 'delivery myAsset details');
                if (responseJson.MyAssetDetails.length == 0) {
                    if (Platform.OS === "android") {
                        ToastAndroid.show(
                          "No Asset Details",
                          ToastAndroid.SHORT
                        );
                      } else {
                        alert("No Asset Details");
                      }

                    this.props.navigation.navigate('ProductTracking')
                    this.setState({
                        spinner: false,
                    })
                }
                else {
                    this.setState({
                        assetDetailsArray: responseJson.MyAssetDetails,
                        spinner: false,
                    })
                }

            }).catch((error) => {
                console.warn(error, 'error');
            });
    }

    render() {
        return (
            <View style={styles.container}>
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
                    <View style={styles.backgroundImage}>
                        <View style={styles.warForm}>
                            <View style={styles.backView}>
                            <TouchableOpacity onPress={() => this.props.navigation.goBack()}><Text style={{ fontWeight: 'bold', color: '#ffffff' }}>Back</Text></TouchableOpacity>
                            </View>

                            <View style={{ alignItems: 'center', justifyContent: 'center' }}>

                            </View>

                            <View style={styles.warPage}>
                                <View style={styles.productBox}>

                                    <ScrollView contentContainerStyle={{ flexGrow: 1, position: 'relative' }}>
                                        <View>

                                            <View style={{ alignItems: 'center', marginBottom: 30 }}>
                                                <Text style={{ color: '#02bcb1', fontWeight: 'bold', letterSpacing: 0.5, fontSize: 16 }}>MY ASSET DETAILS</Text>
                                            </View>

                                            <View style={{ marginBottom: 50 }}>
                                                <FlatList
                                                    data={this.state.assetDetailsArray}
                                                    keyExtractor={(item, index) => index.toString()}
                                                    // numColumns={2}
                                                    renderItem={({ item }) => <ProductTrackDetailsCard AssetDetails={item} navigation={this.props.navigation}
                                                    />}
                                                />
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
export default ProductTrackDetails;

