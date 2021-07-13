import React from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    Image, ActivityIndicator,
    TouchableOpacity,
    TextInput,
    ImageBackground, AsyncStorage,
    ToastAndroid, 
    Platform,
    AlertIOS,
} from 'react-native';
import styles from './loginStyle';
import mainStyles from '../mainStyle';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

// ram
// test1234 
class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // Email: 'ajith',
            // Password: 'test1234',
            Email: '',
            Password: '',
            ShowPassword: true,
            error: false,
            spinner: false,
            logout: ''
        }
    }
   
    componentDidMount() {
        AsyncStorage.getItem('logout', async (err, result) => {
            var res = await JSON.parse(result);
            this.setState({logout: res})
            if(res == 'no') {
                this.props.navigation.navigate('Bhome', {details: "hello"})
            }
            else {
                console.log("still login")
            }
        })
    }

    clickLogin = () => {
        this.setState({ error: true })
        {
            this.state.Email == "" || this.state.Password == "" ? null :
                this.loginApi()
        }
    }


    loginApi = () => {
        this.setState({ spinner: true })
        fetch('https://meddbot.com/api_departmentadminlogin', {
            method: 'post',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: 'user_name=' + this.state.Email + '&password=' + this.state.Password
        }).then((response) => response.json())
            .then(async (responseJson) => {
                console.log(responseJson, 'hello res ');
                if (responseJson.status == true) {
                    await AsyncStorage.setItem('userdetails', JSON.stringify(responseJson.details));

                    if (Platform.OS === "android") {
                        ToastAndroid.show("Login successfully", ToastAndroid.SHORT);
                      } else {
                        alert("Login successfully");
                      }
                    this.setState({
                        spinner: false
                    })
                    this.props.navigation.navigate('Bhome')
                }
                else {
                    if (Platform.OS === "android") {
                        ToastAndroid.show(
                          "please enter valid user details",
                          ToastAndroid.SHORT
                        );
                      } else {
                        alert("please enter valid user details");
                      }
                    this.setState({
                        spinner: false
                    })
                }

            }).catch((error) => {
                console.warn(error, 'error');
            });
    }

    showPassword = () => {
        this.setState({
            ShowPassword: !this.state.ShowPassword
        });
    }

    /* <View style={mainStyles.loader}>
        <Image
            source={require('../../assets/icons/loader.gif')}
            style={{ width: 50, height: 50 }} />
       
        <Text style={mainStyles.spinnerTextStyle}>please wait</Text>
    </View> */

    render() {
        console.log(this.state.ShowPassword, 'this.state.ShowPassword');
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
                    // <ImageBackground source={require('../../assets/icons/login-bg.png')} style={styles.backgroundImage}>
                    <View style={styles.loginForm}>
                        <View style={{ position: 'absolute', top: 0, left: 0 }}>
                            <Image source={require('../../assets/images/leftImage.png')} style={styles.logoImage}></Image>
                        </View>

                        <View style={{ position: 'absolute', bottom: 0, right: 0 }}>
                            <Image source={require('../../assets/images/rightImage.png')} style={styles.logoImage}></Image>
                        </View>


                        <View style={{ paddingHorizontal: 20, marginTop: 30, width: '100%', }}>
                            <View style={styles.loginView}>
                                <View style={{ alignItems: 'center' }}>
                                    <Image
                                        source={require('../../assets/images/login1.png')}
                                        style={{ width: 90, height: 25 }} />
                                </View>
                                {/* <Text style={{ fontSize: 18, letterSpacing: 1, fontWeight: 'bold' }}>Login...</Text> */}
                                {/* <View style={styles.loginText}>
                                    <Text style={{ color: '#14a852', fontSize: 16, letterSpacing: 1, fontWeight: 'bold' }}>LOGIN</Text>
                                </View> */}
                                <View style={styles.emailSection}>
                                    {/* <Image
                                        source={require('../../assets/icons/mail.png')}
                                        style={{ width: 12, height: 8 }} /> */}
                                    <TextInput
                                        style={styles.input}
                                        placeholder="Email"
                                        placeholderTextColor="#878884"
                                        value={this.state.Email}
                                        onChangeText={(EmailString) => { this.setState({ Email: EmailString }) }}
                                    />
                                </View>
                                {this.state.error &&
                                    <View>
                                        {this.state.Email == "" ? <Text style={{ color: 'red', fontSize: 10, marginTop: 3 }}>Please enter the email id</Text> :
                                            <Text style={{ display: 'none' }}></Text>
                                        }
                                    </View>
                                }
                                {/* {this.state.error && <View>
                                    {this.state.Email = '' ? <Text style={{ color: 'red', fontSize: 10, paddingLeft: 5 }}>Enter 10 digit phone number</Text> : <Text style={{ display: 'none' }}></Text>}
                                </View>} */}

                                <View style={styles.passwordSection}>

                                    <TextInput
                                        style={styles.input}
                                        placeholder="Password"
                                        placeholderTextColor="#878884"
                                        value={this.state.Password}
                                        secureTextEntry={this.state.ShowPassword && true}
                                        onChangeText={(PasswordString) => { this.setState({ Password: PasswordString }) }}
                                    />
                                    <TouchableOpacity style={{ right: 5, alignItems: 'center', justifyContent: 'center', height: 20, width: 20 }} onPress={this.showPassword}>
                                        <Image
                                            source={require('../../assets/images/Ghide.png')}
                                            style={{ width: 15, height: 12 }} />
                                    </TouchableOpacity>
                                </View>
                                {this.state.error &&
                                    <View>
                                        {this.state.Password == "" ? <Text style={{ color: 'red', fontSize: 10, marginTop: 3 }}>Please enter the password</Text> :
                                            <Text style={{ display: 'none' }}></Text>
                                        }
                                    </View>
                                }


                            </View>
                            <View >
                                <TouchableOpacity onPress={this.clickLogin} style={styles.loginButton}>
                                    <Image
                                        source={require('../../assets/images/login2.png')}
                                        style={{ width: 90, height: 17 }} />
                                    {/* <Text style={{ color: '#ffffff', letterSpacing: 0.5 }}>LOGIN</Text> */}
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    // </ImageBackground>
                }
            </View>
        )
    }
}
export default Login;
