import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";

const RegisterScreen = (props) => {
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const register = async () => {
    if (!firstName || !lastName || !email || !password) {
      alert("Please fill all fields");
    } else {
      const config = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: password,
        }),
      };

      const response = await fetch(
        "http://10.0.2.2:8014/api/user/register",
        config
      );

      if (response.ok) {
        const data = await response.json();

        data.userId !== undefined
          ? props.navigation.navigate({ routeName: "Calculator" })
          : alert("Registration failed");
      } else {
        alert(response.statusText);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>Cloud Calculator</Text>

      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="First Name..."
          placeholderTextColor="#003f5c"
          onChangeText={(text) => setFirstName(text)}
        />
      </View>

      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="Last Name..."
          placeholderTextColor="#003f5c"
          onChangeText={(text) => setLastName(text)}
        />
      </View>

      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="Email..."
          placeholderTextColor="#003f5c"
          onChangeText={(text) => setEmail(text)}
        />
      </View>

      <View style={styles.inputView}>
        <TextInput
          secureTextEntry
          style={styles.inputText}
          placeholder="Password..."
          placeholderTextColor="#003f5c"
          onChangeText={(text) => setPassword(text)}
        />
      </View>
      <TouchableOpacity style={styles.loginBtn} onPress={register}>
        <Text style={styles.loginText}>REGISTER</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text
          style={styles.loginText}
          onPress={() => {
            props.navigation.navigate({ routeName: "Login" });
          }}
        >
          Already Have Account? Login
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#003f5c",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    fontWeight: "bold",
    fontSize: 50,
    color: "#fb5b5a",
    marginBottom: 40,
  },
  inputView: {
    width: "80%",
    backgroundColor: "#465881",
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: "center",
    padding: 20,
  },
  inputText: {
    height: 50,
    color: "white",
  },
  forgot: {
    color: "white",
    fontSize: 11,
  },
  loginBtn: {
    width: "80%",
    backgroundColor: "#fb5b5a",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    marginBottom: 10,
  },
  loginText: {
    color: "white",
  },
});

export default RegisterScreen;
