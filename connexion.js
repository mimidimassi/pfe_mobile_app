
import React ,{component} from 'react';
import { Icon, Input, Card,Button } from "react-native-elements";
import { Image,StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { TextInput } from 'react-native-paper';

 import axios from "axios"
import { NavigationContainer }
    from '@react-navigation/native';
import {
    createDrawerNavigator,
    DrawerContentScrollView,
    DrawerItemList,
    DrawerItem,
} from '@react-navigation/drawer';

// Define too short object
const tooShort = {
    enabled: true,
    label: 'Too short',
    labelColor: 'red'
};












const image = require('./assets/img3.png')


export default class Connexion extends React.Component {
    
    constructor()
    {
        super();
        this.state={ email:'',
            password: "", nameError: '', nameErrorp: null, validemail:''
            , validate: false, categorie:[]
        }
    }

 allcategorie() {
        axios.get('http://localhost:8000/api/allcategorie'
        ).then(res => {
            this.setState({categorie: res.data })
            console.log(res.data);
        }).catch(function (error) {
            console.log(error);
        });

    }

    ApiLogin =() => {

    
        axios.post(`http://localhost:8000/api/login`,
            {
                email: this.state.email
                , password: this.state.password
            })


            .then(res => {
                if (res.status === 201) {

                   
alert('donnes erronés ')

                }
                if (res.status === 200) {

                    console.log(res.data);
                    //localStorage.setItem("refresh_token", res.data.refresh_token);
                }


            })






    }
    componentDidMount(){
        this.allcategorie();
    }
    onchangeemail = (e) => 
    {
        this.setState({email:e})
       // alert(this.state.email)
    }
    onchangepassword(e) {
        this.setState({ password: e })
    }
    goToEventInput = () => {
        this.props.navigation.navigate('Acceuil')
    }
    validate_filed =()=>
    {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
        if (reg.test(this.state.email) === false && this.state.email !="")
        {
            this.setState(() => ({ validemail: "email must be valid." }));
            this.setState(() => ({ nameError: "" }));
       
            return false;
        } 
        else if (reg.test(this.state.email) === true && this.state.email.trim() === "") {
            this.setState(() => ({ validemail: "" }));
           
            if (this.state.email.trim() === "") {
                this.setState(() => ({ nameError: "email required." }));
                this.setState(() => ({ validemail: "" }));
                return false;
            } else
                this.setState(() => ({ nameError: "" }));
            // this.setState(() => ({ nameErrorp: "" }));

            return false;
        }
        else if (this.state.password.trim() === "") {
            this.setState(() => ({ nameErrorp: "Password  required." }));
            return false;
        }
        else {

            this.setState(() => ({ nameErrorp: "" }));
        }

        return true;   
       /* let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
        if (reg.test(this.state.email) === false && this.state.email.trim() != "") {

            this.setState(() => ({ validemail: "email must be valid." }));
            this.setState(() => ({ nameError: "" }));
            return false;
        }
        else {
            this.setState(() => ({ validemail: "" }));
            if (this.state.email.trim() === "") {
                this.setState(() => ({ nameError: "email required." }));
                this.setState(() => ({ validemail: "" }));
                return false;
            } else
                this.setState(() => ({ nameError: "" }));
            // this.setState(() => ({ nameErrorp: "" }));

        
        }
   else
        if (this.state.password.trim() === "") {
            this.setState(() => ({ nameErrorp: "Password  required." }));
            return false;
        }
        else {

            this.setState(() => ({ nameErrorp: "" }));
        }
    
        return true;   
      this.setState(() => ({validate: "tous es validé." }));
       
           /* this.props.navigation.navigate('Acceuil',
                { email: this.state.email, password: this.state.password }) */
       
    
    }
  redirect_vers_data  =()=>
  {
      if (this.validate_filed() === true) {
       /*   this.props.navigation.navigate('Acceuil',
              { email: this.state.email, password: this.state.password })
      
      */
          this.ApiLogin();
            }
  } 

detail({ navigation }) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Home Screen</Text>
            <Button
                title="Go to Details"
                onPress={() => {
                    /* 1. Navigate to the Details route with params */
                    navigation.navigate('Details', {
                        itemId: 86,
                        otherParam: 'anything you want here',
                    });
                }}
            />
        </View>
    );
}

    render()
    {
 <Headers/>
    
    return (
        <View  style={styles.container}>
            <Image source={image}
                style={styles.imageView} />
            <View style={styles.maincontainer}>
              
                  
                <Input style={{ margin: 6, padding: 17, paddingLeft: 25}}
                        onChangeText={email => this.setState({email})}
                        placeholder=' Adresse email...'
                        leftIcon={
                            <Ionicons style={{ paddingLeft: 25 }}
                                name="md-at-circle-outline"
                                size={28}
                                color="rgb(134 ,111 ,230)"
                            />
                           
                        }
                        
                        
                    />
                    {!!this.state.nameError && (
                        <Text style={{
                            padding: 15 , color: "red" }}>
                            <Ionicons
                                name="md-close-circle"
                                size={12}

                            />
                            
                        {this.state.nameError}</Text>
                    )}
                    {!!this.state.validemail && (
                        <Text style={{ padding: 15 ,color: "#f5ee2a" }}>
                            <Ionicons
                                name="md-warning-sharp"
                                size={12}

                            />
                        {this.state.validemail}</Text>
                    )}
                <Input style={{ margin: 6,padding: 15 }}
                        secureTextEntry={true}
                        
                        onChangeText={password => this.setState({password })}
                        placeholder='  password...'
                    rightIcon={
                         <Ionicons
                                    name="eye-off"
                                    size={20}
                            color="rgb(134 ,111 ,230)"
                                />
                               
                    }
                        leftIcon={ 
                            <Ionicons style={{ paddingLeft: 25 }}
                                name="md-key"
                                size={28}
                                color="rgb(134 ,111 ,230)"
                            />
                        }
                    />
                    {!!this.state.nameErrorp && (
                        <Text style={{ padding: 15, color: "red" }}>
                        
                            <Ionicons
                                name="md-close-circle"
                                size={12}

                            />
                        {this.state.nameErrorp}</Text>
                    )}
                   
            
              
                <Button buttonStyle={styles.button}  title="Se connecter  "
                    onPress={() => {

this.redirect_vers_data()
                       // this.props.navigation.navigate('inscription')
                    }}
                       />
              
                <Text 
                style={styles.text_mot_de_passe_oublié}>
              N'est pas un client? inscrivez vous</Text>
               

   
             </View>   
          
        </View>
    );
}
}
const styles = StyleSheet.create({
    maincontainer: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 7,
        },
        shadowOpacity: 0.43,
        shadowRadius: 9.51,

        elevation: 15,
        
        color:"black",
        borderRadius: 56, marginTop:-74, height: "100%", backgroundColor: 'white' },
    container: {height:"30%",
        backgroundColor: "white",
        flex: 1,
        //marginTop: StatusBar.currentHeight || 0,
    },
    subtitle: {
        flex: 1,
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingLeft: 10,
        paddingTop: 5,
    },
    button: {
        textAlign:'center',
        marginTop: 22,
        marginLeft: 60,
        borderRadius: 46,
        backgroundColor:'rgb(134 ,111 ,230)'
     
,width:270
    },
 
    buttoninscrire: { 
        margin: 5,
        borderRadius: 18,
        backgroundColor: '#f0f0f0',
        borderColor: 'red',
        height:41
    },
    rightTitle: {
        justifyContent: 'center',
    },
    text_mot_de_passe_oublié: {
        fontWeight:'bold',
        marginLeft: 90,
           fontSize: 14, 
           marginTop: 16, 
        color: "rgb(134 ,111 ,230)"
    }, imageView: {
        marginLeft: 20,
marginTop: -30,
        width:390,
        height:320,
       // margin: 0,
        marginTop:75,
           // top:19
        // borderRadius: 10

    }
});
