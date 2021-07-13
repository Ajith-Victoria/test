import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  loginForm: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    flex: 1,
    // alignItems: 'center',
    paddingLeft: 20,
    justifyContent: 'center'
  },
  RegisterProductView: {
    // height: 320,
    width: '45%',
    paddingVertical: 35,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 6,
    borderColor: '#c8ccd0',
    borderTopColor: '#c8ccd0',
    borderWidth: 1,
    elevation: 4,
    borderRadius: 15,
    backgroundColor: '#efeff1',
    padding: 20,
    marginTop: 20,
    alignItems: 'center'
  },
  leftView: {
    width: '45%',
    marginTop: 20,
  },
  rightView: {
    width: '45%',
    marginTop: 20,
  },
  homeBoxViewone: {
    // height: 320,
    // width: '45%',
    // paddingVertical: 35,
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.8,
    // shadowRadius: 6,
    // borderColor: '#c8ccd0',
    // borderTopColor: '#c8ccd0',
    // borderWidth: 1,
    // elevation: 4,
    borderRadius: 15,
    backgroundColor: '#cfcfd4',
    padding: 20,
    // alignItems: 'center'
  },
  homeBoxViewtwo: {
    // height: 320,
    paddingVertical: 25,
    borderRadius: 15,
    backgroundColor: '#deedff',
    paddingLeft: 10,
    padding: 20,
    // opacity: 0.5
  },
  homeBoxViewthree: {
    // height: 320,
    // width: '45%',
    paddingVertical: 35,
    borderRadius: 15,
    backgroundColor: '#f0f6e8',
    padding: 20,
    marginTop: 20,
    opacity: 0.5
  },
  homeBoxViewfour: {
    // height: 320,
    paddingVertical: 25,
    borderRadius: 15,
    backgroundColor: '#e4e6d9',
    paddingLeft: 15,
    padding: 20,
    marginTop: 20,
    opacity: 0.5
  },
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777'
  },
  textBold: {
    fontWeight: '500',
    color: '#000'
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)'
  },
  buttonTouchable: {
    padding: 16
  },
  slider: {
    // marginTop: 15,
    overflow: 'visible',
    // paddingHorizontal: -10 
    // paddingRight: 10
  },
  sliderContentContainer: {
    paddingVertical: 10,
    // paddingRight: 10
    // paddingHorizontal: -10 
  },
  paginationContainer: {
    paddingVertical: 10,
    // marginTop: 15
  },
  paginationDot: {
    width: 10,
    height: 10,
    borderRadius: 4,
    // marginHorizontal: 8
  },
  carouselView: {
    width: "105%", 
    height: 180, 
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    borderColor: '#c8ccd0',
    // borderTopColor: '#c8ccd0',
    borderWidth: 1,
    elevation: 4,
    borderRadius: 25,
    padding: 10
  },
  unavailableButton: {
    paddingVertical: 8,
    paddingHorizontal: 25,
    backgroundColor: '#ffffff',
    borderColor: '#14a852',
    borderWidth: 1,
    borderRadius: 25,
    alignItems: 'center',
    width: '100%'
  },
  moreButton: {
    paddingVertical: 5,
    paddingHorizontal: 20,
    backgroundColor: '#ffffff',
    borderColor: '#14a852',
    borderWidth: 1,
    borderRadius: 25,
    alignItems: 'center',
  },
  availableButton: {
    paddingVertical: 8,
    paddingHorizontal: 25,
    backgroundColor: '#02bcb1',
    borderRadius: 25,
    alignItems: 'center',
    width: '100%'
  },
  issueProductButton: {
    paddingVertical: 8,
    paddingHorizontal: 10,
    backgroundColor: '#02bcb1',
    borderRadius: 25,
    alignItems: 'center',
    width: 150
  },

  centeredView: {
    flex: 1,
    // width: '90%',
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,


    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.8,
    // shadowRadius: 6,
    // borderColor: '#c8ccd0',
    // borderTopColor: '#c8ccd0',
    // borderWidth: 1,
    // elevation: 4,
},
modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    paddingVertical: 25,
    paddingHorizontal: 10,
    // alignItems: "center",
    shadowColor: "#000",
    borderWidth: 1,
    borderColor: '#c8ccd0',
    shadowOffset: {
        width: 0,
        height: 2
    },
    shadowOpacity: 0.8,
    shadowRadius: 6,
    elevation: 5
},
textAreaContainer: {
    borderColor: '#04abbb',
    borderWidth: 1,
    width: '80%',
    padding: 5,
    marginTop: 10,
    // textAlignVertical: 'top'
},
textArea: {
    height: 50,
    justifyContent: "flex-start",
    textAlignVertical: 'top',
    width: 250
},

button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
},
buttonOpen: {
    backgroundColor: "#F194FF",
},
buttonClose: {
    backgroundColor: "#2196F3",
},
textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
},
modalText: {
    marginTop: 15,
    color: '#02bcb1', fontSize: 14, fontWeight: 'bold',
    // textAlign: "center"
},
closeButton: {
    paddingVertical: 8,
    paddingHorizontal: 10,
    backgroundColor: '#0298D5',
    borderRadius: 5,
    marginTop: 20,
    alignItems: 'center',
    width: 130
},
modalUpdateButton: {
    paddingVertical: 8,
    paddingHorizontal: 10,
    backgroundColor: '#0298D5',
    borderRadius: 5,
    marginTop: 20,
    alignItems: 'center', 
    marginLeft: 5,
    width: 130
},
thirdCarouselView: {
  // width: "100%", 
  // height: 180, 
  backgroundColor: '#02bcb1',
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.8,
  shadowRadius: 10,
  // borderColor: '#c8ccd0',
  // borderTopColor: '#c8ccd0',
  // borderWidth: 1,
  elevation: 4,
  borderRadius: 15,

  marginHorizontal: 10,
  marginVertical: 10,
},
fourthCarouselView: {
  // width: "100%", 
  // height: 180, 
  backgroundColor: '#ffffff',
  borderTopLeftRadius: 50,
  borderBottomRightRadius: 50,
  borderRadius: 15,
  paddingVertical: 15,
  paddingTop: 10,
},
assetDetailsCard: {
  display: 'flex',
  flexDirection: 'row',
  marginTop: 15,
  flexWrap: 'wrap',
},
nameText: {
  fontWeight: 'bold',
  color: '#838682',
  overflow: 'hidden',
  fontSize: 14,
  width: 120
},
dataText: {
  fontWeight: 'bold',
  color: '#000000',
  // overflow: 'hidden',
  flexWrap: 'wrap',
  // height: 200,
  fontSize: 14
},
dotStyle: {
  fontWeight: 'bold',
  color: '#838682',
  overflow: 'hidden',
  fontSize: 14,
},
})
