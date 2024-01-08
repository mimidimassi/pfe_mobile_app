import React, { Component } from 'react'

import {
    Platform,
    ImageBackground,
    Image, FlatList, View,
    SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity
} from "react-native";
import { Icon } from '@iconify/react';
const image = require('./assets/logo2.png')
import { Ionicons } from '@expo/vector-icons';
export default class Posts extends Component {
    constructor() {
        super();
        this.state = {
         
        }
    }



    render() {

        let {data} =this.state
        return (
            <View style={styles.container}>
                <View style={styles.MainContainer}>
                    <View style={{

                        flexDirection: 'row',
                        height: 45, width: "116%", backgroundColor: "white",

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

                            <Icon style={{
                                marginLeft: 25, marginTop: 5
                                ,
                                fontSize: 27
                            }} color="rgb(122, 142, 199)" icon="jam:align-left" inline={true} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => alert('hello')} >

                            <Ionicons style={{
                                marginTop: 7,
                                marginLeft: 293,
                                fontSize: 27
                            }}
                                name="md-search-circle"
                                size={15}
                                color="rgb(122, 142, 199)"

                            />
                        </TouchableOpacity>

                    </View>


                    <Text style={{ textAlign: "center", fontSize: 20, color: "white" }} > Mes publication</Text>

                    <FlatList

                        data={data}


                        renderItem={({ item }) =>

                            <View style={styles.list}>

                                <Image source={{ uri: "https://ix-www.imgix.net/hp/snowshoe.jpg?q=70&w=1800&auto=compress%2Cenhance&fm=jpeg" }}
                                    style={styles.imageView} />

                                <Text style={styles.textView} >{item.name}</Text>

                                <Text style={styles.textView1} >{item.age}</Text>

                                <View style={{ marginRight: 18, marginTop: 10 }}>

                                    <Icon size={15}
                                        color="rgb(255, 80, 80)" icon="jam:trash-f" inline={true} />
                                    <TouchableOpacity onPress={() => {
                                        this.props.navigation
                                            .navigate('detail')
                                    }}  >
                                        <Ionicons

                                            name="md-eye"
                                            size={15}
                                            color="rgb(122, 142, 199)"

                                        />
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => {
                                        this.props.navigation
                                            .navigate('edit')
                                    }}  >
                                        <Ionicons
                                            name="md-create"
                                            size={15}
                                            color="rgb(73, 209, 121)"

                                        />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        }



                    />

                </View>
                <TouchableOpacity onPress={() => {
                    this.props.navigation.navigate('add')
                }}  >
                    <Image
                        source={image} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                    this.props.navigation.navigate('add')
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
        backgroundColor: "white",
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
    },
    imageView: {

        width: 80,
        height: 50,
        margin: 7,


    },
    textView: {
        fontWeight: "bold",
        width: '50%',
        textAlign: 'left',
        padding: 10,
        color: '#000',
        marginLeft: -2,

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
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
        flex: 1, flexDirection: 'row',
        borderRadius: 10,
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
    }
});
