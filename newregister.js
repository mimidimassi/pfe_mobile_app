import React, { Component } from 'react'

import {  ToastAndroid,Keyboard, ImageBackground, Image }
    from "react-native";

import { Icon, Input, Card, Button } from "react-native-elements";
import { StyleSheet, View, Text, TouchableOpacity }
    from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import axios from "axios"
///registeruser
const image = require('./assets/6.png')
import {BASE_URL}  from   './contants'
import AsyncStorage from '@react-native-async-storage/async-storage';
export default class newregister extends Component {
    constructor() {
        super();
        this.state = {
            secureTextEntry1: true,
            secureTextEntry:true,
            email: "", validepassword:'',validepasswordc:'',
            name: "",
            pays: "",
            password: "",
            confirmpassword: "",
            image: "", validemail:"",equalpassword:'',
            cancelButtonClicked: false, nameErrorpays: "", nameErrorcp: "",
            error: "", nameErrorp: "",
             nameError: "", 
             nameErroremail: "",
            errorname: "", keyboardStatus:""

        }

    }
    update_secureTextEntry=()=>{
        this.setState({secureTextEntry:false});
    }
    redirect_register=()=>{
        var password = this.state.password;
        var confirmpassword = this.state.password;
        var lenghtconfirmpassword = confirmpassword.length;
        var lenghpassword = password.length;
        this.validate_filed();
        if (this.state.name.trim() != "" && this.state.password.trim() != ""
            && this.state.email.trim() != "" && this.state.pays.trim() != "" && lenghtconfirmpassword > 6 && lenghpassword > 6 ) 
            { 
this.Apiregister();
            }

           
    }
    storeToken = async (token) => {
   
        try {
            await AsyncStorage.setItem(
                'AUTH_TOKEN',
                token
            );
           
        } catch (error) {
        }
    };
    Apiregister=()=>{
        var password=this.state.password;
        var confpassword= this.state.confirmpassword;
        if(password !=confpassword)
        {
            this.setState({equalpassword:"les deux mots de passes ne sont pas identiques."})
            this.setState(() => ({ nameErrorp: "" }));
        }
        else{
            this.setState({ equalpassword: "" })

            axios.post(BASE_URL+'/registeruser',
                {
                    name: this.state.name,
                    email: this.state.email,
                    password: this.state.password,
                    pays: this.state.pays
                })


                .then(res => {
                  //  alert(res.data);

                   if (res.status == 201) { //alert('succes')
                       alert('L`adresse email que vous avez choisie est déja existe!');
                      
                    }
else
                    if (res.status == 200) { //alert('succes')
                        this.storeToken(res.data);
                        ToastAndroid.show('Inscription faites avec succes! ', ToastAndroid.SHORT);
                        this.props.navigation.navigate('mes post')
                    }


                })

       // }

        }
          
    }
 componentDidMount(){
   
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
                this.setState({ height: "40%" });
            },
        );
        this.keyboardDidHideSubscription = Keyboard.addListener(
            'keyboardDidHide',
            () => {
                this.setState({ keyboardStatus: 'Keyboard Hidden' });
                this.setState({ height: "25%" });
            },
        );
    }







    validate_filed = () => {
        var password= this.state.password;
        var confirmpassword = this.state.password;
        var lenghtconfirmpassword = confirmpassword.length;
        var lenghpassword = password.length;
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
        if (reg.test(this.state.email) === false &&
            this.state.email != "") {
            this.setState(() => ({ validemail: "email must be valid." }));
        }
        else {
            this.setState(() => ({ validemail: "" }));

        }
        if (this.state.email.trim() === "") {
            this.setState(() => ({ nameError: "email required." }));


        } else {
            this.setState(() => ({ nameError: "" }));
        }
        if (this.state.name.trim() === "") {
            this.setState(() => ({ errorname: "Name required." }));


        } else {
            this.setState(() => ({ errorname: "" }));
        }

        if (this.state.password.trim() === "") {
            this.setState(() => ({ nameErrorp: "Password required." }));
           // this.setState(() => ({ validepassword: "" }));
            this.setState({ equalpassword: "" })
        } else {
            this.setState(() => ({ validepassword: "" }));
            //this.setState(() => ({ nameErrorp: "" }));
            this.setState(() => ({ nameErrorp: "" }));
        }
        if (lenghpassword < 6 && 
            this.state.password.trim() != "") {
            this.setState(() => ({ validepassword: "minimimum 6  lettre!" }));


        } else {
            this.setState(() => ({ validepassword: "" }));
        }
        if (lenghtconfirmpassword < 6 && 
            this.state.confirmpassword.trim() != "") {
            this.setState(() => ({ validepasswordc: "minimimum 6  lettre!" }));
            //this.setState(() => ({ nameErrorcp: "" }));


        }
         else {
            this.setState(() => ({ validepasswordc: "" }));
        }
        if (this.state.confirmpassword.trim() === "") {
            this.setState(() => ({ nameErrorcp: " confirm Password required." }));
            this.setState({ equalpassword: "" })
        
        } else {
            this.setState(() => ({ nameErrorcp: "" }));
        }
        if (this.state.pays.trim() === "") {
            this.setState(() => ({ nameErrorpays: "pays required." }));


        } else {
            this.setState(() => ({ nameErrorpays: "" }));
        }
        
    }
    render() {
        return (
            <View style={{ backgroundColor: "white",
             height: '100%',
              width: '100%'}}>
                <ImageBackground style={{ 
                    height: '100%',
                    width:'100%' }}
                    source={image} >
                    <Text style={styles.titreconnexion}> 
                    Inscription </Text>
                    {this.state.keyboardStatus =="Keyboard Shown" ?
                        <Card style={{

                        }} containerStyle={{
                            width: "100%", margin: 20,
                            borderRadius: 10,
                            height: "85%", padding: 5,
                            width: '92%', marginTop: -15,

                            borderWidth: 1.2
                            , shadowColor: "#000",
                            shadowOffset: {
                                width: 0,
                                height: 7,
                            },
                            shadowOpacity: 0.43,
                            shadowRadius: 9.51,

                            elevation: 15,




                        }}
                            wrapperStyle={{}}>

                            <View
                                style={{
                                    position: "relative",
                                    alignItems: "center"
                                }}
                            >
                                <Input style={{
                                    marginTop: 10,
                                    padding: 12, height: "10%",
                                }}
                                    onChangeText={name => this.setState({ name })}
                                    placeholder=' Name...'
                                    leftIcon={
                                        <Ionicons
                                            name="md-person-circle"
                                            size={28}
                                            color="rgb(134 ,111 ,230)"
                                        />

                                    }


                                />
                                {!!this.state.errorname && (
                                    <Text style={{
                                        padding: 0,
                                        marginTop: -8,
                                        color: "red", marginLeft: -150
                                    }}>

                                        <Ionicons
                                            name="md-close-circle"
                                            size={12}

                                        />
                                        {this.state.errorname}</Text>
                                )}
                                <Input style={{ padding: 12, height: "10%", }}

                                    placeholder=' email...'
                                    onChangeText={email => this.setState({ email })}
                                    leftIcon={
                                        <Ionicons
                                            name="md-at-circle-outline"
                                            size={28}
                                            color="rgb(134 ,111 ,230)"
                                        />

                                    }


                                />
                                {!!this.state.nameError && (
                                    <Text style={{
                                        marginTop: -8, padding: 0, color: "red",
                                        marginLeft: -150
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
                                        marginLeft: -62,

                                        marginTop: -10, color: "rgb(217, 211 ,51)"
                                    }}>
                                        <Ionicons
                                            name="md-warning-sharp"
                                            size={12}

                                        />
                                        {this.state.validemail}</Text>
                                )}
                                <Input style={{ padding: 12, height: "10%", }}
                                    onChangeText={pays => this.setState({ pays })}
                                    placeholder='pays...'
                                    leftIcon={
                                        <Ionicons
                                            name="md-flag-sharp"
                                            size={28}
                                            color="rgb(134 ,111 ,230)"
                                        />

                                    }


                                />
                                {!!this.state.nameErrorpays && (
                                    <Text style={{
                                        marginTop: -8, padding: 0, color: "red",
                                        marginLeft: -160
                                    }}>

                                        <Ionicons
                                            name="md-close-circle"
                                            size={12}

                                        />
                                        {this.state.nameErrorpays}</Text>
                                )}

                                <Input style={{ padding: 12, height: "10%", }}
                                    secureTextEntry={this.state.secureTextEntry1}
                                    onChangeText={password => this.setState({ password })}

                                    placeholder='password...'
                                    leftIcon={
                                        <Ionicons
                                            name="md-lock-open"
                                            size={28}
                                            color="rgb(134 ,111 ,230)"
                                        />
                                    }
                                    rightIcon={
                                        <TouchableOpacity
                                            onPress={() => {
                                                this.setState({
                                                    secureTextEntry1:
                                                        !this.state.secureTextEntry1
                                                });
                                            }}
                                        >

                                            {this.state.secureTextEntry1 === true ?
                                                <Ionicons
                                                    name="eye-off"
                                                    size={20}
                                                    color="rgb(134 ,111 ,230)"
                                                />
                                                : null}
                                            {this.state.secureTextEntry1 === false ?
                                                <Ionicons
                                                    name="eye"
                                                    size={20}
                                                    color="rgb(134 ,111 ,230)"
                                                />
                                                : null}
                                        </TouchableOpacity>
                                    }
                                />
                                {!!this.state.equalpassword && (
                                    <Text style={{
                                        padding: 0,
                                        marginLeft: -2,

                                        marginTop: -10, color: "rgb(217, 211 ,51)"
                                    }}>
                                        <Ionicons
                                            name="md-warning-sharp"
                                            size={12}

                                        />
                                        {this.state.equalpassword}</Text>
                                )}

                                {!!this.state.validepassword && (
                                    <Text style={{
                                        padding: 0,
                                        marginLeft: -62,

                                        marginTop: -10, color: "rgb(217, 211 ,51)"
                                    }}>
                                        <Ionicons
                                            name="md-warning-sharp"
                                            size={12}

                                        />
                                        {this.state.validepassword}</Text>
                                )}
                                {!!this.state.nameErrorp && (
                                    <Text style={{
                                        marginTop: -8, padding: 0,
                                        color: "red",
                                        marginLeft: -130
                                    }}>

                                        <Ionicons
                                            name="md-close-circle"
                                            size={12}

                                        />
                                        {this.state.nameErrorp}</Text>
                                )}


                                <Input style={{ padding: 11, height: "10%", }}
                                    secureTextEntry={this.state.secureTextEntry}

                                    onChangeText={confirmpassword => this.setState({ confirmpassword })}
                                    placeholder='confirmation password...'
                                    leftIcon={
                                        <Ionicons
                                            name="md-lock-closed"
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
                                {!!this.state.validepasswordc && (
                                    <Text style={{
                                        padding: 0,

                                        marginLeft: -130,
                                        marginTop: -10, color: "rgb(217, 211 ,51)"
                                    }}>
                                        <Ionicons
                                            name="md-warning-sharp"
                                            size={12}

                                        />
                                        {this.state.validepasswordc}</Text>
                                )}
                                {!!this.state.nameErrorcp && (
                                    <Text style={{ marginTop: -8, padding: 0, color: "red", marginLeft: -80 }}>

                                        <Ionicons
                                            name="md-close-circle"
                                            size={12}

                                        />
                                        {this.state.nameErrorcp}</Text>
                                )}




                            </View>


                            <TouchableOpacity style={{

                            }}
                                style={{}}
                                onPress={() => {


                                    this.props.navigation.navigate('Connexion')
                                }} >
                                <Text
                                    style={styles.text_mot_de_passe_oublié}>
                                    J'ai déja un compte? </Text>

                            </TouchableOpacity>





                        </Card>
                    :
                    
                        <Card style={{

                        }} containerStyle={{
                            width: "100%", margin: 20,
                            borderRadius: 10,
                            height: "55%", padding: 5,
                            width: '92%', marginTop: 90,

                            borderWidth: 1.2
                            , shadowColor: "#000",
                            shadowOffset: {
                                width: 0,
                                height: 7,
                            },
                            shadowOpacity: 0.43,
                            shadowRadius: 9.51,

                            elevation: 15,




                        }}
                            wrapperStyle={{}}>

                            <View
                                style={{
                                    position: "relative",
                                    alignItems: "center"
                                }}
                            >
                                <Input style={{
                                    marginTop: 10,
                                    padding: 12, height: "10%",
                                }}
                                    onChangeText={name => this.setState({ name })}
                                    placeholder=' Name...'
                                    leftIcon={
                                        <Ionicons
                                            name="md-person-circle"
                                            size={28}
                                            color="rgb(134 ,111 ,230)"
                                        />

                                    }


                                />
                                {!!this.state.errorname && (
                                    <Text style={{
                                        padding: 0,
                                        marginTop: -8,
                                        color: "red", marginLeft: -150
                                    }}>

                                        <Ionicons
                                            name="md-close-circle"
                                            size={12}

                                        />
                                        {this.state.errorname}</Text>
                                )}
                                <Input style={{ padding: 12, height: "10%", }}

                                    placeholder=' email...'
                                    onChangeText={email => this.setState({ email })}
                                    leftIcon={
                                        <Ionicons
                                            name="md-at-circle-outline"
                                            size={28}
                                            color="rgb(134 ,111 ,230)"
                                        />

                                    }


                                />
                                {!!this.state.nameError && (
                                    <Text style={{
                                        marginTop: -8, padding: 0, color: "red",
                                        marginLeft: -150
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
                                        marginLeft: -62,

                                        marginTop: -10, color: "rgb(217, 211 ,51)"
                                    }}>
                                        <Ionicons
                                            name="md-warning-sharp"
                                            size={12}

                                        />
                                        {this.state.validemail}</Text>
                                )}
                                <Input style={{ padding: 12, height: "10%", }}
                                    onChangeText={pays => this.setState({ pays })}
                                    placeholder='pays...'
                                    leftIcon={
                                        <Ionicons
                                            name="md-flag-sharp"
                                            size={28}
                                            color="rgb(134 ,111 ,230)"
                                        />

                                    }


                                />
                                {!!this.state.nameErrorpays && (
                                    <Text style={{
                                        marginTop: -8, padding: 0, color: "red",
                                        marginLeft: -160
                                    }}>

                                        <Ionicons
                                            name="md-close-circle"
                                            size={12}

                                        />
                                        {this.state.nameErrorpays}</Text>
                                )}

                                <Input style={{ padding: 12, height: "10%", }}
                                    secureTextEntry={this.state.secureTextEntry1}
                                    onChangeText={password => this.setState({ password })}

                                    placeholder='password...'
                                    leftIcon={
                                        <Ionicons
                                            name="md-lock-open"
                                            size={28}
                                            color="rgb(134 ,111 ,230)"
                                        />
                                    }
                                    rightIcon={
                                        <TouchableOpacity
                                            onPress={() => {
                                                this.setState({
                                                    secureTextEntry1:
                                                        !this.state.secureTextEntry1
                                                });
                                            }}
                                        >

                                            {this.state.secureTextEntry1 === true ?
                                                <Ionicons
                                                    name="eye-off"
                                                    size={20}
                                                    color="rgb(134 ,111 ,230)"
                                                />
                                                : null}
                                            {this.state.secureTextEntry1 === false ?
                                                <Ionicons
                                                    name="eye"
                                                    size={20}
                                                    color="rgb(134 ,111 ,230)"
                                                />
                                                : null}
                                        </TouchableOpacity>
                                    }
                                />
                                {!!this.state.equalpassword && (
                                    <Text style={{
                                        padding: 0,
                                        marginLeft: -2,

                                        marginTop: -10, color: "rgb(217, 211 ,51)"
                                    }}>
                                        <Ionicons
                                            name="md-warning-sharp"
                                            size={12}

                                        />
                                        {this.state.equalpassword}</Text>
                                )}

                                {!!this.state.validepassword && (
                                    <Text style={{
                                        padding: 0,
                                        marginLeft: -62,

                                        marginTop: -10, color: "rgb(217, 211 ,51)"
                                    }}>
                                        <Ionicons
                                            name="md-warning-sharp"
                                            size={12}

                                        />
                                        {this.state.validepassword}</Text>
                                )}
                                {!!this.state.nameErrorp && (
                                    <Text style={{
                                        marginTop: -8, padding: 0,
                                        color: "red",
                                        marginLeft: -130
                                    }}>

                                        <Ionicons
                                            name="md-close-circle"
                                            size={12}

                                        />
                                        {this.state.nameErrorp}</Text>
                                )}


                                <Input style={{ padding: 11, height: "10%", }}
                                    secureTextEntry={this.state.secureTextEntry}

                                    onChangeText={confirmpassword => this.setState({ confirmpassword })}
                                    placeholder='confirmation password...'
                                    leftIcon={
                                        <Ionicons
                                            name="md-lock-closed"
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
                                {!!this.state.validepasswordc && (
                                    <Text style={{
                                        padding: 0,

                                        marginLeft: -130,
                                        marginTop: -10, color: "rgb(217, 211 ,51)"
                                    }}>
                                        <Ionicons
                                            name="md-warning-sharp"
                                            size={12}

                                        />
                                        {this.state.validepasswordc}</Text>
                                )}
                                {!!this.state.nameErrorcp && (
                                    <Text style={{ marginTop: -8, padding: 0, color: "red", marginLeft: -80 }}>

                                        <Ionicons
                                            name="md-close-circle"
                                            size={12}

                                        />
                                        {this.state.nameErrorcp}</Text>
                                )}




                            </View>


                            <TouchableOpacity style={{

                            }}
                                style={{}}
                                onPress={() => {


                                    this.props.navigation.navigate('Connexion')
                                }} >
                                <Text
                                    style={styles.text_mot_de_passe_oublié}>
                                    J'ai déja un compte? </Text>

                            </TouchableOpacity>





                        </Card>
                    
                    }
                   
                    <Button buttonStyle={styles.button}
                        style={{ borderRadiusLeft: 10 }}
                        title="S'inscrire"
                    onPress={this.redirect_register}
                    />
                   
                   
                </ImageBackground>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    subtitle: {
        flex: 1,
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingLeft: 10,
        paddingTop: 5,
    }, container: {
        backgroundColor: "red", height: '100%', width: '100%'
    },
    titreinscription: {
        fontWeight: 'bold',
        marginTop:70,
        marginLeft: 260,
        fontSize: 28, color: "rgb(134 ,111 ,230)"
    },
    titreconnexion: {
        fontWeight: 'bold',
        marginLeft: 27,

        marginTop: 67,
        fontSize: 28, color: "rgb(134 ,111 ,230)"
    },
    button: {
        margin: 5,
        // borderRadius: 18,
        backgroundColor: 'rgb(134 ,111 ,230)',
        borderBottomLeftRadius: 31,
        borderTopLeftRadius: 31,
        marginLeft:166,
        marginTop: 33,
        padding: 11,
       
        //boxShadow: 'rgb(122 143 200) 0px 1px 7px'
    },

    buttoninscrire: {
        margin: 5,
        borderRadius: 18,
        backgroundColor: 'rgb(255, 255, 255)',
        borderColor: 'red',
        height: 41
    },
    rightTitle: {
        justifyContent: 'center',
    },
    text_mot_de_passe_oublié: {
        fontWeight:"bold",
        marginLeft: 228,
        fontSize: 15,
        marginTop:12,
        width: '50%',
       // position: 'fixed',
        color: "rgb(134 ,111 ,230)"
    }
});
