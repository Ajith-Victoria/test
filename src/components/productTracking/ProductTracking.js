import React from 'react';
import {
    SafeAreaView,
    StyleSheet, AsyncStorage,
    ScrollView, FlatList,
    View,
    Text, BackHandler,
    StatusBar,
    Image,
    TouchableOpacity,
    TextInput,
    ImageBackground,
    ToastAndroid,
} from 'react-native';
import mainStyles from '../mainStyle';
import styles from './productTrackingStyle';
import ProductTrackCard from './productTrackCard';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

class ProductTracking extends React.Component {
    constructor(props) {
        super(props);
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
        this.state = {
            firstName: '',
            lastName: '',
            spinner: true,
            userId: '',
            departmentId: '',
            myAssetRequest: []
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
        console.log('mount didmount')
        var ref = this;
        AsyncStorage.getItem('userdetails', async (err, result) => {
            var res = await JSON.parse(result);
            console.log(res, 'delivery userdetails service engin')
            this.setState({
                firstName: res.first_name,
                lastName: res.last_name,
                userId: res.id,
                departmentId: res.department
            })
            this.myAssetRequest(res.id, res.department)
        });
    }

    componentWillReceiveProps() {
        console.log('mount willreceive')
    }

    myAssetRequest = (id, departmentiId) => {
        console.log(id, 'delivery myAssetRequest id');
        console.log(departmentiId, 'delivery myAssetRequest departmentiId');
        fetch('https://meddbot.com/api_myrequest', {
            method: 'post',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: 'admin_id=' + id + '&department_id=' + departmentiId
        }).then((response) => response.json())
            .then(async (responseJson) => {
                console.log(responseJson, 'delivery myAssetRequest');
                if (responseJson.status == true) {
                    this.setState({
                        myAssetRequest: responseJson.requestnotification,
                        spinner: false,
                    })
                }
                else {
                    // this.setState({
                    //     spinner: false,
                    //     departmentList: []
                    // })
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
                    <SafeAreaView style={styles.backgroundImage}>
                        <View style={styles.warForm}>
                            <View style={styles.backView}>
                                <TouchableOpacity onPress={() => this.props.navigation.goBack()}><Text style={{ fontWeight: 'bold', color: '#ffffff' }}>Back</Text></TouchableOpacity>
                            </View>

                            <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 0 }}>

                            </View>

                            <View style={styles.warPage}>
                                <View style={styles.productBox}>
                                    {this.state.myAssetRequest.length == 0 ?
                                        <View style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
                                            <Text style={{ color: '#02bcb1', fontSize: 20, fontWeight: 'bold' }}>NO ASSET REQUESTS</Text>
                                        </View>
                                        :
                                        <ScrollView contentContainerStyle={{ flexGrow: 1, position: 'relative' }}>
                                            <View>
                                                <View style={{ alignItems: 'center', marginBottom: 20 }}>
                                                    <Text style={{ color: '#02bcb1', fontWeight: 'bold', letterSpacing: 0.5, fontSize: 16 }}>MY ASSET REQUEST</Text>
                                                </View>

                                                <View style={{ marginBottom: 50 }}>
                                                    <FlatList
                                                        data={this.state.myAssetRequest}
                                                        keyExtractor={(item, index) => index.toString()}
                                                        // numColumns={2}
                                                        renderItem={({ item }) => <ProductTrackCard AssetDetails={item} navigation={this.props.navigation}
                                                        />}
                                                    />
                                                </View>
                                            </View>
                                        </ScrollView>
                                    }
                                </View>
                            </View>


                        </View>
                    </SafeAreaView>
                }
            </View>
        )
    }
}
export default ProductTracking;
