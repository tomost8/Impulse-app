import React, { useState } from "react";
import { 
  View, 
  SafeAreaView, 
  StyleSheet, 
  Text, 
  ScrollView, 
  KeyboardAvoidingView, 
  Platform,
  Keyboard
} from "react-native";
import AddGoalButton from "../ui/DailyGoalsViewAll/AddGoalButton"; // ✅ Corrected Import
import GoalsHeader from "../ui/DailyGoalsViewAll/GoalsHeader"; // ✅ Added GoalsHeader
import GoalsList from "../ui/DailyGoalsViewAll/GoalsList"; // ✅ Added GoalsList
import EditDailyGoal from "../ui/DailyGoalsViewAll/EditDailyGoal";
import { router } from "expo-router";

interface DailyGoalsScreenProps {
  activities: any[];
  isActivitiesLoading: boolean;
}
  
const DailyGoalsScreen: React.FC<DailyGoalsScreenProps> = ({ activities, isActivitiesLoading }) => {
  const [editingGoal, setEditingGoal] = useState<{
    id: string;
    title: string;
    icon: any;
  } | null>(null);
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
  const scrollViewRef = React.useRef<ScrollView>(null);

  // Add keyboard listeners
  React.useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setIsKeyboardVisible(true);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setIsKeyboardVisible(false);
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  // Handle edit button click
  const handleEditClick = (goal: { id: string; title: string; icon: any }) => {
    setEditingGoal(goal);
  };

  // Handle save changes
  const handleSaveChanges = () => {
    setEditingGoal(null);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardView}
        keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
      >
        {/* Header */}
        <GoalsHeader onBackPress={() => router.back()} />

        <ScrollView 
          ref={scrollViewRef}
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          {/* Section Title - "Goals for the Day" */}
          <Text style={styles.sectionTitle}>Goals for the Day</Text>

          {/* Goals List */}
          <View style={styles.activitiesContainer}>
            <GoalsList 
              onEditClick={handleEditClick}
              editingGoalId={editingGoal?.id}
            />
            {editingGoal && (
              <EditDailyGoal
                title={editingGoal.title}
                icon={require("@/assets/icons/riseshine.png")}
                onSave={handleSaveChanges}
                scrollViewRef={scrollViewRef}
              />
            )}
          </View>
        </ScrollView>

        {/* Only show button when keyboard is not visible */}
        {!isKeyboardVisible && (
          <View style={styles.buttonContainer}>
            <AddGoalButton onPress={() => router.push("/home/activityAdd")} />
          </View>
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
  
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFFFFF", // Match Figma background
  },
  keyboardView: {
    flex: 1,
    justifyContent: 'space-between', // This will push content to top and bottom
  },
  scrollContent: {
    flexGrow: 1, // Allows content to be scrollable
    paddingBottom: 20, // Reduced padding since we're moving button lower
  },
  buttonContainer: {
    paddingHorizontal: 20,
    paddingBottom: 40, // Increased bottom padding
    paddingTop: 10, // Added top padding for spacing
    alignSelf: "center",
    width: "100%",
    backgroundColor: '#FFFFFF', // Ensure white background
    position: 'absolute', // Position absolutely
    bottom: 0, // Stick to bottom
    left: 0, // Ensure full width alignment
    right: 0, // Ensure full width alignment
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: "Poppins",
    fontWeight: "600",
    color: "#242020", // Dark color from Figma
    marginTop: 20, // Adjust spacing as per Figma
    paddingLeft: 25,
  },
  activitiesContainer: {
    marginTop: 0, // Space below the section title
  },
});
  
export default DailyGoalsScreen;
  