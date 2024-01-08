import React, { Component } from 'react'
import { Picker, Input, Card, Button } from "react-native-elements";
import {Modal,Pressable,
    ActivityIndicator,
    Platform,
    ImageBackground,
    Image, FlatList, View,
    SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, Alert
} from "react-native";
import SelectDropdown from 'react-native-select-dropdown'
import { Icon } from '@iconify/react';
import { Ionicons } from '@expo/vector-icons';
import { BASE_URL,  BASE_URL_Img} from './contants'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage';
//import ImagePicker from 'react-native-image-picker';
//import * as ImagePicker from 'react-native-image-picker'
const ImageOptions = {
    title: 'select image', storageOptions: { skipBackup: true, path: 'images' },
    maxWidth: 150, maxHeight: 150, chooseFromLibraryButtonTitle: 'Choose from gallery',
};
//import { ImagePicker, Permissions } from 'expo';
import * as ImagePicker from 'expo-image-picker';
//import ImagePicker from "react-native-customized-image-picker";
export default class profile extends Component {

    constructor()
    {
super();
        this.state = {
            noteqaul:"",
    name:"",newimage:"",
    email:"",
    image:"",dateinsc:"",
    pays:"",
    loadname: false, loademail: false, loaddate: false, loadpays: false, loadimage: false,
    emailmodale:false,passwordmodale:false,
    secureTextEntryancien:true,
    secureTextEntrynouveau: true,
    secureTextEntryconfirm: true,
    anicenpassword: "", anciennne_adresse_email:"",newemail:"",newpassword:"",confirmpass:"",
    anicenemailError: "", newemailnameError: "", ancienpassError: "", newpassError: "",
    confirmpassError: "",
}
       

    }


    
    openImagePickerAsync = async () => {
    let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();
        var token = await AsyncStorage.getItem('AUTH_TOKEN');

        if (permissionResult.granted === false) {
            alert('Permission to access camera roll is required!');
            return;
        }
        let result = await ImagePicker.launchImageLibraryAsync();
        var token = await AsyncStorage.getItem('AUTH_TOKEN');
     /*   const formData = new FormData()
        formData.append(
            'image',
           *this.state.newimage*/
       // )
        axios.post(BASE_URL + '/update_image_profile_mobile',{image:result.uri}

            ,
            {

                headers: {
                    Authorization: 'Bearer ' + token,
                   
                }
            })

            .then(res => {

                if (res.status == 200) {
                    this.componentDidMount();
                }
                else {
                    alert('error')
                }

                //this.apiimageuser();
            }).catch(function (error) {
                alert(error);
            });

      
    };
    uploadImageAsync= async(pictureuri) =>{
        var token = await AsyncStorage.getItem('AUTH_TOKEN');
        var data = new FormData();
        data.append('image', {
            uri: pictureuri,
            name: 'image',
            type: 'image/jpg'
        })

        axios.put(BASE_URL+ '/update_image_profile_mobile', {
            headers: {
                Authorization: 'Bearer ' + token,
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data'
            },
           
        }).then(
            response => {
                console.log('succ ')
                console.log(response)
            }
        ).catch(err => {
            console.log('err ')
            console.log(err)
        })




    }


