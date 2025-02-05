import React from 'react';
import { TouchableOpacity, Text, View, } from 'react-native';
import styles from '@/constants/testStyles';

interface RedeemButtonProps {
    title: string;
    description: string;
    requiredPoints: number;
    spendingPoints: number;
    rewardId: number;
    onRedeemComplete: (rewardId: number) => void;
}

const RedeemButton: React.FC<RedeemButtonProps> = ({ 
    spendingPoints, requiredPoints, title, description, rewardId, onRedeemComplete 
}) => {
    const isButtonDisabled = spendingPoints < requiredPoints;

    return (
        <View>
            <Text style={styles.text}>{requiredPoints} Reward Points Redemption</Text>
            <Text style={styles.text}>{description} {title}</Text>
            <TouchableOpacity 
                style={[
                    styles.button, 
                    isButtonDisabled && { opacity: 0.5 }
                ]}
                onPress={() => onRedeemComplete(rewardId)}
                disabled={isButtonDisabled}
            >
                <Text style={styles.text}>Redeem</Text>
            </TouchableOpacity>
        </View>
    );
};

export default RedeemButton;