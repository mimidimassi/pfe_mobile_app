import React, { Component } from 'react'
import { Button,
    Platform,
    ImageBackground,
    Image, FlatList, View,
    SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity
} from "react-native";
import { Ionicons } from '@expo/vector-icons';
export default class ajoutpost extends Component {
    render() {
        return (
            <View style={styles.container}>
            
                <Image source={{ uri: "https://cdn.pixabay.com/photo/2021/08/25/20/42/field-6574455__340.jpg" }}
                    style={styles.imageView} />
              <View style={styles.MainContainer}>
                   
                    <TouchableOpacity
                        onPress={() => {


                            this.props.navigation.navigate('mes post')
                        }}
                    style={{ marginLeft: 18,
                        width: 30,
    height: 23,
                    borderRadius: 41,
    marginTop: -255, backgroundColor:"#efe3e380"}}  >
                        <Ionicons style={{margin:3}}

                            name="md-chevron-back-outline"
                            size={18}
                            color="black"

                        />
                    </TouchableOpacity>
                    <View style={{ marginTop: 237 }}>
                        <Text style={styles.titrestyle}> Economie Mondiale</Text>
                        <View style={{
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
     backgroundColor: "green",
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
});