     validate_filed_email = () => {
      
      
         if (this.state.anciennne_adresse_email == "") {
            this.setState(() => ({ anicenemailError: "Ancien email  required." }));
        //  alert('vide')


        } else {
            this.setState(() => ({ anicenemailError: "" }));
        }


        if (this.state.anicenpassword.trim() === "") {
           this.setState(() => ({ancienpassError: "Ancien mot de passe required." }));


        } else {
            this.setState(() => ({ ancienpassError: "" }));
        }

        if (this.state.newemail.trim() === "") {
            this.setState(() => ({ newemailnameError:"nouveau mot de passe required." }));


        } else {
            this.setState(() => ({ newemailnameError: "" }));
        }


    }
    validate_filed_password = () => {



        if (this.state.anicenpassword.trim() === "") {
            this.setState(() => ({ ancienpassError: "Ancien mot de passe required." }));


        } else {
            this.setState(() => ({ ancienpassError: "" }));
        }

        if (this.state.newpassword.trim() === "") {
            this.setState(() => ({ newpassError: "nouveau mot de passe required." }));
  

        } else {
            this.setState(() => ({ newpassError: "" }));
        }
        if (this.state.confirmpass.trim() === "") {
            this.setState(() => ({ confirmpassError: "confirm mot de passe required." }));
   

        } else {
            this.setState(() => ({ confirmpassError: "" }));
        }


    }
    redirect_email = () => {
    
        this.validate_filed_email()
       if (this.state.anicenemail = !"" && this.state.newemail != "" && this.state.anicenpassword!= "")
        {
this.Api_edit_email()
        }

    }
        redirect_password = () => {
        this.validate_filed_password()
     if ( this.state.anicenpassword != "") {
         this.Api_edit_password();
        }
    }
    setModalemailVisible = (visible) => {
        this.setState({ emailmodale: visible });
    }
    setModalpasswordVisible = (visible) => {
        this.setState({ passwordmodale: visible });
    }
    componentDidMount() {
        this.setState({ loadname: true })
        this.setState({ loademail: true })
        this.setState({ loaddate: true })
        this.setState({ loadpays: true })
        this.setState({ loadimage: true })
        this.apinameuser();
        this.apiemailuser();
        this.apiimageuser();
        this.apipaysuser();
        this.apidateuser();
    }
    handelchangeancienmail =(e)=>{
this.setState({anciennne_adresse_email:e})
console.log(this.state.anicenemail)
    }
    Api_edit_email = () => {
        axios.put(BASE_URL + '/update_email_pro',
            {
                email: this.state.anciennne_adresse_email,
                password:this.state.anicenpassword,
                newmail: this.state.newemail,

            }

        ).then(res => {
            console.log(this.state.anciennne_adresse_email)
            if (res.status == 202) {

    
                alert('cet adresse email est déja utlisé essayez une autre svp !')
            
              

            }
            if (res.status == 201) {
             
                 alert('svp verifier vous ancien coordonneés   !')
          
            
            } else
                if (res.status == 200) {
                    //alert('email modifier avec succes !')
                //    ToastAndroid.show('Adresse email modifié avec succes! ', ToastAndroid.SHORT);
                    this.setState({ emailmodale: false })
                    this.componentDidMount();
                }


        });
        

    }
    Api_edit_password = () => {
     



        if (this.state.newpassword != this.state.confirmpass) {

            this.setState({ noteqaul: ' Les mots de passe ne correspondent pas.' });
            console.log(this.state.noteqaul)

         

        }

        else {
         

            axios.put(BASE_URL + '/update_password_pro',
                {
                    email:this.state.email,
                    password: this.state.anicenpassword,
                    newpassword: this.state.newpassword,

                }

            ).then(res => {
                // console.log(res.data);
                if (res.status == 203) {
                
                    this.setState({ incoorectepass: ' Votre ancien mot de passe est incoorecte' });

                    alert(' Votre ancien mot de passe est incorrecte');
                }
                else
                    if (res.status == 200) {
                        
                       alert(' password modifier avec succés ');
                        this.setState({ noteqaul: '' });
                       // ToastAndroid.show('password modifier avec succés! ', ToastAndroid.SHORT);
                        this.setState({passwordmodale: false })
                        
                    }



            });
            this.setState({ noteqaul: '' });
        }
    }
    Apiupdateimage = async() => {
        var token = await AsyncStorage.getItem('AUTH_TOKEN');
        const formData = new FormData()
        formData.append(
            'image',
            this.state.newimage
        )
        axios.get(BASE_URL + '/update_image_profile_mobile',formData
          
            ,
            {

                headers: {
                    Authorization: 'Bearer ' + token  ,
                     'Content-Type': 'multipart/form-data',
                }
            })

            .then(res => {
              
if(res.status ==200)
{
    this.componentDidMount();
}
else{
    alert('error')
}
    
//this.apiimageuser();
            }).catch(function (error) {
                alert(error);
            });
    

        }
          
           
    apinameuser = async () => {
        var token = await AsyncStorage.getItem('AUTH_TOKEN');
        axios.get(BASE_URL + '/nameuser'
            , {

                headers: {
                    Authorization: 'Bearer ' + token
                }
            }
        ).then(res => {
            console.log(res.data)
            this.setState({ name: res.data })
            this.setState({ loadname: false })
        }).catch(function (error) {
            //alert(error);
        });


    }
    apiemailuser = async () => {
        var token = await AsyncStorage.getItem('AUTH_TOKEN');
        axios.get(BASE_URL + '/emailuser'
            , {

                headers: {
                    Authorization: 'Bearer ' + token
                }
            }
        ).then(res => {
            console.log(res.data)
            this.setState({ email: res.data })
            this.setState({ loademail: false})
        }).catch(function (error) {
            //alert(error);
        });


    }






