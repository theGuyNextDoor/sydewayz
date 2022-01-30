import React, { useState } from 'react';
import { ImageBackground, Image, View, TouchableOpacity, Text, Modal } from 'react-native';
import DatePicker from 'react-native-date-picker';
import { useUser } from '../UserManager';
import Form from './Form';
import styles from '../../public/styles/Profile';
import theme from '../../public/theme';

const image = require('../../public/logo.png');

function Profile({ navigation }) {
  const [modalView, setModalView] = useState('none');
  const { user, openTickets, logoutUser } = useUser();
  const { fullName, organization, photoUrl } = user;

  console.log('SCREENS Profile - user data for user info:\n', user);
  console.log('SCREENS Profile - user data for name:\n', fullName);
  console.log('SCREENS Profile - user data for photo:\n', photoUrl);
  console.log('SCREENS Profile - user data for org:\n', organization);
  console.log('SCREENS Profile - user data for tickes:\n', openTickets.length);

  const [date, setDate] = useState(new Date());

  const handleLogout = () => {
    logoutUser();
  };

  const handleModalView = (view) => {
    setModalView(view);
  };

  return (
    <ImageBackground source={image}>
      <View style={theme.container}>

        {/* SETTINGS */}
        <View style={styles.settingsContainer}>
          <Text style={styles.settingsBtn} onPress={handleLogout}>logout</Text>
          <Text style={styles.settingsBtn}>settings</Text>
        </View>

        {/* PROFILE  */}
        <View style={styles.profileContainer}>
          <Image
            style={styles.img}
            source={{ uri: photoUrl }}
          />
          <View style={styles.infoContainer}>
            <Text style={styles.infoTxt}>{fullName}</Text>
            <Text style={styles.infoTxt}>{organization}</Text>
          </View>
        </View>

        {/* INFO */}
        <View style={styles.ticketInfoContainer}>
          <Text>open</Text>
          <Text>all</Text>
          <Text>closed</Text>
        </View>

        {/* TABS */}
        <View style={styles.tabContainer}>
          <TouchableOpacity style={styles.tab} onPress={() => navigation.navigate('Tickets')}>
            <Text>view requests</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.tab} onPress={() => handleModalView('schedule')}>
            <Text>submit a request</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.tab} onPress={() => handleModalView('call')}>
            <Text>schedule a call</Text>
          </TouchableOpacity>
        </View>

        <DatePicker
          modal
          title="Schedule Call"
          open={modalView === 'call'}
          date={date}
          onConfirm={(newDate) => {
            setModalView('none');
            setDate(newDate);
          }}
          onCancel={() => {
            setModalView('none');
          }}
        />

        <Modal
          visible={modalView === 'schedule'}
          animationType="slide"
          transparent
        >
          <View style={styles.modalWrapper}>
            <View style={styles.modalContainer}>
              <Form handleModalView={handleModalView} />
            </View>
          </View>
        </Modal>
      </View>
    </ImageBackground>
  );
}

export default Profile;
