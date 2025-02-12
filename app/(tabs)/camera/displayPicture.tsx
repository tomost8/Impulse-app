import styles from "@/constants/testStyles";
import { View, Image, TouchableOpacity, Text } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useState, useEffect, useRef, useContext } from 'react';
import { HeaderContext } from './_layout';
import AuthWrapper from '@/components/auth/AuthWrapper';
// GraphQL hooks
import { useGetActivities } from "@/hooks/graphql/activities/queries";
import { useGetFriends } from "@/hooks/graphql/friends/queries";
import { useGetUserChats } from "@/hooks/graphql/chats/queries";
import { useGetUserCommunities } from "@/hooks/graphql/communities/queries";
// Components
import { debugRenders } from '@/constants/debug';
import SendPhotoModal from "@/components/modals/SendPhotoModal";

const DisplayPicturePage = (props: any) => {
    const context = useContext(HeaderContext);
    if (!context) return null;

    const { photo, id, category } = useLocalSearchParams();
    const imageSource = photo ? { uri: photo as string } : require('@/assets/images/favicon.png');

    useEffect(() => {
        context.setPictureTaken(true);
        context.setCategory(category as string);
    }, [category]);

    const { userId, authToken } = props;
    const [renderCounter, setRenderCounter] = useState(0);

    const activitiesRef = useRef<any[] | null>(null);
    const hasFetchedActivities = useRef(false);
    const { activities, fetched: hasNewActivitiesData } = useGetActivities(userId as number, authToken, !hasFetchedActivities.current);

    useEffect(() => {
        if (!hasNewActivitiesData) {
            return;
        }
        if (hasNewActivitiesData) {
            activitiesRef.current = activities;
            hasFetchedActivities.current = true;
        }
        if (hasFetchedActivities.current) {
            setRenderCounter(prev => prev + 1);
        }
    }, [hasNewActivitiesData]);

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
    const loading = !hasFetchedActivities.current; 
    if (debugRenders && !loading) {
        console.log("Rendering DisplayPicturePage\n",
            "Activities:", activitiesRef.current, "\n",
            "Modal Tab:", modalTab, "\n",
            "Render Counter:", renderCounter, "\n",
        );
    }

    return (
        <View style={styles.container}>
            <Image source={imageSource} style={styles.image} />
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
                setSelectedCategory={context.setCategory}
                activities={activitiesRef.current || []} // Need activity ID in form data
                imageSource={imageSource} // Need image source in form data
            />
        </View>
    );
}

export default AuthWrapper(DisplayPicturePage);