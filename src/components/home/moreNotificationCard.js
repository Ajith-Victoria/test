import React from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View, AsyncStorage, Alert,
    Text,
    StatusBar,
    Image,
    TouchableOpacity,
    TextInput, Linking,
    ImageBackground,
    ToastAndroid, Platform,
    AlertIOS,
} from 'react-native';
import styles from './homeStyle';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

class MoreNotificationCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            status: '',
            firstName: '',
            lastName: '',
            userId: '',
            departmentId: '',
        }
    }

    componentDidMount() {
        var ref = this;
        AsyncStorage.getItem('userdetails', async (err, result) => {
            var res = await JSON.parse(result);
            console.log(res, 'responseJson userdetails card')
            this.setState({
                firstName: res.first_name,
                lastName: res.last_name,
                userId: res.id,
                departmentId: res.department
            })
        });
    }

    issueProduct = () => {
        fetch('https://meddbot.com/api_myrequest_details_issued', {
            method: 'post',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: 'id=' + this.props.NotificationData.notificationid

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

    render() {
        let url = 'https://meddbot.com/product_files/' + this.props.NotificationData.photo
        console.log(this.props.NotificationData, 'kilobite')
        return (
            <View style={styles.thirdCarouselView} >
                <View style={styles.fourthCarouselView}>
                    <View style={{ alignItems: 'center' }}>
                        {this.props.NotificationData.photo == '' ?
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
                            <Text style={styles.dataText}>{this.props.NotificationData.departmentname}</Text>
                        </View>

                        <View style={styles.assetDetailsCard}>
                            <Text style={styles.nameText}>Product Name</Text>
                            <Text style={styles.dotStyle}>:  </Text>
                            <Text style={styles.dataText}>{this.props.NotificationData.product_name}</Text>
                        </View>

                        {this.props.NotificationData.confirm_status == 'Issued' &&
                            <View style={styles.assetDetailsCard}>
                                <Text style={styles.nameText}>Status</Text>
                                <Text style={styles.dotStyle}>:  </Text>
                                <Text style={styles.dataText}>Waiting for confirmation</Text>
                            </View>
                        }
                        {this.props.NotificationData.confirm_status == 'Reject' &&
                            <View style={styles.assetDetailsCard}>
                                <Text style={styles.nameText}>Status</Text>
                                <Text style={styles.dotStyle}>:  </Text>
                                <Text style={styles.dataText}>Rejected</Text>
                            </View>
                        }
                        {this.props.NotificationData.confirm_status == 'Success' &&
                            <View style={styles.assetDetailsCard}>
                                <Text style={styles.nameText}>Status</Text>
                                <Text style={styles.dotStyle}>:  </Text>
                                <Text style={styles.dataText}>Success</Text>
                            </View>
                        }

                        {this.props.NotificationData.notificationstatus !== 0 &&
                            <View style={styles.assetDetailsCard}>
                                <Text style={styles.nameText}>Availability submitted</Text>
                                <Text style={styles.dotStyle}>:  </Text>
                                <Text style={styles.dataText}>{this.props.NotificationData.number_days} days</Text>
                            </View>
                        }


                        {this.props.NotificationData.confirm_status == 'Confirmed' &&
                            <View style={{ display: 'flex', flexDirection: 'row', marginTop: 10, justifyContent: 'space-around' }}>
                                <View>
                                    <TouchableOpacity onPress={this.issueProduct} style={styles.issueProductButton}>
                                        <Text style={{ color: '#ffffff', fontSize: 14 }}>ISSUE PRODUCT</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        }

                        {this.props.NotificationData.confirm_status == 'Accept' &&
                            <View style={{ display: 'flex', flexDirection: 'row', marginTop: 10, justifyContent: 'space-around' }}>
                                <View>
                                    <TouchableOpacity onPress={() => this.clickScan(item)} style={styles.issueProductButton}>
                                        <Text style={{ color: '#ffffff', fontSize: 14, textTransform: 'uppercase' }}>product issued</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        }

                        {this.props.NotificationData.confirm_status == 'Confirmed' || this.props.NotificationData.confirm_status == 'Accept' ?
                            <View>
                                <Text></Text>
                            </View>
                            :
                            <View style={styles.assetDetailsCard}>
                                <Text style={styles.nameText}>Loan Period</Text>
                                <Text style={styles.dotStyle}>:  </Text>
                                <Text style={styles.dataText}>{this.props.NotificationData.loan_period_days} Days   {this.props.NotificationData.loan_period_hours}</Text>
                            </View>
                        }

                        {this.props.NotificationData.notificationstatus == 0 &&
                            <View style={{ display: 'flex', flexDirection: 'row', marginTop: 15 }}>
                                <View>
                                    <TouchableOpacity onPress={this.clickUnAvailable} style={styles.unavailableButton}>
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
        )
    }
}
export default MoreNotificationCard;