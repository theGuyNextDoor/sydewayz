import { StyleSheet, Platform, StatusBar } from 'react-native';

const theme = StyleSheet.create({
  wrapper: {
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    height: '100%',
  },
  lightTxt: {
    color: '#26C8D2',
    textTransform: 'uppercase',
  },
  darkTxt: {
    color: '#020033',
    textTransform: 'uppercase',
  },
  backgroundTxt: {
    color: '#FFFFFF',
    textTransform: 'uppercase',
  },
});

export default theme;
