import React from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text, Picker,
    StatusBar,
    Image,
    TouchableOpacity,
    TextInput,
    ImageBackground,
    ToastAndroid,
} from 'react-native';
// import ImagePicker from 'react-native-image-picker';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import styles from './complaintStyle';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

class ComplaintStatus extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            phonenum: "",
            error: false,
            connection_Status: true,
            default_department: 'Department',
            avatarSource: '',
            profileImageUpdate: ''
        }
    }

    changeProfile = () => {
        const options = {
            noData: true
        };
        launchImageLibrary(options, response => {
            const source = { uri: response.uri }
            this.setState({
                profileImageUpdate: response,
                avatarSource: source
            })
            console.log(response, 'profileImageUpdate');
        });
    };

    render() {
        console.log(this.state.phonenum, 'tt')
        return (
            <View style={styles.container}>

                <View style={styles.backgroundImage}>
                    <View style={styles.warForm}>
                        <View style={styles.backView}>
                            <TouchableOpacity onPress={() => this.props.navigation.goBack()}><Text style={{ color: '#ffffff' }}>Back</Text></TouchableOpacity>
                        </View>

                        {/* <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 20 }}>
                            <Image
                                source={require('../../assets/icons/2.png')}
                                style={{ width: 150, height: 100 }} />
                        </View> */}

                        <View style={styles.comPage}>
                            <Text style={{ color: '#14a852', fontSize: 16, fontWeight: 'bold' }}>COMPLAINT STATUS</Text>
                            <Text style={{ fontSize: 12, fontWeight: 'bold', marginTop: 20 }}>UPDATE STATUS</Text>

                            <View style={styles.textAreaContainer} >
                                <TextInput
                                    style={styles.textArea}
                                    underlineColorAndroid="transparent"
                                    placeholder="Type something"
                                    placeholderTextColor="grey"
                                    numberOfLines={10}
                                    multiline={true}
                                />
                            </View>

                            <TouchableOpacity onPress={this.changeProfile} style={styles.ButtonChangeSection}>
                                <Text style={{ textTransform: 'uppercase', }}>UPLOAD/CAPTURE IMAGES</Text>
                                {/* <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 20 }}> */}
                                <Image
                                    source={require('../../assets/icons/camera.png')}
                                    style={{ width: 40, height: 35 }} />
                                {/* </View> */}
                            </TouchableOpacity>
                            {/* <View style={styles.productBox}>

                                <ScrollView style={{ width: '100%', height: 350, paddingHorizontal: 10, paddingVertical: 20, }} contentContainerStyle={{ flexGrow: 1, position: 'relative' }}>


                                    <Text>hello</Text>

                                    <View style={{ height: 30 }}>

                                    </View>
                                </ScrollView>

                            </View> */}

                            <View style={{ alignItems: 'center' }}>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('Bhome')} style={styles.loginButton}>
                                    <Text style={{ color: '#ffffff', letterSpacing: 0.5 }}>SUBMIT</Text>
                                </TouchableOpacity>
                            </View>

                        </View>
                    </View>
                </View>

            </View>
        )
    }
}
export default ComplaintStatus;