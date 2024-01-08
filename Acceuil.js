
import * as React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Icon, Input, Card } from "react-native-elements";
import { View, Text, Button } from 'react-native';
 export default function data ({ route }) {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>   <Ionicons
                name="md-person-circle"
                size={24}

            />Token egale {route.params.token}
            
           
             </Text>
            
        </View>
    )

}