import React, { Component } from 'react'
import { Picker, Icon, Input, Card, Button } from "react-native-elements";
import { Keyboard,
    ToastAndroid,
    Platform,
    ImageBackground,
    Image, FlatList, View,
    SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity
} from "react-native";
import SelectDropdown from 'react-native-select-dropdown'
import { Ionicons } from '@expo/vector-icons';
const countries = ["Egypt", "Canada", "Australia", "Ireland"]
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios'
import { BASE_URL } from './contants'
import AsyncStorage from '@react-native-async-storage/async-storage';
export default class ajoutpost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newname: this.props.route.params.name, 
            newdesc: this.props.route.params.desc,
            newimage:"",
            postid: this.props.route.params.idpost,
            keyboardStatus:"",
            image: "",
            text: '',
            country: "",
            countries:
                [{ label: 'Item 1', value: '1' },
                { label: 'Item 2', value: '2' },
                { label: 'Item 3', value: '3' },
                { label: 'Item 4', value: '4' },
                { label: 'Item 5', value: '5' },
                { label: 'Item 6', value: '6' },
                { label: 'Item 7', value: '7' },
                { label: 'Item 8', value: '8' }]
        }
    }
    componentWillUnmount() {
        this.keyboardDidShowSubscription.remove();
        this.keyboardDidHideSubscription.remove();
    }
    componentDidMount() {
        //this.apisouscategories();
        this.keyboardDidShowSubscription = Keyboard.addListener(
            'keyboardDidShow',
            () => {
                this.setState({ keyboardStatus: 'Keyboard Shown' });

            },
        );
        this.keyboardDidHideSubscription = Keyboard.addListener(
            'keyboardDidHide',
            () => {
                this.setState({ keyboardStatus: 'Keyboard Hidden' });

            },
        );
    }
    editpost = async () => {
        var token = await AsyncStorage.getItem('AUTH_TOKEN');
        axios.put(BASE_URL + '/update_actuality_mobile', {
            id:this.state.postid,
            nom: this.state.newname
            , desc: this.state.newdesc,
            image: this.state.image, 

        }, {

                headers: {
                    Authorization: 'Bearer ' + token
                }
            }
        ).then(res => {
            if (res.status == 200) {
                ToastAndroid.show('Publication modifié avec succés !', ToastAndroid.SHORT);
                this.props.navigation.navigate('mes post')
            }
            // alert(res.data)
        }).catch(function (error) {
            console.log(error);
        });


    }
    _renderItem = item => {
        return (
            <View style={styles.item}>
                <Text style={styles.textItem}>{item.label}</Text>
            </View>
        );
    };
    icon = () => {
        return (
            <Ionicons
                name="md-chevron-down"
                size={24}
                color="rgb(134 ,111 ,230)"

            />
        );
    };
    textdefault = () => {
        return (
            <Text style={{ color: "red" }}> choisir un sous categorie.</Text>
        );
    }; openImagePickerAsync = async () => {
        let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();

        if (permissionResult.granted === false) {
            alert('Permission to access camera roll is required!');
            return;
        }

        let pickerResult = await ImagePicker.launchImageLibraryAsync();
        this.setState({image: pickerResult.uri });
        console.log(pickerResult);
    };
    render() {
        let { data } = this.state
        return (
            <View style={styles.container}>
                <TouchableOpacity style={{
                    marginLeft:20,
                    width: 60,
                    height: 80,
                    borderRadius: 41,
                    marginTop: 15, backgroundColor: "white"
                }} onPress={() => {

//alert('hello')
                   this.props.navigation.navigate('mes post')
                }} >
                    <Ionicons style={{ margin:5,marginTop: 29, marginLeft:10}}
                        name="md-chevron-back-outline"
                        size={32}
                        color="rgb(134 ,111 ,230)"
                    />

                </TouchableOpacity>
                <Text style={{
                    marginTop: -45, textAlign: "center",
                    fontWeight: 'bold',
                    //  marginLeft: 98,
                    fontSize: 18,
                    color: "rgb(134 ,111 ,230)"
                }}>Modifier  une publication.</Text>
                <View style={styles.MainContainer}>
                    {this.state.keyboardStatus == "Keyboard Shown" ? <Card

                        containerStyle={styles.card1}
                        wrapperStyle={{}}>

                        <View
                            style={{
                                flexGrow: 1, height: '100%'
                                // alignItems: "center"
                            }}
                        >


                            <TouchableOpacity onPress={this.openImagePickerAsync}>
                                <Ionicons style={{
                                    marginLeft: 10,
                                    marginTop: 1
                                }}
                                    name="md-image"
                                    size={24}
                                    color="rgb(134 ,111 ,230)"


                                /><Text style={{
                                    color: "rgb(0, 0, 0)",
                                    fontSize: 19,
                                    marginLeft: 52,
                                    marginTop: -23
                                }} >Modifer l'image.</Text>
                            </TouchableOpacity>

                            <Input style={{
                                padding: 15,
                                marginTop: 25
                            }}
                                onChangeText={newname => this.setState({ newname })}
                                value={this.state.newname}
                                placeholder='Nom.'
                                leftIcon={
                                    <Ionicons style={{ marginTop: 17 }}
                                        name="md-person-circle"
                                        size={24}
                                        color="rgb(134 ,111 ,230)"

                                    />

                                }
                                placeholderTextColor="rgb(0, 0, 0)"

                            />


                            <Input style={{ padding: 15 }}
                                leftIcon={
                                    <Ionicons
                                        name="md-newspaper-outline"
                                        size={24}
                                        color="rgb(134 ,111 ,230)"


                                    />

                                }
                                onChangeText={newdesc => this.setState({ newdesc })}
                                value={this.state.newdesc}
                                placeholder='Description.'
                                placeholderTextColor="rgb(0, 0, 0)"
                            />


                            {this.state.image ? <Image
                                source={{ uri: this.state.image }}
                                style={styles.thumbnail}
                            /> : null}


                        </View>




                    </Card> :
                        <Card

                            containerStyle={styles.card}
                            wrapperStyle={{}}>

                            <View
                                style={{
                                    flexGrow: 1, height: '100%'
                                    // alignItems: "center"
                                }}
                            >


                                <TouchableOpacity onPress={this.openImagePickerAsync}>
                                    <Ionicons style={{
                                        marginLeft: 10,
                                        marginTop: 1
                                    }}
                                        name="md-image"
                                        size={24}
                                        color="rgb(134 ,111 ,230)"


                                    /><Text style={{
                                        color: "rgb(0, 0, 0)",
                                        fontSize: 19,
                                        marginLeft: 52,
                                        marginTop: -23
                                    }} >Modifer l'image.</Text>
                                </TouchableOpacity>

                                <Input style={{
                                    padding: 15,
                                    marginTop: 25
                                }}
                                    onChangeText={newname => this.setState({ newname })}
                                    value={this.state.newname}
                                    placeholder='Nom.'
                                    leftIcon={
                                        <Ionicons style={{ marginTop: 17 }}
                                            name="md-person-circle"
                                            size={24}
                                            color="rgb(134 ,111 ,230)"

                                        />

                                    }
                                    placeholderTextColor="rgb(0, 0, 0)"

                                />


                                <Input style={{ padding: 15 }}
                                    leftIcon={
                                        <Ionicons
                                            name="md-newspaper-outline"
                                            size={24}
                                            color="rgb(134 ,111 ,230)"


                                        />

                                    }
                                    onChangeText={newdesc => this.setState({ newdesc })}
                                    value={this.state.newdesc}
                                    placeholder='Description.'
                                    placeholderTextColor="rgb(0, 0, 0)"
                                />


                                {this.state.image ? <Image
                                    source={{ uri: this.state.image }}
                                    style={styles.thumbnail}
                                /> : null}


                            </View>




                        </Card>}
                   
                    <TouchableOpacity onPress={this.editpost} style={styles.button}>
                        <Text style={{ fontSize: 18, color: "white", textAlign: 'center' }}>Enregister</Text>
                    </TouchableOpacity>

                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    button: {

        // borderRadius: 18,
        backgroundColor: 'rgb(134 ,111 ,230)',
        borderBottomLeftRadius: 31,
        borderTopLeftRadius: 31,

        marginLeft: 167,
        marginTop: 35,
        padding: 7,


    },
    MainContainer: {

        justifyContent: 'center',
        flex: 1,
        margin: 5,
        marginTop: (Platform.OS === 'ios') ? 20 : 0,

    },
    container: {
        backgroundColor: "white",
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
    },
    card: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
        borderWidth: 1.2,
        width: "100%",
        margin: 20,
        borderRadius: 9,
        height: "35%", padding: 10,
        width: '92%', marginTop: -100,

    },
    card1: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
        borderWidth: 1.2,
        width: "100%",
        margin: 20,
        borderRadius: 9,
        height: "45%", padding: 10,
        width: '92%', marginTop: -100,

    },

    imageView: {

        width: 100,
        height: 50,
        margin: 7,
        borderRadius: 7

    },
    textView: {
        fontWeight: "bold",
        width: '50%',
        textAlign: 'left',
        padding: 10,
        color: '#000',
        marginLeft: -2,

    },
    textView1: {

        width: '50%',
        textAlign: 'left',
        marginTop: 30,
        padding: 10,
        marginRight: 162
        , marginLeft: -65,
        color: '#000'

    },
    item: {
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    title: {
        fontSize: 32,
    },
    list: {
        //boxShadow: 'rgb(233 223 223 / 78%) 1px 1px 25px, rgb(217 205 205 / 76%) 0px 0px 1px',

        flex: 1, flexDirection: 'row',
        //   borderRadius: 16,
        margin: 5,
        backgroundColor: 'white',
        height: 80,
        justifyContent: 'space-around',
        paddingLeft: 10,
        elevation: 1
    },
    fab: {
        marginTop: - 7,
        position: 'absolute',
        width: 56,
        height: 56,
        alignItems: 'center',
        justifyContent: 'center',
        right: 20,
        bottom: 20,
        backgroundColor: 'rgb(134 ,111 ,230)',
        borderRadius: 30,
        elevation: 8
    },
    fabIcon: {
        fontSize: 40,
        color: 'white'
    }, icon: {
        marginRight: 5,
        width: 18,
        height: 18,
    },
    item: {
        paddingVertical: 17,
        paddingHorizontal: 4,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    textItem: {
        flex: 1,
        fontSize: 16,
    },
    dropdown: {
        backgroundColor: 'white',
        borderBottomColor: 'gray',
        borderBottomWidth: 0.5,
        marginTop: 20,
    },
    thumbnail: {
        // textAlign:"center",
        marginLeft: -20,
        resizeMode: "contain", height: 100, width: 400
    }
});
