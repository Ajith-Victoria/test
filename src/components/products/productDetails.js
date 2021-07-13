import React from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View, BackHandler, 
    Text, Picker,
    StatusBar,
    Image,
    TouchableOpacity,
    TextInput,
    ImageBackground, AsyncStorage,
    ToastAndroid,
} from 'react-native';
import styles from './productStyle';
import mainStyles from '../mainStyle';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import DocumentPicker from 'react-native-document-picker';

class ProductDetails extends React.Component {
    constructor(props) {
        super(props);
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
        this.state = {
            phonenum: "",
            error: false,
            connection_Status: true,
            // spinner: true,
            default_department: 'Department',
            defaultNumber: 1,
            productName: '',
            productCode: '',
            category: '',
            creatingDate: '',
            updatedDate: '',
            productWarranty: '',
            description: '',
            productCatalogue: 'Select file',
            productCertificates: 'Select file',
        }
    }
    // #14a852
    componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    }
    
    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }
    
    handleBackButtonClick() {
        this.props.navigation.goBack(null);
        return true;
    }

    CatalogueUpload = () => {
        try {
            const res = DocumentPicker.pick({
                type: [DocumentPicker.types.pdf],
            });
            console.log(
                res
            );
        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
                // User cancelled the picker, exit any dialogs or menus and move on
            } else {
                throw err;
            }
        }
    }

    CertificatesUpload = () => {
        try {
            const res = DocumentPicker.pick({
                type: [DocumentPicker.types.pdf],
            });
            console.log(
                res
            );
        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
                // User cancelled the picker, exit any dialogs or menus and move on
            } else {
                throw err;
            }
        }
    }

    render() {
        return (
            <View style={styles.container}>
                {this.state.spinner ?
                    <View style={{ marginTop: "80%", position: 'absolute', zIndex: 99, width: "100%", paddingHorizontal: 20, height: 70 }}>
                        <View style={{ alignItems: 'center', justifyContent: 'center', height: '100%', }}>
                            <Image
                                source={require('../../assets/icons/loader.gif')}
                                style={{ width: 50, height: 50 }} />
                            <Text style={mainStyles.spinnerTextStyle}>please wait</Text>
                        </View>
                    </View>
                    :
                    <View style={styles.backgroundImage}>
                        <View style={styles.warForm}>
                            <View style={styles.backView}>
                                <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                                    <Image
                                        source={require('../../assets/images/backarrow.png')}
                                        style={{ width: 15, height: 15 }} />
                                </TouchableOpacity>
                            </View>

                            <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 20 }}>
                                <Image
                                    source={require('../../assets/icons/bar.png')}
                                    style={{ width: 170, height: 100 }} />
                            </View>

                            <View style={styles.warPage}>
                                <View style={{ alignItems: 'center', marginBottom: 10 }}>
                                    <TouchableOpacity style={styles.registerHeading}>
                                        <Text style={{ color: '#ffffff', fontWeight: 'bold', letterSpacing: 0.5, fontSize: 16 }}>Register Product Details</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.productBox}>

                                    <ScrollView contentContainerStyle={{ flexGrow: 1, position: 'relative' }}>
                                        <View style={{ paddingHorizontal: 10 }}>
                                            <View style={styles.inputView}>
                                                <View><Text style={styles.nameField}>Product name</Text></View>
                                                <Text style={{ width: 15, fontWeight: "bold" }}>:</Text>
                                                <View style={{ width: '50%' }}>
                                                    <Text style={styles.nameData}>Tissue processor</Text>
                                                </View>
                                            </View>

                                            <View style={styles.inputView}>
                                                <View><Text style={styles.nameField}>Manufacture Name</Text></View>
                                                <Text style={{ width: 15, fontWeight: "bold", marginTop: -5 }}>:</Text>
                                                <View style={{ width: '50%' }}>
                                                    <Text style={styles.nameData}>MedTech</Text>
                                                </View>
                                            </View>

                                            <View style={styles.inputView}>
                                                <View><Text style={styles.nameField}>Model Number</Text></View>
                                                <Text style={{ width: 15, fontWeight: "bold" }}>:</Text>
                                                <View style={{ width: '50%' }}>
                                                    <Text style={styles.nameData}>0086334589</Text>
                                                </View>

                                            </View>

                                            <View style={styles.inputView}>
                                                <View><Text style={styles.nameField}>Price</Text></View>
                                                <Text style={{ width: 15, fontWeight: "bold" }}>:</Text>
                                                <View style={{ width: '50%' }}>
                                                    <Text style={styles.nameData}>2000Rs</Text>
                                                </View>
                                            </View>

                                            <View style={styles.inputView}>
                                                <View><Text style={styles.nameField}>Warranty</Text></View>
                                                <Text style={{ width: 15, fontWeight: "bold" }}>:</Text>
                                                <View style={{ width: '50%' }}>
                                                    <Text style={styles.nameData}>22-04-2021</Text>
                                                </View>
                                            </View>

                                            <View style={styles.inputView}>
                                                <View><Text style={styles.nameField}>Product catalogue</Text></View>
                                                <Text style={{ width: 15, fontWeight: "bold", marginTop: -2 }}>:</Text>
                                                <View style={{ width: '50%' }}>
                                                    <TouchableOpacity onPress={this.CatalogueUpload}>
                                                        <Text>{this.state.productCatalogue}</Text>
                                                    </TouchableOpacity>
                                                </View>
                                            </View>

                                            <View style={styles.inputView}>
                                                <View><Text style={styles.nameField}>Product Certificates</Text></View>
                                                <Text style={{ width: 15, fontWeight: "bold" }}>:</Text>
                                                <View style={{ width: '50%' }}>
                                                    <TouchableOpacity onPress={this.CatalogueUpload}>
                                                    <Text>{this.state.productCertificates}</Text>
                                                    </TouchableOpacity>
                                                </View>
                                            </View>

                                            <View style={styles.inputView}>
                                                <View><Text style={styles.nameField}>Product description</Text></View>
                                                <Text style={{ width: 15, fontWeight: "bold" }}>:</Text>
                                                <View style={{ width: '50%' }}>
                                                    <Text style={styles.nameData}>0011546 Tissue processor is a combonation of unique design, built - in intelligence and cutting edge technology.</Text>
                                                </View>
                                            </View>



                                            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                                <TouchableOpacity style={styles.loginButton}>
                                                    <Text style={{ color: '#ffffff', letterSpacing: 0.5 }}>REGISTER COMPLAINT</Text>
                                                </TouchableOpacity>
                                            </View>
                                            <View style={{ height: 300 }}>

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
export default ProductDetails;