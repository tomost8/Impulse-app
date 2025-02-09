import { View, Text, TouchableOpacity } from 'react-native';
import { Modal, Portal, Checkbox } from 'react-native-paper';
import styles from '@/constants/testStyles';
import { useState } from 'react';

interface SendPhotoModalProps {
    visible: boolean;
    hideModal: () => void;
    currentTab: string;
    setCurrentTab: (tab: string) => void;
    setSelectedCategory: (category: string) => void;
    activities: any[];
}

export default function SendPhotoModal({ visible, hideModal, currentTab, setCurrentTab, setSelectedCategory, activities }: SendPhotoModalProps) {
    const [selectedActivities, setSelectedActivities] = useState<string[]>([]);
  
    const toggleActivity = (activity: string) => {
      setSelectedActivities([activity]);
    };
  
    return (
      <Portal>
        <Modal visible={visible} onDismiss={hideModal} style={styles.container}>
          {currentTab === "activity" && (
            <View style={styles.modal}>
              <Text style={styles.text}>Send Photo Modal - Activity</Text>
              {activities.filter(activity => activity.status === "pending").map((activity: any) => (
                <View key={activity.id}>
                  <Checkbox
                    status={selectedActivities[0] === activity.id ? 'checked' : 'unchecked'}
                    onPress={() => {
                      toggleActivity(activity.id);
                      setSelectedCategory(activity.category);
                    }}
                  />
                  <Text style={styles.text}>{activity.category}</Text>
                </View>
              ))}
              <TouchableOpacity style={styles.button} onPress={() => { 
                setCurrentTab("closed"); 
                hideModal(); 
              }}>
                <Text style={styles.text}>Next</Text>
              </TouchableOpacity>
            </View>
          )}
          {currentTab === "caption" && (
            <View style={styles.modal}>
              <Text style={styles.text}>Send Photo Modal - Caption</Text>
              <TouchableOpacity style={styles.button} onPress={hideModal}>
                <Text style={styles.text}>Close</Text>
              </TouchableOpacity>
            </View>
          )}
          {currentTab === "users" && (
            <View style={styles.modal}>
              <Text style={styles.text}>Send Photo Modal - Users</Text>
              <TouchableOpacity style={styles.button} onPress={hideModal}>
                <Text style={styles.text}>Close</Text>
              </TouchableOpacity>
            </View>
          )}
          {currentTab !== "activity" && currentTab !== "caption" && currentTab !== "users" && (
            <View style={styles.modal}>
              <Text style={styles.text}>The modal should be closed!</Text>
              <TouchableOpacity style={styles.button} onPress={hideModal}>
                <Text style={styles.text}>Close</Text>
              </TouchableOpacity>
            </View>
          )}
        </Modal>
      </Portal>
    );
  }