    apipaysuser = async () => {
        var token = await AsyncStorage.getItem('AUTH_TOKEN');
        axios.get(BASE_URL + '/paysuser'
            , {

                headers: {
                    Authorization: 'Bearer ' + token
                }
            }
        ).then(res => {
            console.log(res.data)
            this.setState({pays: res.data })
            this.setState({ loadpays: false })
        }).catch(function (error) {
            //alert(error);
        });


    }






    apidateuser = async () => {
        var token = await AsyncStorage.getItem('AUTH_TOKEN');
        axios.get(BASE_URL + '/dateuser'
            , {

                headers: {
                    Authorization: 'Bearer ' + token
                }
            }
        ).then(res => {
            console.log(res.data)
            this.setState({ dateinsc: res.data })
            this.setState({ loaddate: false })
        }).catch(function (error) {
            //alert(error);
        });


    }
    apiimageuser = async () => {
        var token = await AsyncStorage.getItem('AUTH_TOKEN');
        axios.get(BASE_URL + '/imageuser'
            , {

                headers: {
                    Authorization: 'Bearer ' + token
                }
            }
        ).then(res => {
            console.log(res.data)
            this.setState({ image: res.data })
            this.setState({ loadimage: false })
        }).catch(function (error) {
            //alert(error);
        });


    }













