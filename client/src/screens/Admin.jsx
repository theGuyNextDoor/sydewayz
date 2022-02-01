import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { ImageBackground, SafeAreaView, ScrollView, TouchableOpacity, Text } from 'react-native';
import ReusableModal from './ReusableModal';
import { useUser } from '../UserManager';
import styles from '../../public/styles/Admin';
import theme from '../../public/theme';

const image = require('../../public/logo.png');

const requestApi = 'http://localhost:3000'; // TEMPORARY
// ${requestApi} DELETE ALL OCCURANCES

function Admin() {
  const [client, setClient] = useState({});
  const [pending, setPending] = useState([]);
  const [modalView, setModalView] = useState(false);
  const { user, logoutUser } = useUser();

  useEffect(() => {
    axios.get(`${requestApi}/api/admin/pending`)
      .then(({ data }) => {
        setPending(data);
      })
      .catch((err) => console.log(err));
  }, [modalView === false]);

  const openModal = (clientObj) => {
    setClient(clientObj);
    setModalView(!modalView);
  };

  const approvalList = pending.map((item, index) => {
    const { fullName, email } = item;
    return (
      <TouchableOpacity
        key={index}
        style={[theme.view, styles.userContainer]}
        onPress={() => openModal(item)}
      >
        <Text>{fullName}</Text>
        <Text>{email}</Text>
      </TouchableOpacity>

    );
  });

  return (
    <ImageBackground source={image}>
      <SafeAreaView>
        <Text style={styles.logout} onPress={logoutUser}>logout</Text>
        <ScrollView style={styles.scrollView}>
          {approvalList}
          {!pending.length && <Text style={styles.text}>No requests</Text>}
        </ScrollView>
      </SafeAreaView>
      {modalView && (
      <ReusableModal
        openModal={openModal}
        client={client}
      />
      )}
    </ImageBackground>
  );
}

export default Admin;
