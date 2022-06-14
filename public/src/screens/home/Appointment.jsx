import axios from 'axios';
import moment from 'moment';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { StyleSheet, View, ScrollView, Linking } from 'react-native';
import { Title, Text, Button, Card, Modal, Portal, TextInput } from 'react-native-paper';
import { useForm, Controller } from 'react-hook-form';
import DOMAIN from '../../domain';

const styles = StyleSheet.create({
  wrapper: { flex: 1, paddingTop: '5%', paddingRight: '10%', paddingLeft: '10%' },
  btnBox: { marginBottom: 10, width: '100%', alignItems: 'flex-start' },
  scroll: { borderTopWidth: 1 },
  requestBox: { padding: 10, borderWidth: 1, marginBottom: 20 },
  title: { alignItems: 'center' },
  cancel: { alignItems: 'flex-end' },
  modal: { padding: 10 },
  modalBox: { height: '50%', padding: 10, alignItems: 'center', backgroundColor: '#FFF' },
  input: { width: '100%' },
  spacing: { marginBottom: 10 },
});

function Appointment() {
  const { calendly } = useSelector((state) => state);
  const [visible, setVisible] = useState(false);
  const [cancelObj, setCancelObj] = useState({ type: '', time: '', event: '' });
  const { control, handleSubmit, reset, formState: { errors } } = useForm();
  const dispatch = useDispatch();
  let scheduleFeed = [];
  let callFeed = [];
  const email = 'johndoe@gmail.com';

  useEffect(() => {
    axios.get(`${DOMAIN}/calendly/appointments/${email}`)
      .then(({ data }) => dispatch({ type: 'stageAppointments', payload: data.collection}))
      .catch((err) => console.log(err)); // make snackbar
  }, []);

  if (calendly.appointments) {
    scheduleFeed = calendly.appointments.map((item, index) => {
      const { name, location, start_time, end_time, uri } = item;
      const time = `${moment(start_time).format('LLLL')} - ${moment(end_time).format('LT')}`

      const eventTypeArr = uri.split('/');
      const uuid = eventTypeArr[eventTypeArr.length - 1];

      return (
        <View key={index} style={styles.requestBox}>
          <Title style={styles.spacing}>{name}</Title>
          <Text style={styles.spacing} numberOfLines={1} adjustsFontSizeToFit>{time}</Text>
          <View style={styles.cancel}>
            <Text onPress={() => toggleModal('appointment', time, uuid)}>Cancel</Text>
          </View>
        </View>
      );
    });
  }

  const openScheduleURL = () => {
    Linking.openURL('https://calendly.com/raeyejordan/sydeways') // change endpoint
    .catch(err => console.log('Can not open'));
  };

  const openCallURL = () => {
    Linking.openURL('https://calendly.com/raeyejordan/sydeways') // change endpoint
    .catch(err => console.log('Can not open'));
  };

  const toggleModal = (type, time, event) => {
    setVisible(!visible);
    setCancelObj({ type, time, event });
  };

  const cancelEvent = (data) => {
    const config = {
      uuid: cancelObj.event,
      reason: data.reason, // add extra txt that shows the users email and name
    };

    axios.post(`${DOMAIN}/calendly/cancel`, config)
      .then(({ status }) => {
        console.log(status);
        if (status !== 201) {
          console.log('something went wrong, please try again') // make a snackbar
        }
        reset({ reason: '' });
      })
      .catch((err) => console.log(err)); // make a snackbar

    setVisible(!visible);
  };

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
      <Portal>
        <Modal
          visible={visible}
          onDismiss={toggleModal}
          style={styles.modal}
          contentContainerStyle={styles.modalBox}
        >
          <View style={{ marginBottom: 20 }}>
            <Title numberOfLines={1} adjustsFontSizeToFit>Are you ready to cancel this {cancelObj.type}?</Title>
            <Title numberOfLines={1} adjustsFontSizeToFit>{cancelObj.time}</Title>
          </View>
          <View style={{ height: '50%', width: '100%' }}>
            {errors.reason && <Text>Please enter a reason</Text>}
            <Controller
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={styles.input}
                  mode="outlined"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  placeholder="Please explain why..."
                  autoCapitalize="none"
                />
              )}
              name="reason"
            />
          </View>
          <Button onPress={handleSubmit(cancelEvent)}>Cancel Event</Button>
        </Modal>
      </Portal>
    </View>
  );
}

export default Appointment;
