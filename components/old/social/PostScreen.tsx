import { View, Text, TouchableOpacity, Image, TextInput } from 'react-native';
import styles from '@/utils/testStyles';

export default function PostScreenOld({
  postRef,
  commentsRef,
  isCommentBoxVisible,
  commentText,
  setCommentText,
  isHandlingCreateComment,
  handleCreateComment,
  setIsCommentBoxVisible,
  replyingToCommentId,
  setReplyingToCommentId,
  replyText,
  setReplyText,
  updatePostLikeState,
  handleLikePost,
  handleUnlikePost,
  isHandlingLike,
  isHandlingUnlike
}: {
  postRef: any;
  commentsRef: any;
  isCommentBoxVisible: boolean;
  commentText: string;
  setCommentText: (text: string) => void;
  isHandlingCreateComment: boolean;
  handleCreateComment: (content: string, parentCommentId?: number) => Promise<void>;
  setIsCommentBoxVisible: (visible: boolean) => void;
  replyingToCommentId: number | null;
  setReplyingToCommentId: (id: number | null) => void;
  replyText: string;
  setReplyText: (text: string) => void;
  updatePostLikeState: (liked: boolean) => void;
  handleLikePost: () => Promise<void>;
  handleUnlikePost: () => Promise<void>;
  isHandlingLike: boolean;
  isHandlingUnlike: boolean;
}) {
  return (
    <View>
      <View style={styles.checkbox}>
        <Image source={{ uri: postRef.current?.author.profile_picture }} style={styles.smallImage} />
        <Text style={styles.text}>{postRef.current?.author.first_name} {postRef.current?.author.last_name}</Text>
        <Text style={styles.text}>{postRef.current?.created_at}</Text>
      </View>
      <Image source={{ uri: postRef.current?.mediaUrl }} style={styles.smallImage}/>
      <View style={styles.container}>
        <Text style={styles.text}>{postRef.current?.caption}</Text>
      </View>
      <View>
        <TouchableOpacity 
          style={[styles.button]} 
          onPress={() => {
            const newLikedState = !postRef.current?.liked;
            updatePostLikeState(newLikedState);
            if (newLikedState) {
              handleLikePost();
            } else {
              handleUnlikePost();
            }
          }}
          disabled={isHandlingLike || isHandlingUnlike}
        >
          <Text style={styles.text}>
            {postRef.current?.liked ? 'Unlike' : 'Like'} ({postRef.current?.likeCount})
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.button]} 
          onPress={() => setIsCommentBoxVisible(!isCommentBoxVisible)}
        >
          <Text style={styles.text}>Comments ({commentsRef.current?.length})</Text>
        </TouchableOpacity>

        {isCommentBoxVisible && (
          <View style={styles.checkbox}>
            <TextInput
              style={styles.input}
              value={commentText}
              onChangeText={setCommentText}
              placeholder="Add a comment"
            />
            <TouchableOpacity 
              style={[styles.button, { backgroundColor: commentText.length === 0 ? '#ccc' : '#007bff' }]} 
              onPress={() => {
                handleCreateComment(commentText);
                setIsCommentBoxVisible(false);
              }}
              disabled={isHandlingCreateComment || commentText.length === 0}
            >
              <Text style={styles.text}>Submit</Text>
            </TouchableOpacity>
          </View>
        )}

        {commentsRef.current?.map((comment: any) => (
          <View key={comment.id}>
            {/* Base comment */}
            <View style={styles.checkbox}>
              <Image 
                source={{ uri: comment.user.profile_picture }} 
                style={[styles.smallImage, { marginRight: 10 }]} 
              />
              <View style={{ flex: 1 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Text style={styles.text}>{comment.user.username}</Text>
                  <Text style={[styles.text, { color: '#666' }]}>{comment.created_at}</Text>
                </View>
                <Text style={styles.text}>{comment.content}</Text>
                {!comment.parent_comment_id && (
                  <TouchableOpacity 
                    style={[styles.button, { marginTop: 5 }]}
                    onPress={() => setReplyingToCommentId(replyingToCommentId === comment.id ? null : comment.id)}
                  >
                    <Text style={styles.text}>Reply</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>

            {/* Reply input field */}
            {replyingToCommentId === comment.id && (
              <View style={[styles.checkbox, { marginLeft: 20 }]}>
                <TextInput
                  style={styles.input}
                  value={replyText}
                  onChangeText={setReplyText}
                  placeholder="Add a reply"
                />
                <TouchableOpacity 
                  style={[styles.button, { backgroundColor: replyText.length === 0 ? '#ccc' : '#007bff' }]} 
                  onPress={() => handleCreateComment(replyText, comment.id)}
                  disabled={isHandlingCreateComment || replyText.length === 0}
                >
                  <Text style={styles.text}>Submit Reply</Text>
                </TouchableOpacity>
              </View>
            )}

            {/* Show replies indented */}
            {comment.replies?.map((reply: any) => (
              <View key={reply.id} style={[styles.checkbox, { marginLeft: 20 }]}>
                <Image 
                  source={{ uri: reply.user.profile_picture }} 
                  style={[styles.smallImage, { marginRight: 10 }]} 
                />
                <View style={{ flex: 1 }}>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={styles.text}>{reply.user.username}</Text>
                    <Text style={[styles.text, { color: '#666' }]}>{reply.created_at}</Text>
                  </View>
                  <Text style={styles.text}>{reply.content}</Text>
                </View>
              </View>
            ))}
          </View>
        ))}
      </View>
    </View>
  );
} 