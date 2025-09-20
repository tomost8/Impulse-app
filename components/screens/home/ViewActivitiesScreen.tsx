import React, { useState } from "react";
import { View, SafeAreaView, StyleSheet, Text, ScrollView, KeyboardAvoidingView, Platform, Keyboard, StatusBar } from "react-native";
import { router } from "expo-router";

import LoadingScreen from "@/components/ui/common/loading";
import Header from "@/components/ui/common/headers/Header";
import { EditActivityCard, AddNewGoalButton } from "../../features/goals";

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
    return <LoadingScreen />;
  }

  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

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
    <View style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardView}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          <Header 
            title="View All"
            onBackPress={() => router.back()}
          />

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
              />
            ))}
          </View>
        </ScrollView>

        {/* Only show button when keyboard is not visible */}
        {!isKeyboardVisible && (
          <View style={styles.buttonContainer}>
            <AddNewGoalButton onPress={() => router.push("/home/addActivity")} />
          </View>
        )}
      </KeyboardAvoidingView>
    </View>
  );
};
  
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
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
    marginBottom: 10, 
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
  