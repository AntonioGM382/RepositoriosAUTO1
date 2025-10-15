 // HomeAnimalStyles.js
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    //backgroundColor: '#044389',
    //backgroundColor: '#6ec1f2',
    backgroundColor: '#FFFFFA',
    flex: 1, // Toma todo el espacio disponible en la pantalla
  },

  topContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: '5%'
  },
  midContainer: {
    alignItems: 'center',
    marginTop:'10%'
  },
  
  menuButton: {
    width: 55,
    height: 55,
  },
  menuIcon: {
    width: 35,
    height: 35,
  },
  dropdownMenu: {
    position: 'absolute',
    top: '20%',
    right: '5%',
    backgroundColor: 'white',
    borderRadius: 10,
    elevation: 5, // Sombra en Android
    shadowColor: '#000', // Sombra en iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
  dropdownMenuItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  dropdownMenuItemText: {
    fontSize: 16,
    color: '#303656',
  },

  roundedTopImageDog: {
    height: 225,
    width: 225,
    borderRadius: 180,
    borderWidth: 5,
    borderColor: '#044389',
  },
  roundedTopImageCat: {
    height: 225,
    width: 225,
    borderRadius: 180,
    borderWidth: 5,
    borderColor: '#044389',
  },

  botContainer: {
    backgroundColor: '#0000',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '5%'
  },
  
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
  },

  genderSymbol: {
    fontSize: '30%',
  },

  infoRow: {
    position: 'relative',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1%',
    marginBottom: '5%'
  },
  infoColumn: {
    flex: 1,
    alignItems: 'center',
  },

  infoText: {
    fontSize: 22,
    color: 'black',
    paddingHorizontal: '5%',
    textAlign: 'center',
  },
  icon: {
    width: 30,
    height: 30,
  },
  exclamationIcon: {
    width: 30,
    height: 30,
    position: 'relative',
  },
  weightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },

 buttonGrid: {
  flexDirection: 'column',
  flexWrap: 'wrap',
  justifyContent: 'space-around',
  },
  
  buttonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  detailButtonContainer: {
    borderRadius: 10,
    backgroundColor: '#6EC1F2',
    //backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#044389',
    borderWidth: 2,
    margin: '2%',
    height: 80,
    width: 175,
  },
  detailButtonIcon: {
    width: 30,
    height: 30,
    
  },
  detailButtonText: {
    fontSize: 18,
    color: '#000000',
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
  },
  modalButton: {
    backgroundColor: '#303656',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  modalButtonText: {
    color: 'white',
    fontSize: 16,
  },
  menuModalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  menuModalButton: {
    paddingVertical: 10,
  },
  menuModalButtonText: {
    fontSize: 18,
    color: '#303656',
  },

  cameraButton: {
    top: '-10%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  cameraIcon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  cameraText: {
    fontSize: 50,
    fontWeight: 'bold',
  },
  selectedImage: {
    height: 225,
    width: 225,
    borderRadius: 180,
    borderWidth: 5,
    borderColor: '#044389',
  },
  continueButton: {
    alignItems: 'center',
    marginHorizontal: 40,
    
  },
  continueButtonText: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
    alignItems: 'center',
    marginHorizontal: 40,
    justifyContent: 'center',
    textDecorationLine: 'underline',
  },
  additionalInfoContainer: {
    position: 'absolute',
    top: '200%'
  },
});