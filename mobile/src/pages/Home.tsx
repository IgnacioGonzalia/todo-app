import { Image, StyleSheet, View } from "react-native";
import { useTheme } from "../global/ThemeContext";
import Header from "../components/Header";
import TaskInput from "../components/TaskInput";
import TaskContainer from "../components/TaskContainer";

const Home = () => {
  const { colors, isDarkMode } = useTheme();

  const mockTasks = [
    { id: 1, text: "Complete online JavaScript course", completed: true },
    { id: 2, text: "Jog around the park 3x", completed: false },
    { id: 3, text: "10 minutes meditation", completed: false },
  ];

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
      <TaskInput />
      <TaskContainer tasks={mockTasks} />
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
