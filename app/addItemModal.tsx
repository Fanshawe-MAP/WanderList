import { StatusBar } from "expo-status-bar";
import {
  Platform,
  StyleSheet,
  Switch,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "react-native-get-random-values";
import { useNavigation } from "@react-navigation/native";
import { Text, View } from "../components/Themed";

export default function AddNewItemModalScreen() {
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [visited, setVisited] = useState(false);
  const navigation = useNavigation();

  const handleAddItem = () => {
    const newItem = {
      id: uuidv4(), // Generate a unique ID for the new item
      title,
      location,
      visited,
    };

    // Pass the new item back to the TabTwoScreen
    navigation.navigate("two", { newItem });

    // Reset the input fields and close the modal
    setTitle("");
    setLocation("");
    setVisited(false);
  };

  const handleCancel = () => {
    // Reset the input fields and close the modal
    setTitle("");
    setLocation("");
    setVisited(false);
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
    buttonContainer: {
      flexDirection: "row",
      marginTop: 20,
      width: "80%",
    },
    addButton: {
      flex: 1,
      backgroundColor: "blue",
      padding: 10,
      borderRadius: 5,
      marginLeft: 10,
      alignItems: "center",
    },
    cancelButton: {
      flex: 1,
      backgroundColor: "red",
      padding: 10,
      borderRadius: 5,
      marginRight: 10,
      alignItems: "center",
    },
    buttonText: {
      color: "white",
      fontWeight: "bold",
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add New Item</Text>
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

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.addButton} onPress={handleAddItem}>
          <Text style={styles.buttonText}>Add</Text>
        </TouchableOpacity>
      </View>

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </View>
  );
}
