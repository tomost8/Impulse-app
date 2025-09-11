import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';

interface CommentInputProps {
  onSubmit?: (comment: string) => void;
  placeholder?: string;
}

const CommentInput: React.FC<CommentInputProps> = ({ 
  onSubmit,
  placeholder = "Type comment..." 
}) => {
  const [comment, setComment] = useState('');

  const handleSubmit = () => {
    if (comment.trim()) {
      onSubmit?.(comment);
      setComment('');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="#A9A9A9"
        value={comment}
        onChangeText={setComment}
        multiline={false}
        returnKeyType="send"
        onSubmitEditing={handleSubmit}
      />
      <TouchableOpacity 
        style={styles.sendButton} 
        onPress={handleSubmit}
        disabled={!comment.trim()}
      >
        <Image 
          source={require("@/assets/icons/Sent.png")}
          style={[
            styles.sendIcon,
            !comment.trim() && styles.sendIconDisabled
          ]}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 20,
    borderTopWidth: 1,
    borderTopColor: '#E1E1E1',
    backgroundColor: '#FFFFFF',
  },
  input: {
    flex: 1,
    height: 40,
    backgroundColor: '#F5F5F5',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    fontSize: 14,
    fontFamily: 'Open Sans',
    color: '#000000',
    marginRight: 12,
  },
  sendButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
    tintColor: '#DE728D',
  },
  sendIconDisabled: {
    tintColor: '#CCCCCC',
  },
});

export default CommentInput;
