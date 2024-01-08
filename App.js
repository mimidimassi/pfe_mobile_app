import * as React from 'react';
import { Icon, Input, Card } from "react-native-elements";
import { View, Text, Button, SafeAreaView,Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer }
  from '@react-navigation/native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import { List } from 'react-native-paper';

 import Connexioncontainer from './connexion'
 import register from  './newregister'
import Acceuilcontainer from './Acceuil'
import connexion_container from  './image' 
import forgetpassword from './forgetpassword'
import  mespost from './mespost'
import addpost from './ajoutpost'
import editpost from './editpost'
import detailpost from './detailpost'
import detailpublic from './detailpublic'
import floatbutton  from './floatbutton'
import profile from './profile'
import profilpublic from './profilpublic'
import Flat from './flatlist'
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Drawerc from './drawercontent'
//import { FlatList } from 'react-native-gesture-handler';
function Acceuil2({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Feed Screen</Text>
      <Button title="Open drawer" onPress={() => navigation.openDrawer()} />
      <Button title="go to notification " onPress={() => 
        navigation.navigate('notification')} />
    </View>
  );
}


function Notifications({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Notifications Screen</Text>
      <Button title="back to home " onPress={() => navigation.goBack()} />
    </View>
  );
}
 function Connexion({ navigation }) {
  return (
    <View style={{  flex: 1, justifyContent: 'center', alignItems: 'center' }}>
     
      <Card style={{
     
      }} containerStyle={{ width:"100%",
      borderRadius:9,
        height:'75%'}}
      wrapperStyle={{}}>
        <Card.Title>Connexion </Card.Title>
        <Card.Divider />
        <View
          style={{
            position: "relative",
            alignItems: "center"
          }}
        >
          <Input style={{marginTop:10}}
            placeholder=' Adresse email...'
            leftIcon={
              <Ionicons
                name="md-person-circle"
                size={24}

              />
            }
          />
          <Input style={{marginTop:10}}
            placeholder='  password...'
            leftIcon={
              <Ionicons
                name="md-key"
                size={24}

              />
            }
          />
        </View>
        <Button style={{ marginTop: 23 }} title="S'inscire  " 
        onPress={() => navigation.navigate('Inscription')} />

      </Card>
   
     </View>
  );
}
function Inscription({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>page connexion </Text>

      <Button title="se connecter  " onPress={() => navigation.navigate('Connexion')} />
    </View>
  );
}
function Acceuil({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Home page</Text>
      <Button title="Open toggle "  onPress={() => navigation.openDrawer()} />
 </View>
  );
}
export const clearToken = async () => {
  await AsyncStorage.removeItem('AUTH_TOKEN');
  alert('clear token  ')
};
export const logout = (nav) => {
  clearToken()
  nav.navigate('login');
 // dispatch({ type: LOGOUT })
};
const CustomSidebarMenu = (props) => {
  const BASE_PATH =
    'https://raw.githubusercontent.com/AboutReact/sampleresource/master/';
  //const proileImage = 'react_logo.png';

  return (
    <View style={{ flex: 1 }}>
      {/*Top Large Image */}
      <Image
        source={{uri:"data:image/png;base64,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"}
    }  />
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
      
      </DrawerContentScrollView>
      <Text
        style={{
          fontSize: 16,
          textAlign: 'center',
          color: 'grey'
        }}>
        www.aboutreact.com
      </Text>
    </View>
  );
};
function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
   
      <DrawerItem options={{

        drawerIcon: ({ focused, size }) => (
          <Ionicons style={{ marginLeft: 57 }}
            name="md-home"
            size={size}
            color="bleu"
          />
        ),
      }}
        label="profile"
        onPress={() => alert('hello')}
      />
      <DrawerItemList {...props} />
      <DrawerItem options={{

        drawerIcon: ({ focused, size }) => (
          <Ionicons style={{ marginLeft: 57 }}
            name="md-home"
            size={size}
            color="bleu"
          />
        ),
      }}
        label="deconnexion"
        onPress={() => props.navigation.closeDrawer()}
      />
   
     
    </DrawerContentScrollView>
   
  );
}

