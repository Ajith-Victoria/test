import React from 'react';
import {
    SafeAreaView,
    StyleSheet, AsyncStorage,
    ScrollView, FlatList,
    View,
    Text,
    StatusBar,
    Image,
    TouchableOpacity,
    TextInput,
    ImageBackground,
    ToastAndroid,
} from 'react-native';
import mainStyles from '../mainStyle';
import styles from './profileStyle';
import AssetDetailsCard from './assetDetailsCard';

class AssetDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            // spinner: true,
            userId: '',
            departmentId: '',
            assetDetailsArray: [],
            image: ''
        }
    }

    componentDidMount() {
        console.log(this.props.route.params, 'delivery assetdetails props')
        this.setState({
            assetDetailsArray: this.props.route.params.assetDetails,
        })
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

                            <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 20 }}>

                            </View>

                            <View style={styles.warPage}>
                                <View style={styles.productBox}>

                                    <ScrollView contentContainerStyle={{ flexGrow: 1, position: 'relative' }}>
                                        <View>

                                            <View style={{ alignItems: 'center', marginBottom: 30 }}>
                                                <Text style={{ color: '#14a852', fontWeight: 'bold', letterSpacing: 0.5, fontSize: 16 }}>MY ASSET DETAILS</Text>
                                            </View>

                                            <View>
                                                <FlatList
                                                    data={this.state.assetDetailsArray}
                                                    keyExtractor={(item, index) => index.toString()}
                                                    // numColumns={2}
                                                    renderItem={({ item }) => <AssetDetailsCard AssetDetails={item} navigation={this.props.navigation}
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
export default AssetDetails;