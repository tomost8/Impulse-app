import styles from '@/constants/testStyles';
import { View, Text, TouchableOpacity } from 'react-native';
import { Checkbox } from 'react-native-paper';

export default function AddActivityScreenOld({
    selectedActivities,
    handleSelectActivity,
    handleCreateActivity, 
    isSubmitting,
  }: {
    selectedActivities: string[],
    handleSelectActivity: any,
    handleCreateActivity: any, 
    isSubmitting: boolean,
  }) {
    if (isSubmitting) {
      return <Text>Loading...</Text>;
    }
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Select Activities:</Text>
        <View style={{ flexDirection: 'column', flexWrap: 'wrap', justifyContent: 'space-between' }}>
          {['Food', 'Wellness', 'Working Out', 'Studying / Working', 'Rise and Shine', 'My Passion / Hobby'].map(activity => (
            <TouchableOpacity
              key={activity}
              style={{ flexDirection: 'row', alignItems: 'center', margin: 5, padding: 10, borderWidth: 1, borderColor: '#ccc', borderRadius: 5 }}
              onPress={() => handleSelectActivity(activity)}
            >
              <Checkbox
                status={selectedActivities.includes(activity) ? 'checked' : 'unchecked'}
                onPress={() => handleSelectActivity(activity)}
              />
              <Text style={styles.text}>{activity}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <TouchableOpacity 
          style={styles.button} 
          onPress={() => {
            selectedActivities.forEach(activity => handleCreateActivity(activity)); // Call handleActivityCreation for each selected activity
          }}
        >
          <Text style={styles.text}>Create Activities</Text>
        </TouchableOpacity>
      </View>
    );
  }