    render() {
        return (
            <View style={styles.container}>
               
               
                <TouchableOpacity
                    onPress={() => {


                        this.props.navigation.navigate('mes post')
                    }}
                    style={{
                     marginLeft:20,
                        width: 23,
                        height: 23,
                        borderRadius: 41,
                        marginTop: 20, backgroundColor: "#efe3e380"
                    }}  >
                    <Ionicons style={{ margin: 2 }}

                        name="md-chevron-back-outline"
                        size={18}
                        color="rgb(134 ,111 ,230)"

                    />
                </TouchableOpacity>
<View  style={styles.MainContainer} >
                    <Modal
                        animationType="fade"
                    transparent={true}
                        visible={this.state.emailmodale}
                        onRequestClose={() => {
                            Alert.alert("Modal has been closed.");
                            this.setModalVisible(!this.state.emailmodale);
                        }}
                    >
                       
                        <View style={styles.centeredView}>
                       
                            <View style={styles.modalView}>
                                <TouchableOpacity onPress={() => this.setModalemailVisible(!this.state.emailmodale)}>
                                    <Ionicons style={{
                                        marginTop: 0,
                                        marginLeft: 270
                                    }} 
                                        name="md-close"
                                        size={21}
                                        color="rgb(134 ,111 ,230)"

                                    />
                                </TouchableOpacity>
                           <Text style={styles.modalText}>Modifier l'adresse email 
                                  
                                 <Ionicons style={{ marginLeft: 4}}
                                               name="md-pencil"
                                        size={15}
                                        color="rgb(134 ,111 ,230)"

                                    />
                                </Text>

                              
                                <Input style={{
                                    padding: 15, fontSize: 15,
                                    marginTop: 25, marginLeft: -15
                                }}
                                   
                                    onChangeText={anicenpassword => this.setState({ anicenpassword })}
                                    placeholder='Ancien mot de passe ......'


                                    secureTextEntry={this.state.secureTextEntryancien}
                                    rightIcon={
                                        <TouchableOpacity style={{backgroundColor:"black"}}
                                            onPress={() => {
                                                this.setState({
                                                    secureTextEntryancien:
                                                        !this.state.secureTextEntryancien
                                                });
                                            }}
                                        >

                                            {this.state.secureTextEntryancien === true ?
                                                <Ionicons style={{
                                                    marginLeft: -22,
                                                    marginTop: 25
                                                }}
                                                    name="eye-off"
                                                    size={18}
                                                    color="rgb(134 ,111 ,230)"
                                                />
                                                : null}
                                            {this.state.secureTextEntryancien === false ?
                                                <Ionicons style={{
                                                    marginLeft: -22,
                                                    marginTop: 25
                                                }}
                                                    name="eye"
                                                    size={18}
                                                    color="rgb(134 ,111 ,230)"
                                                />
                                                : null}
                                        </TouchableOpacity>
                                    }
























                                />
                                {!!this.state.ancienpassError && (
                                    <Text style={{
                                        padding: 0,
                                        marginLeft: -76,

                                        marginTop: -10,
                                        color: "red"
                                    }}>
                                        <Ionicons
                                            name="md-close-circle"
                                            size={12}

                                        />

                                        {this.state.ancienpassError}</Text>
                                )}
                                <Input style={{
                                    padding: 15, fontSize: 15,
                                    marginTop: -1, marginLeft: -15 
                            }}

                                placeholder='Ancienne email......'
                                    onChangeText={this.handelchangeancienmail}

                                   

                                />
                                {!!this.state.anicenemailError && (
                                    <Text style={{
                                        padding: 0,
                                        marginLeft: -112,

                                        marginTop: -10,
                                        color: "red"
                                    }}>
                                        <Ionicons
                                            name="md-close-circle"
                                            size={12}

                                        />

                                        {this.state.anicenemailError}</Text>
                                )}
                                <Input style={{
                                    padding: 15, fontSize: 15,
                                    marginTop: -1, marginLeft: -15
                                }}
                               
                                    placeholder='Nouvelle  email.......'
                                    
                                    onChangeText={newemail=> this.setState({newemail})}



                                />
                                {!!this.state.newemailnameError && (
                                    <Text style={{
                                        padding: 0,
                                        marginLeft: -59,

                                        marginTop: -10,
                                        color: "red"
                                    }}>
                                        <Ionicons
                                            name="md-close-circle"
                                            size={12}

                                        />

                                        {this.state.newemailnameError}</Text>
                                )}
                                <TouchableOpacity
                                    style={[styles.button, styles.buttonClose]}
                                    onPress={this.redirect_email}
                                >
                                    <Text style={styles.textStyle}>Enregistrer</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>
                    <Modal
                        animationType="fade"
                        transparent={true}
                        visible={this.state.passwordmodale}
                        onRequestClose={() => {
                            Alert.alert("Modal has been closed.");
                            this.setModalpasswordVisible(!this.state.passwordmodale);
                        }}
                    >
                        <View style={styles.centeredView}>
                            <View style={styles.modalView}>
                                <TouchableOpacity onPress={() => this.setModalpasswordVisible(!this.state.passwordmodale)}>
                                    <Ionicons style={{
                                        marginTop: 0,
                                        marginLeft: 270
                                    }}
                                        name="md-close"
                                        size={21}
                                        color="rgb(134 ,111 ,230)"

                                    />
                                </TouchableOpacity>
                                   <Text style={styles.modalText}>Modifier mot de passe 
                                  
                                 <Ionicons style={{ marginLeft: 4}}
                                               name="md-pencil"
                                        size={15}
                                        color="rgb(134 ,111 ,230)"

                                    />
                                </Text>

                                
                                <Input style={{
                                    padding: 15, fontSize: 15,
                                    marginTop: 25, marginLeft: -15
                                }}
                                    secureTextEntry={this.state.secureTextEntryancien}
                                    rightIcon={ 
                                        <TouchableOpacity
                                            onPress={() => {
                                                this.setState({
                                                    secureTextEntryancien:
                                                        !this.state.secureTextEntryancien
                                                });
                                            }}
                                        >

                                            {this.state.secureTextEntryancien === true ?
                                                <Ionicons style={{
                                                    marginLeft: -22,
                                                    marginTop: 25
                                                }}
                                                    name="eye-off"
                                                    size={18}
                                                    color="rgb(134 ,111 ,230)"
                                                />
                                                : null}
                                            {this.state.secureTextEntryancien === false ?
                                                <Ionicons style={{
                                                    marginLeft: -22,
                                                    marginTop: 25
                                                }}
                                                    name="eye"
                                                    size={18}
                                                    color="rgb(134 ,111 ,230)"
                                                />
                                                : null}
                                        </TouchableOpacity>
                                    }




                                    onChangeText={anicenpassword => this.setState({ anicenpassword  })}

                           
                                    placeholder='Ancien mot de passe ......'



                                />
                                {!!this.state.ancienpassError && (
                                    <Text style={{
                                        padding: 0,
                                        marginLeft: -79,

                                        marginTop: -20,
                                        color: "red"
                                    }}>
                                        <Ionicons
                                            name="md-close-circle"
                                            size={12}

                                        />

                                        {this.state.ancienpassError}</Text>
                                )}
                                <Input style={{ fontSize:15,
                                    padding: 15,
                                    marginTop: -1, marginLeft: -15 
                                }} rightIcon={
                                    <Ionicons style={{
                                        marginLeft: -22,
                                        marginTop: 5
                                    }}
                                        name="md-eye-off"
                                        size={18}
                                        color="rgb(134 ,111 ,230)"
                                    />
                                }
                                    onChangeText={newpassword => this.setState({newpassword})}
                                    placeholder='nouveau mot de passe......'
                                    secureTextEntry={this.state.secureTextEntrynouveau}
                                    rightIcon={
                                        <TouchableOpacity
                                            onPress={() => {
                                                this.setState({
                                                    secureTextEntrynouveau:
                                                        !this.state.secureTextEntrynouveau
                                                });
                                            }}
                                        >

                                            {this.state.secureTextEntrynouveau === true ?
                                                <Ionicons style={{
                                                    marginLeft: -22,
                                                    marginTop: 10
                                                }}
                                                    name="eye-off"
                                                    size={18}
                                                    color="rgb(134 ,111 ,230)"
                                                />
                                                : null}
                                            {this.state.secureTextEntrynouveau=== false ?
                                                <Ionicons style={{
                                                    marginLeft: -22,
                                                    marginTop: 10
                                                }}
                                                    name="eye"
                                                    size={18}
                                                    color="rgb(134 ,111 ,230)"
                                                />
                                                : null}
                                        </TouchableOpacity>
                                    }




                                   

                                />
                                {!!this.state.newpassError && (
                                    <Text style={{
                                        padding: 0,
                                        marginLeft: -71,

                                        marginTop: -10,
                                        color: "red"
                                    }}>
                                        <Ionicons
                                            name="md-close-circle"
                                            size={12}

                                        />

                                        {this.state.newpassError}</Text>
                                )}
                                <Input style={{
                                    padding: 15, fontSize:15,
                                    marginTop: -1, marginLeft: -15
                                }}
                                   
                                    placeholder='confirmation mot de passe  .......'
                                    onChangeText={confirmpass=> this.setState({ confirmpass })}
                                    secureTextEntry={this.state.secureTextEntryconfirm}
                                    rightIcon={
                                        <TouchableOpacity
                                            onPress={() => {
                                                this.setState({
                                                    secureTextEntryconfirm:
                                                        !this.state.secureTextEntryconfirm
                                                });
                                            }}
                                        >

                                            {this.state.secureTextEntryconfirm === true ?
                                                <Ionicons style={{
                                                    marginLeft: -22,
                                                    marginTop: 10
                                                }}
                                                    name="eye-off"
                                                    size={18}
                                                    color="rgb(134 ,111 ,230)"
                                                />
                                                : null}
                                            {this.state.secureTextEntryconfirm === false ?
                                                <Ionicons style={{
                                                    marginLeft: -22,
                                                    marginTop: 10
                                                }}
                                                    name="eye"
                                                    size={18}
                                                    color="rgb(134 ,111 ,230)"
                                                />
                                                : null}
                                        </TouchableOpacity>
                                    }






                                />
                                {!!this.state.confirmpassError && (
                                    <Text style={{
                                        padding: 0,
                                        marginLeft: -75,

                                        marginTop: -10,
                                        color: "red"
                                    }}>
                                        <Ionicons
                                            name="md-close-circle"
                                            size={12}

                                        />

                                        {this.state.confirmpassError}</Text>
                                )}
                                {!!this.state.noteqaul       && (
                                    <Text style={{
                                        padding: 0,
                                        marginLeft: -1,

                                        marginTop: -10,
                                        color: "#e4e44f"
                                    }}>
                                        <Ionicons
                                            name="md-close-circle"
                                            size={12}

                                        />

                                        {this.state.noteqaul}</Text>
                                )}
                                <TouchableOpacity

                                    style={[styles.button, styles.buttonClose]}
                                    onPress={this.redirect_password}
                                >
                                    <Text style={styles.textStyle}>Enregistrer</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>
                    {this.state.loaddate || this.state.loademail || this.state.loadname ||
                        this.state.loadpays || this.state.loadimage ?
                        <View style={{
                            justifyContent: "center",
                            flex: 1, marginTop: -350
                        }}>

                            <ActivityIndicator size={60} color="rgb(134 ,111 ,230)" />
                        </View> : <View>
                            <View>
                                <Image style={styles.imageprofile}
                                    source={{
                                        uri:this.state.image
                                    }} />
                                <TouchableOpacity onPress={this.openImagePickerAsync}
                                    style={{

                                        marginLeft: 198,
                                        marginTop: -30
                                    }}

                                >
                                    <Text>
                                        <Ionicons


                                            name="md-camera"
                                            size={24}
                                            color="rgb(134 ,111 ,230)"

                                        />
                                    </Text>
                                </TouchableOpacity>
                                <Text style={styles.namestyle}>    {this.state.name} </Text>
                                <Text style={{ color: "white" }}>
                                    Ali ben salah  </Text>


                                <View style={{
                                    marginTop: -15
                                    ,
                                    marginLeft: 130, flexDirection: 'row'
                                }}

                                >
                                    <TouchableOpacity
                                        onPress={() => {
                                            alert('hellonot')
                                        }}
                                        style={{
                                            marginLeft: 20,
                                            width: 23,
                                            height: 23,
                                            borderRadius: 41,
                                            marginTop: 20, backgroundColor: "transparent"
                                        }}  >
                                        <Ionicons


                                            name="md-notifications-off-outline"
                                            size={24}
                                            color="rgb(134 ,111 ,230)"

                                        />
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={() => this.setModalpasswordVisible(true)}
                                        style={{
                                            marginLeft: 20,
                                            width: 23,
                                            height: 23,
                                            borderRadius: 41,
                                            marginTop: 20, backgroundColor: "transparent"
                                        }}  >
                                        <Image style={{ height: 24, width: 24 }}
                                            source={require('./assets/pass.png')} />
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={() => this.setModalemailVisible(true)}
                                        style={{
                                            marginLeft: 20,
                                            width: 23,
                                            height: 23,
                                            borderRadius: 41,
                                            marginTop: 20, backgroundColor: "transparent"
                                        }}  >
                                        <Image style={{ height: 24, width: 24 }}
                                            source={require('./assets/mail.png')} />

                                        <Image style={{
                                            marginTop: -9
                                            ,
                                            marginLeft: 11, height: 8, width: 8
                                        }}
                                            source={require('./assets/pen2.png')} />
                                    </TouchableOpacity>
                                </View>

                                <View style={{ backgroundflexDirection: 'row', marginLeft: 56 }}

                                >

                                    <TouchableOpacity onPress={() => {
                                        alert('hello')
                                    }}

                                    >
                                        <Ionicons


                                            name="md-notifications-off-outline"
                                            size={18}
                                            color="rgb(255,255,255)"

                                        />

                                    </TouchableOpacity>



                                    <TouchableOpacity onPress={() => {
                                        alert('password')
                                    }}

                                    >



                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={() => this.setModalemailVisible(true)}


                                    >




                                    </TouchableOpacity>










                                </View>

                            </View>
                            <View style={{ marginLeft: -10, margin: 3, marginTop: -26 }}>
                                <Text style={styles.emailstyle}> <Ionicons style={{ margin: 3 }}

                                    name="md-flag"
                                    size={24}
                                    color="rgb(134 ,111 ,230)"

                                />

                                    <Text style={{ color: "white" }}>
                                        i
                            </Text>  De {this.state.pays}


                                </Text>
                                <Text style={styles.paysstyle}> <Ionicons style={{ margin: 3 }}

                                    name="md-at-circle-outline"
                                    size={24}
                                    color="rgb(134 ,111 ,230)"

                                />
                                    <Text style={{ color: "white" }}>
                                        u
                            </Text>
                                    {this.state.email}

                                </Text>
                                <Text style={styles.membrestyle}> <Ionicons style={{ margin: 3 }}

                                    name="md-time-outline"
                                    size={24}
                                    color="rgb(134 ,111 ,230)"

                                />

                                    <Text style={{ color: "white" }}>
                                        u
                            </Text>
                                    Membre depuis {this.state.dateinsc}

                                </Text>
                            </View></View>}
                  </View>
          </View>
                
           
        )
    }
}


