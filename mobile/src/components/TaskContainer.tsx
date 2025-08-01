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
  clearCompleted: () => void;
}

const TaskContainer = ({
  tasks,
  newTaskId,
  deletingTaskId,
  completeTask,
  deleteTask,
  currentFilter,
  clearCompleted,
}: TaskContainerProps) => {
  const { colors } = useTheme();
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const slideAnim = useRef(new Animated.Value(0)).current;
  const buttonOpacity = useRef(new Animated.Value(0)).current;
  const buttonScale = useRef(new Animated.Value(0.8)).current;
  const [displayedTasks, setDisplayedTasks] = useState(tasks);
  const [displayedFilter, setDisplayedFilter] = useState(currentFilter);
  const [clearingTasks, setClearingTasks] = useState<number[]>([]);
  const previousFilter = useRef(currentFilter);
  const isAnyIncompleteTask = tasks.some((task) => task.completed);
  const incompleteTaskNumber = tasks.filter((task) => !task.completed).length;
  const shouldShowButton = displayedFilter !== "active" && isAnyIncompleteTask;

  // Clear completed button animation
  useEffect(() => {
    if (shouldShowButton) {
      Animated.parallel([
        Animated.timing(buttonOpacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.spring(buttonScale, {
          toValue: 1,
          tension: 120,
          friction: 7,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(buttonOpacity, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.spring(buttonScale, {
          toValue: 0.8,
          tension: 120,
          friction: 7,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [shouldShowButton, buttonOpacity, buttonScale]);

  // Animation for filter change
  useEffect(() => {
    if (previousFilter.current === currentFilter) {
      setDisplayedTasks(tasks);
      setDisplayedFilter(currentFilter);
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
      setDisplayedFilter(currentFilter);
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

  const handleClearCompleted = () => {
    const completedTaskIds = displayedTasks
      .filter((task) => task.completed)
      .map((task) => task.id);

    if (completedTaskIds.length === 0) return;

    setClearingTasks(completedTaskIds);

    setTimeout(() => {
      clearCompleted();
      setClearingTasks([]);
    }, 400);
  };

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
            isDeleting={
              task.id === deletingTaskId || clearingTasks.includes(task.id)
            }
            completeTask={() => completeTask(task.id)}
            deleteTask={() => deleteTask(task.id)}
          />
          <View
            style={[styles.divider, { backgroundColor: colors.divider }]}
          ></View>
        </React.Fragment>
      ))}
      <View style={styles.footerContainer}>
        <Text style={[styles.text, { color: colors.text }]}>
          {`${incompleteTaskNumber} task${
            incompleteTaskNumber !== 1 ? "s" : ""
          } left`}
        </Text>
        <Animated.View
          style={{
            opacity: buttonOpacity,
            transform: [{ scale: buttonScale }],
          }}
        >
          <TouchableOpacity
            onPress={handleClearCompleted}
            disabled={!shouldShowButton}
          >
            <Text style={[styles.text, { color: colors.text }]}>
              Clear Completed
            </Text>
          </TouchableOpacity>
        </Animated.View>
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
