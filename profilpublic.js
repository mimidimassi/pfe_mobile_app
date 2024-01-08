import React, { Component } from 'react'
import { Picker, Input, Card, Button } from "react-native-elements";
import {Modal,Pressable,
    ActivityIndicator,
    Platform,
    ImageBackground,
    Image, FlatList, View,
    SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, Alert,TextInput
} from "react-native";
import SelectDropdown from 'react-native-select-dropdown'
import { Icon } from '@iconify/react';
import { Ionicons ,AntDesign, MaterialCommunityIcons,FontAwesome5 } from '@expo/vector-icons';
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


    
   
   


    
    
  
     
   
    componentDidMount() {
     
    }
  
  
    
   
    setModalemailVisible = (visible) => {
        this.setState({ emailmodale: visible });
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
                           <Text style={styles.modalText}>Envoyer un message !</Text>

                           <Input style={{     borderRadius: 20,marginTop:-10, borderColor:"red",
                fontSize:12,
                 height: 40,
                 paddingTop:-15,
                 margin: 30,
                 width: '94%',
                 marginLeft: 11}}
                 onChangeText={email => this.setState({ email })}
                    placeholder='Laisser un message...'
                                  
                                    

                                />
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
                   <View>
                            <View>
                                <Image style={styles.imageprofile}
                                    source={{
                                        uri:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjAAwQyKxGO39mWtUYjD0s_uhMSmEi4wXyPg&usqp=CAU'
                                    }} />
                             
                                <Text style={styles.namestyle}>   Ali ben salah  </Text>
                                <Text style={{ color: "white" }}>
                                    Ali ben salah  </Text>


                                <View style={{
                                    marginTop: -15
                                    ,
                                    marginLeft: 162, flexDirection: 'row'
                                }}

                                >
                                    <TouchableOpacity
                                        onPress={() => {
                                            alert('hellonot')
                                        }}
                                        style={{
                                            marginLeft: 20,
                                            width: 40,
                                            height: 40,
                                            borderRadius: 41,
                                            marginTop: 20, backgroundColor: "transparent"
                                        }}  >
                                 <MaterialCommunityIcons name="card-account-details-star" 
                                 size={26}  color="rgb(134 ,111 ,230)" />
                            
                                    </TouchableOpacity>
                                  
                                    <TouchableOpacity
                                       onPress={() => this.setModalemailVisible(true)}
                                        style={{
                                            marginLeft: 20,
                                            width: 40,
                                            height: 40,
                                            borderRadius: 41,
                                            marginTop: 20, backgroundColor: "transparent"
                                        }}  >
                                            <FontAwesome5 
                                            name="facebook-messenger" size={26} color="rgb(134 ,111 ,230)" />
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
                            </Text>  De Tunis


                                </Text>
                                <Text style={styles.paysstyle}> <Ionicons style={{ margin: 3 }}

                                    name="md-at-circle-outline"
                                    size={24}
                                    color="rgb(134 ,111 ,230)"

                                />
                                    <Text style={{ color: "white" }}>
                                        u
                            </Text>
                                   meriamdimassi115@gmail.com

                                </Text>
                                <Text style={styles.membrestyle}> <Ionicons style={{ margin: 3 }}

                                    name="md-time-outline"
                                    size={24}
                                    color="rgb(134 ,111 ,230)"

                                />

                                    <Text style={{ color: "white" }}>
                                        u
                            </Text>
                                    Membre depuis 21 juin 2019

                                </Text>
                            </View></View>
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
