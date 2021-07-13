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
    alignItems: 'center',
    paddingLeft: 20,
    paddingTop: 12
    // justifyContent: 'center'
  },
  pickerInput2: {
    backgroundColor: 'red', fontSize: 30
  },
  input: {
    width: '55%',
    borderRadius: 8,
    height: 35,
    justifyContent: 'center',
    backgroundColor: '#e3e3e3',
    marginLeft: 5,
    paddingLeft: 10,
    paddingBottom: 0,
    paddingTop: 0
  },
  productView: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    // paddingHorizontal: 5,
    marginTop: 8,
    marginLeft: 55
  },
  nameField: {
    width: 120,
    color: '#000000',
    fontWeight: 'bold'
  },
  dotView: {
    fontWeight: 'bold', 
    fontSize: 18, 
    marginTop: -3, 
    width: 15
  },
  TrackBox: {
    justifyContent: 'center', 
    borderColor: '#4dd686', 
    borderWidth: 1,
    paddingVertical: 10,
    borderRadius: 5,
    backgroundColor: '#f2f2f2',
    marginTop: 10,
    marginHorizontal: 5
  },
  nameData: {
    color: '#8e9292',
    fontWeight: 'bold',
    width: '55%',
  },
  centerDot: {
    // width: 2,
    color: '#000000'
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
  registerProductView: {
    paddingHorizontal: 5,
    paddingVertical: 15,
    backgroundColor: '#ffffff',
    marginTop: -25,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    height: '100%'
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
  registerHeading: {
    paddingVertical: 8,
    paddingHorizontal: 10,
    backgroundColor: '#14a852',
    borderRadius: 5,
    marginTop: 5,
    alignItems: 'center',
    width: '90%'
  },
  Datepicker: {
    width: '100%',
    paddingLeft: 10
  },
  loginButton: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: '#14a852',
    borderRadius: 20,
    marginTop: 5,
    alignItems: 'center',
    width: '80%'
  },
  buttonTouchable: {
    padding: 16
  }
})


