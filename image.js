
import { Keyboard, ImageBackground,Image }
 from "react-native";
import React, { component } from 'react';
import { Icon, Input, Card, Button } from "react-native-elements";
import { ActivityIndicator,ScrollView ,StyleSheet, View, Text, TouchableOpacity } 
from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios'
import {BASE_URL }from './contants'
const image = require('./assets/6.png')
import { Component } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
export default class Imagecontaient extends Component {
    constructor() {
        super();
        this.state = {
            loding:true,
             secureTextEntry:true,
        token:'',
            email: '',
            password: "", nameError: '', 
            nameErrorp: null, validemail: ''
            , validate: false, categorie: "",height:'',
            keyboardStatus:""
        }
    }
 

    componentWillUnmount() {
        this.keyboardDidShowSubscription.remove();
        this.keyboardDidHideSubscription.remove();
    }
    componentDidMount() {
        this.keyboardDidShowSubscription = Keyboard.addListener(
            'keyboardDidShow',
            () => {
                this.setState({ keyboardStatus: 'Keyboard Shown' });
                this.setState({ height: "40%"});
            },
        );
        this.keyboardDidHideSubscription = Keyboard.addListener(
            'keyboardDidHide',
            () => {
                this.setState({ keyboardStatus: 'Keyboard Hidden' });
                this.setState({ height: "25%" });
            },
        );}
    callApi=() =>{
   
    }
    redirect_vers_data = () => {
        this.validate_filed()
        if (this.state.password.trim() != "" && this.state.email.trim()!=""  )
           // this.validate_filed())
       {
           this.ApiLogin()
       }
            
               // alert(this.state.categorie)
      
            
        //this.props.navigation.navigate('forget_password')
        
       
       
    } 
    storeData = async (token) => {
       
        try {
            await AsyncStorage.setItem(
                'AUTH_TOKEN',
                token
            );
   // alert('store token  ')
        } catch (error) {
        }
    };
    storeData2 = async () => {
        try {
            await AsyncStorage.setItem(
                'token',
                'zizouc'
            );


            var value = await AsyncStorage.getItem('token');
            alert(value)
        } catch (error) {
            // Error saving data
        }
    };
   getoken = async (token) => {
            var value = await AsyncStorage.getItem(token);
        console.log(value)
    };
    ApiLogin  = async()  => {
      
        axios.post(BASE_URL+'/login',
            {
                email: this.state.email
                , password: this.state.password})
            .then((res) => {
            
                //alert(res.data)
                if (res.status == 201) {
                   alert(res.data)
                }
                if(res.status ==200)
                {   this.storeData(res.data);
                    this.setState({ connected: true })
                    this.setState({ loding: false})
                    this.setState({ token: res.data })
                    this.props.navigation.navigate('mes post')
                }
              
               // 
               // this.getoken('AUTH_TOKEN')
               //this.setState({connected:true})
               // this.props.navigation.navigate('mes post')
            }, (err) => {             alert(err)
                  })

      
    };
   /* ApiLogin = async () => {
     axios.post('http://5a32-197-26-138-43.ngrok.io/api/login',
            {
                email: this.state.email
                , password: this.state.password
            })


            .then(res => {
           // alert('succes');
             AsyncStorage.setItem(
                    'AUTH_TOKEN',
                   res.data
                );
               /*  AsyncStorage.setItem(
                    'token',
                    res.data
                );

*/
                /* token =  AsyncStorage.getItem('token');
           alert(token);
    //*/
          /*  })

        }*/
    validate_filed = () => {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
        if (reg.test(this.state.email) === false && 
        this.state.email != "") {
            this.setState(() => ({ validemail: "email must be valid." }));
            this.setState(() => ({ nameError: "" }));

         
        }
        else{
            this.setState(() => ({ validemail: "" }));

        }
        if (this.state.email.trim() === "") {
            this.setState(() => ({ nameError: "email required." }));
            this.setState(() => ({ validemail: "" }));

           
        } else {
            this.setState(() => ({ nameError: "" }));
        }
       

        if (this.state.password.trim() === "") {
            this.setState(() => ({ nameErrorp: "Password required." }));

           
        } else {
            this.setState(() => ({ nameErrorp: "" }));
        }
       
    }
    render() {
       let spinner;
        if (this.state.loding && this.state.connected  ) {
         return <View style={{ justifyContent: "center", flex: 1,}}>
              
                <ActivityIndicator size="large" color="rgb(134 ,111 ,230)" />
            </View>
        }
        
      let {height}=this.state
        return (
            <View style={{ backgroundColor: "white", 
            height: '100%', width: '100%' }}>
                <ImageBackground style={{ height: '100%', width: '100%' }}
                    source={image} >
                    
                    {this.state.token ? <TouchableOpacity >
                        <Ionicons style={{ marginTop: 24, marginLeft: 4 }}
                            name="md-chevron-back-outline"
                            size={35}
                            color="white"
                        />

                    </TouchableOpacity> :

                        <TouchableOpacity >
                            <Ionicons style={{ marginTop: 24, marginLeft: 4  }}
                                name="md-chevron-back-outline"
                                size={35}
                                color="white"
                            />

                        </TouchableOpacity>











                    }
                 
                    <Text style={styles.titreconnexion}>
                     Connexion </Text>
                   
                    {this.state.keyboardStatus == 'Keyboard Shown' ?
                        <Card
                            containerStyle={
                                {
                                    borderWidth: 1.2,
                                    width: "100%",
                                    margin: 20,
                                    borderRadius: 10,
                                    height: "40%",
                                    padding: 10,
                                    width: '92%', marginTop: 100,
                                    shadowColor: "#000",
                                    shadowOffset: {
                                        width: 0,
                                        height: 7,
                                    },
                                    shadowOpacity: 0.43,
                                    shadowRadius: 9.51,

                                    elevation: 15,
                                }}

                            // containerStyle={styles.cadre}     
                            wrapperStyle={{}}>

                            <ScrollView Style={{ flexGrow: 1, height: '100%' }}>

                                <Input style={{
                                    padding: 17,
                                    marginTop: 11
                                }}
                                    onChangeText={email => this.setState({ email })}
                                    placeholder=' Adresse email...'
                                    leftIcon={
                                        <Ionicons
                                            name="md-person-circle"
                                            size={28}
                                            color="rgb(134 ,111 ,230)"
                                        />

                                    }
                                    onSubmitEditing={Keyboard.dismiss}

                                />

                                {!!this.state.nameError && (
                                    <Text style={{
                                        padding: 0,
                                        marginLeft: 58,

                                        marginTop: -10,
                                        color: "red"
                                    }}>
                                        <Ionicons
                                            name="md-close-circle"
                                            size={12}

                                        />

                                        {this.state.nameError}</Text>
                                )}
                                {!!this.state.validemail && (
                                    <Text style={{
                                        padding: 0,
                                        marginLeft: -50,

                                        marginTop: -10, color: "rgb(217, 211 ,51)"
                                    }}>
                                        <Ionicons
                                            name="md-warning-sharp"
                                            size={12}

                                        />
                                        {this.state.validemail}</Text>
                                )}
                                <Input style={{ padding: 15 }}
                                    secureTextEntry={this.state.secureTextEntry}
                                    onSubmitEditing={Keyboard.dismiss}
                                    onChangeText={password => this.setState({ password })}
                                    placeholder='  password...'
                                    leftIcon={
                                        <Ionicons
                                            name="md-key"
                                            size={28}
                                            color="rgb(134 ,111 ,230)"
                                        />
                                    }
                                    rightIcon={
                                        <TouchableOpacity
                                            onPress={() => {
                                                this.setState({ secureTextEntry: !this.state.secureTextEntry });
                                            }}
                                        >

                                            {this.state.secureTextEntry === true ?
                                                <Ionicons
                                                    name="eye-off"
                                                    size={20}
                                                    color="rgb(134 ,111 ,230)"
                                                />
                                                : null}
                                            {this.state.secureTextEntry === false ?
                                                <Ionicons
                                                    name="eye"
                                                    size={20}
                                                    color="rgb(134 ,111 ,230)"
                                                />
                                                : null}
                                        </TouchableOpacity>
                                    }
                                />
                                {!!this.state.nameErrorp && (
                                    <Text style={{
                                        padding: 0,

                                        marginLeft: 58,

                                        marginTop: -10, color: "red"
                                    }}>

                                        <Ionicons
                                            name="md-close-circle"
                                            size={12}

                                        />
                                        {this.state.nameErrorp}</Text>
                                )}




                            </ScrollView>


                            <TouchableOpacity style={{

                            }}
                                style={{}}
                                onPress={() => {


                                    this.props.navigation.navigate('forget_password')
                                }} >
                                <Text
                                    style={styles.text_mot_de_passe_oublié}>
                                    Mot passe oublié ? </Text>

                            </TouchableOpacity>

                        </Card>

                        : <Card
                            containerStyle={
                                {
                                    borderWidth: 1.2,
                                    width: "100%",
                                    margin: 20,
                                    borderRadius: 10,
                                    height: "25%",
                                    padding: 10,
                                    width: '92%', marginTop: 160,
                                    shadowColor: "#000",
                                    shadowOffset: {
                                        width: 0,
                                        height: 7,
                                    },
                                    shadowOpacity: 0.43,
                                    shadowRadius: 9.51,

                                    elevation: 15,
                                }}

                            // containerStyle={styles.cadre}     
                            wrapperStyle={{}}>

                            <ScrollView Style={{ flexGrow: 1, height: '100%' }}>

                                <Input style={{
                                    padding: 17,
                                    marginTop: 11
                                }}
                                    onChangeText={email => this.setState({ email })}
                                    placeholder=' Adresse email...'
                                    leftIcon={
                                        <Ionicons
                                            name="md-person-circle"
                                            size={28}
                                            color="rgb(134 ,111 ,230)"
                                        />

                                    }
                                    onSubmitEditing={Keyboard.dismiss}

                                />

                                {!!this.state.nameError && (
                                    <Text style={{
                                        padding: 0,
                                        marginLeft: 58,

                                        marginTop: -10,
                                        color: "red"
                                    }}>
                                        <Ionicons
                                            name="md-close-circle"
                                            size={12}

                                        />

                                        {this.state.nameError}</Text>
                                )}
                                {!!this.state.validemail && (
                                    <Text style={{
                                        padding: 0,
                                        marginLeft: -50,

                                        marginTop: -10, color: "rgb(217, 211 ,51)"
                                    }}>
                                        <Ionicons
                                            name="md-warning-sharp"
                                            size={12}

                                        />
                                        {this.state.validemail}</Text>
                                )}
                                <Input style={{ padding: 15 }}
                                    secureTextEntry={this.state.secureTextEntry}
                                    onSubmitEditing={Keyboard.dismiss}
                                    onChangeText={password => this.setState({ password })}
                                    placeholder='  password...'
                                    leftIcon={
                                        <Ionicons
                                            name="md-key"
                                            size={28}
                                            color="rgb(134 ,111 ,230)"
                                        />
                                    }
                                    rightIcon={
                                        <TouchableOpacity
                                            onPress={() => {
                                                this.setState({ secureTextEntry: !this.state.secureTextEntry });
                                            }}
                                        >

                                            {this.state.secureTextEntry === true ?
                                                <Ionicons
                                                    name="eye-off"
                                                    size={20}
                                                    color="rgb(134 ,111 ,230)"
                                                />
                                                : null}
                                            {this.state.secureTextEntry === false ?
                                                <Ionicons
                                                    name="eye"
                                                    size={20}
                                                    color="rgb(134 ,111 ,230)"
                                                />
                                                : null}
                                        </TouchableOpacity>
                                    }
                                />
                                {!!this.state.nameErrorp && (
                                    <Text style={{
                                        padding: 0,

                                        marginLeft: 58,

                                        marginTop: -10, color: "red"
                                    }}>

                                        <Ionicons
                                            name="md-close-circle"
                                            size={12}

                                        />
                                        {this.state.nameErrorp}</Text>
                                )}




                            </ScrollView>


                            <TouchableOpacity style={{

                            }}
                                style={{}}
                                onPress={() => {


                                    this.props.navigation.navigate('forget_password')
                                }} >
                                <Text
                                    style={styles.text_mot_de_passe_oublié}>
                                    Mot passe oublié ? </Text>

                            </TouchableOpacity>

                        </Card>
                 }
               
     
                    
            
                
                    <Button buttonStyle={styles.button}
                        style={{ borderRadiusLeft: 10}}
                    title="Se connecter"
                        onPress={this.redirect_vers_data}
                    />
                  
                   

                    <TouchableOpacity style={{

                        width: 164,
                        height: 158
                    }}
                        style={{}}
                        onPress={() => {


                            this.props.navigation.navigate('register')
                        }} >
                        <Text
                            style={styles.titreinscription}>
                           Inscription </Text>

                    </TouchableOpacity>
                   
                </ImageBackground>
            </View>
        )
    }
}
//var {height}=this.state
const styles = StyleSheet.create({ 
    ht1:{
        height: "26%",
    },
    ht2:{
        height: "40%",
    },

    cadre:{
    borderWidth: 1.2,
    width: "100%",
    margin: 20,
    borderRadius: 10,
    
     padding: 10,
    width: '92%', marginTop: 160,
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 7,
    },
    shadowOpacity: 0.43,
    shadowRadius: 9.51,

    elevation: 15,


},
    subtitle: {
        flex: 1,
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingLeft: 10,
        paddingTop: 5,
    },
    container:{
         backgroundColor: "#ffffff"
    },
    titreinscription:{
        fontWeight: 'bold',
        marginTop:180,
        marginLeft:250,
        fontSize: 28, 
        color: "rgb(134 ,111 ,230)"
    },
    titreconnexion:{
        fontWeight: 'bold',
        color: "rgb(134 ,111 ,230)",
       
marginLeft: 50,

marginTop: -5,
fontSize: 28
    },
    button: {
        margin: 5,
       // borderRadius: 18,
        backgroundColor: 'rgb(134 ,111 ,230)',
        borderBottomLeftRadius: 31,
        borderTopLeftRadius: 31,
        marginLeft:198,
        marginTop:40,
        padding: 11,
       
    },

    buttoninscrire: {
        margin: 5,
        borderRadius: 18,
        backgroundColor: 'rgb(255, 255, 255)',
        borderColor: 'red',
        height: 41,
     
    },
    rightTitle: {
        justifyContent: 'center',
    },
    text_mot_de_passe_oublié: {
       // fontWeight:" bold",
        fontWeight: "bold",
        marginLeft: 230,
        fontSize: 15,
        marginTop: -20,
        width: '50%',
        // position: 'fixed',
        color: "rgb(134 ,111 ,230)"
    }
});