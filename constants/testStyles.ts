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
});

export default styles; 