import React from "react";
import { View, SafeAreaView, StyleSheet, Text, ScrollView } from "react-native";
import { router } from "expo-router";
import styles from "@/constants/testStyles";

interface AddDailyGoalsScreenProps {
  selectedActivities: string[],
  handleSelectActivity: any,
  handleCreateActivity: any, 
  isSubmitting: boolean,
}
  
const AddDailyGoalsScreen: React.FC<AddDailyGoalsScreenProps> = ({ selectedActivities, handleSelectActivity, handleCreateActivity, isSubmitting }) => {
  return (
    <SafeAreaView>
        <Text style={{ color: 'white' }}>Add Daily Goals</Text>
    </SafeAreaView>
  );
};
  
  export default AddDailyGoalsScreen;
  