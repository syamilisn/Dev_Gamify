import { useState } from "react";
import {
  View,
  Text,
  Pressable,
  ScrollView,
} from "react-native";

const DATA = [
  {
    id: "vitality",
    title: "🩷 VIT",
    expanded: false,
    habits: [
      { id: "workout", name: "W.O.", points: 3, count: 0 },
      { id: "ochores", name: "OCHO", points: 3, count: 0 },
      { id: "cook", name: "COOK", points: 2, count: 0 },
      { id: "xchores", name: "XCHO", points: 2, count: 0 },
    ],
  },

  {
    id: "experience",
    title: "💛 EXP",
    expanded: false,
    habits: [
      { id: "grownews", name: "O.N.", points: 3, count: 0 },
      { id: "focus", name: "F", points: 3, count: 0 },
      { id: "read", name: "R", points: 2, count: 0 },
      { id: "plan", name: "P", points: 2, count: 0 },
    ],
  },

  {
    id: "mana",
    title: "❤️ MANA",
    expanded: false,
    habits: [
      { id: "bujo", name: "BUJO", points: 3, count: 0 },
      { id: "travel", name: "TOUR", points: 3, count: 0 },
      { id: "friend", name: "FRND", points: 2, count: 0 },
      { id: "abcd", name: "ABCD", points: 2, count: 0 },
    ],
  },

  {
    id: "spirit",
    title: "💚 SOUL",
    expanded: false,
    habits: [
      { id: "pray", name: "PRAY", points: 3, count: 0 },
      { id: "art", name: "ART", points: 3, count: 0 },
      { id: "nature", name: "NATURE", points: 2, count: 0 },
      { id: "meditation", name: "MEDITATION", points: 2, count: 0 },
    ],
  },
];

export default function App() {
  const [categories, setCategories] = useState(DATA);

  const toggleCategory = (id: string) => {
    setCategories((prev) =>
      prev.map((cat) =>
        cat.id === id
          ? { ...cat, expanded: !cat.expanded }
          : cat
      )
    );
  };

  const incrementHabit = (
    categoryId: string,
    habitId: string
  ) => {
    setCategories((prev) =>
      prev.map((cat) => {
        if (cat.id !== categoryId) return cat;

        return {
          ...cat,
          habits: cat.habits.map((habit) =>
            habit.id === habitId
              ? {
                  ...habit,
                  count: habit.count + 1,
                }
              : habit
          ),
        };
      })
    );
  };

  const resetHabit = (
    categoryId: string,
    habitId: string
  ) => {
    setCategories((prev) =>
      prev.map((cat) => {
        if (cat.id !== categoryId) return cat;

        return {
          ...cat,
          habits: cat.habits.map((habit) =>
            habit.id === habitId
              ? { ...habit, count: 0 }
              : habit
          ),
        };
      })
    );
  };

  const calculateCategoryScore = (habits: any[]) => {
    return habits.reduce(
      (total, habit) =>
        total + habit.points * habit.count,
      0
    );
  };

  const renderBoxValue = (count: number) => {
    if (count === 0) return "";
    if (count === 1) return "✓";

    return count.toString();
  };

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: "#111",
        paddingTop: 60,
        paddingHorizontal: 20,
      }}
    >
      <Text
        style={{
          color: "white",
          fontSize: 30,
          fontWeight: "bold",
          marginBottom: 30,
        }}
      >
        Life XP
      </Text>

      {categories.map((category) => (
        <View
          key={category.id}
          style={{
            backgroundColor: "#1e1e1e",
            marginBottom: 20,
            borderRadius: 16,
            padding: 16,
          }}
        >
          <Pressable
            onPress={() => toggleCategory(category.id)}
          >
            <Text
              style={{
                color: "white",
                fontSize: 22,
                fontWeight: "600",
              }}
            >
              {category.expanded ? "▼ " : "▶ "}
              {category.title} (
              {calculateCategoryScore(category.habits)} XP)
            </Text>
          </Pressable>

          {category.expanded && (
            <View
              style={{
                marginTop: 18,
              }}
            >
              {category.habits.map((habit) => (
                <Pressable
                  key={habit.id}
                  onPress={() =>
                    incrementHabit(category.id, habit.id)
                  }
                  onLongPress={() =>
                    resetHabit(category.id, habit.id)
                  }
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginBottom: 16,
                  }}
                >
                  {/* BOX */}
                  <View
                    style={{
                      width: 34,
                      height: 34,
                      borderRadius: 8,
                      borderWidth: 2,
                      borderColor:
                        habit.count > 0
                          ? "#4ade80"
                          : "#555",
                      backgroundColor:
                        habit.count > 0
                          ? "#14532d"
                          : "transparent",
                      alignItems: "center",
                      justifyContent: "center",
                      marginRight: 14,
                    }}
                  >
                    <Text
                      style={{
                        color: "white",
                        fontWeight: "bold",
                        fontSize: 16,
                      }}
                    >
                      {renderBoxValue(habit.count)}
                    </Text>
                  </View>

                  {/* HABIT NAME */}
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <Text
                      style={{
                        color: "white",
                        fontSize: 18,
                        fontWeight: "500",
                      }}
                    >
                      {habit.name}
                    </Text>

                    <Text
                      style={{
                        color: "#888",
                        marginLeft: 10,
                        fontSize: 14,
                      }}
                    >
                      +{habit.points}
                    </Text>
                  </View>
                </Pressable>
              ))}
            </View>
          )}
        </View>
      ))}
    </ScrollView>
  );
}