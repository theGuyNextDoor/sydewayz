import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { ImageBackground, SafeAreaView, ScrollView, View, Text, Modal } from 'react-native';
import { useUser } from '../UserManager';
import styles from '../../public/styles/Admin';
import theme from '../../public/theme';

const image = require('../../public/logo.png');

const requestApi = 'http://localhost:3000'; // TEMPORARY
// ${requestApi} DELETE ALL OCCURANCES

function Admin() {
  const [pending, setPending] = useState([]);
  const [refreshPending, setRefreshPending] = useState(false);
  const { user, logoutUser } = useUser();

  useEffect(() => {
    axios.get(`${requestApi}/api/admin/pending`)
      .then(({ data }) => {
        setPending(data);
      })
      .catch((err) => console.log(err));
  }, [user]); // MAY NEED TO CHANGE

  const approvalList = pending.map((item, index) => {
    const { fullName, email } = item;
    return (
      <View key={index} style={[theme.view, styles.userContainer]}>
        <Text>{fullName}</Text>
        <Text>{email}</Text>
      </View>

    );
  });

  return (
    <ImageBackground source={image}>
      <SafeAreaView>
        <Text style={styles.logout} onPress={logoutUser}>logout</Text>
        <ScrollView style={styles.scrollView}>
          {approvalList}
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
}

export default Admin;
