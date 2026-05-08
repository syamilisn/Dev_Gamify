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
      { id: "workout", name: "W.O.", done: false },
      { id: "ochores", name: "OCHO", done: false },
      { id: "cook", name: "COOK", done: false },
      { id: "xchores", name: "XCHO", done: false },
    ],
  },

  {
    id: "experience",
    title: "💛 EXP",
    expanded: false,
    habits: [
      { id: "grownews", name: "O.N.", done: false },
      { id: "focus", name: "F", done: false },
      { id: "read", name: "R", done: false },
      { id: "plan", name: "P", done: false },
    ],
  },

  {
    id: "mana",
    title: "❤️ MANA",
    expanded: false,
    habits: [
      { id: "bujo", name: "BUJO", done: false },
      { id: "travel", name: "TOUR", done: false },
      { id: "friend", name: "FRND", done: false },
      { id: "abcd", name: "ABCD", done: false },
    ],
  },

  {
    id: "spirit",
    title: "💚 SOUL",
    expanded: false,
    habits: [
      { id: "pray", name: "PRAY", done: false },
      { id: "art", name: "ART", done: false },
      { id: "nature", name: "NATURE", done: false },
      { id: "meditation", name: "MEDITATION", done: false },
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
          habits: cat.habits.map((habit) =>
            habit.id === habitId
              ? { ...habit, done: !habit.done }
              : habit
          ),
        };
      })
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
              {category.title}
            </Text>
          </Pressable>

          {category.expanded &&
            category.habits.map((habit) => (
              <Pressable
                key={habit.id}
                onPress={() =>
                  toggleHabit(category.id, habit.id)
                }
                style={{
                  marginTop: 16,
                  paddingLeft: 10,
                }}
              >
                <Text
                  style={{
                    color: habit.done
                      ? "#4ade80"
                      : "white",
                    fontSize: 18,
                  }}
                >
                  {habit.done ? "✅ " : "⬜ "}
                  {habit.name}
                </Text>
              </Pressable>
            ))}
        </View>
      ))}
    </ScrollView>
  );
}