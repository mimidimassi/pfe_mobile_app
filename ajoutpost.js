import React, { Component } from 'react'
import { Picker,Icon, Input, Card, Button } from "react-native-elements";
import {
    Keyboard,
    Platform,
    ImageBackground,
    Image, FlatList, View,
    SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, ToastAndroid
} from "react-native";
import SelectDropdown from 'react-native-select-dropdown'
import { Ionicons } from '@expo/vector-icons';

import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL } from './contants'
import axios from 'axios'


export default class ajoutpost extends Component {
    constructor()
    {
        super();
        this.state = {
             image:"",
            selectdcategorie:"",
            name:"",
            desc:"",
            text: '',
            country:"",
            souscategorie:[],
           idsouscategorie: "", keyboardStatus: "",
            nameError: "", desError: "", imageError:"",souscaetgeError:""
        }
    }
    validate_filed = () => {
      
      
        if (this.state.name.trim() === "") {
         this.setState(() => ({ nameError: "nom required." }));
          


        } else {
            this.setState(() => ({ nameError: "" }));
        }


        if (this.state.desc.trim() === "") {
           this.setState(() => ({ desError: "description required." }));


        } else {
            this.setState(() => ({ desError: "" }));
        }

        if (this.state.image.trim() === "") {
        this.setState(() => ({ imageError:"image required." }));


        } else {
            this.setState(() => ({ imageError: "" }));
        }

        if (this.state.selectdcategorie.trim() === "") {
            this.setState(() => ({ souscaetgeError: "sous categorie required." }));


        } else {
            this.setState(() => ({ souscaetgeError: "" }));
        }

    }
    redirect_vers_data = () => {
        this.validate_filed()
        if (this.state.name.trim() != "" && this.state.desc.trim() != "" 
         &&this.state.image.trim() != "" && this.state.selectdcategorie.trim() != ""
        )
        // this.validate_filed())
        {
            this.addpost();
        }

        // alert(this.state.categorie)


        //this.props.navigation.navigate('forget_password')



    }
   icon = () => {
        return (
            <Ionicons 
                name="md-chevron-down"
                size={24}
                color="rgb(134 ,111 ,230)"

            />
        );
    };
    openImagePickerAsync = async () => {
    let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();

    if (permissionResult.granted === false) {
        alert('Permission to access camera roll is required!');
        return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync();
        this.setState({ image: pickerResult.uri });
        console.log(pickerResult);
};
  
    apisouscategories = () => {
     
        axios.get(BASE_URL + '/allsouscatgory'

        ).then(res => {
            console.log(res.data)
        this.setState({ souscategorie: res.data })
            //this.setState({ loading:false})

        }).catch(function (error) {
            //alert(error);
        });
       

    }
    storeData = async (name,id) => {

        var value = await AsyncStorage.setItem(name,id);
        //alert(value)

    };
    getid = async (name) => {
        var value = await AsyncStorage.getItem(name);
        console.log(value)
    };
    api_id_soucategorie =  () => {
      //  var name_sou_categorie = await AsyncStorage.getItem('name_sous_categorie');
        /*let {selectdcategorie}=this.state
        axios.get(BASE_URL + '/getidsoucategorie/' +selectdcategorie

        ).then(res => {
           
            this.setState({ idsouscategorie: res.data })
             this.storeData('id', this.state.idsouscategorie)
   
            //this.setState({ loading:false})

        }).catch(function (error) {
            //alert(error);
        });
        */

    } 
     componentWillUnmount() {
        this.keyboardDidShowSubscription.remove();
        this.keyboardDidHideSubscription.remove();
    }
    componentDidMount() {
        this.apisouscategories();
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
    addpost =async() => {
        var token = await AsyncStorage.getItem('AUTH_TOKEN');
        let id;
   
        axios.post(BASE_URL + '/addpost', {
            nom: this.state.name
            , desc: this.state.desc,
            image: this.state.image,sous_categorie_name:this.state.selectdcategorie

        }

            , {

                headers: {
                    Authorization: 'Bearer ' + token
                }
            }
        ).then(res => {
if(res.status ==200)
{ //alert('succes')
ToastAndroid.show('Publication ajouté evec succes !', ToastAndroid.SHORT);
    this.props.navigation.navigate('mes post')
}
        // alert(res.data)
        }).catch(function (error) {
            alert(error);
        });
      

    }
    render() {
        let { souscategorie}=this.state
        return ( 
            <View style={styles.container}>
                <TouchableOpacity style={{
                    marginLeft: 20,
                    width: 60,
                    height: 80,
                    borderRadius: 41,
                    marginTop: 15, backgroundColor: "white"
                }}onPress={() => {

                    //alert('hello')
                    this.props.navigation.navigate('mes post')
                }}
                   >
                    <Ionicons style={{ margin: 5, marginTop: 29, marginLeft: 10 }}
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
                }}> Ajouter une publication.</Text>
                <View style={styles.MainContainer}>
                    {this.state.keyboardStatus == 'Keyboard Shown' ?

                        <Card

                            containerStyle={styles.card2}
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
                                    }} >Choisir une image.</Text>
                                </TouchableOpacity>

                                <Input style={{
                                    padding: 15,
                                    marginTop: 25
                                }}
                                    placeholder='Nom.'
                                    leftIcon={
                                        <Ionicons style={{ marginTop: 17 }}
                                            name="md-person-circle"
                                            size={24}
                                            color="rgb(134 ,111 ,230)"

                                        />

                                    }
                                    onChangeText={name => this.setState({ name })}
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
                                    onChangeText={desc => this.setState({ desc })

                                    }
                                    placeholder='Description.'
                                    placeholderTextColor="rgb(0, 0, 0)"
                                />
                                <Ionicons style={{
                                    marginLeft: 10,
                                    marginTop: 12
                                }}
                                    name="md-apps"
                                    size={24}
                                    color="rgb(134 ,111 ,230)"


                                />
                               
                                <SelectDropdown
                                    itemRenderer={item => _renderItem(item)}
                                    dropdownStyle={{ marginLeft: 20 }}
                                    dropdownIconPosition="Right"
                                    buttonStyle={{
                                        color: "red",
                                        marginTop: -37, marginRight: 4,
                                        backgroundColor: "transparent", width: 340
                                    }}
                                    renderDropdownIcon={this.icon}
                                    defaultButtonText="Choisir un sous categorie."
                                    data={souscategorie}
                                    onSelect={(selectedItem, index) => {
                                        this.setState({ selectdcategorie: selectedItem })

                                        console.log(selectedItem)
                                        //this.storeData('name_sous_categorie',this.state.selectdcategorie )
                                        //this.getid('id')
                                    }}
                                    buttonTextAfterSelection={(selectedItem, index) => {
                                        // text represented after item is selected
                                        // if data array is an array of objects then return selectedItem.property to render after item is selected
                                        return selectedItem
                                    }}
                                    rowTextForSelection={(item, index) => {
                                        // text represented for each item in dropdown
                                        // if data array is an array of objects then return item.property to represent item in dropdown
                                        return item
                                    }}
                                />
                               
                                {this.state.image ? <Image
                                    source={{ uri: this.state.image }}
                                    style={styles.thumbnail}
                                /> : null}


                            </View>





                        </Card>
                        : <Card

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
                                    }} >Choisir une image.</Text>
                                </TouchableOpacity>
                                {!!this.state.imageError && (
                                    <Text style={{
                                        padding: 0,

                                        marginLeft: 58,

                                        marginTop: 10, color: "red"
                                    }}>

                                        <Ionicons
                                            name="md-close-circle"
                                            size={12}

                                        />
                                        {this.state.imageError}</Text>
                                )}
                                <Input style={{
                                    padding: 15,
                                    marginTop: 5
                                }}
                                    placeholder='Nom.'
                                    leftIcon={
                                        <Ionicons style={{ marginTop: 17 }}
                                            name="md-person-circle"
                                            size={24}
                                            color="rgb(134 ,111 ,230)"

                                        />

                                    }
                                    onChangeText={name => this.setState({ name })}
                                    value={this.state.name}
                                    placeholderTextColor="rgb(0, 0, 0)"

                                />

                                {!!this.state.nameError && (
                                    <Text style={{
                                        padding: 0,

                                        marginLeft: 58,

                                        marginTop: -10, color: "red"
                                    }}>

                                        <Ionicons
                                            name="md-close-circle"
                                            size={12}

                                        />
                                        {this.state.nameError}</Text>
                                )}
                                <Input style={{ padding: 15 }}
                                    leftIcon={
                                        <Ionicons
                                            name="md-newspaper-outline"
                                            size={24}
                                            color="rgb(134 ,111 ,230)"


                                        />

                                    }
                                    onChangeText={desc => this.setState({ desc })

                                    }
                                    value={this.state.desc}
                                    placeholder='Description.'
                                    placeholderTextColor="rgb(0, 0, 0)"
                                />
                                {!!this.state.desError && (
                                    <Text style={{
                                        padding: 0,

                                        marginLeft: 58,

                                        marginTop: -10, color: "red"
                                    }}>

                                        <Ionicons
                                            name="md-close-circle"
                                            size={12}

                                        />
                                        {this.state.desError}</Text>
                                )}
                                <Ionicons style={{
                                    marginLeft: 10,
                                    marginTop: 12
                                }}
                                    name="md-apps"
                                    size={24}
                                    color="rgb(134 ,111 ,230)"


                                />
                                <SelectDropdown
                                    itemRenderer={item => _renderItem(item)}
                                    dropdownStyle={{ marginLeft: 20 }}
                                    dropdownIconPosition="Right"
                                    buttonStyle={{
                                        color: "red",
                                        marginTop: -37, marginRight: 4,
                                        backgroundColor: "transparent", width: 340
                                    }}
                                    renderDropdownIcon={this.icon}
                                    defaultButtonText="Choisir un sous categorie."
                                    data={souscategorie}
                                    onSelect={(selectedItem, index) => {
                                        this.setState({ selectdcategorie: selectedItem })

                                        console.log(selectedItem)
                                        //this.storeData('name_sous_categorie',this.state.selectdcategorie )
                                        //this.getid('id')
                                    }}
                                    buttonTextAfterSelection={(selectedItem, index) => {
                                        // text represented after item is selected
                                        // if data array is an array of objects then return selectedItem.property to render after item is selected
                                        return selectedItem
                                    }}
                                    rowTextForSelection={(item, index) => {
                                        // text represented for each item in dropdown
                                        // if data array is an array of objects then return item.property to represent item in dropdown
                                        return item
                                    }}
                                />
                                {!!this.state.souscaetgeError && (
                                    <Text style={{
                                        padding: 0,

                                        marginLeft: 58,

                                        marginTop: -10, color: "red"
                                    }}>

                                        <Ionicons
                                            name="md-close-circle"
                                            size={12}

                                        />
                                        {this.state.souscaetgeError}</Text>
                                )}
                                {this.state.image ? <Image
                                    source={{ uri: this.state.image }}
                                    style={styles.thumbnail}
                                /> : null}


                            </View>





                        </Card>}
  
                    <TouchableOpacity onPress={this.redirect_vers_data} style={styles.button}>
                        <Text style={{fontSize:18,color:"white",textAlign:'center'}}>Enregister</Text>
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
      
        marginLeft:230,
        marginTop: 35,
        padding:7,


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
        height: "50%", padding: 10,
        width: '92%', marginTop:-100,
        
    },
    card2: {
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
        height: "80%", padding: 10,
        width: '92%', marginTop: 96,

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
        marginLeft:-20,
        resizeMode: "contain", height:100, width:400
    }
});
