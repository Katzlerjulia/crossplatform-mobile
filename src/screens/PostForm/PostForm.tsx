import React, { useState } from "react";
import {
  useCreatePostMutation,
  useGetPostQuery,
} from "../../store/api/postsApi";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  FlatList,
  RefreshControl,
  ScrollView,
} from "react-native";
import { useToast } from "react-native-toast-notifications";
import { useSelector } from "react-redux";
import { ListItem } from "@rneui/base";

const PostForm = () => {
  const [createPost] = useCreatePostMutation({});
  const { data, isLoading, refetch } = useGetPostQuery({});
  const loggedInAs = useSelector((state: any) => state.auth.loggedInAs);
  const createdBy = loggedInAs;
  const [postText, setPostText] = useState("");

  const toast = useToast();
  const formattedDate = new Date().toISOString();
  const createPosts = () => {
    if (postText !== "") {
      toast.show(`Din post har publicerats!`, {
        type: "success",
        placement: "top",
        duration: 4000,
        animationType: "slide-in",
      });
      createPost({
        post: {
          text: postText,
          createdBy: createdBy,
          createdDate: formattedDate,
        },
      });
      setPostText("");
    } else {
      toast.show("Error message here", { type: "danger" });
    }
  };
  return (
    <View style={styles.fullContainer}>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.header}>What's on your mind?</Text>
          <TouchableOpacity style={styles.button} onPress={() => createPosts()}>
            <Text style={styles.buttonText}>Post</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.postContainer}>
          <TextInput
            value={postText}
            multiline={true}
            style={styles.input}
            onChangeText={(text) => setPostText(text)}
            placeholder="Write a post..."
          />
        </View>
      </View>

      {isLoading ? (
        <Text>Loading...</Text>
      ) : (
        <View style={styles.listContainer}>
          <FlatList
            refreshControl={
              <RefreshControl refreshing={isLoading} onRefresh={refetch} />
            }
            data={data}
            renderItem={({ item }) => (
              <ListItem key={item.id}>
                <ListItem.Content style={styles.listContent}>
                  <Text
                    style={styles.nameStyle}
                  >{`${item.createdBy.firstName} ${item.createdBy.lastName} ${item.createdDate}`}</Text>
                  <ListItem.Title
                    style={styles.postStyle}
                  >{`${item.text}`}</ListItem.Title>
                </ListItem.Content>
              </ListItem>
            )}
          ></FlatList>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  fullContainer: {
    flex: 1,
  },
  container: {
    padding: 16,
    backgroundColor: "#ffff",
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 80,
  },
  header: {
    fontSize: 20,

    fontFamily: "Arial Rounded MT Bold",
  },
  postContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 25,
    paddingHorizontal: 10,
    marginTop: 20,
    padding: 20,
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingLeft: 8,
    fontFamily: "Arial Rounded MT Bold",
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
  listContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
  listContent: {
    backgroundColor: "#C5D9C7",
    padding: 20,
    borderRadius: 20,
  },
  nameStyle: {
    fontFamily: "Arial Rounded MT Bold",
  },
  postStyle: {
    fontSize: 20,
    fontFamily: "Arial Rounded MT Bold",
    padding: 10,
    margin: 5,
    width: 300,
  },
});
export default PostForm;
