import React, { useState } from 'react';
import { ImageBackground, Image, View, TouchableOpacity, Text, Modal } from 'react-native';
import DatePicker from 'react-native-date-picker';
import { useUser } from '../UserManager';
import Form from './Form';
import styles from '../../public/styles/Profile';
import theme from '../../public/theme';

const image = require('../../public/logo.png');

function Profile({ navigation }) {
  // Set a state for open and closed Requests in UserManager
  const [modalView, setModalView] = useState('none');
  const { user, logoutUser, allRequests, openRequests, closedRequests } = useUser();
  const { fullName, organization, photoUrl } = user;

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
            {organization ? (
              <Text style={styles.infoTxt}>
                &quot;
                {organization}
                &quot;
              </Text>
            ) : <Text> </Text>}
          </View>
        </View>

        {/* INFO */}
        <View style={styles.ticketInfoContainer}>
          <View style={styles.ticketInfo}>
            <Text>open requests</Text>
            <Text>{openRequests.length}</Text>
          </View>
          <View style={styles.ticketInfo}>
            <Text>all requests</Text>
            <Text>{allRequests.length}</Text>
          </View>
          <View style={styles.ticketInfo}>
            <Text>resolved requests</Text>
            <Text>{closedRequests.length}</Text>
          </View>
        </View>

        {/* TABS */}
        <View style={styles.tabContainer}>
          <TouchableOpacity style={styles.tab} onPress={() => navigation.navigate('Requests')}>
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
