import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Switch,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

export default function EditItemModal() {
  const navigation = useNavigation();
  const route = useRoute();
  const { item, updateItem } = route.params;

  const [title, setTitle] = useState(item.title);
  const [location, setLocation] = useState(item.location);
  const [visited, setVisited] = useState(item.visited);

  const handleSave = () => {
    const updatedItem = {
      ...item,
      title,
      location,
      visited,
    };

    updateItem(updatedItem);

    navigation.goBack();
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
    title: {
      fontSize: 20,
      fontWeight: "bold",
    },
    separator: {
      marginVertical: 30,
      height: 1,
      width: "80%",
    },
    input: {
      borderWidth: 1,
      borderColor: "gray",
      padding: 10,
      width: "80%",
      marginBottom: 10,
    },
    switchContainer: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 10,
    },
    saveButton: {
      backgroundColor: "blue",
      padding: 10,
      borderRadius: 5,
      marginTop: 20,
    },
    buttonText: {
      color: "white",
      fontWeight: "bold",
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit Item</Text>
      <View style={styles.separator} />

      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        placeholder="Title"
      />
      <TextInput
        style={styles.input}
        value={location}
        onChangeText={setLocation}
        placeholder="Location"
      />

      <View style={styles.switchContainer}>
        <Text>Visited/Opened:</Text>
        <Switch value={visited} onValueChange={setVisited} />
      </View>

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
}
