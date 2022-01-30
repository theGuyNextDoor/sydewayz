import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    height: '100%',
    paddingTop: '10%',
    paddingBottom: '10%',
    alignItems: 'center',
    backgroundColor: '#26C8D2',
  },
  container: {
    width: '80%',
    // height: '100%',

    borderWidth: 1,
  },
  subjectContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: '2%',

    borderWidth: 1,
  },
  subjectBox: {
    height: '10%',
    marginBottom: '10%',
    backgroundColor: '#FFF',

    borderWidth: 1,
  },
  descriptionBox: {
    height: '30%',
    backgroundColor: '#FFF',

    borderWidth: 1,
  },
  buttonContainer: {

    borderWidth: 1,
  },
});

export default styles;
