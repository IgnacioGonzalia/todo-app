import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Task from "./Task";
import { useTheme } from "../global/ThemeContext";
import { getFontStyle } from "../global/typhography";

interface TaskContainerProps {
  tasks: Array<{ id: number; text: string; completed: boolean }>;
}

const TaskContainer = ({ tasks }: TaskContainerProps) => {
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.white }]}>
      {tasks.map((task) => (
        <React.Fragment key={task.id}>
          <Task id={task.id} text={task.text} completed={task.completed} />
          <View style={styles.divider}></View>
        </React.Fragment>
      ))}
      <View style={styles.footerContainer}>
        <Text style={[styles.text, { color: colors.text }]}>
          {`${tasks.length} task${tasks.length !== 1 ? "s" : ""} left`}
        </Text>
        <TouchableOpacity onPress={() => console.log("Clear completed tasks")}>
          <Text style={[styles.text, { color: colors.text }]}>
            Clear Completed
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    marginHorizontal: 24,
    borderRadius: 5,
    elevation: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  divider: {
    height: 1,
    backgroundColor: "#E3E4F1",
  },
  footerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    paddingTop: 16,
  },
  text: {
    fontSize: 12,
    ...getFontStyle("regular"),
  },
});

export default TaskContainer;
