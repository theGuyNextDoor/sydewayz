import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  settingsContainer: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    width: '100%',
  },
  settingsBtn: {
    paddingRight: '10%',
  },
  logoutBtn: {

  },

  // PROFILE
  profileContainer: {
    flex: 4,
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  img: {
    width: '15%',
    height: '30%',
    borderRadius: 50,
    marginRight: '5%',
  },
  infoContainer: {
    alignItems: 'center',
  },
  infoTxt: {
    color: '#FFF',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    textShadowOffset: { width: 5, height: 5 },
    textShadowRadius: 20,
    textShadowColor: '#000',
  },

  // TICKETS
  ticketInfoContainer: {
    flex: 3,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  ticketInfo: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '50%',
    width: '30%',
    borderRadius: 10,

    backgroundColor: '#26C8D2',
  },

  // TABS
  tabContainer: {
    flex: 11,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    width: '100%',
  },
  tab: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '70%',
    height: '20%',
    borderRadius: 10,
    backgroundColor: '#26C8D2',
  },
});

export default styles;
