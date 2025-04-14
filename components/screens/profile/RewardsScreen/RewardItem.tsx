import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { s } from "react-native-size-matters";

interface RewardItemProps {
  title: string;
  points: string;
  isRedeemable: boolean;
  onRedeem: () => void;
}

function RewardItem({ title, points, isRedeemable, onRedeem }: RewardItemProps) {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text
          style={styles.title}
          accessibilityRole="header"
        >
          {title}
        </Text>
        <Text style={styles.points}>{points}</Text>
      </View>
      <TouchableOpacity
        style={[
          styles.redeemButton,
          !isRedeemable && styles.redeemButtonDisabled,
        ]}
        disabled={!isRedeemable}
        accessibilityRole="button"
        accessibilityLabel={`Redeem ${title}`}
        accessibilityState={{ disabled: !isRedeemable }}
        accessibilityHint={
          isRedeemable
            ? "Tap to redeem this reward"
            : "This reward is not currently redeemable"
        }
        onPress={onRedeem}
      >
        <Text style={styles.redeemButtonText}>Redeem</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: s(12),
    marginBottom: s(20),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 15,
    elevation: 2,
  },
  content: {
    minHeight: s(54),
  },
  title: {
    color: '#242020',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Open Sans',
  },
  points: {
    color: '#000000',
    fontSize: 14,
    fontFamily: 'Open Sans',
    marginTop: s(8),
  },
  redeemButton: {
    alignSelf: 'center',
    borderRadius: 30,
    marginTop: 5,
    height: s(35),
    width: '100%',
    backgroundColor: '#DE728D',
    justifyContent: 'center',
    alignItems: 'center',
  },
  redeemButtonDisabled: {
    backgroundColor: 'rgba(222, 114, 141, 0.5)',
  },
  redeemButtonText: {
    fontFamily: 'Poppins',
    fontSize: 15,
    color: '#FFFFFF',
    fontWeight: '600',
  },
});

export default RewardItem;