const Drawer = createDrawerNavigator();
//const Stack = createStackNavigator();
const Stack = createStackNavigator();
/*

  {this.state.loaddate || this.state.loademail || this.state.loadname ||
                        this.state.loadpays || this.state.loadimage ?
                        <View style={{ justifyContent: "center", flex: 1, marginTop: 50 }}>

                            <ActivityIndicator size={60} color="rgb(134 ,111 ,230)" />
                        </View> : null}


-

*/
/* <TouchableOpacity onPress={() => this.props.navigation.openDrawer()}>

                            <Ionicons style={{
                                marginLeft: 4,

                                fontSize: 27
                            }}
                                name="md-menu"
                                size={15}
                                color="rgb(122, 142, 199)"

                            /></TouchableOpacity> */
function Root() {
  return (
    <Stack.Navigator>
    
    <Stack.Screen options={{ headerShown: false }} name="profilpublic"
     component={profilpublic} />
    <Stack.Screen options={{ headerShown: false }} name="detailpublic"
     component={detailpublic} />

   
      <Stack.Screen options={{ headerShown: false }} name="profile" component={profile} />



      <Stack.Screen options={{ headerShown: false }} name="Connexion" component={connexion_container} />
     

      <Stack.Screen options={{ headerShown: false }} name="edit" component={editpost} />

    

      <Stack.Screen options={{ headerShown: false }} name="add" component={addpost} />
      
  
    
      <Stack.Screen options={{ headerShown: false }} name="detail" component={detailpost} />

   


   
   

      <Stack.Screen options={{ headerShown: false }} 
      name="forget_password" component={forgetpassword} />
      
      <Stack.Screen options={{ headerShown: false }} name="mes post" component={mespost} />

      <Stack.Screen options={{ headerShown: false }} name="register" component={register} />

    </Stack.Navigator>
  );
}
function MyDrawer() {
  return (
    <Drawer.Navigator initialRouteName="inscription"
      screenOptions={{
        headerShown: true, gestureEnabled: false,
        drawerStyle: {
          backgroundColor: 'white',
          width: 240,
        },
        overlayColor: 'transparent',
        drawerActiveTintColor: '#5a2b98',
      }}
      drawerContent={(props) => <Drawerc  {...props} />}
     
    
    >

      <Drawer.Screen name="login"
        options={{
          drawerActiveTintColor: '#5a2b98',
         headerShown: false,
          drawerIcon: ({ focused, size }) => (
            <Ionicons
              name="md-home"
              size={size}
             
            />
          ),
        }} component={connexion_container} />
      <Drawer.Screen name="Acceuil"
        options={{
          drawerActiveTintColor: '#5a2b98',
          headerShown: true,
          title: 'Home',
          drawerIcon: ({ focused, size }) => (
            <Ionicons
              name="md-home"
              size={size}
             
            />
          ),
        }} component={Acceuilcontainer} /> 
      <Drawer.Screen name="inscription" options={{
        headerShown: false, gestureEnabled: false,
    
        drawerIcon: ({ focused, size }) => (
          <Ionicons
            name="md-person-add-sharp"
            size={size}

          />
        ),
      }} component={Root} />

      <Drawer.Screen name="Connexion"
        options={{
          drawerActiveTintColor: '#5a2b98',
          headerShown: false, gestureEnabled: false,
          drawerIcon: ({ focused, size }) => (
            <Ionicons
              name="md-person"
              size={size}
             
            />
          ),
        }} component={Connexioncontainer} /> 
  
   
      <Drawer.Screen 
        options={{
          drawerActiveTintColor: '#5a2b98',

          drawerIcon: ({ focused, size }) => (
            <Ionicons
              name="md-chatbox-ellipses-sharp"
              size={size}
             
            />
          ),
        }} name="contact " component={Notifications} />
    
      <Drawer.Screen options={{

        drawerIcon: ({ focused, size }) => (
          <Ionicons
            name="md-apps-sharp"
            size={size}
           
          />    
        ),
      }} name="categories" component={Notifications} />
      <Drawer.Screen options={{
        headerShown: false, drawerActiveTintColor: '#5a2b98',
        drawerIcon: ({ focused, size }) => (
          <Ionicons
            name="md-newspaper-outline"
            size={size}
           
          />
        ),
      }} name="Mes Publictaions " component={mespost} />
      <Drawer.Screen options={{
        headerShown: false,
        drawerActiveTintColor: '#5a2b98',
        drawerIcon: ({ focused, size }) => (
          <Ionicons
            name="md-log-out"
            size={size}

          />
        ),
      }} name="profile" component={profile} />
  

    </Drawer.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyDrawer />
    </NavigationContainer>
  );
}
