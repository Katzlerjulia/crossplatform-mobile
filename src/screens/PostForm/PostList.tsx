import {
  StyleSheet,
  View,
  Text,
  FlatList,
  RefreshControl,
  ScrollView,
} from "react-native";

import { useGetPostQuery } from "../../store/api/postsApi";

import { ListItem } from "@rneui/base";

const PostList = () => {
  const { data, isLoading, refetch } = useGetPostQuery({});
  return (
    <View style={styles.fullContainer}>
      <Text style={styles.headerText}>All posts: </Text>
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
  headerText: {
    fontSize: 20,
    paddingTop: 90,
    paddingBottom: 20,
    textAlign: "center",
    backgroundColor: "white",
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

export default PostList;
