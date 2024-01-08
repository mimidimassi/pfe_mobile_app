import React, { Component } from 'react'
import { Button,TextInput,TouchableWithoutFeedback,
    Platform,
    ImageBackground,
    Image, FlatList, View,
    SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity,ScrollView
} from "react-native";
import { Icon, Input, Card,Tooltip } from "react-native-elements"
import { Ionicons,AntDesign,Entypo } from '@expo/vector-icons';
import { Portal, Provider ,   Avatar,} from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import List from './flatlist'
import Flaotbutton from './floatbutton'
const logo = {
    uri: 'https://reactnative.dev/img/tiny_logo.png',
    width: 64,
    height: 64
  };
  const DATA = [
    {
     image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTF-dpzhEm8YJC_NLh99_NwfRGvH6dY-If5cw&usqp=CAU',
     name : 'mohamed Ali',
     message:"trés interssant...."
    },
    {
        image: 'data:image/jpeg;base64,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',
     name: 'Dimassi moslem',
     message:" publication trés interssant...."
    },
    {
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjAAwQyKxGO39mWtUYjD0s_uhMSmEi4wXyPg&usqp=CAU',
      name: 'Dimassi meriam',
      message:"faible contenue ......."
    },
    
  ];
export default class ajoutpost extends Component {
    constructor()
    {
        super();
        this.state={
           
            open: false,
            visible: true
        }
    }
    render() {
        return (
        
            <View style={styles.container}>
                       <Image source={{ uri: "https://cdn.pixabay.com/photo/2021/08/25/20/42/field-6574455__340.jpg" }}
                    style={styles.imageView} />
              <View style={styles.MainContainer}>
             
                    <TouchableOpacity
                        onPress={() => {this.props.navigation.navigate('mes post')
                        }}
                    style={{ marginLeft: 18,
                        width:30,
    height: 30,
                    borderRadius: 30,
    marginTop: -255, backgroundColor:"#efe3e380"}}  >
                        <Ionicons style={{margin:5}}

                            name="md-chevron-back-outline"
                            size={18}
                            color="black"

                        />
                    </TouchableOpacity>
                   
                    <View style={{ marginTop: 184 }}>
                  
                    <View style={{backgroundColor:"#00000021",
                    width:53,height:58,borderRadius:52/2,left:290,top:17}} >
                
                <View style={{    top: -135}}> 
               
                  <Flaotbutton/>

                      
                       </View>
                       </View>
      <Text style={styles.titrestyle}> Economie Mondiale</Text><View style={{
                            marginLeft: 22,
                            marginTop: 11,
                          //  flex: 1,
                         flexDirection: 'row'
                        }}><Ionicons
                                name="md-star"
                                size={18}
                                color="rgb(238 ,233 ,69)"

                            /><Ionicons
                                name="md-star"
                                size={18}
                                color="rgb(238 ,233 ,69)"

                            /><Ionicons
                                name="md-star"
                                size={18}
                                color="rgb(238 ,233 ,69)"

                            /><Ionicons
                                name="md-star"
                                size={18}
                                color="rgb(238 ,233 ,69)"

                            /><Ionicons
                                name="md-star"
                                size={18}
                                color="gray"

                            />
                            <Text> 4 </Text>
                            <Text>  1534 commentaires</Text>
                        </View>
                        <Text style={styles.styledesc}>
                            Depuis la découverte de l'informatique, de nombreuses activités de la vie courante ont été
                Simplifiés actuellement les individus peuvent facilement traiter des informations en se servant
                Des logiciels et des réseaux informatiques. Compte tenu de son évolution, ce système
                Caractérise la majorité des grandes entreprises quel que soit le secteur humain, social,
                Politique, économique, administratif ou culturel.
                  </Text>
                    </View>

                    <View>
                                    <Card   containerStyle={{ height:50,borderRadius: 30}}>
                                    <TextInput style={{     borderRadius: 20,marginTop:-10,
                fontSize:12,
                 height: 40,
                 paddingTop:-15,
                 margin: 30,
                 width: '94%',
                 marginLeft: 11}}
                 onChangeText={email => this.setState({ email })}
                    placeholder='Laisser un commentaire...'
                                  
                                    

                                />
                                <TouchableOpacity style={{left: 330,
    top: -60}}>
                                <Ionicons
                                name="md-send-sharp"
                                size={18}
                                color="gray"

                            />
                                </TouchableOpacity>
                                   
  </Card>
                                    </View>
                              
                                <List/>
                                
                </View>
            </View>
            
        )
    }
}

const styles = StyleSheet.create({
    styledesc: {

        marginTop:9,
       // marginBottom: 536,
padding: 13
    },
    titrestyle: {
        marginLeft: 16,
marginTop: 37,
        fontSize:23,
        fontWeight: "bold"
    },
    button: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
        margin: 5,
        // borderRadius: 18,
        backgroundColor: 'rgb(122, 142, 199)',
        borderBottomLeftRadius: 31,
        borderTopLeftRadius: 31,

        marginLeft: 157,
        marginTop: 23,
        padding: 7,


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
        
        color:"black",
        borderRadius: 34, marginTop: -28, height: "100%", backgroundColor: 'white' },
    container: {height:"30%",
     backgroundColor: "white",
        flex: 1,
       // marginTop: StatusBar.currentHeight || 0,
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
        height: "55%", padding: 10,
        width: '92%', marginTop: -100,

    },

    imageView: {

        width:420,
        height: 310,
        margin: 0,
       // borderRadius: 10

    },
    textView: {
        fontWeight: "bold",
        width: '50%',
        textAlign: 'left',
        padding: 10,
        color: '#000',
        marginLeft: -2

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
        backgroundColor: 'rgb(122, 142, 199)',
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
        fontSize: 16
    },
    dropdown: {
        backgroundColor: 'white',
        borderBottomColor: 'gray',
        borderBottomWidth: 0.5,
        marginTop: 20,
    },
    addavis:{
        marginLeft:0 ,marginTop:3,
        borderRadius: 16,
    backgroundColor: 'transparent',
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
   height:30,width:30
   ,
   height:40,width:40,
   left:0,top:-2

},
cardShadow: {
    borderRadius: 16,
    backgroundColor: 'rgb(116 ,116 ,116 )',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
   },
   cardContainer: {
    backgroundColor: '#fff',
    borderRadius: 16,
    overflow: 'hidden',
    left: 294,
   // width: 30,
    marginTop:-65
    //height: 1px;
   },
});
