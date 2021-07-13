import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    Image,
    TouchableOpacity,
    TextInput,
    ImageBackground,
    ToastAndroid,
} from 'react-native';
import Home from './home/home';
import Cart from './cart';
import Login from './Login/login';
import WarrentyRenewed from './warrenty/warrentyRenewed';
import ProductDetails from './products/productDetails';
import ComplaintStatus from './complaint/complaintStatus';
import ScanProduct from './scanProduct/scanProduct';
import RegisterProduct from './registerProduct/registerProduct';
import ProductTracking from './productTracking/productTrack';
import Quote from './quote/quote';
import mainStyles from './mainStyle';
import Profile from './profile/profile';
import Chat from './chat/chat';
import Logout from './Logout/logout';
import Settings from './settings/settings';
import NetInfo from '@react-native-community/netinfo'

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function HomeStackScreen() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="RegisterProduct" component={RegisterProduct} />
            <Stack.Screen name="ProductTracking" component={ProductTracking} />
            <Stack.Screen name="Quote" component={Quote} />
            <Stack.Screen name="ProductDetails" component={ProductDetails} />
        </Stack.Navigator>
    );
}

function ProfileStackScreen() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Profile" component={Profile} />
            {/* other screens */}
        </Stack.Navigator>
    );
}

function SettingsStackScreen() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Settings" component={Settings} />
            {/* other screens */}
        </Stack.Navigator>
    );
}

function ChatStackScreen() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Chat" component={Chat} />
            {/* other screens */}
        </Stack.Navigator>
    );
}

function LogoutStackScreen() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Logout" component={Logout} />
            {/* other screens */}
        </Stack.Navigator>
    );
}




function HomeStack() {
    return (
        <Tab.Navigator tabBarOptions={{
            style: {
                // paddingVertical: 20,
                backgroundColor: '#dee0e0'
            }
        }}>
            <Tab.Screen name="HomeStackScreen" component={HomeStackScreen}
                options={{
                    tabBarLabel: '',
                    tabBarIcon: ({ focused, color }) => (
                        focused ?
                            <Image
                                source={require('../assets/images/homeactive.png')}
                                style={mainStyles.activeTab} />
                            :
                            <Image
                                source={require('../assets/images/home.png')}
                                style={{ width: 23, height: 23, resizeMode: "stretch" }} />
                    ),
                }}
            />

            <Tab.Screen name="ProfileStackScreen" component={ProfileStackScreen}
                options={{
                    tabBarLabel: '',
                    tabBarIcon: ({ focused, red }) => (
                        focused ?
                            <Image
                                source={require('../assets/images/accountactive.png')}
                                style={mainStyles.activeTab} />
                            :
                            <Image
                                source={require('../assets/images/account.png')}
                                style={{ width: 20, height: 22 }} />
                    ),
                }} />

            <Tab.Screen name="SettingsStackScreen" component={SettingsStackScreen}
                options={{
                    tabBarLabel: '',
                    tabBarIcon: ({ focused, color }) => (
                        focused ?
                            <Image
                                source={require('../assets/images/centericonactive.png')}
                                style={mainStyles.activeTab} />
                            :
                            <Image
                                source={require('../assets/images/centericon.png')}
                                style={{ width: 20, height: 20 }} />
                    ),
                }} />

            <Tab.Screen name="ChatStackScreen" component={ChatStackScreen}
                // onPress={() => {
                //   this.props.navigation.navigate('Chat');
                // }}
                options={{
                    tabBarLabel: '',
                    tabBarIcon: ({ focused, color }) => (
                        // onkeypress
                        focused ?
                            <Image
                                source={require('../assets/images/chatactive.png')}
                                style={mainStyles.activeTab} />
                            :
                            <Image
                                source={require('../assets/images/chat.png')}
                                style={{ width: 22, height: 22 }} />
                    ),
                }} />

            <Tab.Screen name="LogoutStackScreen" component={LogoutStackScreen}
                options={{
                    //  style={ backgroundColor: 'green'},
                    tabBarLabel: '',
                    tabBarIcon: ({ focused, red }) => (
                        focused ?
                        <Image
                            source={require('../assets/images/tabfouractive.png')}
                            style={mainStyles.activeTab} />
                        :
                        <Image
                            source={require('../assets/images/tabfour.png')}
                            style={{ width: 22, height: 20 }} />
                    ),
                }} />
        </Tab.Navigator>
    );
}


class Mytab extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            connection_Status: "",
        }
    }

    // screenOptions={{ gestureEnabled: false }}
    componentDidMount() {
        // SplashScreen.hide();
        NetInfo.addEventListener(this.handleConnectivityChange);
    }

    handleConnectivityChange = state => {
        if (state.isConnected) {
            this.setState({ connection_Status: 'Online' });
        } else {
            this.setState({ connection_Status: 'Offline' });
            ToastAndroid.show('Please Check your internet connection', ToastAndroid.SHORT);
        }
    };

    render() {
        return (
            <NavigationContainer>
                {this.state.connection_Status == 'Offline' &&
                    <View style={{ alignItems: 'center', backgroundColor: '#000000', paddingVertical: 10 }}>
                        <Text style={{ color: '#ffffff' }}>Please Check your Internet Connection</Text>
                    </View>
                }
                <Stack.Navigator>
                    {/* <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} /> */}
                    <Stack.Screen name="Bhome" component={HomeStack} options={{ headerShown: false }} />
                    <Stack.Screen name="ComplaintStatus" component={ComplaintStatus} options={{ headerShown: false }} />
                    {/* <Stack.Screen name="ProductDetails" component={ProductDetails} options={{ headerShown: false }} /> */}
                    {/* <Stack.Screen name="RegisterProduct" component={RegisterProduct} options={{ headerShown: false }} /> */}
                    {/* <Stack.Screen name="ProductTracking" component={ProductTracking} options={{ headerShown: false }} /> */}
                    {/* <Stack.Screen name="Quote" component={Quote} options={{ headerShown: false }} /> */}
                    <Stack.Screen name="WarrentyRenewed" component={WarrentyRenewed} options={{ headerShown: false }} />
                    <Stack.Screen name="ScanProduct" component={ScanProduct} options={{ headerShown: false }} />
                </Stack.Navigator>
            </NavigationContainer>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default Mytab;


// carousel in two pages.
// file input. 
// menu bar issues 