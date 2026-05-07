import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { api } from "../services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);

  async function login() {
    if (!email || !senha) {
      Alert.alert("Erro", "Preencha todos os campos!");
      return;
    }
    setLoading(true);
    try {
      const res = await api.login(email, senha);
      if (res.sucesso) {
        await AsyncStorage.setItem("token", res.token);
        await AsyncStorage.setItem("usuario", JSON.stringify(res.usuario));
        navigation.reset({ index: 0, routes: [{ name: "Home" }] });
      } else {
        Alert.alert("Erro", res.erro || "Email ou senha incorretos!");
      }
    } catch (e) {
      Alert.alert("Erro", "Sem conexao com o servidor!");
    }
    setLoading(false);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Bem-vindo de volta</Text>
      <Text style={styles.sub}>Entre na sua conta Passada</Text>

      <Text style={styles.label}>Email</Text>
      <TextInput style={styles.input} placeholder="seu@email.com" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />

      <Text style={styles.label}>Senha</Text>
      <TextInput style={styles.input} placeholder="Sua senha" value={senha} onChangeText={setSenha} secureTextEntry />

      <TouchableOpacity>
        <Text style={styles.esqueci}>Esqueci minha senha</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.btn} onPress={login} disabled={loading}>
        <Text style={styles.btnText}>{loading ? "Entrando..." : "Entrar"}</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Cadastro")}>
        <Text style={styles.link}>Nao tem conta? Criar conta gratis</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 24, justifyContent: "center" },
  titulo: { fontSize: 24, fontWeight: "600", color: "#1D9E75", marginBottom: 4 },
  sub: { fontSize: 14, color: "#888", marginBottom: 24 },
  label: { fontSize: 11, fontWeight: "600", color: "#888", textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 6 },
  input: { borderWidth: 0.5, borderColor: "#ddd", borderRadius: 10, padding: 12, fontSize: 15, marginBottom: 16 },
  esqueci: { color: "#1D9E75", textAlign: "right", marginBottom: 16, fontSize: 13 },
  btn: { backgroundColor: "#1D9E75", padding: 14, borderRadius: 12, alignItems: "center", marginTop: 8 },
  btnText: { color: "#fff", fontSize: 16, fontWeight: "600" },
  link: { color: "#1D9E75", textAlign: "center", marginTop: 16, fontSize: 14 }
});
