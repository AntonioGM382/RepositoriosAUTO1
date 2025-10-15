import { StyleSheet } from 'react-native';
export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'FFFFFA', // or any color that matches the first picture
    },
    addButton: {
      padding: 10,
      backgroundColor: '#007AFF', // Adjust color to match the button in the first picture
      alignItems: 'center',
    },
    addButton: {
      position: 'absolute', // Position the button absolutely
      bottom: 30, // Distance from the bottom of the screen
      left: 0,
      right: 0,
      backgroundColor: '#007AFF',
      padding: 12,
      margin: 10,
      borderRadius: 20,
      alignItems: 'center',
      justifyContent: 'center', // Center the text inside the button
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    addButtonText: {
      color: 'white',
      fontSize: 18,
      fontWeight: '600',
    },
    noMedicationsText: {
        textAlign: 'center',
        marginTop: 20,
        fontSize: 18,
    },
    headerContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: 10,
      backgroundColor: '#303656', // Adjust color to match the headers in the first picture
    },
    header: {
      fontSize: 14,
      fontWeight: 'bold',
      color: '#ffffff',
      textAlign: 'center',
      paddingVertical: 5,
      marginLeft: -5,
      flex: 1, // Equal width for all headers
    },
    medicationItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: 10,
      borderBottomWidth: 1,
      borderColor: '#C6C6C8',
    },
    medicationName: {
      flex: 3, // Give more space to the name column
      fontSize: 16,
      color: 'black',
    },
    medicationText: {
      flex: 2, // Give more space to the dose column, allow wrapping
      fontSize: 16,
      color: 'black',
      marginLeft: -10, // Add some margin to the left for spacing
      marginRight: 30, // Add some margin to the right for spacing
    },
    medicationExpiryDate: {
      flex: 2, // Assign space for the expiry date column
      fontSize: 16,
      color: 'black', 
    },
    searchBar: {
      fontSize: 16,
      borderColor: '#C6C6C8',
      borderWidth: 1,
      padding: 10,
      borderRadius: 10,
      margin: 10,
      marginBottom: 0, // Remove bottom margin to align with the header
      color: 'black',
    },
    expiredItem: {
      opacity: 0.5, // Style for expired items, adjust as needed
    },
    searchContainer: {
      flexDirection: 'row', // Align items in a row
      paddingHorizontal: 10,
      paddingTop: 5, // Reduced vertical padding
      backgroundColor: '#FFFFFF',
      alignItems: 'center', // Center items vertically
    },
    searchBar: {
      height: 30, // Reduced height
      fontSize: 14, // Adjust font size accordingly
      borderColor: '#007AFF',
      borderWidth: 1,
      paddingHorizontal: 8, // Adjust padding to match the filter button height
      borderRadius: 15, // Fully rounded corners
      flex: 1, // Flex to take available space
      marginRight: 5, // Spacing between search bar and filter buttons
      backgroundColor: '#F0F0F7',
    },
    segmentedControlContainer: {
      flexDirection: 'row',
      backgroundColor: '#FFFFFF',
      borderRadius: 15,
      borderWidth: 1,
      borderColor: '#007AFF',
      height: 3, // Slim height
      flex: 1, // Flex to take available space next to search bar
      alignSelf: 'center', // Align the container to the center
    },
    segmentedControlButton: {
      justifyContent: 'center',
      borderRadius: 15,
      paddingVertical: 6,
      alignItems: 'center',
      backgroundColor: 'transparent',
      flex: 1, // Allow buttons to grow equally
    },
    segmentedControlContainer: {
      flexDirection: 'row',
      margin: 10,
      borderRadius: 25,
      borderWidth: 1,
      borderColor: '#007AFF',
      backgroundColor: '#FFFFFF',
      overflow: 'hidden', // This is to ensure the borderRadius is respected
    },
    segmentedControlButtonActive: {
      backgroundColor: '#007AFF',
    },
    segmentedControlButtonText: {
      fontSize: 14,
      color: 'black',
      textAlign: 'center',
    },
    segmentedControlButtonTextActive: {
      color: 'white',
    },
  });