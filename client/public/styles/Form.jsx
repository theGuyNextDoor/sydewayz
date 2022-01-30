import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    height: '100%',
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#26C8D2',
  },
  container: {
    width: '90%',
    height: '80%',
    justifyContent: 'space-between',

    // borderWidth: 1,
  },

  // SUBJECT
  subjectContainer: {
    flex: 3,

    // borderWidth: 1,
  },
  subjectHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: '2%',
  },
  subjectBox: {
    height: '40%',
    paddingRight: '5%',
    paddingLeft: '5%',
    borderRadius: 10,
    backgroundColor: '#FFF',
    marginBottom: '2%',

    // borderWidth: 1,
  },

  // DESCRIPTION
  descriptionContainer: {
    flex: 6,

    // borderWidth: 1,
  },
  descriptionBox: {
    height: '70%',
    paddingTop: '3%',
    paddingRight: '5%',
    paddingBottom: '3%',
    paddingLeft: '5%',
    borderRadius: 10,
    backgroundColor: '#FFF',
    marginBottom: '2%',

    // borderWidth: 1,
  },

  // BUTTONS
  btnContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',

    // borderWidth: 1,
  },
  errorMsg: {
    color: '#FF0000',
  },
});

export default styles;
