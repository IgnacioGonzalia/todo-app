import { StyleSheet, TextInput, View } from "react-native";
import { getFontStyle } from "../global/typhography";
import { useState } from "react";
import { useTheme } from "../global/ThemeContext";

const TaskInput = () => {
  const { colors } = useTheme();
  const [text, setText] = useState<string>("");

  return (
    <View style={[styles.container, { backgroundColor: colors.white }]}>
      <View
        style={[styles.checkbox, { borderColor: colors.greyBorder }]}
      ></View>
      <TextInput
        returnKeyType="done"
        placeholder="Create a new todo..."
        placeholderTextColor={colors.placeholder}
        style={[styles.input, { color: colors.text }]}
        value={text}
        onChangeText={setText}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    marginHorizontal: 24,
    borderRadius: 5,
    paddingVertical: 14,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 1,
    borderRadius: 20,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  checkedImage: {
    width: 20,
    height: 20,
  },
  input: {
    flex: 1,
    marginLeft: 12,
    ...getFontStyle("medium"),
    fontSize: 16,
  },
});

export default TaskInput;
