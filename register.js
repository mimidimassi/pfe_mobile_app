import React, { Component } from 'react'
var FileInput = require('react-simple-file-input');
import { Icon, Input, Card, Button } from "react-native-elements";
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';


import NativeUploady from "@rpldy/native-uploady";

export default class register extends Component {

    constructor()
    {
        super();
        this.state= {
            email:"",
            name:"",
            pays:"",
            password:"",
            confirmpassword:"",
            image: "",
            cancelButtonClicked: false, nameErrorpays: "", nameErrorcp: "",
            error: "", nameErrorp: "", nameError: "", nameErroremail:"",errorname:""

        }
      
    }
 handelemail=(e)=>{
 this.setState({email:e});

    
   alert(this.state.email);
 }
    validate_filed = () => {
 
            if (this.state.email.trim() === "") {
                this.setState(() => ({ nameError: "email required." }));
             
        
            } else
              {
                this.setState(() => ({ nameError: "" }));
              } 
        if (this.state.name.trim() === "") {
            this.setState(() => ({ errorname: "Name required." }));


        } else {
            this.setState(() => ({ errorname: "" }));
        }

        if (this.state.password.trim() === "") {
            this.setState(() => ({ nameErrorp: "Password required." }));


        } else {
            this.setState(() => ({ nameErrorp: "" }));
        }
        if (this.state.confirmpassword.trim() === "") {
            this.setState(() => ({ nameErrorcp: " confirm Password required." }));


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
          
                <View style={{ backgroundColor: '#7a8ec7', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Card style={{

                }} containerStyle={{
                    marginTop: 205,
                    width: "94%", marginBottom:170,
                    borderRadius: 33,
                    height: '85%'
                }}
                    wrapperStyle={{}}>
                    <Card.Title>Inscription </Card.Title>
                    <Card.Divider />
                    <View
                        style={{
                            position: "relative",
                            alignItems: "center"
                        }}
                    >



                      
                        <Input style={{ padding: 17 }}
                           
                            placeholder=' Name...'
                            leftIcon={
                                <Ionicons
                                    name="md-person-circle"
                                    size={28}

                                />

                            }


                        />
                        {!!this.state.errorname && (
                            <Text style={{ padding: 1, color: "red",   marginLeft: -114  }}>

                                <Ionicons
                                    name="md-close-circle"
                                    size={12}

                                />
                                {this.state.errorname}</Text>
                        )}
                        <Input style={{ padding: 17 }}

                            placeholder=' email...'
                            onChangeText={email => this.setState({email})}
                            leftIcon={
                                <Ionicons
                                    name="md-at-circle-outline"
                                    size={28}

                                />

                            }


                        />
                        {!!this.state.nameError && (
                            <Text style={{ padding: 1, color: "red",   marginLeft: -114  }}>

                                <Ionicons
                                    name="md-close-circle"
                                    size={12}

                                />
                                {this.state.nameError}</Text>
                        )}
                        <Input style={{ padding: 17 }}
                            onChangeText={pays => this.setState({ pays })}
                            placeholder='pays...'
                            leftIcon={
                                <Ionicons
                                    name="md-flag-sharp"
                                    size={28}

                                />

                            }


                        />
                        {!!this.state.nameErrorpays && (
                            <Text style={{ padding: 1, color: "red",   marginLeft: -114  }}>

                                <Ionicons
                                    name="md-close-circle"
                                    size={12}

                                />
                                {this.state.nameErrorpays}</Text>
                        )}
                        <Input style={{ padding: 17 }}
                            secureTextEntry={true}
                            onChangeText={password=> this.setState({ password })}

                            placeholder='password...'
                            leftIcon={
                                <Ionicons
                                    name="md-lock-open"
                                    size={28}

                                />
                            }
                        />  
                        {!!this.state.nameErrorp && (
                            <Text style={{ padding: 1, color: "red",   marginLeft: -114  }}>

                                <Ionicons
                                    name="md-close-circle"
                                    size={12}

                                />
                                {this.state.nameErrorp}</Text>
                        )}
                        
                        
                         <Input style={{ padding: 17 }}
                            secureTextEntry={true}


                            placeholder='confirmation password...'
                            leftIcon={
                                <Ionicons
                                    name="md-lock-closed"
                                    size={28}

                                />
                            }
                        />
                        {!!this.state.nameErrorcp && (
                            <Text style={{ padding: 1, color: "red", marginLeft: -56  }}>

                                <Ionicons
                                    name="md-close-circle"
                                    size={12}

                                />
                                {this.state.nameErrorcp}</Text>
                        )}



                    </View>

                    <Button buttonStyle={styles.button} title="S'inscrire "
                        onPress={() => {   this.validate_filed()
                        }}
            />
           
                
                    
                    <TouchableOpacity onPress={() => {

                        this.props.navigation.navigate('Connexion')
                    }} >
                        <View style={styles.buttoninscrire}>
                            <Text style={styles.text_mot_de_passe_oublié}
                            >J'aid déja un compte? </Text>
                        </View>
                    </TouchableOpacity>

                

                </Card>

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
    },
    button: {
        margin: 5,
        borderRadius: 18,
        backgroundColor: 'rgb(122, 142, 199)'


    },
    buttonText: {
        color: 'rgb(122, 142, 199)',
        fontSize: 18,
        margin: 10,
         marginLeft: 123,
        marginTop: 7

    },
    buttoninscrire: {
        margin: 5,
        borderRadius: 18,
        backgroundColor: 'white',
        borderColor: 'red',
        height: 41
    },
    rightTitle: {
        justifyContent: 'center',
    },
    text_mot_de_passe_oublié: {
        marginLeft: 14,
        fontSize: 16,
        marginTop: 16,
        color: "rgb(122, 142, 199)"
    }
});