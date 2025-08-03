import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "../global/ThemeContext";

const Header = () => {
  const insets = useSafeAreaInsets();
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <View style={[styles.headerContainer, { paddingTop: insets.top }]}>
      <Image source={require("../../images/logo.png")} />
      <TouchableOpacity onPress={toggleTheme}>
        <Image
          source={
            isDarkMode
              ? require("../../images/sun.png")
              : require("../../images/moon.png")
          }
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 26,
    paddingRight: 24,
  },
});

export default Header;
