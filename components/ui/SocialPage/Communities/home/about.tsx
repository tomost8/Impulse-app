import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

interface AboutProps {
  description: string;
  founderName: string;
  founderBio: string;
  founderImage?: string;
}

const About: React.FC<AboutProps> = ({
  description = "Lorem ipsum dolor sit amet consectetur. Arcu elit mi fringilla pharetra morbi eget ultrices cursus. Habitant ut eu sapien etiam. Tortor lorem eget tincidunt scelerisque.",
  founderName = "Founder Name",
  founderBio = "Lorem ipsum dolor sit amet consectetur. Bibendum vestibulum purus sed gravida aenean. At amet.",
  founderImage,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>About</Text>
      <Text style={styles.description}>{description}</Text>
      
      <View style={styles.founderCard}>
        <Image
          source={founderImage ? { uri: founderImage } : require("@/assets/images/andrew.png")}
          style={styles.founderImage}
        />
        <View style={styles.founderInfo}>
          <Text style={styles.founderName}>{founderName}</Text>
          <Text style={styles.founderBio}>{founderBio}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 15,
    gap: 16,
  },
  title: {
    fontSize: 14,
    fontFamily: 'Poppins',
    fontWeight: '600',
    color: '#000000',
  },
  description: {
    fontSize: 14,
    fontFamily: 'Open Sans',
    color: '#000000',
    lineHeight: 20,
  },
  founderCard: {
    flexDirection: 'row',
    padding: 16,
    gap: 12,
    backgroundColor: '#FFF2F5',
    borderRadius: 10,
    alignItems: 'center',
  },
  founderImage: {
    width: 50,
    height: 50,
    borderRadius: 32,
  },
  founderInfo: {
    flex: 1,
    gap: 6,
  },
  founderName: {
    fontSize: 12,
    fontFamily: 'Poppins',
    fontWeight: '600',
    color: '#000000',
  },
  founderBio: {
    fontSize: 10,
    fontFamily: 'Open Sans',
    color: '#979797',
    lineHeight: 18,
  },
});

export default About;
