import React from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View, AsyncStorage,
    Text,
    StatusBar,
    Image,
    TouchableOpacity,
    TextInput, Linking,
    ImageBackground,
    ToastAndroid,
} from 'react-native';
import styles from './productTrackingStyle';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

class ProductTrackDetailsCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            status: '',
        }
    }

    // componentDidMount() {
    //     this.props.navigation.navigate('ProductTrackDetails', { assetId: 'fromProductDetails' })
    //     if (this.props.AssetDetails.status == 'Inavailable') {
    //         console.log(this.props.AssetDetails.status, 'ajith')
    //         this.props.navigation.navigate('ProductTrackDetails', { assetId: 'fromProductDetails' })
    //     }
    //     else {

    //     }
    // }

    clickConfirm = () => {
        console.log(this.props.AssetDetails.id, 'this.props.AssetDetails.id')
        fetch('https://meddbot.com/api_myrequest_details_confirm', {
            method: 'post',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: 'id=' + this.props.AssetDetails.id
        }).then((response) => response.json())
            .then(async (responseJson) => {
                console.log(responseJson, 'delivery myAsset details confirm');
                this.props.navigation.navigate('ProductTrackDetails', { assetId: 'fromProductDetails' })

            }).catch((error) => {
                console.warn(error, 'error');
            });
    }

    clickDecline = () => {
        fetch('https://meddbot.com/api_myrequest_details_declined', {
            method: 'post',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: 'id=' + this.props.AssetDetails.id
        }).then((response) => response.json())
            .then(async (responseJson) => {
                console.log(responseJson, 'delivery myAsset details decline');
                this.props.navigation.navigate('ProductTrackDetails', { assetId: 'fromProductDetails' })

            }).catch((error) => {
                console.warn(error, 'error');
            });
    }

    clickAccept = () => {
        fetch('https://meddbot.com/api_myrequest_details_accept', {
            method: 'post',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: 'id=' + this.props.AssetDetails.id
        }).then((response) => response.json())
            .then(async (responseJson) => {
                console.log(responseJson, 'delivery myAsset details accept');
                this.props.navigation.navigate('ProductTrackDetails', { assetId: 'fromProductDetails' })

            }).catch((error) => {
                console.warn(error, 'error');
            });
    }

    clickReject = () => {
        fetch('https://meddbot.com/api_myrequest_details_reject', {
            method: 'post',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: 'id=' + this.props.AssetDetails.id
        }).then((response) => response.json())
            .then(async (responseJson) => {
                console.log(responseJson, 'delivery myAsset details reject');
                this.props.navigation.navigate('ProductTrackDetails', { assetId: 'fromProductDetails' })

            }).catch((error) => {
                console.warn(error, 'error');
            });
    }

    render() {
        let url = 'https://meddbot.com/product_files/' + this.props.AssetDetails.photo
        return (
            <View style={styles.carouselView} >
                <View style={styles.secondCarouselView}>
                    <View style={{ alignItems: 'center' }}>
                        {this.props.AssetDetails.photo == '' ?
                            <Image
                                source={require('../../assets/images/DummyImage.png')}
                                style={{ width: 90, height: 90 }} />
                            :
                            <Image
                                source={{ uri: url }}
                                style={{ width: 90, height: 90 }}
                            />
                        }
                    </View>
                    <View style={{ marginLeft: 10, }}>
                        <View style={styles.assetDetailsCard}>
                            <Text style={styles.nameText}>Department Name</Text>
                            <Text style={styles.dotStyle}>:  </Text>
                            <Text style={styles.dataText}>{this.props.AssetDetails.departmentname}</Text>
                        </View>

                        <View style={styles.assetDetailsCard}>
                            <Text style={styles.nameText}>Product Name</Text>
                            <Text style={styles.dotStyle}>:  </Text>
                            <Text style={styles.dataText}>{this.props.AssetDetails.product_name}</Text>
                        </View>

                        <View style={styles.assetDetailsCard}>
                            <Text style={styles.nameText}>Days</Text>
                            <Text style={styles.dotStyle}>:  </Text>
                            <Text style={styles.dataText}>{this.props.AssetDetails.days}</Text>
                        </View>

                        <View style={styles.assetDetailsCard}>
                            <Text style={styles.nameText}>Status</Text>
                            <Text style={styles.dotStyle}>:  </Text>
                            {this.props.AssetDetails.status == 'Reject' ?
                                <Text style={styles.rejectDataText}>Rejected</Text>
                                :
                                <Text style={styles.dataText}>{this.props.AssetDetails.status}</Text>
                            }

                        </View>

                    </View>

                    {this.props.AssetDetails.status == "Available" &&
                        <View style={{ display: 'flex', flexDirection: 'row', marginTop: 10, paddingHorizontal: 10, justifyContent: 'flex-start' }}>
                            <TouchableOpacity onPress={this.clickConfirm} style={styles.confirmButton}>
                                <Text style={{ color: '#02bcb1', fontWeight: '900', letterSpacing: 0.3, fontSize: 14, textTransform: 'uppercase' }}>Confirm</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={this.clickDecline} style={styles.declineButton}>
                                <Text style={{ color: '#ffffff', letterSpacing: 0.3, fontWeight: '900', fontSize: 14, textTransform: 'uppercase' }}>Decline</Text>
                            </TouchableOpacity>
                        </View>
                    }

                    {this.props.AssetDetails.status == "Issued" &&
                        <View style={{ display: 'flex', flexDirection: 'row', marginTop: 10, paddingHorizontal: 10, justifyContent: 'flex-start' }}>
                            <TouchableOpacity onPress={this.clickAccept} style={styles.confirmButton}>
                                <Text style={{ color: '#02bcb1', fontWeight: '900', letterSpacing: 0.3, fontSize: 14, textTransform: 'uppercase' }}>Accept</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={this.clickReject} style={styles.declineButton}>
                                <Text style={{ color: '#ffffff', letterSpacing: 0.3, fontWeight: '900', fontSize: 14, textTransform: 'uppercase' }}>Reject</Text>
                            </TouchableOpacity>
                        </View>
                    }

                </View>
            </View>

        )
    }
}
export default ProductTrackDetailsCard;

{/* Product name
Loan period
Submitted date
Status - Pending/available/Unavailable

If available show the department name and available days count */}