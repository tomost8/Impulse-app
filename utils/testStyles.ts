import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'white'
  },
  button: {
    backgroundColor: '#007BFF', 
    padding: 10, // Button padding
    borderRadius: 5, // Rounded corners
    marginVertical: 10, // Space between buttons
  },
  todoText: {
    color: 'yellow', 
    fontStyle: 'italic', 
  },
  error: {
    color: '#ff6b6b',
    textAlign: 'center',
  },
  input: {
    color: 'white',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
  },
  section: {
    padding: 20,
    marginVertical: 10,
    backgroundColor: '#333', // Optional: adds visual separation between sections
    borderRadius: 8,
  },
  modal: {
    backgroundColor: 'gray',
    padding: 20,
    margin: 20,
    borderRadius: 8,
  },
  image: {
    width: 300, // Set your desired width
    height: 300, // Set your desired height
    resizeMode: 'contain', // Adjust the image to fit within the specified dimensions
    borderRadius: 10, // Optional: rounded corners for the image
    borderWidth: 2, // Optional: border around the image
    borderColor: '#ccc', // Optional: border color
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    justifyContent: 'space-between',
  },
  checkbox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  //image picker
  profileImageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  profileImagePlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#e1e1e1',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImagePlaceholderText: {
    color: '#666',
    fontSize: 14,
  },
  //image
  smallImage: { 
    width: 100,
    height: 100,
    resizeMode: 'contain',
    borderWidth: 1,
    borderColor: '#ccc',
  },
  imageContainer: {
    flex: 1,
    position: 'relative',
    width: '100%',
  },
  mainImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  previewContainer: {
    position: 'absolute',
    top: 20,
    right: 20,
    width: '30%',
    aspectRatio: 3/4,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#fff',
    overflow: 'hidden',
  },
  previewImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
});

export default styles; 