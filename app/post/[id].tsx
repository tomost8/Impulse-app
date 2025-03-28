import { useLocalSearchParams } from 'expo-router';

import {useState, useEffect, useRef} from 'react';
import AuthWrapper from '@/components/auth/AuthWrapper';
// GraphQL hooks
import { useGetPost, useGetPostComments } from '@/hooks/graphql/posts/queries';
import { useCreateComment, useLikePost, useUnlikePost } from '@/hooks/graphql/posts/mutations';
// Components
import PostScreen from '@/components/screens/social/post';
import PostScreenOld from '@/components/old/social/PostScreen';
// Debug
import { pageDisplay, debugRenders } from '@/utils/debug';

const PostPage = (props: any) => {
  const { id, isLiked } = useLocalSearchParams(); // postId
  const { userId, authToken } = props;
  const [renderCounter, setRenderCounter] = useState(0);

  // Queries for Loading State
  const postRef = useRef<any | null>(null);
  const hasFetchedPost = useRef(false);
  const { post, fetched: hasNewPostData } = useGetPost(Number(id), !hasFetchedPost.current);

  const commentsRef = useRef<any | null>(null);
  const hasFetchedComments = useRef(false);
  const { comments, fetched: hasNewCommentsData } = useGetPostComments(Number(id), !hasFetchedComments.current); // something wrong with profile_picture

  useEffect(() => {
    if (!hasNewPostData && !hasNewCommentsData) {
      return;
    }
    if (hasNewPostData) {
      postRef.current = {
        ...post,
        liked: isLiked === 'true' // Convert string param to boolean
      };
      hasFetchedPost.current = true;
    }
    if (hasNewCommentsData) {
      commentsRef.current = comments;
      hasFetchedComments.current = true;
    }
    if (hasFetchedPost.current && hasFetchedComments.current) {
      setRenderCounter(prev => prev + 1);
    }
  }, [hasNewPostData, hasNewCommentsData, isLiked]);

  // Add like/unlike mutations
  const { likePost } = useLikePost();
  const { unlikePost } = useUnlikePost();
  const [isHandlingLike, setIsHandlingLike] = useState(false);
  const [isHandlingUnlike, setIsHandlingUnlike] = useState(false);

  // Add function to update local post state
  const updatePostLikeState = (liked: boolean) => {
    if (postRef.current) {
      postRef.current = {
        ...postRef.current,
        liked: liked,
        likeCount: liked ? postRef.current.likeCount + 1 : postRef.current.likeCount - 1
      };
      setRenderCounter(prev => prev + 1);
    }
  };

  // Add like/unlike handlers
  const handleLikePost = async () => {
    setIsHandlingLike(true);
    try {
      await likePost(Number(id), authToken);
      // No need to refetch - state already updated optimistically
    } catch (error) {
      console.error("Error liking post:", error);
      // Revert optimistic update on error
      updatePostLikeState(false);
    } finally {
      setIsHandlingLike(false);
    }
  }

  const handleUnlikePost = async () => {
    setIsHandlingUnlike(true);
    try {
      await unlikePost(Number(id), authToken);
      // No need to refetch - state already updated optimistically
    } catch (error) {
      console.error("Error unliking post:", error);
      // Revert optimistic update on error
      updatePostLikeState(true);
    } finally {
      setIsHandlingUnlike(false);
    }
  }

  // Add comment mutation
  const { createComment } = useCreateComment();
  const [isHandlingCreateComment, setIsHandlingCreateComment] = useState(false);
  const [replyingToCommentId, setReplyingToCommentId] = useState<number | null>(null);
  const [replyText, setReplyText] = useState('');

  const handleCreateComment = async (content: string, parentCommentId?: number) => {
    setIsHandlingCreateComment(true);
    try {
      const input = {
        post_id: Number(id),
        content: content,
        parent_comment_id: parentCommentId || null
      }
      const response = await createComment(input, authToken);
      console.log("Response:", response);
      // Clear input and hide reply field on success
      if (parentCommentId) {
        setReplyText('');
        setReplyingToCommentId(null);
      } else {
        setCommentText('');
      }
    } catch (error) {
      console.error("Error creating comment:", error);
    } finally {
      setIsHandlingCreateComment(false);
    }
  }

  const [commentText, setCommentText] = useState('');
  const [isCommentBoxVisible, setIsCommentBoxVisible] = useState(false);

  // Debug
  const loading = !hasFetchedPost.current || !hasFetchedComments.current;
  if (debugRenders && !loading) {
    console.log("Rendering PostPage\n",
      "Post:", postRef.current, "\n",
      "Comments:", commentsRef.current, "\n",
      "Render Counter:", renderCounter, "\n",
    );
  }

  if (pageDisplay) {
    return (
      <PostScreen
        loading={loading}
        post={postRef.current}
        comments={commentsRef.current}
        createComment={handleCreateComment}
      />
    );
  } else {
    return (
      <PostScreenOld
        postRef={postRef}
        commentsRef={commentsRef}
        isCommentBoxVisible={isCommentBoxVisible}
        commentText={commentText}
        setCommentText={setCommentText}
        isHandlingCreateComment={isHandlingCreateComment}
        handleCreateComment={handleCreateComment}
        setIsCommentBoxVisible={setIsCommentBoxVisible}
        replyingToCommentId={replyingToCommentId}
        setReplyingToCommentId={setReplyingToCommentId}
        replyText={replyText}
        setReplyText={setReplyText}
        updatePostLikeState={updatePostLikeState}
        handleLikePost={handleLikePost}
        handleUnlikePost={handleUnlikePost}
        isHandlingLike={isHandlingLike}
        isHandlingUnlike={isHandlingUnlike}
      />
    );
  }
}

export default AuthWrapper(PostPage);