import React, { useState } from "react";
import {
  Text,
  TextInput,
  View,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  Image
} from "react-native";
import { Feather } from "@expo/vector-icons";
import MyButton from "../components/MyButton";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../context/useAuth";
import logo from '../assets/logo.png'



export default function SignIn() {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { signIn } = useAuth();


  async function handleSubmit() {
    try {
      setError("");
      await signIn({ email, password });
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
      } else {
        setError("Falha no login. Verifique suas credenciais.");
      }
    }
  }


  return (
    <View style={style.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Feather name="chevron-left" size={32} color="#474A51" />
      </TouchableOpacity>
      <Image source={logo} style={style.image}/>

      <View>
        <Text style={style.title}>Login</Text>
      </View>
      <View style={{ gap: 16 }}>
        <View style={style.inputBox}>
          <Feather name="mail" size={24} color="#474A51" />
          <TextInput
            style={style.input}
            placeholder="Digite seu email"
            placeholderTextColor="#474A51"
            keyboardType="email-address"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
        </View>
        <View style={style.inputBox}>
          <Feather name="lock" size={24} color="#474A51" />
          <TextInput
            style={style.input}
            placeholder="Digite sua senha"
            placeholderTextColor="#474A51"
            secureTextEntry
            value={password}
            onChangeText={(text) => setPassword(text)}
          />
        </View>
        {error && <Text style={{color:"#ffff"}}>{error}</Text>}
        <MyButton
          onPress={handleSubmit}
          text="Login"
          style={{ width: "100%", backgroundColor:'red' }}
        />
      </View>
    </View>
  );
}


const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "stretch",
    justifyContent: "space-between",
    padding: 16,
    backgroundColor: "#000"
  },

  image: {
    alignSelf:"center",
    left:20
  },
  title: {
    fontSize: 44,
    fontWeight: "700",
    width: "100%",
    color: "#3D3D4D",
    textAlign:"center",
  },

  inputBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "#8a8787",
    borderRadius: 4,
    width: "100%",
    backgroundColor:"#ffff"
  },


  input: {
    flex: 1,
    fontSize: 18,
  },
  erro: {
    color: "#DC1637",
    fontWeight: "400",
    textAlign: "center",
    marginVertical: 16,
  },
});
