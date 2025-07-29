import { StyleSheet, View } from "react-native";
import { useFonts } from "expo-font";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ThemeProvider, useTheme } from "./src/global/ThemeContext";
import { josefinSansFonts } from "./src/global/typhography";
import Home from "./src/pages/Home";

const AppContent = () => {
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Home />
    </View>
  );
};

export default function App() {
  const [fontsLoaded] = useFonts(josefinSansFonts);

  if (!fontsLoaded) return null;

  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <AppContent />
      </ThemeProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
