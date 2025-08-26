import { router, useLocalSearchParams } from 'expo-router';
import {useState, useEffect, useRef} from 'react';
import AuthWrapper from '@/contexts/AuthWrapper';
// Services
import { useAuth } from '@/contexts/AuthContext';
import { processAndUploadImage } from '@/utils/imageProcessing';
// GraphQL hooks
import { useGetCommunity, useGetCommunityCategories } from '@/hooks/graphql/communities/queries';
import { useUpdateCommunity, useCreateCommunityCategory, useDeleteCommunityCategory } from '@/hooks/graphql/communities/mutations';
// Components
import EditCommunityScreen from '@/components/screens/social/communities/editcommunityscreen';
// Debug
import { debugEditCommunityPage } from '@/debug/utils';

const EditCommunityPage = () => {
 const { id } = useLocalSearchParams(); // communityId 
 const [renderCounter, setRenderCounter] = useState(0);

 // Queries
 const communityRef = useRef<any | null>(null);
 const hasFetchedCommunity = useRef(false);
 const { community, fetched: hasNewCommunityData } = useGetCommunity(Number(id), !hasFetchedCommunity.current);

 const categoriesRef = useRef<any[] | null>(null);
 const hasFetchedCommunityCategories = useRef(false);
 const { communityCategories, fetched: hasNewCommunityCategoriesData } = useGetCommunityCategories(Number(id), !hasFetchedCommunityCategories.current);

 useEffect(() => {
   if (!hasNewCommunityData && !hasNewCommunityCategoriesData) {
     return;
   }
   if (hasNewCommunityData) {
      const communityInfo = {
        name: community.name,
        description: community.description,
        thumbnail: community.thumbnail,
        code: community.code
      }
     communityRef.current = communityInfo;
     hasFetchedCommunity.current = true;
     setFormData(communityInfo);
   }
   if (hasNewCommunityCategoriesData) {
     const categoryLabels = communityCategories.map((categoryObj: any) => categoryObj.category);
     categoriesRef.current = categoryLabels;
     setSelectedCategories(categoryLabels);
     hasFetchedCommunityCategories.current = true;
   }
   if (hasFetchedCommunity.current && hasFetchedCommunityCategories.current) {
     setRenderCounter(prev => prev + 1);
   }
 }, [hasNewCommunityData, hasNewCommunityCategoriesData]);

 // Mutations
 const {updateCommunity} = useUpdateCommunity();
 const {createCommunityCategory} = useCreateCommunityCategory();
 const {deleteCommunityCategory} = useDeleteCommunityCategory();
 const [isUpdatingCommunity, setIsUpdatingCommunity] = useState(false);
 const handleUpdateCommunity = async () => {
    setIsUpdatingCommunity(true);
    try {
      // Update Community: upload new thumbnail if it exists
      const hasNewThumbnail = formData.thumbnail && formData.thumbnail !== communityRef.current?.thumbnail;
      const thumbnail = hasNewThumbnail
        ? await processAndUploadImage(formData.thumbnail)
        : null;
      const input = {
        name: formData.name || communityRef.current?.name,
        description: formData.description,
        code: formData.code,
        ...(thumbnail && { thumbnail })
      }
      
      const response = await updateCommunity(Number(id), input);
      if (response.success) {
        console.log("Community updated:", input.name, "- Description:", input.description, "- Has new thumbnail:", !!thumbnail);
      } else {
        throw new Error("Response.success from updateCommunity was false: " + response.errors);
      }

      // Update categories: toAdd
      const toAdd = selectedCategories.filter(category => !categoriesRef.current?.includes(category));  
      for (const category of toAdd) {
        const input_category_add = {
          community_id: Number(id),
          category: category
        }
        const categoryResponse = await createCommunityCategory(input_category_add);
        if (categoryResponse.success) {
          console.log("Category added:", category);
        } else {
          throw new Error("Response.success from createCommunityCategory was false:" + categoryResponse.errors);
        }
      }

      // Update categories: toDelete
      const toDelete = categoriesRef.current?.filter(category => !selectedCategories.includes(category)) || [];
      for (const category of toDelete) {
        const categoryResponse = await deleteCommunityCategory(category, Number(id));
        if (categoryResponse.success) {
          console.log("Category deleted:", category);
        } else {
          throw new Error("Response.success from deleteCommunityCategory was false:" + categoryResponse.errors);
        }
      }
      
      router.back();
    } catch (error) {
      console.error("Error updating community:", error);
    } finally {
      setIsUpdatingCommunity(false);
    }
  }

  // Form Data
 const [formData, setFormData] = useState({
  name: '',
  description: '',
  thumbnail: '',
  code: ''
 });

 const handleFormDataChange = (field: string, value: string) => {
  setFormData((prevData) => ({
    ...prevData,
    [field]: value,
  }));
 };

 const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

 const handleCategoryToggle = (categoryId: string) => {
  setSelectedCategories(prev => 
    prev.includes(categoryId) 
      ? prev.filter(id => id !== categoryId)
      : [...prev, categoryId]
  );
};

 // Debug
 const loadingData = !hasFetchedCommunity.current || !hasFetchedCommunityCategories.current || isUpdatingCommunity;
 if (debugEditCommunityPage && !loadingData) {
  const community = communityRef.current;
  const categories = categoriesRef.current || [];
  const categoryList = categories.length > 0 ? categories.join(', ') : 'None';
  console.log(`📱 Rendering EditCommunityPage - ID: ${id}, Name: ${community?.name}, Description: ${community?.description}, Code: ${community?.code}, Categories: ${categories.length}\n  Categories: ${categoryList}`);
 }

  return (
    <EditCommunityScreen
      loading={loadingData}
      formData={formData}
      handleFormDataChange={handleFormDataChange}
      selectedCategories={selectedCategories}
      handleToggleCategory={handleCategoryToggle}
      handleUpdateCommunity={handleUpdateCommunity}
    />
  );
};

export default AuthWrapper(EditCommunityPage);