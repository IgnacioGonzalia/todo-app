import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "../global/ThemeContext";
import { getFontStyle } from "../global/typhography";
import { useTranslation } from "react-i18next";

const TaskFilter = ({
  filter,
  setFilter,
}: {
  filter: string;
  setFilter: (filter: string) => void;
}) => {
  const { colors } = useTheme();
  const { t } = useTranslation();

  const getTextColor = (currentFilter: string) => {
    return filter === currentFilter ? colors.blue : colors.gray;
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.white }]}>
      <TouchableOpacity onPress={() => setFilter("all")}>
        <Text
          style={[
            styles.button,
            {
              color: getTextColor("all"),
            },
          ]}
        >
          {t("All")}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setFilter("active")}>
        <Text
          style={[
            styles.button,
            {
              color: getTextColor("active"),
            },
          ]}
        >
          {t("Active")}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setFilter("completed")}>
        <Text
          style={[
            styles.button,
            {
              color: getTextColor("completed"),
            },
          ]}
        >
          {t("Completed")}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    marginHorizontal: 24,
    paddingVertical: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 18,
    borderRadius: 5,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    marginBottom: 72,
  },
  button: {
    ...getFontStyle("bold"),
  },
});

export default TaskFilter;
