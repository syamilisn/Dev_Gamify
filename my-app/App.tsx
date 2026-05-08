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
    color: "#ec4899",
    card: "#3b0a26",
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
    color: "#facc15",
    card: "#3d3205",
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
    color: "#ef4444",
    card: "#3b0b0b",
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
    color: "#22c55e",
    card: "#052e16",
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
        backgroundColor: "#09090b",
        paddingTop: 60,
        paddingHorizontal: 16,
      }}
    >
      <Text
        style={{
          color: "white",
          fontSize: 30,
          fontWeight: "bold",
          marginBottom: 24,
          letterSpacing: 1,
        }}
      >
        Life XP
      </Text>

      {categories.map((category) => (
        <View
          key={category.id}
          style={{
            backgroundColor: category.card,
            marginBottom: 18,
            borderRadius: 18,
            padding: 15,
            borderWidth: 1.5,
            borderColor: category.color,
            shadowColor: category.color,
          }}
        >
          <Pressable
            onPress={() => toggleCategory(category.id)}
          >
            <Text
              style={{
                color: category.color,
                fontSize: 21,
                fontWeight: "700",
                letterSpacing: 0.5,
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
                marginTop: 14,
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
                    width: "48%",
                    flexDirection: "row",
                    alignItems: "center",
                    backgroundColor: "#18181b",
                    borderRadius: 12,
                    paddingVertical: 10,
                    paddingHorizontal: 8,
                    marginBottom: 10,
                    borderWidth: 1,
                    borderColor: "#27272a",
                  }}
                >
                  {/* COUNTER BOX */}
                  <View
                    style={{
                      width: 24,
                      height: 24,
                      borderRadius: 6,
                      borderWidth: 1.5,
                      borderColor:
                        habit.count > 0
                          ? category.color
                          : "#52525b",
                      backgroundColor:
                        habit.count > 0
                          ? category.color
                          : "transparent",
                      alignItems: "center",
                      justifyContent: "center",
                      marginRight: 8,
                    }}
                  >
                    <Text
                      style={{
                        color:
                          habit.count > 0
                            ? "#09090b"
                            : "white",
                        fontSize: 12,
                        fontWeight: "bold",
                      }}
                    >
                      {renderBoxValue(habit.count)}
                    </Text>
                  </View>

                  {/* TEXT */}
                  <View>
                    <Text
                      style={{
                        color: "white",
                        fontSize: 13,
                        fontWeight: "600",
                      }}
                    >
                      {habit.name}
                    </Text>

                    <Text
                      style={{
                        color: "#71717a",
                        fontSize: 10,
                        marginTop: 1,
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