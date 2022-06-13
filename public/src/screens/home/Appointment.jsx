import axios from 'axios';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { StyleSheet, View, ScrollView, Linking } from 'react-native';
import { Title, Text, Button, Card } from 'react-native-paper';
import DOMAIN from '../../domain';

const styles = StyleSheet.create({
  wrapper: { flex: 1, paddingTop: '5%', paddingRight: '10%', paddingLeft: '10%' },
  btnBox: { marginBottom: 10, width: '100%', alignItems: 'flex-start' },
  scroll: { borderTopWidth: 1 },
  requestBox: { padding: 10, borderWidth: 1, marginBottom: 20 },
  title: { alignItems: 'center' },
  cancel: { alignItems: 'flex-end' },
});

function Appointment() {
  const { calendly } = useSelector((state) => state);
  const dispatch = useDispatch();
  let scheduleFeed = [];
  let callFeed = [];
  const email = 'johndoe@gmail.com';

  const openScheduleURL = () => {
    Linking.openURL('https://calendly.com/raeyejordan/sydeways') // change endpoint
    .catch(err => console.log('Can not open'));
  };

  const openCallURL = () => {
    Linking.openURL('https://calendly.com/raeyejordan/sydeways') // change endpoint
    .catch(err => console.log('Can not open'));
  };

  useEffect(() => {
    axios.get(`${DOMAIN}/calendly/appointments/${email}`)
      .then(({ data }) => dispatch({ type: 'stageAppointments', payload: data.collection}))
      .catch((err) => console.log(err)); // make snackbar
  }, []);

  if (calendly.appointments) {
    scheduleFeed = calendly.appointments.map((item, index) => {
      const { name, location, start_time, end_time } = item;

      return (
        <View key={index} style={styles.requestBox}>
          <Title>{name}</Title>
          <Text>{start_time}</Text>
          <Text>{end_time}</Text>
          <View style={styles.cancel}>
            <Text>Cancel</Text>
          </View>
        </View>
      );
    });
  }


  return (
    <View style={styles.wrapper}>
      <View style={styles.btnBox}>
        <Button mode="text" onPress={openScheduleURL}>Schedule An Appointment</Button>
      </View>

      <ScrollView style={{ flex: 1 }}>
        {scheduleFeed}
        {scheduleFeed.length === 0 && <Title>No Appointments Scheduled</Title>}
      </ScrollView>

      <View style={styles.btnBox}>
        <Button mode="text" onPress={openCallURL}>Schedule A Call</Button>
      </View>
      <ScrollView style={{ flex: 1 }}>
        {callFeed}
        {callFeed.length === 0 && <Title>No Calls Scheduled</Title>}
      </ScrollView>
    </View>
  );
}

export default Appointment;
