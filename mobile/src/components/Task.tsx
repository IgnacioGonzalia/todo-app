import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "../global/ThemeContext";
import { getFontStyle } from "../global/typhography";

const Task = ({
  id,
  text,
  completed,
}: {
  id: number;
  text: string;
  completed: boolean;
}) => {
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => console.log("Toggle task")}
        style={[styles.checkbox, { borderColor: colors.greyBorder }]}
      >
        {completed && (
          <Image
            source={require("../../images/checked.png")}
            style={styles.checkedIcon}
          />
        )}
      </TouchableOpacity>
      <Text
        style={[
          styles.text,
          {
            color: completed ? colors.checkedText : colors.text,
            textDecorationLine: completed ? "line-through" : "none",
          },
        ]}
        numberOfLines={2}
        ellipsizeMode="tail"
      >
        {text}
      </Text>
      <TouchableOpacity onPress={() => console.log("Delete task")}>
        <Image
          source={require("../../images/delete.png")}
          style={styles.deleteIcon}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderRadius: 20,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  checkedIcon: {
    width: 20,
    height: 20,
  },
  text: {
    ...getFontStyle("medium"),
    flex: 1,
  },
  deleteIcon: {
    width: 12,
    height: 12,
    marginLeft: 10,
  },
});

export default Task;
