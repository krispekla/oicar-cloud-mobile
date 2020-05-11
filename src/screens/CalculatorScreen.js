import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const CalculatorScreen = (props) => {
  return (
    <View style={styles.screen}>
      <TouchableOpacity
        style={styles.category}
        onPress={() => props.navigation.navigate({ routeName: "Function" })}
      >
        <Text style={styles.text}>Functions</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.category}
        onPress={() => props.navigation.navigate({ routeName: "VM" })}
      >
        <Text style={styles.text}>Virtual Machines</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.category}
        onPress={() => props.navigation.navigate({ routeName: "SQL" })}
      >
        <Text style={styles.text}>SQL</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    height: "100%",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#003f5c",
  },
  category: {
    backgroundColor: "blue",
    flexDirection: "row",
    flexGrow: 1,
    width: "90%",
    margin: 5,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fb5b5a",
  },
  text: {
    fontSize: 20,
    color: "#ffffff",
  },
});

export default CalculatorScreen;
