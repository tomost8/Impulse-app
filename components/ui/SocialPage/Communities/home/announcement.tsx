import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface AnnouncementProps {
  announcement?: string;
  onViewAll?: () => void;
  onMakeAnnouncement?: () => void;
}

const Announcement: React.FC<AnnouncementProps> = ({
  announcement = "Lorem ipsum dolor sit amet consectetur. Natoque quisque lobortis nullam hendrerit. Parturient euismod etiam luctus pharetra erat scelerisque. Mus a orci ut platea rhoncus orci mi dui cursus. Quis viverra sit.",
  onViewAll,
  onMakeAnnouncement,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Recent Announcement</Text>
        <TouchableOpacity onPress={onViewAll}>
          <Text style={styles.viewAllText}>View All</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.announcementCard}>
        <Text style={styles.announcementText}>{announcement}</Text>
      </View>

      <TouchableOpacity 
        style={styles.makeAnnouncementButton}
        onPress={onMakeAnnouncement}
      >
        <Text style={styles.makeAnnouncementText}>Make an announcement</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 20,
    gap: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 14,
    fontFamily: 'Poppins',
    fontWeight: '600',
    color: '#000000',
  },
  viewAllText: {
    fontSize: 12,
    fontFamily: 'Open Sans',
    color: '#DE728D',
  },
  announcementCard: {
    padding: 16,
    borderWidth: 1,
    borderColor: '#DE728D',
    borderRadius: 10,
  },
  announcementText: {
    fontSize: 12,
    fontFamily: 'Open Sans',
    color: '#000000',
    lineHeight: 18,
  },
  makeAnnouncementButton: {
    borderWidth: 1,
    borderColor: '#DE728D',
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
  },
  makeAnnouncementText: {
    fontSize: 12,
    fontFamily: 'Open Sans',
    color: '#DE728D',
    fontWeight: '600',
  },
});

export default Announcement;
