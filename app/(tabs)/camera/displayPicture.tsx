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

    const friendsRef = useRef<any[] | null>(null);
    const hasFetchedFriends = useRef(false);
    const { friends, fetched: hasNewFriendsData } = useGetFriends(userId as number, !hasFetchedFriends.current);

    const groupsRef = useRef<any[] | null>(null);
    const hasFetchedGroups = useRef(false);
    const { chatMembers, fetched: hasNewGroupsData } = useGetUserChats(userId as number, !hasFetchedGroups.current);

    const communitiesRef = useRef<any[] | null>(null);
    const hasFetchedCommunities = useRef(false);
    const { communityMembers, fetched: hasNewCommunitiesData } = useGetUserCommunities(userId as number, !hasFetchedCommunities.current);

    useEffect(() => {
        if (!hasNewActivitiesData && !hasNewFriendsData && !hasNewGroupsData && !hasNewCommunitiesData) {
            return;
        }
        if (hasNewActivitiesData) {
            activitiesRef.current = activities;
            hasFetchedActivities.current = true;
        }
        if (hasNewFriendsData) {
            friendsRef.current = friends;
            hasFetchedFriends.current = true;
        }
        if (hasNewGroupsData) {
            groupsRef.current = chatMembers;
            hasFetchedGroups.current = true;
        }
        if (hasNewCommunitiesData) {
            communitiesRef.current = communityMembers;
            hasFetchedCommunities.current = true;
        }
        if (hasFetchedActivities.current && hasFetchedFriends.current && hasFetchedGroups.current && hasFetchedCommunities.current) {
            setRenderCounter(prev => prev + 1);
        }
    }, [hasNewActivitiesData, hasNewFriendsData, hasNewGroupsData, hasNewCommunitiesData]);

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
    const loading = !hasFetchedActivities.current || !hasFetchedFriends.current || !hasFetchedGroups.current || !hasFetchedCommunities.current; 
    if (debugRenders && !loading) {
        console.log("Rendering SendPicturePage\n",
            "Activities:", activitiesRef.current, "\n",
            "Friends:", friendsRef.current, "\n",
            "Groups:", groupsRef.current, "\n",
            "Communities:", communitiesRef.current, "\n",
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
                activities={activitiesRef.current || []}
            />
        </View>
    );
}

export default AuthWrapper(DisplayPicturePage);