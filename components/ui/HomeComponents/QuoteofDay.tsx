import React from "react";
import { View } from "react-native";
import QuoteCard from "./QuoteCard";
import {StyleSheet } from "react-native";


const QuoteOfTheDay: React.FC = () => {
  return (
    <View>
      <QuoteCard
        quote="You'll never change your life until you change something you do daily. The secret of your success is found in your daily routine."
        author="Alex K"
      />
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      marginTop: 30, // ⬆️ Adds space above the quote card
    },
  });

export default QuoteOfTheDay;
