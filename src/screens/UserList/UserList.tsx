import {
  StyleSheet,
  View,
  Text,
  FlatList,
  RefreshControl,
  TouchableOpacity,
} from "react-native";
import {
  useDeleteUserMutation,
  useGetUsersQuery,
} from "../../store/api/usersApi";
import {
  useDeletePostMutation,
  useGetPostQuery,
} from "../../store/api/postsApi";
import { ListItem } from "@rneui/base";
import Icon from "react-native-vector-icons/FontAwesome";
import { CheckBox } from "@rneui/themed";
import React, { useMemo, useState } from "react";

const UserList = ({ navigation }) => {
  const { data, isLoading, refetch } = useGetUsersQuery({});
  const [deleteUser] = useDeleteUserMutation();
  const [deletePost] = useDeletePostMutation();
  const { data: postData } = useGetPostQuery({});

  const myIcon = <Icon name="user" size={20} color="#36733F" />;
  const updateIcon = <Icon name="edit" size={20} color="#36733F" />;
  const myTrashIcon = <Icon name="trash" size={20} color="#36733F" />;
  const createAccount = <Icon name="angellist" size={20} color="#fff" />;

  // delete one user and its posts
  console.log("postdata", postData);

  const deleteUserFunc = (userId) => {
    const userPosts = postData.filter((post) => post.userId === userId);
    for (const post of userPosts) {
      deletePost(post.id);
    }
    console.log("deletePost");
    deleteUser(userId);
  };

  // useMemo
  const sortedUserList = useMemo(() => {
    if (!data) return [];

    const copyUserData = [...data];
    return copyUserData.sort((a, b) => a.firstName.localeCompare(b.firstName));
  }, [data]);

  // bulk delete

  const [enabledButton, setEnabledButton] = useState(false);
  const [isChecked, setChecked] = useState([]);

  const toggleChecked = (userId) => {
    const updateIsChecked = [...isChecked];
    const index = sortedUserList.findIndex((user) => user.id === userId);

    if (index > -1) {
      updateIsChecked[index] = !updateIsChecked[index];
      setChecked(updateIsChecked);

      const numberOfChecked = updateIsChecked.filter(
        (isChecked) => isChecked
      ).length;
      setEnabledButton(numberOfChecked >= 2);
    }
  };

  const bulkDeleteButton = () => {
    isChecked.forEach((checked, index) => {
      if (checked) {
        deleteUser(sortedUserList[index].id);
      }
    });
    setEnabledButton(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.infoText}>Can't find your user?</Text>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("UserForm");
        }}
        style={styles.infoBtn}
      >
        <Text style={styles.infoText2}>Create an accout {createAccount} </Text>
      </TouchableOpacity>
      {enabledButton && (
        <TouchableOpacity
          onPress={() => bulkDeleteButton()}
          style={styles.infoBtn}
        >
          <Text style={styles.infoText2}>Bulk Delete users</Text>
        </TouchableOpacity>
      )}
      {isLoading ? (
        <Text>Loading...</Text>
      ) : (
        <FlatList
          refreshControl={
            <RefreshControl refreshing={isLoading} onRefresh={refetch} />
          }
          data={sortedUserList}
          renderItem={({ item, index }) => (
            <ListItem key={item.id}>
              <ListItem.Content style={styles.listItem}>
                <ListItem.Title>
                  {`${item.firstName} ${item.lastName}`}
                  <View style={styles.iconContainer}>
                    <Text
                      style={styles.icons}
                      onPress={() => {
                        navigation.navigate("UserInfo", { user: item });
                      }}
                    >
                      {myIcon}
                    </Text>

                    <Text
                      style={styles.icons}
                      onPress={() => {
                        navigation.navigate("UserForm", { user: item });
                      }}
                    >
                      {updateIcon}
                    </Text>
                    <Text
                      onPress={() => deleteUserFunc(item.id)}
                      style={styles.icons}
                    >
                      {myTrashIcon}
                    </Text>

                    <CheckBox
                      checked={isChecked[index]}
                      onPress={() => toggleChecked(item.id)}
                    ></CheckBox>
                  </View>
                </ListItem.Title>
              </ListItem.Content>
            </ListItem>
          )}
        ></FlatList>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  infoText: {
    fontFamily: "Arial Rounded MT Bold",
    textAlign: "center",
    fontSize: 20,
    padding: 10,
    marginTop: 30,
  },
  infoText2: {
    fontFamily: "Arial Rounded MT Bold",
    textAlign: "center",
    padding: 10,

    color: "white",
  },
  infoBtn: {
    backgroundColor: "#36733F",
    borderRadius: 20,
    width: 200,
    marginLeft: 97,
    marginBottom: 30,
  },
  container: {
    backgroundColor: "#fff",
    flex: 1,
  },

  listItem: {
    backgroundColor: "#C5D9C7",
    padding: 10,
    borderRadius: 10,
    height: 70,
    overflow: "hidden",
  },

  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  icons: {
    marginLeft: 15,
    marginRight: 15,
  },
});

export default UserList;
