import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import {
    createDrawerNavigator,
    DrawerContentScrollView,
    DrawerItemList,
  } from '@react-navigation/drawer';

  import AdminScreen from '../screens/AdminScreen';
  import { useAuth } from '../context/AuthContext';

  const Drawer = createDrawerNavigator();

  const CustomDrawer = props => {
    const { setIsLoggedIn, user } = useAuth();
    return (
      <View style={{ flex: 1 }}>
        <DrawerContentScrollView {...props}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: 20,
              backgroundColor: '#f6f6f6',
              marginBottom: 20,
            }}
          >
            <View>
              <Text>MANZI</Text>
              <Text>Mike</Text>
            </View>
           
          </View>
          <DrawerItemList {...props} />
        </DrawerContentScrollView>
        <TouchableOpacity
          style={{
            position: 'absolute',
            right: 0,
            left: 0,
            bottom: 50,
            backgroundColor: '#f6f6f6',
            padding: 20,
          }}
          onPress={() => setIsLoggedIn(false)}
        >
          <Text>Log Out</Text>
        </TouchableOpacity>
      </View>
    );
  };
  
  const DrawerNavigator = () => {
    return (
      <Drawer.Navigator
        screenOptions={{
          headerShown: true,
          headerStyle: {
            backgroundColor: 'transparent',
            elevation: 0,
            shadowOpacity: 0,
          },
          headerTitle: '',
        }}
        drawerContent={props => <CustomDrawer {...props} />}
      >
        <Drawer.Screen component={AdminScreen} name='AdminScreen' />
        {/* <Drawer.Screen component={Tasks} name='Tasks' /> */}
      </Drawer.Navigator>
    );
  };

    export default DrawerNavigator;