import { View, Text, TouchableOpacity,StyleSheet, Button } from "react-native";
import { useAuth } from "../context/useAuth";


export default function Home() {
  const { user, signOut } = useAuth();
  return (
    <View style={style.container}>
<Button title="sair" onPress={() => signOut()} />
    </View>
  );
}
const style = StyleSheet.create({

  container: {
    flex: 1,
    alignItems: "stretch",
    justifyContent: "space-between",
    padding: 16,
    backgroundColor: "#556190"
  },})




