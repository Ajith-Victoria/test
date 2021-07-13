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
import ProfileCard from './profileCard';

class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            spinner: true,
            userId: '',
            departmentId: '',
            myAssetRequest: []
        }
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
            // this.myAssetRequest(res.id, res.department)
        });
    }

    componentWillReceiveProps() {
        console.log('mount willreceive')
    }

    render() {
        return (
            <View style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
               <Text style={{ color: '#02bcb1', fontSize: 20, fontWeight:'bold' }}>PROFILE</Text>
            </View>
        )
    }
}
export default Profile;
