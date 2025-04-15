import styles from "@/utils/testStyles";
import { View, Image, TouchableOpacity, Text } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useState, useEffect, useRef, useContext } from 'react';
import { CameraHeaderContext } from './_layout';
import AuthWrapper from '@/components/auth/AuthWrapper';
// GraphQL hooks
// Components
import { debugRenders } from '@/utils/debug';
import SendPhotoModal from "@/components/modals/SendPhotoModal";
import { useUserData } from "@/services/UserPreferencesContext";

import { pageDisplay } from "@/utils/debug";
import PictureTaken from "@/components/screens/camera/SingleLensCamera/pictureTaken";

const DisplayPicturePage = () => {
  const context = useContext(CameraHeaderContext);
  if (!context) return null;
  const { fetching, activities } = useUserData();

  const { id, category, frontPhoto, backPhoto } = useLocalSearchParams();

  const frontImageSource = frontPhoto ? { uri: frontPhoto as string } : null;
  const backImageSource = backPhoto ? { uri: backPhoto as string } : null;

  // Get the main image (prefer front, fallback to back)
  const mainImageSource = frontImageSource || backImageSource;
  const previewImageSource = frontImageSource && backImageSource ? backImageSource : null;

  // Convert image sources to array of URI strings
  const imageSources: string[] = [frontImageSource, backImageSource]
    .filter(Boolean)
    .map(source => source!.uri);

  useEffect(() => {
    context.setPictureTaken(true);
    context.setCategory(category as string);
  }, [category]);

  const [modalVisible, setModalVisible] = useState(false);
  const [modalTab, setModalTab] = useState<string>("activity");

  useEffect(() => {
    if (id && category) {
      setModalTab("closed");
    } else {
      setModalTab("activity");
    }
  }, [id, category]);

  const showModal = () => setModalVisible(true);
  const hideModal = () => setModalVisible(false);

  // Debug
  const loading = fetching;
  if (debugRenders && !loading) {
    console.log("Rendering DisplayPicturePage\n",
      "Activities:", activities, "\n",
      "Modal Tab:", modalTab, "\n",
      "Front Image Source:", frontImageSource, "\n",
      "Back Image Source:", backImageSource, "\n",
    );
  }

  if (pageDisplay) {
    return <PictureTaken />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        {/* Main large image */}
        {mainImageSource && (
          <Image 
            source={mainImageSource} 
            style={styles.mainImage} 
          />
        )}
        {/* Only show preview if we have a preview image */}
        {previewImageSource && (
          <View style={styles.previewContainer}>
            <Image 
              source={previewImageSource} 
              style={styles.previewImage} 
            />
          </View>
        )}
      </View>

      {modalTab === "activity" ? (
        <TouchableOpacity style={styles.button} onPress={showModal}>
          <Text style={styles.text}>Select Daily Goal</Text>
        </TouchableOpacity>
      ) : (
        <View>
          <TouchableOpacity style={styles.button} onPress={() => {
            setModalTab("caption");
            showModal();
          }}>
            <Text style={styles.text}>Add Caption</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => {
            setModalTab("users");
            showModal();
          }}>
            <Text style={styles.text}>Select Users</Text>
          </TouchableOpacity>
        </View>
      )}
      <SendPhotoModal 
        visible={modalVisible} 
        hideModal={hideModal} 
        currentTab={modalTab}
        setCurrentTab={setModalTab}
        activitiesList={activities || []}
        imageSources={imageSources}
      />
    </View>
  );
}

export default AuthWrapper(DisplayPicturePage);