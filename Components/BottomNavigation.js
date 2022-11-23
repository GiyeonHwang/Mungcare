import React from 'react';


import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

function BottomNavigation() {
    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName;

                        if (route.name === "Home") {
                            // iconName = focused ? require('./assets/images/home_fill.png') : require('./assets/images/home.png');
                        } else if (route.name === "MyPage") {
                            // iconName = focused ? require('./assets/images/page_fill.png') : require('./assets/images/page.png');
                        }

                        // return <Image source={iconName} style={{ width: 25, height: 25 }} />;
                    },
                })}
                tabBarOptions={{ activeTintColor: 'tomato', inactiveTintColor: 'gray' }}
            >
                <Tab.Screen name="Home" component={Home} />
                <Tab.Screen name="MyPage" component={MyPage} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}

export default BottomNavigation;