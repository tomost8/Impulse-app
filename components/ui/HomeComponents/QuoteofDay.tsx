import React, { useMemo } from "react";
import { View } from "react-native";
import QuoteCard from "./QuoteCard";
import { StyleSheet } from "react-native";

const quotes = [
  {
    quote: "Discipline is choosing between what you want now and what you want most.",
    author: "Unknown"
  },
  {
    quote: "If you are going to achieve excellence in big things, you develop the habit in little matters. Excellence is not an exception, it is a prevailing attitude.",
    author: "Colin Powell"
  },
  {
    quote: "Success is the sum of small efforts repeated day in and day out.",
    author: "Robert Collier"
  },
  {
    quote: "Motivation is what gets you started. Habit is what keeps you going.",
    author: "Jim Ryun"
  },
  {
    quote: "The secret of getting ahead is getting started.",
    author: "Mark Twain"
  },
  {
    quote: "To bring about change, you must not be afraid to take the first step. We will fail when we fail to try.",
    author: "Rosa Parks"
  },
  {
    quote: "Real change, enduring change, happens one step at a time.",
    author: "Ruth Bader Ginsburg"
  },
  {
    quote: "The only person you are destined to become is the person you decide to be.",
    author: "Ralph Waldo Emerson"
  },
  {
    quote: "Don't count the days, make the days count.",
    author: "Muhammad Ali"
  },
  {
    quote: "You are not a product of your circumstances. You are a product of your decisions.",
    author: "Stephen Covey"
  },
  {
    quote: "One of the differences between some successful and unsuccessful people is that one group is full of doers, while the other is full of wishers.",
    author: "Unknown"
  },
  {
    quote: "Don't settle for average. Bring your best to the moment. Then, whether it fails or succeeds, at least you know you gave all you had.",
    author: "Angela Bassett"
  },
  {
    quote: "The greater the difficulty, the more the glory in surmounting it.",
    author: "Epicurus"
  },
  {
    quote: "Do the difficult things while they are easy and do the great things while they are small. A journey of a thousand miles must begin with a single step.",
    author: "Lao Tzu"
  },
  {
    quote: "The secret of getting ahead is getting started.",
    author: "Mark Twain"
  },
  {
    quote: "What you get by achieving your goals is not as important as what you become by achieving your goals.",
    author: "Zig Ziglar"
  },
  {
    quote: "Magic is believing in yourself. If you can make that happen, you can make anything happen.",
    author: "Johann Wolfgang von Goethe"
  },
  {
    quote: "There is no magic wand that can resolve our problems. The solution rests with our work and discipline.",
    author: "Unknown"
  },
  {
    quote: "We do today what they won't, so tomorrow we can accomplish what they can't.",
    author: "Dwayne Johnson"
  },
  {
    quote: "If we want to direct our lives, we must take control of our consistent actions. It's not what we do once in a while that shapes our lives, but what we do consistently.",
    author: "Tony Robbins"
  },
  {
    quote: "Move out of your comfort zone. You can only grow if you are willing to feel awkward and uncomfortable when you try something new.",
    author: "Brian Tracy"
  },
  {
    quote: "It is often the small steps, not the giant leaps, that bring about the most lasting change.",
    author: "Queen Elizabeth II"
  },
  {
    quote: "If you want to lift yourself up, lift up someone else.",
    author: "Booker T. Washington"
  },
  {
    quote: "You're braver than you believe, stronger than you seem, and smarter than you think.",
    author: "A. A. Milne"
  },
  {
    quote: "All dreams are within reach. All you have to do is keep moving towards them.",
    author: "Paulette Motzko"
  },
  {
    quote: "Your beliefs become your thoughts, your thoughts become your words, your words become your actions, your actions become your habits, your habits become your values, your values become your destiny.",
    author: "Mahatma Gandhi"
  },
  {
    quote: "Sow an act and you reap a habit. Sow a habit and you reap a character. Sow a character and you reap a destiny.",
    author: "Charles Reade"
  },
  {
    quote: "Each day is an opportunity to craft your best life. Each day brings a chance to choose your greatness.",
    author: "Unknown"
  },
  {
    quote: "Good things come to people who wait, but better things come to those who go out and get them.",
    author: "Unknown"
  },
  {
    quote: "Do not wait until the conditions are perfect to begin. Beginning makes the conditions perfect.",
    author: "Alan Cohen"
  }
];

const QuoteOfTheDay: React.FC = () => {
  // Use the day of the year to deterministically select a quote
  const dailyQuote = useMemo(() => {
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 0);
    const diff = (now.getTime() - start.getTime());
    const oneDay = 1000 * 60 * 60 * 24;
    const dayOfYear = Math.floor(diff / oneDay);
    
    // Use modulo to cycle through all quotes
    const quoteIndex = dayOfYear % quotes.length;
    
    return quotes[quoteIndex];
  }, []);

  return (
    <View style={styles.container}>
      <QuoteCard
        quote={dailyQuote.quote}
        author=""
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
