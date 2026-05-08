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
      { id: "workout", name: "W.O.", points: 3, count: 0, multi: false },
      { id: "ochores", name: "OCHO", points: 3, count: 0, multi: true },
      { id: "cook", name: "COOK", points: 2, count: 0, multi: false },
      { id: "xchores", name: "XCHO", points: 2, count: 0, multi: true },
    ],
  },

  {
    id: "experience",
    title: "💛 EXP",
    expanded: false,
    habits: [
      { id: "grownews", name: "O.N.", points: 3, count: 0, multi: true },
      { id: "focus", name: "F", points: 3, count: 0, multi: false },
      { id: "read", name: "R", points: 2, count: 0, multi: true },
      { id: "plan", name: "P", points: 2, count: 0, multi: false },
    ],
  },

  {
    id: "mana",
    title: "❤️ MANA",
    expanded: false,
    habits: [
      { id: "bujo", name: "BUJO", points: 3, count: 0, multi: false },
      { id: "travel", name: "TOUR", points: 3, count: 0, multi: true },
      { id: "friend", name: "FRND", points: 2, count: 0, multi: false },
      { id: "abcd", name: "ABCD", points: 2, count: 0, multi: true },
    ],
  },

  {
    id: "spirit",
    title: "💚 SOUL",
    expanded: false,
    habits: [
      { id: "pray", name: "PRAY", points: 3, count: 0, multi: false },
      { id: "art", name: "ART", points: 3, count: 0, multi: true },
      { id: "nature", name: "NATURE", points: 2, count: 0, multi: false },
      { id: "meditation", name: "MEDITATION", points: 2, count: 0, multi: true },
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

  const toggleHabit = (
    categoryId: string,
    habitId: string
  ) => {
    setCategories((prev) =>
      prev.map((cat) => {
        if (cat.id !== categoryId) return cat;

        return {
          ...cat,
          habits: cat.habits.map((habit) => {
            if (habit.id !== habitId) return habit;

            if (habit.multi) {
              return {
                ...habit,
                count: habit.count + 1,
              };
            }

            return {
              ...habit,
              count: habit.count === 0 ? 1 : 0,
            };
          }),
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
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "space-between",
                marginTop: 16,
              }}
            >
              {category.habits.map((habit) => (
                <Pressable
                  key={habit.id}
                  onPress={() =>
                    toggleHabit(category.id, habit.id)
                  }
                  onLongPress={() => {
                    if (habit.count > 2) {
                      resetHabit(category.id, habit.id);
                    }
                  }}
                  style={{
                    width: "48%",
                    backgroundColor:
                      habit.count > 0
                        ? "#14532d"
                        : "#262626",
                    padding: 16,
                    borderRadius: 14,
                    marginBottom: 12,
                  }}
                >
                  <Text
                    style={{
                      color: "white",
                      fontSize: 18,
                      fontWeight: "600",
                    }}
                  >
                    {habit.name}
                  </Text>

                  <Text
                    style={{
                      color: "#a3a3a3",
                      marginTop: 4,
                    }}
                  >
                    {habit.points} pts
                  </Text>

                  <Text
                    style={{
                      color: "#4ade80",
                      marginTop: 10,
                      fontSize: 20,
                      fontWeight: "bold",
                    }}
                  >
                    x{habit.count}
                  </Text>
                </Pressable>
              ))}
            </View>
          )}
        </View>
      ))}
    </ScrollView>
  );
}