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
    paddingHorizontal: 5,
    marginTop: 20
  },
  nameField: {
    width: 150,
    color: '#000000',
    fontWeight: 'bold'
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
    paddingHorizontal: 10,
    paddingBottom: 25,
    backgroundColor: '#ffffff',
    marginTop: -25,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    height: '100%'
  },
  manufacturView: {
    borderColor: '#b5b3b1',
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 20
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
  picker: {
    color: '#616161',
    fontSize: 22,
    borderRadius: 14,
    borderWidth: 1,
    backgroundColor: '#e2e2e2',
    borderColor: '#484848',
    width: 110,
    height:40,
    marginRight:16
},
  pickerView: {
    width: '48%',
    borderRadius: 8,
    height: 35,
    justifyContent: 'center',
    backgroundColor: '#e3e3e3',
    // marginLeft: 5
  },
  textareaView: {
    width: '100%',
    borderRadius: 8,
    // height: 35,
    justifyContent: 'center',
    backgroundColor: '#e3e3e3',
    // marginLeft: 5
  },
  textArea: {
    height: 150,
    justifyContent: "flex-start",
    textAlignVertical: 'top'
},
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)'
  },
  registerHeading: {
    paddingVertical: 8,
    paddingHorizontal: 10,
    backgroundColor: '#14a852',
    // borderRadius: 10,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    alignItems: 'center',
    width: '100%'
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
  },
  textAreaContainer: {
    borderColor: '#14a852',
    borderWidth: 1,
    padding: 5,
    marginTop: 10,
    // textAlignVertical: 'top'
},
})


