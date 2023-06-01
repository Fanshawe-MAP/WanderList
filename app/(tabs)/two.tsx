import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { useRoute } from "@react-navigation/native";
import BucketListItem from "../../components/BucketListItem";

export default function TabTwoScreen() {
  const [bucketItems, setBucketItems] = useState([]);

  const route = useRoute();
  const newItem = route.params?.newItem;

  useEffect(() => {
    if (newItem) {
      setBucketItems((prevItems) => [...prevItems, newItem]);
    }
  }, [newItem]);

  const updateItem = (updatedItem) => {
    setBucketItems((prevItems) =>
      prevItems.map((item) => (item.id === updatedItem.id ? updatedItem : item))
    );
  };

  const handleDeleteItem = (itemToDelete) => {
    setBucketItems((prevItems) =>
      prevItems.filter((item) => item.id !== itemToDelete.id)
    );
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "flex-start",
      padding: 16,
    },
  });

  return (
    <View style={styles.container}>
      {bucketItems.map((item) => (
        <BucketListItem
          key={item.id}
          item={item}
          onUpdate={updateItem}
          onDelete={handleDeleteItem}
        />
      ))}
    </View>
  );
}
