import React, { Component } from 'react'
import { ImageBackground, Image } from 'react-native';
import { Icon, Input, Card, Button} from "react-native-elements";
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios'
const image = require('./assets/meryoum.jpg')


export default class forgetpassword extends Component {
    render() {
        return (
            <View style={{
                backgroundColor: "white",
                height: '100%',
                width: '100%'
            }}>
                <ImageBackground style={{
                    height: '100%',
                    width: '100%'
                }}
                    source={image} >
                   
                    <TouchableOpacity onPress={() => {


                        this.props.navigation.navigate('Connexion')
                    }} >
                        <Ionicons style={{ marginTop: 13}}
                            name="md-chevron-back-outline"
                            size={35}
                            color="rgb(122, 142, 199)"
                        />

                    </TouchableOpacity>
                    <Card

                        containerStyle={{
                            borderWidth: 1.2,
                            width: "100%",
                            margin: 20,
                            borderRadius: 0,
                            height: "18%", padding: 19,
                            width: '90%', marginTop: 235,
                            boxShadow: 'rgb(71 0 0 / 51%) 1px 1px 25px, rgb(0 0 0 / 20%) 0px 0px 1px',




                        }}
                        wrapperStyle={{}}>
                        <Card.Title style={styles.titreconnexion}>  Réinitialisation de mot de passe . </Card.Title>
                        <View
                            style={{
                                position: "relative",
                                alignItems: "center"
                            }}
                        >
                            <Input style={{ padding: 17 }}
                                placeholder='Entrez votre email...'
                                leftIcon={
                                    <Ionicons
                                        name="md-person-circle"
                                        size={28}
                                        color="rgb(122, 142, 199)"
                                    />

                                }


                            />
                           
                          
                        

                        </View>





                    </Card>


                    <Button buttonStyle={styles.button}
                        style={{ borderRadiusLeft: 10 }}
                        title="Envoyer"
                        
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
        marginTop: 50,
        marginLeft: 260,
        fontSize: 28, color: "rgb(122, 142, 199)"
    },
    titreconnexion: {
        fontWeight: 'bold',
       color: "rgb(122, 142, 199)"
    },
    button: {
        margin: 5,
        // borderRadius: 18,
        backgroundColor: 'rgb(122, 142, 199)',
        borderBottomLeftRadius: 31,
        borderTopLeftRadius: 31,
        marginLeft: 190,
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
        marginLeft: 14,
        fontSize: 15,
        marginTop: 47,
        width: '50%',
        // position: 'fixed',
        color: "rgb(122, 142, 199)"
    }
});

