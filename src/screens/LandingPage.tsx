import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import Icon from "../../assets/icon.png";
const LandingPage = ({ navigation }) => {
  return (
    <View style={styles.landingPage}>
      <View style={styles.imgContainer}>
        <Image style={styles.img} source={Icon} />
      </View>
      <Text style={styles.header}>Welcome to Post it.</Text>
      <Text style={styles.pText}>What's on you mind today?</Text>
      <TouchableOpacity style={styles.button}>
        <Text
          style={styles.buttonText}
          onPress={() => {
            navigation.navigate("Users");
          }}
        >
          Log in
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  landingPage: {
    flex: 1,
    backgroundColor: "#36733F",
  },
  header: {
    padding: 16,
    alignItems: "center",
    fontSize: 50,
    color: "white",
    fontFamily: "Arial Rounded MT Bold",
    fontWeight: "bold",
    textAlign: "center",
  },
  imgContainer: {
    backgroundColor: "white",
    width: 200,
    height: 200,
    borderRadius: 50,
    marginTop: 150,
    marginLeft: 96,
  },
  img: {
    margin: 25,
    width: 150,
    height: 150,
  },
  pText: {
    padding: 16,
    alignItems: "center",
    fontSize: 20,
    color: "white",
    fontFamily: "Arial Rounded MT Bold",
    textAlign: "center",
  },
  button: {
    marginLeft: 150,
    marginTop: 30,
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 20,
    width: 90,
  },
  buttonText: {
    color: "black",
    fontFamily: "Arial Rounded MT Bold",
    textAlign: "center",
  },
});

export default LandingPage;
