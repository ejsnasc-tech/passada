import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { api } from "../services/api";

export default function CadastroScreen({ navigation }) {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);

  async function cadastrar() {
    if (!nome || !email || !senha) {
      Alert.alert("Erro", "Preencha todos os campos!");
      return;
    }
    if (senha.length < 8) {
      Alert.alert("Erro", "Senha deve ter ao menos 8 caracteres!");
      return;
    }
    setLoading(true);
    try {
      const res = await api.cadastrar({ nome, email, senha });
      if (res.sucesso) {
        navigation.navigate("ContaCriada");
      } else {
        Alert.alert("Erro", res.erro || "Erro ao cadastrar!");
      }
    } catch (e) {
      Alert.alert("Erro", "Sem conexao com o servidor!");
    }
    setLoading(false);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Criar conta</Text>
      <Text style={styles.sub}>Comece sua jornada de corrida</Text>

      <Text style={styles.label}>Nome completo</Text>
      <TextInput style={styles.input} placeholder="Seu nome" value={nome} onChangeText={setNome} />

      <Text style={styles.label}>Email</Text>
      <TextInput style={styles.input} placeholder="seu@email.com" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />

      <Text style={styles.label}>Senha</Text>
      <TextInput style={styles.input} placeholder="Minimo 8 caracteres" value={senha} onChangeText={setSenha} secureTextEntry />

      <TouchableOpacity style={styles.btn} onPress={cadastrar} disabled={loading}>
        <Text style={styles.btnText}>{loading ? "Criando..." : "Criar conta"}</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <Text style={styles.link}>Ja tem conta? Entrar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 24, justifyContent: "center" },
  titulo: { fontSize: 24, fontWeight: "600", color: "#1D9E75", marginBottom: 4 },
  sub: { fontSize: 14, color: "#888", marginBottom: 24 },
  label: { fontSize: 11, fontWeight: "600", color: "#888", textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 6 },
  input: { borderWidth: 0.5, borderColor: "#ddd", borderRadius: 10, padding: 12, fontSize: 15, marginBottom: 16, backgroundColor: "#fff" },
  btn: { backgroundColor: "#1D9E75", padding: 14, borderRadius: 12, alignItems: "center", marginTop: 8 },
  btnText: { color: "#fff", fontSize: 16, fontWeight: "600" },
  link: { color: "#1D9E75", textAlign: "center", marginTop: 16, fontSize: 14 }
});
