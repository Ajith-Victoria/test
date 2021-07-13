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
import styles from './profileStyle';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

class AssetDetailsCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            status: '',
        }
    }

    render() {
        console.log(this.props, 'get id')
        return (
            <View style={{ paddingHorizontal: 10, marginTop: 10, marginBottom: 10 }}>
                <View style={styles.carouselView} >
                    {/* <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    <View>
                        <Image
                            source={{ uri: url }}
                            style={{ width: 80, height: 80 }}
                        />
                    </View> */}
                    <View style={{ marginLeft: 10, }}>
                        <View style={styles.assetDetailsCard}>
                            <Text style={styles.nameText}>Department Name</Text>
                            <Text style={styles.dotStyle}>:  </Text>
                            <Text style={styles.dataText}>{this.props.AssetDetails.departmentname}</Text>
                        </View>

                        <View style={styles.assetDetailsCard}>
                            <Text style={styles.nameText}>Status</Text>
                            <Text style={styles.dotStyle}>:  </Text>
                            <Text style={styles.dataText }>{this.props.AssetDetails.status}</Text>
                        </View>

                        <View style={styles.assetDetailsCard}>
                            <Text style={styles.nameText}>Days</Text>
                            <Text style={styles.dotStyle}>:  </Text>
                            <Text style={styles.dataText }>{this.props.AssetDetails.days}</Text>
                        </View>

                    </View>
                    {/* </View> */}
                </View>
            </View>
        )
    }
}
export default AssetDetailsCard;