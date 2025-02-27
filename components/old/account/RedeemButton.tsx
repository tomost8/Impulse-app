import React from 'react';
import { TouchableOpacity, Text, View, } from 'react-native';
import styles from '@/utils/testStyles';

interface RedeemButtonProps {
    title: string;
    description: string;
    requiredPoints: number;
    spendingPoints: number;
    rewardId: number;
    handleCreateRedeem: (rewardId: number) => void;
    isCreatingRedeem: boolean;
}

const RedeemButton: React.FC<RedeemButtonProps> = ({ 
    spendingPoints, requiredPoints, title, description, rewardId, handleCreateRedeem, isCreatingRedeem 
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
                onPress={() => handleCreateRedeem(rewardId)}
                disabled={isButtonDisabled}
            >
                <Text style={styles.text}>Redeem</Text>
            </TouchableOpacity>
        </View>
    );
};

export default RedeemButton;