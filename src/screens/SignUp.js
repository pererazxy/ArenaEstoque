import React, { useState } from "react";
import {
  Text,
  TextInput,
  View,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Image
} from "react-native";
import { Feather } from "@expo/vector-icons";
import MyButton from "../components/MyButton";
import { useNavigation } from "@react-navigation/native";
import { api } from "../services/api";
import logo from '../assets/logo.png'


export default function SignUp() {
  const navigation = useNavigation();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");


  async function handleSubmit() {
    setError("");
    if (!email.trim() || !username.trim() || !password.trim()) {
      setError("Por favor, preencha todos os campos!");
      return;
    }
    try {
      await api.post("register", {
        email,
        username,
        password,
      });
      Alert.alert("Sucesso", "Usuário criado com sucesso!");
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message);
      }
      setError("Não foi possivel se conectar com o servidor");
    }
  }

  return (
    <View style={style.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Feather name="chevron-left" size={32} color="#474A51" />
      </TouchableOpacity>
      <Image source={logo} style={style.image}/>

      <View>
        <Text style={style.title}>Cadastre-se aqui</Text>
      </View>
      <View style={{ gap: 16 }}>
        <View style={style.inputBox}>
          <Feather name="user" size={24} color="#474A51" />
          <TextInput
            style={style.input}
            placeholder="Digite seu nome"
            placeholderTextColor="#474A51"
            value={username}
            onChangeText={(text) => setUsername(text)}
          />
        </View>
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
        {error && <Text style={style.erro}>{error}</Text>}
        <MyButton
          onPress={() => handleSubmit()}
          text="Cadastrar"
          style={{ width: "100%", backgroundColor:'red'}}
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
    fontSize: 34,
    fontWeight: "700",
    width: "100%",
    color: "#3D3D4D",
    textAlign:"center"
  },
  inputBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "#ff0000",
    borderRadius: 4,
    width: "100%",
    backgroundColor:"#ffff"
  },
  input: {
    flex: 1,
    fontSize: 18,
    color:"#000"
  },
  erro: {
    color: "#ffff",
    fontWeight: "400",
    textAlign: "center",
    marginVertical: 16,
  },
});