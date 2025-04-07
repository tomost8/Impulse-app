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
import AddGoalButton from "../../ui/DailyGoalsViewAll/AddGoalButton";
import GoalsHeader from "../../ui/DailyGoalsViewAll/GoalsHeader";
import EditActivityCard from "@/components/ui/common/activityCards/EditActivityCard";
import React, { useState } from "react";
import { router } from "expo-router";

interface GoalFormData {
  startTime: string;
  duration: { hours: number; minutes: number };
  description: string;
}

interface ViewGoalsScreenProps {
  loading: boolean;
  activities: any[];
  timezone: string;
  authToken: string;
  selectedActivity: number | null;
  handleSelectGoal: (goalId: number) => void;
  formData: any;
  handleFormDataChange: (field: string, value: any) => void;
  onSave: () => Promise<void>;
}
  
const ViewGoalsScreen: React.FC<ViewGoalsScreenProps> = (props: ViewGoalsScreenProps) => {
  if (props.loading) {
    return <Text>Loading...</Text>;
  }

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

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardView}
      >
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
            {props.activities.map((activity: any) => (
              <EditActivityCard
                key={activity.id}
                category={activity.category}
                isSelected={props.selectedActivity === activity.id}
                onSelect={() => props.handleSelectGoal(activity.id)}
                formData={props.formData}
                onFormDataChange={(field, value) => props.handleFormDataChange(field as keyof GoalFormData, value)}
                onSave={props.onSave}
                scrollViewRef={scrollViewRef}
              />
            ))}
          </View>
        </ScrollView>

        {/* Only show button when keyboard is not visible */}
        {!isKeyboardVisible && (
          <View style={styles.buttonContainer}>
            <AddGoalButton onPress={() => router.push("/home/addActivity")} />
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
    flexGrow: 1,
    paddingBottom: 100, // Increased to ensure space for expanded cards
  },
  buttonContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20, // Reduced bottom padding
    paddingTop: 10,
    alignSelf: "center",
    width: "100%",
    backgroundColor: '#FFFFFF',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: "Poppins",
    fontWeight: "600",
    color: "#242020", // Dark color from Figma
    marginTop: 15, // Adjust spacing as per Figma
    paddingLeft: 25,
    marginBottom: 15,
  },
  activitiesContainer: {
    marginTop: 0, // Space below the section title
  },
});
  
export default ViewGoalsScreen;
  