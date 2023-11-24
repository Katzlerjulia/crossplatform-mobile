import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import UserList from "./src/screens/UserList/UserList";
import UserInfo from "./src/screens/UserInfo/UserInfo";
import UserForm from "./src/screens/UserForm";
import PostForm from "./src/screens/PostForm/PostForm";
import PostList from "./src/screens/PostForm/PostList";
import LandingPage from "./src/screens/LandingPage";
import { persistor, store } from "./src/store/store";
import { Provider, useSelector } from "react-redux";
import { ToastProvider } from "react-native-toast-notifications";
import Icon from "react-native-vector-icons/FontAwesome";
import { PersistGate } from "redux-persist/integration/react";

const UserListStack = createNativeStackNavigator();

const UserListStackScreen = () => {
  return (
    <UserListStack.Navigator>
      <UserListStack.Screen name="UserList" component={UserList} />
      <UserListStack.Screen name="UserInfo" component={UserInfo} />
      <UserListStack.Screen name="UserForm" component={UserForm} />
    </UserListStack.Navigator>
  );
};

const NavigationWrapper = () => {
  const loggedInAs = useSelector((state: any) => state.auth.loggedInAs);
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{ headerShown: false }}>
        <Tab.Screen
          name="Home"
          component={LandingPage}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Icon name="home" size={size} color={color} />
            ),
          }}
        />

        <Tab.Screen
          name="Create Account"
          component={UserForm}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Icon name="user-plus" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="All Posts"
          component={PostList}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Icon name="list" size={size} color={color} />
            ),
          }}
        />
        {loggedInAs ? (
          <Tab.Screen
            name="Post"
            component={PostForm}
            options={{
              tabBarIcon: ({ color, size }) => (
                <Icon name="pencil" size={size} color={color} />
              ),
            }}
          />
        ) : undefined}

        {loggedInAs ? (
          <Tab.Screen
            name="User info"
            component={UserInfo}
            options={{
              title: `${loggedInAs.firstName} ${loggedInAs.lastName} `,
              tabBarIcon: ({ color, size }) => (
                <Icon name="user" size={size} color={color} />
              ),
            }}
          />
        ) : undefined}
        <Tab.Screen
          name="Users"
          component={UserListStackScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Icon name="users" size={size} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

const Tab = createBottomTabNavigator();
export default function App() {
  return (
    <ToastProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <NavigationWrapper />
        </PersistGate>
      </Provider>
    </ToastProvider>
  );
}
