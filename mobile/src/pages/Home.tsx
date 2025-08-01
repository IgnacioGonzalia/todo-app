import { Image, StyleSheet, View } from "react-native";
import { useTheme } from "../global/ThemeContext";
import Header from "../components/Header";
import TaskInput from "../components/TaskInput";
import TaskContainer from "../components/TaskContainer";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "TASKS";

type Task = {
  id: number;
  text: string;
  completed: boolean;
};

const Home = () => {
  const { colors, isDarkMode } = useTheme();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskId, setNewTaskId] = useState<number | null>(null);
  const [deletingTaskId, setDeletingTaskId] = useState<number | null>(null);

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const storedTasks = await AsyncStorage.getItem(STORAGE_KEY);
        if (storedTasks) setTasks(JSON.parse(storedTasks));
      } catch (error) {
        console.error("Failed to load tasks from storage:", error);
      }
    };
    loadTasks();
  }, []);

  useEffect(() => {
    const saveTasks = async () => {
      try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
      } catch (e) {
        console.error("Error saving tasks to storage", e);
      }
    };
    saveTasks();
  }, [tasks]);

  const addTask = (taskText: string) => {
    const task = {
      id: Date.now(),
      text: taskText,
      completed: false,
    };
    setTasks((prev) => [...prev, task]);
    setNewTaskId(task.id);
    setTimeout(() => {
      setNewTaskId(null);
    }, 500);
  };

  const completeTask = (taskId: number) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const filterOutTask = (tasks: Task[], taskId: number) => {
    return tasks.filter((task) => task.id !== taskId);
  };

  const deleteTask = (taskId: number) => {
    setDeletingTaskId(taskId);
    setTimeout(() => {
      setTasks((prev) => filterOutTask(prev, taskId));
      setDeletingTaskId(null);
    }, 400);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.bgImageContainer}>
        <Image
          source={
            isDarkMode
              ? require("../../images/bg-dark.png")
              : require("../../images/bg-light.png")
          }
          style={styles.bgImage}
        />
      </View>
      <Header />
      <TaskInput onAddTask={addTask} />
      <TaskContainer
        tasks={tasks}
        newTaskId={newTaskId}
        deletingTaskId={deletingTaskId}
        completeTask={completeTask}
        deleteTask={deleteTask}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },
  bgImageContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
  },
  bgImage: {
    width: "100%",
    height: 300,
    resizeMode: "cover",
  },
});

export default Home;
