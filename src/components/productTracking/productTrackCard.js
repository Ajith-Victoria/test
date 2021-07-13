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
import mainStyles from '../mainStyle';
class ProductTrackCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            status: '',
            assetDetails: []
        }
    }

    assetDetails = () => {
        this.props.navigation.navigate("ProductTrackDetails", { AssetId: this.props.AssetDetails.id })
    }

    render() {
        console.log(this.props, 'delivery this.props')
        let url = 'https://meddbot.com/product_files/' + this.props.AssetDetails.photo
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
                        <TouchableOpacity onPress={this.assetDetails} style={styles.cardView}>
                            <View style={styles.secondCardView}>
                                <View style={{ alignItems: 'center', width: 60 }}>
                                    {this.props.AssetDetails.photo == '' ?
                                        <Image
                                            source={require('../../assets/images/DummyImage.png')}
                                            style={{ width: 50, height: 50 }} />
                                        :
                                        <Image
                                            source={{ uri: url }}
                                            style={{ width: 50, height: 50 }} />
                                    }
                                </View>
                                <View style={{ width: '80%' }}>
                                    <View>
                                        <Text style={{ fontSize: 16, fontWeight: '900', color: '#000000' }}>{this.props.AssetDetails.product_name}</Text>
                                    </View>

                                    <View style={{ marginTop: 7, display: 'flex', flexDirection: 'row', alignItems: 'center', }}>
                                        <Text style={{ fontSize: 14, fontWeight: '900', color: '#000000', width: 110 }}>Loan Period</Text>
                                        <Text style={{ fontWeight: 'bold', fontSize: 16 }}>:</Text>
                                        <Text style={{ marginLeft: 10, fontSize: 15 }}>{this.props.AssetDetails.loan_period_days} Days {this.props.AssetDetails.loan_period_hours}</Text>
                                    </View>

                                    <View style={{ marginTop: 7, display: 'flex', flexDirection: 'row', alignItems: 'center', }}>
                                        <Text style={{ fontSize: 14, fontWeight: '900', color: '#000000', width: 110 }}>Submited Date</Text>
                                        <Text style={{ fontWeight: 'bold', fontSize: 16 }}>:</Text>
                                        <Text style={{ marginLeft: 10, fontSize: 15 }}>{this.props.AssetDetails.submitted_date}</Text>
                                    </View>
                                </View>

                            </View>
                        </TouchableOpacity>
                    </View>
                }
            </View>
        )
    }
}
export default ProductTrackCard;
