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
import { router } from "expo-router";
import { convertLocalToUtc, convertUtcToLocal } from "@/utils/timezoneProcessing";
import EditActivityCard from "@/components/ui/common/EditActivityCard";

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
  setSelectedActivity: (activityId: number | null) => void;
  formData: any;
  handleFormDataChange: (field: string, value: any) => void;
  setFormData: (formData: any) => void;
  handleUpdateActivity: (input: any) => Promise<void>;
}
  
const ViewGoalsScreen: React.FC<ViewGoalsScreenProps> = (props: any) => {
  if (props.loading) {
    return <Text>Loading...</Text>;
  }

  const resetFormData = () => {
    props.setFormData({
      startTime: '',
      duration: { hours: 0, minutes: 0 },
      description: ''
    });
  }

  const handleSelectGoal = (goalId: number) => {
    if (props.selectedActivity === goalId) {
      // Collapse expanded goal and reset form data
      props.setSelectedActivity(null);
      resetFormData();
    } else {
      // Expand goal and set form data to corresponding activity data
      props.setSelectedActivity(goalId);
      const selectedActivity = props.activities.find((activity: any) => activity.id === goalId);
      const activityData = {
        startTime: convertUtcToLocal(selectedActivity?.scheduledDatetime, props.timezone),
        duration: {
          hours: Math.floor(selectedActivity?.duration / 60),
          minutes: selectedActivity?.duration % 60
        },
        description: selectedActivity?.description || ''
      }
      if (selectedActivity) {
        console.log("Activity Selected:", selectedActivity, "\nForm Data:", activityData);
        props.setFormData(activityData);
      }
    }
  };

  const handleSaveChanges = async () => {
    const utcTime = props.formData.startTime 
      ? convertLocalToUtc(props.formData.startTime, props.timezone)
      : new Date(Date.now());
    const totalMinutes = (props.formData.duration.hours * 60) + props.formData.duration.minutes;
    const input = {
      scheduledDatetime: utcTime,
      ...(totalMinutes > 0 && { duration: totalMinutes }),
      ...(props.formData.description && { description: props.formData.description }),
    };
    props.handleUpdateActivity(input);
    props.setSelectedActivity(null);
    resetFormData();
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
            {props.activities.map((activity: any) => (
              <EditActivityCard
                key={activity.id}
                category={activity.category}
                isSelected={props.selectedActivity === activity.id}
                onSelect={() => handleSelectGoal(activity.id)}
                formData={props.formData}
                onFormDataChange={(field, value) => props.handleFormDataChange(field as keyof GoalFormData, value)}
                onSave={handleSaveChanges}
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
  