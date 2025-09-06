import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet,
  Image
} from 'react-native';

interface BioProps {
  bioText: string;
  primaryActivity: string;
  secondaryActivity: string;
  gender: string;
  timezone: string;
}

const Bio: React.FC<BioProps> = ({
  bioText,
  primaryActivity,
  secondaryActivity,
  gender,
  timezone
}) => {
  return (
    <View style={styles.container}>
      {/* Bio Text */}
      <Text style={styles.bioText}>{bioText}</Text>

      {/* What I'm Working On Section */}
      <Text style={styles.sectionTitle}>What I'm Working On</Text>
      <View style={styles.activitiesContainer}>
        <View style={styles.activityRow}>
          <Image 
            source={require('@/assets/icons/workout.png')}
            style={styles.activityIcon}
          />
          <Text style={styles.activityText}>
            {primaryActivity} <Text style={styles.activityLabel}>(Primary)</Text>
          </Text>
        </View>
        <View style={styles.activityRow}>
          <Image 
            source={require('@/assets/icons/riseshine.png')}
            style={styles.activityIcon}
          />
          <Text style={styles.activityText}>
            {secondaryActivity} <Text style={styles.activityLabel}>(Secondary)</Text>
          </Text>
        </View>
      </View>

      {/* Gender and Timezone */}
      <View style={styles.infoContainer}>
        <View style={styles.infoColumn}>
          <Text style={styles.infoLabel}>Gender</Text>
          <Text style={styles.infoValue}>{gender}</Text>
        </View>
        <View style={styles.infoColumn}>
          <Text style={styles.infoLabel}>Timezone</Text>
          <Text style={styles.infoValue}>{timezone}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingHorizontal: 24,
  },
  bioText: {
    fontSize: 16,
    fontFamily: 'Open Sans',
    color: '#242020',
    lineHeight: 22,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: 'Poppins',
    fontWeight: '600',
    color: '#000000',
    marginBottom: 16,
  },
  activitiesContainer: {
    gap: 12,
    marginBottom: 24,
  },
  activityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  activityIcon: {
    width: 34,
    height: 34,
    resizeMode: 'contain',
    borderRadius: 20,

  },
  activityText: {
    fontSize: 16,
    fontFamily: 'Open Sans',
    color: '#242020',
  },
  activityLabel: {
    color: '#979797',
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 55,
  },
  infoColumn: {
    alignItems: 'center',
  },
  infoLabel: {
    fontSize: 16,
    fontFamily: 'Poppins',
    fontWeight: '600',
    color: '#000000',
    marginBottom: 8,
  },
  infoValue: {
    fontSize: 14,
    fontFamily: 'Open Sans',
    color: '#242020',
  },
});

export default Bio;
