import React from "react";
import { View, SafeAreaView, StyleSheet, Text, ScrollView } from "react-native";
import { router } from "expo-router";
import styles from "@/constants/testStyles";

interface EditDailyGoalsScreenProps {
  formData: any, 
  handleFormDataChange: any,
  handleFormSubmit: any, 
  isSubmitting: boolean,
}
  
const EditDailyGoalsScreen: React.FC<EditDailyGoalsScreenProps> = ({ formData, handleFormDataChange, handleFormSubmit, isSubmitting }) => {
  return (
    <SafeAreaView>
        <Text style={{ color: 'white' }}>Edit Daily Goals</Text>
    </SafeAreaView>
  );
};
  
  export default EditDailyGoalsScreen;
  