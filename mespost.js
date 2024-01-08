import React, { Component } from 'react'
import { BASE_URL } from './contants'
import {
    Pressable,
    ActivityIndicator,
    Platform,
    ImageBackground ,
    Image, FlatList, View,
    SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, ToastAndroid, Modal
} from "react-native";
import { Icon } from '@iconify/react';
const image = require('./assets/logo2.png')
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios'
const countries = ["Egypt", "Canada", "Australia", "Ireland"]
import { Picker, Input, Card, Button } from "react-native-elements";
import SelectDropdown from 'react-native-select-dropdown'
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
export default class Mespost extends Component {
   constructor()
   {
       super();
       this.state = {
           modale: true, loading: false, isFetching: false, modalVisible:false,
        posts:[],
           image: "",
           selectdcategorie: "",
           name: "",
           desc: "",
           text: '',
           vide:""
       }
   }
  
    componentDidMount() {
       this.setState({loading:true})
        this.apiallpublications()
    }
    onRefresh() {
        this.setState({
            isFetching: true,
        }, () => {
            setTimeout(this.apiallpublications.bind(this,100));
        });
    }
apiallpublications = async() => {
    var token = await AsyncStorage.getItem('AUTH_TOKEN');
    axios.get(BASE_URL + '/getallpost_by_user'
        , {

            headers: {
                Authorization: 'Bearer ' + token
            }
        }
    ).then(res => {
        console.log(res.data)
      this.setState({ posts: res.data })
       this.setState({ loading:false})
     if(this.state.posts.length ==0)
          {
         this.setState({ vide:'vide' })
         console.log('vide')
     }
    }).catch(function (error) {
        //alert(error);
    });
    this.setState({
        isFetching: false
    })

}
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

storeData = async () => {
        
            var value = await AsyncStorage.getItem('AUTH_TOKEN');
            alert(value)
       
    };
    clearToken = async () => {
      let value=  await AsyncStorage.getItem('AUTH_TOKEN');
        //ToastAndroid.show('Déconnexion avec succés !', ToastAndroid.SHORT);
        //alert('clear token  ')
        alert(value)
    };
openmodal=()=>
 {
     this.setState({modale:true})
    }
     logout = () => {
        //this.clearToken()
    this.props.navigation.navigate('login');
    };
    render() {
       

        let {posts}=this.state
        return (
            
            <View style={styles.container}>
              
                <View style={styles.MainContainer}>
                    <View style={{
                    
                        flexDirection: 'row',
                       height:45,width:"116%", backgroundColor:"white",
                
                        marginLeft: -14, shadowColor: "#000",
                        shadowOffset: {
                            width: 0,
                            height: 4,
                        },
                        shadowOpacity: 0.30,
                        shadowRadius: 4.65,

                        elevation: 8,
               
                                    }}>
                                        
                        <TouchableOpacity onPress={() => this.props.navigation.openDrawer()}>

                            <Ionicons style={{
                                marginTop: 7,
                                marginLeft: 40,
                                //fontSize: 27
                            }}
                                name="md-menu"
                                size={30}
                                color="rgb(134 ,111 ,230)"

                            />
                            </TouchableOpacity>   
                        <TouchableOpacity onPress = {()=>{
                            this.props.navigation.navigate('login');
                        }}  >

                            <Ionicons style={{
                                marginTop: 7,
                                marginLeft: 305,
                        }}
                            name="md-search-circle"
                                size={30}
                                color="rgb(134 ,111 ,230)"

                            />
                        </TouchableOpacity>
                      
                       
                    </View>
                       
            {this.state.vide =="vide" ? 
                        <Text style={{marginTop:32, textAlign: "center", fontWeight: "bold", fontSize: 15, color: '#584999'}}   > 
            
            
            Bienvenu cher professionel, essayez de paratger vos publication avec un simple click!       </Text>
        :null
        }
                  
                    {this.state.loading ? <View style={{ justifyContent: "center", flex: 1,marginTop:200 }}>

                        <ActivityIndicator size={60} color="rgb(134 ,111 ,230)" />
                    </View>:null}
                    <FlatList onPress={()=>
                    {
                        alert('hello')
                    }}

                        data={this.state.posts}
                        onRefresh={() => this.onRefresh()}
                        refreshing={this.state.isFetching}
   
                        renderItem={({ item }) =>

                            <View style={styles.list}>

                                <Image source={{ uri:item.image }} 
                                style={styles.imageView} />

                                <Text style={styles.textView} >{item.nom}</Text>

                                <Text style={styles.textView1} >{item.description}</Text>
                              
                                <View style={{ marginRight: 85, marginTop: 10}}>
                               
                                    <Ionicons

                                        name="md-trash-sharp"
                                        size={21}
                                        color="#d527b7"

                                    />
                                    <TouchableOpacity onPress={() => {
                                       // alert(item.id)
                                        this.props.navigation
                                    .navigate('detail')
                                    }}  >
                                <Ionicons
                               
                                    name="md-eye"
                                    size={21}
                                            color="#f782c2"

                                />
                                </TouchableOpacity>
                                    <TouchableOpacity onPress={() => {
                                        // alert(item.id)
                                        this.props.navigation
                                            .navigate('edit', { idpost: item.id, name: item.nom, desc: item.description })
                                    }}  >
                                <Ionicons
                                           name="md-create"
                                    size={21}
                                            color="#e3e3e3"

                                />
                                </TouchableOpacity>
                                </View>
                            </View>
                        }

                  

                    />

                </View>
              
                <TouchableOpacity onPress={()=>{
                this.props.navigation.navigate('add')
                 // this.setModalVisible(true)
                }} style={styles.fab}>
                    <Text style={styles.fabIcon}>+</Text>
                </TouchableOpacity>
               
              























            </View>
        )
    }
}
const styles = StyleSheet.create({
    logo: {
        width: 66,
        height: 58,
    },
    MainContainer: {

        justifyContent: 'center',
        flex: 1,
        margin: 5,
        marginTop: (Platform.OS === 'ios') ? 20 : 0,

    },
    container: {
        backgroundColor: "#866fe612",
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
    },
    imageView: {

        width: 170,
        height: 79,
        //margin: 20,
        marginLeft: 75,
        marginTop: 5,
        borderRadius:10
    },
    textView: {
        fontWeight: "bold",
        width: '50%',
        textAlign: 'left',
        padding: 10,
        color: '#000',
        marginLeft: 160,

    },
    textView1: {

        width: '50%',
        textAlign: 'left',
        marginTop: 30,
        padding: 10,
        marginRight: 162
        , marginLeft: -30,
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
        shadowColor: "#866fe612",
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,

        elevation: 24,
        flex: 1, flexDirection: 'row',
        borderRadius: 10,
        margin: 5,
        backgroundColor: 'white',
        height:90,
        justifyContent: 'space-around',
        paddingLeft: 10,
        elevation: 1
    },
    fab: {
        marginTop: -10,
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
    }, centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
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
        padding: 10,
        elevation: 2
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    }
});
