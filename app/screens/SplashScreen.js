import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function SplashScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.logo}>
        <Text style={styles.logoIcon}>🏃</Text>
      </View>
      <Text style={styles.nome}>Passada</Text>
      <Text style={styles.slogan}>Seu treino de corrida com IA</Text>

      <View style={styles.stats}>
        <View style={styles.stat}>
          <Text style={styles.statVal}>IA</Text>
          <Text style={styles.statLabel}>personalizado</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statVal}>8sem</Text>
          <Text style={styles.statLabel}>de plano</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statVal}>5k+</Text>
          <Text style={styles.statLabel}>meta inicial</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.btnPrimary} onPress={() => navigation.navigate("Cadastro")}>
        <Text style={styles.btnPrimaryText}>Criar minha conta</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.btnSecondary} onPress={() => navigation.navigate("Login")}>
        <Text style={styles.btnSecondaryText}>Já tenho conta — entrar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", alignItems: "center", justifyContent: "center", padding: 24 },
  logo: { width: 72, height: 72, backgroundColor: "#E1F5EE", borderRadius: 18, alignItems: "center", justifyContent: "center", marginBottom: 14 },
  logoIcon: { fontSize: 32 },
  nome: { fontSize: 36, fontWeight: "600", color: "#1D9E75", letterSpacing: -1, marginBottom: 4 },
  slogan: { fontSize: 14, color: "#888", marginBottom: 32 },
  stats: { flexDirection: "row", gap: 12, marginBottom: 32 },
  stat: { backgroundColor: "#F5F5F5", borderRadius: 12, padding: 12, alignItems: "center", minWidth: 80 },
  statVal: { fontSize: 18, fontWeight: "600", color: "#1D9E75" },
  statLabel: { fontSize: 10, color: "#888", marginTop: 2 },
  btnPrimary: { width: "100%", backgroundColor: "#1D9E75", padding: 14, borderRadius: 12, alignItems: "center", marginBottom: 10 },
  btnPrimaryText: { color: "#fff", fontSize: 16, fontWeight: "600" },
  btnSecondary: { width: "100%", borderWidth: 1, borderColor: "#1D9E75", padding: 13, borderRadius: 12, alignItems: "center" },
  btnSecondaryText: { color: "#1D9E75", fontSize: 16, fontWeight: "500" }
});
