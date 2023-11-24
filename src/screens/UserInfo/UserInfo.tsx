import { StyleSheet, View } from "react-native";
import { Button, Text } from "@rneui/themed";
import { logIn, logOut } from "../../store/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import UserList from "../UserList/UserList";
const UserInfo = ({ route, navigation }) => {
  const loggedInAs = useSelector((state: any) => state.auth.loggedInAs);
  const user = route?.params?.user || loggedInAs;
  const dispatch = useDispatch();
  return (
    <View style={styles.container}>
      <View style={styles.info}>
        <View style={styles.infoContainer}>
          <Text style={styles.header}>User info</Text>
          <Text style={styles.name}>
            User name: {`${user.firstName} ${user.lastName}`}
          </Text>
        </View>
        <View style={styles.actionsContainer}>
          {loggedInAs?.id === user.id ? (
            <>
              <Button
                onPress={() => dispatch(logOut())}
                title="Logga ut"
                color="black"
              />
            </>
          ) : (
            <>
              <Button onPress={() => dispatch(logIn(user))} title="Logga in" />
            </>
          )}
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#C5D9C7",
  },
  info: {
    marginTop: 80,
    margin: 40,
    backgroundColor: "white",
    flex: 1,
    padding: 30,
    borderRadius: 10,
    borderWidth: 1,
  },
  header: {
    fontSize: 30,
    fontFamily: "Arial Rounded MT Bold",
    textAlign: "center",
  },
  name: {
    textAlign: "center",
    padding: 20,
    fontFamily: "Arial Rounded MT Bold",
  },

  infoContainer: {
    marginBottom: 24,
  },
  actionsContainer: {
    marginBottom: 24,
  },
});

export default UserInfo;
