import { Image, StyleSheet, TouchableOpacity, Animated } from "react-native";
import { useTheme } from "../global/ThemeContext";
import { getFontStyle } from "../global/typhography";
import { useEffect, useRef } from "react";

const Task = ({
  id,
  text,
  completed,
  isNew = false,
  completeTask,
}: {
  id: number;
  text: string;
  completed: boolean;
  isNew?: boolean;
  completeTask: (taskId: number) => void;
}) => {
  const { colors } = useTheme();
  const slideAnim = useRef(new Animated.Value(isNew ? -50 : 0)).current;
  const fadeAnim = useRef(new Animated.Value(isNew ? 0 : 1)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const checkboxScale = useRef(new Animated.Value(completed ? 1 : 0.8)).current;
  const textOpacity = useRef(new Animated.Value(1)).current;

  // Animations for new tasks
  useEffect(() => {
    if (isNew) {
      Animated.parallel([
        Animated.spring(slideAnim, {
          toValue: 0,
          tension: 100,
          friction: 8,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [isNew, slideAnim, fadeAnim]);

  // Animations for completed tasks
  useEffect(() => {
    Animated.parallel([
      Animated.spring(checkboxScale, {
        toValue: completed ? 1 : 0.8,
        tension: 150,
        friction: 4,
        useNativeDriver: true,
      }),
      Animated.timing(textOpacity, {
        toValue: completed ? 0.6 : 1,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();
  }, [completed, checkboxScale, textOpacity]);

  const handleComplete = () => {
    Animated.sequence([
      Animated.spring(scaleAnim, {
        toValue: 0.95,
        tension: 200,
        friction: 4,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 200,
        friction: 4,
        useNativeDriver: true,
      }),
    ]).start();

    completeTask(id);
  };

  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [{ translateY: slideAnim }, { scale: scaleAnim }],
          opacity: fadeAnim,
        },
      ]}
    >
      <TouchableOpacity
        onPress={handleComplete}
        style={[styles.checkbox, { borderColor: colors.greyBorder }]}
      >
        <Animated.View
          style={{
            transform: [{ scale: checkboxScale }],
          }}
        >
          {completed && (
            <Image
              source={require("../../images/checked.png")}
              style={styles.checkedIcon}
            />
          )}
        </Animated.View>
      </TouchableOpacity>
      <Animated.Text
        style={[
          styles.text,
          {
            color: completed ? colors.checkedText : colors.text,
            textDecorationLine: completed ? "line-through" : "none",
            opacity: textOpacity,
          },
        ]}
        numberOfLines={2}
        ellipsizeMode="tail"
      >
        {text}
      </Animated.Text>
      <TouchableOpacity onPress={() => console.log("Delete task")}>
        <Image
          source={require("../../images/delete.png")}
          style={styles.deleteIcon}
        />
      </TouchableOpacity>
    </Animated.View>
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
