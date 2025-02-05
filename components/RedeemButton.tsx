import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import styles from '@/constants/testStyles';
import { useMutation } from '@apollo/client';
import { REDEEM_REWARD } from '@/hooks/graphql/constants/rewards';

interface RedeemButtonProps {
    title: string;
    description: string;
    requiredPoints: number;
    spendingPoints: number;
    userId: number;
    rewardId: number;
}

const RedeemButton: React.FC<RedeemButtonProps> = ({ spendingPoints, requiredPoints, title, description, userId, rewardId }) => {
    const isButtonDisabled = spendingPoints < requiredPoints;

    const [redeemReward] = useMutation(REDEEM_REWARD, {
        onCompleted: (data) => {
            console.log('Redemption successful:', data);
        },
        onError: (error) => {
            console.error('Redemption failed:', error);
        }
    });

    const handlePress = () => {
        if (!isButtonDisabled) {
            redeemReward({ variables: { input: { user_id: userId, reward_id: rewardId } } });
        }
    };

    return (
        <View>
            <Text style={styles.text}>{requiredPoints} Reward Points Redemption</Text>
            <Text style={styles.text}>{description} {title}</Text>
            <TouchableOpacity 
            style={[styles.button, isButtonDisabled && { opacity: 0.5 }]}
            onPress={handlePress}
            disabled={isButtonDisabled}
        >
            <Text style={styles.text}>Redeem</Text>
        </TouchableOpacity>
        </View>
    );
};

export default RedeemButton;