const styles = StyleSheet.create({

    emailstyle: {
      //  color: "rgb(135 ,120 ,120)",
        textAlign: "left",
        fontSize: 20, padding: 54,
//marginTop:-30
       // left:10
    },
    paysstyle: {
        //  color: "rgb(135 ,120 ,120)",
        marginTop: - 85,
        textAlign: "left",
        fontSize: 20, padding: 53
    },
    membrestyle: {
        //  color: "rgb(135 ,120 ,120)",
        marginTop: - 84,
        textAlign: "left",
        fontSize:20, padding: 53
    },
    namestyle:{
        //color:"rgb(135 ,120 ,120)",
        fontWeight:'bold',
        textAlign: "center",
        fontSize: 30, marginTop: 10
    },
    imageprofile: {
        marginLeft: 150, 
marginTop: -51,
 height: 120,
    width: 120,
    borderRadius: 70,
    },
    MainContainer: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.37,
        shadowRadius: 7.49,

        elevation: 12,

        color: "black",
        borderRadius: 23, marginTop:177, height: "100%", backgroundColor: 'white'
    },
    container: {
        height: "30%",
        backgroundColor: "#aaa0d7",
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
    },

    modalView: {textAlign:'center',
        margin: 115,
        marginLeft:45,
        width:330,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 20,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    button: {
        borderRadius: 20,
        padding: 10, marginTop: 30,
        elevation: 2
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "rgb(134 ,111 ,230)",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        color:' rgb(134, 111, 230)',
        marginBottom: 15,
        textAlign: "center"
        ,fontSize:15,fontWeight:'bold'
    }
});
