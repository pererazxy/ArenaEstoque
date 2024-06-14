import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/Home";
import Profile from "../screens/Profile";
import ProductManagement from "../screens/ProductManagement";
import CategoryManagement from "../screens/CategoryManagement";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { createNativeStackNavigator } from "@react-navigation/native-stack";


const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export function HomeStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="Home"
        component={CategoryManagement}
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <MaterialIcons
              name="category"
              size={40}
              color={color}
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
}




export default function AppRoutes() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: "#ff0000",
        tabBarInactiveTintColor: "#737373",
        tabBarStyle: { backgroundColor: "#000" }
      }}
    >
      <Tab.Screen
        name="HomeStack"
        component={HomeStack}
        options={{
          title: "HomeStack",
          tabBarIcon: ({ color }) => (
            <MaterialIcons
              name="category"
              size={40}
              color={color}
            />
          ),
        }}
      />

      <Tab.Screen
        name="product"
        component={ProductManagement}
        options={{
          title: "product",
          tabBarIcon: ({ color }) => (
            <MaterialIcons
              name="production-quantity-limits"
              size={40}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="profile"
        component={Profile}
        options={{
          title: "profile",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="account-outline"
              size={40}
              color={color}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
