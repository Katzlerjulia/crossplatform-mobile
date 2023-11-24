import {
  StyleSheet,
  View,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
  TouchableOpacity,
} from "react-native";
import { Button, Input } from "@rneui/themed";
import { useState } from "react";
import {
  useCreateUserMutation,
  useUpdateUserMutation,
} from "../store/api/usersApi";
import { useToast } from "react-native-toast-notifications";
import { useRef } from "react";
import Icon from "../../assets/icon.png";
import { useSelector } from "react-redux";

const UserForm = ({ route, navigation }) => {
  const loggedInAs = useSelector((state: any) => state.auth.loggedInAs);
  const user = route?.params?.user || loggedInAs;
  const lastNameRef = useRef(null);

  const [createUser, { isLoading }] = useCreateUserMutation({});
  const [updateUser] = useUpdateUserMutation({});

  const [firstName, setFirstName] = useState(
    route?.params?.user?.firstName || ""
  );
  const [lastName, setLastName] = useState(route?.params?.user?.lastName || "");
  const toast = useToast();
  const buttonEnableded = firstName === "" && lastName === "";

  const handleSubmit = () => {
    if (firstName === "" || lastName === "") {
      console.log("Invalid form!");
      toast.show("Fyll i alla fälten tack.", {
        type: "warning",
        placement: "top",
        duration: 4000,
        animationType: "slide-in",
      });
      return;
    }

    createUser({
      user: {
        firstName: firstName,
        lastName: lastName,
      },
    })
      .then(() => {
        navigation.navigate("UserList");
        toast.show(`Användaren ${firstName} ${lastName} har skapats!`, {
          type: "success",
          placement: "top",
          duration: 4000,
          animationType: "slide-in",
        });
        setFirstName("");
        setLastName("");
      })
      .catch((error) => {
        toast.show(error, { type: "danger" });
      });
  };
  const updateUserFunc = (userId) => {
    if (firstName !== "" && lastName !== "") {
      updateUser({
        user: { id: user.id, firstName: firstName, lastName: lastName },
      });
      navigation.navigate("UserList");
      toast.show(`User ${firstName} ${lastName} updated successfully!`, {
        type: "success",
        placement: "top",
        duration: 4000,
        animationType: "slide-in",
      });
    } else {
      toast.show("Please fill in all fields", {
        type: "warning",
        placement: "top",
        duration: 4000,
        animationType: "slide-in",
      });
    }
  };
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.parentContainer}>
        <View style={styles.container}>
          <Image source={Icon} style={styles.img} />
          <Text style={styles.header}>Create a user</Text>
          <Input
            value={firstName}
            onChangeText={(text) => setFirstName(text)}
            placeholder="First name"
            returnKeyType="next"
            disabled={isLoading}
            onSubmitEditing={() => lastNameRef.current.focus()}
          ></Input>
          <Input
            value={lastName}
            returnKeyType="send"
            onSubmitEditing={() => handleSubmit()}
            onChangeText={(text) => setLastName(text)}
            placeholder="Last name"
            ref={lastNameRef}
            disabled={isLoading}
          ></Input>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={handleSubmit}
              disabled={buttonEnableded}
            >
              <Text style={styles.buttonText}>Create User</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => updateUserFunc(user.id)}
              disabled={buttonEnableded}
            >
              <Text style={styles.buttonText}>Update User</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  header: {
    marginTop: 10,
    marginBottom: 40,
    fontFamily: "Arial Rounded MT Bold",
  },
  parentContainer: {
    flex: 1,
    backgroundColor: "#5A8C5D",
  },
  img: {
    width: 70,
    height: 70,
  },
  container: {
    padding: 56,
    alignItems: "center",
    margin: 26,
    marginTop: 160,
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: "white",
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
    marginTop: 10,
  },
  button: {
    marginLeft: 8,
    backgroundColor: "#36733F",
    padding: 15,
    borderRadius: 20,
  },
  buttonText: {
    color: "white",
    fontFamily: "Arial Rounded MT Bold",
  },
});

export default UserForm;
