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
    ToastAndroid, Platform,
    AlertIOS,
} from 'react-native';
import styles from './profileStyle';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

class ProfileCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            status: '',
            assetDetails: []
        }
    }

    // componentDidMount() {

    // }

    assetDetails = () => {
        var ref = this;
        AsyncStorage.getItem('userdetails', async (err, result) => {
            var res = await JSON.parse(result);
            console.log(res, 'delivery userdetails service engin')
            this.setState({
                firstName: res.first_name,
                lastName: res.last_name,
                userId: res.id,
                departmentId: res.department,
                spinner: false,
            })
            this.myAssetRequest(res.id, res.department)
        });
        // this.props.navigation.navigate("AssetDetails", {assetId:this.props.AssetDetails.id})
    }

    myAssetRequest = (id, departmentiId) => {
        console.log(id, 'delivery myAsset details id');
        console.log(departmentiId, 'delivery myAsset details departmentiId');
        console.log(this.props.AssetDetails.id, 'delivery myAsset details this.props.AssetDetails.id');
        fetch('https://meddbot.com/api_myrequest_details', {
            method: 'post',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: 'admin_id=' + id + '&department_id=' + departmentiId + '&notification_id=' + this.props.AssetDetails.id
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
                }
                else {
                    this.props.navigation.navigate("AssetDetails", { assetDetails: responseJson.MyAssetDetails, })
                    // this.props.AssetDetails.photo
                    this.setState({
                        assetDetails: responseJson.MyAssetDetails
                    })
                }

            }).catch((error) => {
                console.warn(error, 'error');
            });
    }

    render() {
        console.log(this.props, 'delivery this.props')
        let url = 'https://meddbot.com/product_files/' + this.props.AssetDetails.photo
        return (
            <TouchableOpacity onPress={this.assetDetails} style={styles.cardView}>
                <View style={{ width: '80%' }}>
                    <View>
                        <Text style={{ fontSize: 16, fontWeight: '900', color: '#000000' }}>{this.props.AssetDetails.name}</Text>
                    </View>
                    <View>
                        <Text style={{ marginTop: 7 }}>{this.props.AssetDetails.product_name}</Text>
                    </View>
                </View>
                <View style={{ alignItems: 'center', width: 60 }}>
                    <Image
                        source={{ uri: url }}
                        style={{ width: 50, height: 50 }} />
                </View>
            </TouchableOpacity>
        )
    }
}
export default ProfileCard;
