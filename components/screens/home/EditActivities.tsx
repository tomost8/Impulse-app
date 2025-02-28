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
import AddGoalButton from "../../ui/DailyGoalsViewAll/AddGoalButton";
import GoalsHeader from "../../ui/DailyGoalsViewAll/GoalsHeader";
import GoalsList from "../../ui/DailyGoalsViewAll/GoalsList";
import { router } from "expo-router";
import { useUpdateActivity } from "@/hooks/graphql/activities/mutations";
import { useUserPreferences } from "@/services/UserPreferencesContext";
import { convertLocalToUtc } from "@/utils/timezoneProcessing";
import EditDailyGoal from "@/components/ui/common/EditActivityCard";

interface GoalFormData {
  startTime: string;
  duration: { hours: number; minutes: number };
  description: string;
}

interface DailyGoalsScreenProps {
  activities: any[];
  isActivitiesLoading: boolean;
}
  
const DailyGoalsScreen: React.FC<DailyGoalsScreenProps> = ({ activities, isActivitiesLoading }) => {
  const { updateActivity } = useUpdateActivity();
  const { timezone, loading: timezoneLoading } = useUserPreferences();
  const [expandedGoal, setExpandedGoal] = useState<number | null>(null);
  const [goalFormData, setGoalFormData] = useState<GoalFormData>({
    startTime: '',
    duration: { hours: 0, minutes: 0 },
    description: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSelectGoal = (goalId: number) => {
    if (expandedGoal === goalId) {
      setExpandedGoal(null);
    } else {
      setExpandedGoal(goalId);
    }
  };

  const handleFormDataChange = (field: keyof GoalFormData, value: any) => {
    console.log("field", field, "value", value);
    setGoalFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSaveChanges = async () => {
    setIsSubmitting(true);
    try {
      if (timezoneLoading) {
        throw new Error('Timezone is still loading');
      }
      console.log("formData", goalFormData);
      setExpandedGoal(null);
      // Reset form data
      /*
      setGoalFormData({
        startTime: '',
        duration: { hours: 0, minutes: 0 },
        description: ''
      });
      */
    } catch (error) {
      console.error('Error updating goal:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Keyboard stuff idek

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
            {activities.map((activity) => (
              <EditDailyGoal
                key={activity.id}
                title={activity.category}
                icon={require("@/assets/icons/riseshine.png")}
                isSelected={expandedGoal === activity.id}
                onSelect={() => handleSelectGoal(activity.id)}
                formData={goalFormData}
                onFormDataChange={(field, value) => handleFormDataChange(field as keyof GoalFormData, value)}
                onSave={handleSaveChanges}
                scrollViewRef={scrollViewRef}
              />
            ))}
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
  