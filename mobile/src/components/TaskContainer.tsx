import React, { useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Animated,
} from "react-native";
import Task from "./Task";
import { useTheme } from "../global/ThemeContext";
import { getFontStyle } from "../global/typhography";

interface TaskContainerProps {
  tasks: Array<{ id: number; text: string; completed: boolean }>;
  newTaskId?: number | null;
  deletingTaskId?: number | null;
  completeTask: (taskId: number) => void;
  deleteTask: (taskId: number) => void;
  currentFilter?: string;
}

const TaskContainer = ({
  tasks,
  newTaskId,
  deletingTaskId,
  completeTask,
  deleteTask,
  currentFilter,
}: TaskContainerProps) => {
  const { colors } = useTheme();
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const slideAnim = useRef(new Animated.Value(0)).current;
  const [displayedTasks, setDisplayedTasks] = useState(tasks);
  const previousFilter = useRef(currentFilter);

  // Animation for filter change
  useEffect(() => {
    if (previousFilter.current === currentFilter) {
      setDisplayedTasks(tasks);
      return;
    }

    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: -12,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setDisplayedTasks(tasks);
      setTimeout(() => {
        Animated.parallel([
          Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 250,
            useNativeDriver: true,
          }),
          Animated.spring(slideAnim, {
            toValue: 0,
            tension: 100,
            friction: 8,
            useNativeDriver: true,
          }),
        ]).start();
      }, 100);
    });

    previousFilter.current = currentFilter;
  }, [currentFilter, tasks, fadeAnim, slideAnim]);

  return (
    <Animated.View
      style={[
        styles.container,
        {
          backgroundColor: colors.white,
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }],
        },
      ]}
    >
      {displayedTasks.map((task) => (
        <React.Fragment key={task.id}>
          <Task
            id={task.id}
            text={task.text}
            completed={task.completed}
            isNew={task.id === newTaskId}
            isDeleting={task.id === deletingTaskId}
            completeTask={() => completeTask(task.id)}
            deleteTask={() => deleteTask(task.id)}
          />
          <View
            style={[styles.divider, { backgroundColor: colors.greyBorder }]}
          ></View>
        </React.Fragment>
      ))}
      <View style={styles.footerContainer}>
        <Text style={[styles.text, { color: colors.text }]}>
          {`${displayedTasks.length} task${
            displayedTasks.length !== 1 ? "s" : ""
          } left`}
        </Text>
        <TouchableOpacity onPress={() => console.log("Clear completed tasks")}>
          <Text style={[styles.text, { color: colors.text }]}>
            Clear Completed
          </Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
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
