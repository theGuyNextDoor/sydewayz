import React, { useState } from 'react';
import { StyleSheet, SafeAreaView, View, TouchableOpacity, Text, Button, Modal } from 'react-native';
import DatePicker from 'react-native-date-picker';
import { useUser } from '../UserManager';
import SubmitRequest from './SubmitRequest';
import theme from '../../public/theme';

const styles = StyleSheet.create({
  header: {
    height: '5%',
  },

  // Ticket
  ticketContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ticketBox: {
    height: '90%',
    width: '90%',
    padding: '2%',
    alignItems: 'center',
    backgroundColor: '#26C8D2',
  },
  schedule: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    height: '10%',
  },
  descriptionBox: {
    width: '90%',
    height: '90%',
    alignItems: 'center',
    paddingBottom: '2%',

    borderWidth: 1,
  },
  description: {
    backgroundColor: '#FFFFFF',
    flex: 1,
    width: '80%',
    paddingTop: '2%',

    borderWidth: 1,
  },

  // Tasks
  taskContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  task: {
    backgroundColor: '#26C8D2',
    height: '20%',
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Chat
  footer: {
    height: '10%',
    paddingTop: '10%',
    paddingLeft: '10%',
    paddingRight: '10%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalWrapper: {
    backgroundColor: '#E2F0FB99',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',

  },
  modalContainer: {
    backgroundColor: '#E2F0FB',
    height: '70%',
    width: '100%',
    padding: '2%',
  },
});

function Profile({ navigation }) {
  const [modalView, setModalView] = useState('none');
  const { user, openTickets, logoutUser } = useUser();

  const [date, setDate] = useState(new Date());

  const handleLogout = () => {
    logoutUser();
  };

  const handlePressModal = (view) => {
    setModalView(view);
  };

  // LOOK FOR BETTER METHOD HANDELING THIS
  const displayTicket = openTickets.map((ticket, index) => {
    console.log('SCREENS Profile.jsx - display ticket:\n', ticket); //DELETE ME
    const { createdAt, description, status } = ticket;
    return (
      <View key={index} style={styles.ticketBox}>
        <View style={styles.schedule}>
          <Text style={theme.darkTxt}>{createdAt}</Text>
          <Text style={theme.darkTxt}>{status}</Text>
        </View>

        <View style={styles.descriptionBox}>
          <View>
            <Text style={theme.darkTxt}>agent</Text>
          </View>

          <View style={styles.description}>
            <Text>{ticket.description}</Text>
          </View>

        </View>
      </View>
    );
  });

  return (
    <View style={theme.wrapper}>
      <View style={styles.ticketContainer}>
        <Text style={theme.backgroundTxt}>next appointment</Text>
        {displayTicket[0]}
      </View>

      <View style={styles.taskContainer}>
        <TouchableOpacity style={styles.task} onPress={() => navigation.navigate('Tickets')}>
          <Text style={theme.darkTxt}>view requests</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.task} onPress={() => handlePressModal('schedule')}>
          <Text style={theme.darkTxt}>submit a request</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.task} onPress={() => handlePressModal('call')}>
          <Text style={theme.darkTxt}>schedule a call</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <Text style={theme.backgroundTxt} onPress={handleLogout}>logout</Text>
        {/* <Text style={theme.backgroundTxt}>Chat</Text> */}
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
        <SafeAreaView style={theme.wrapper}>
          <View style={styles.modalWrapper}>
            <View style={styles.modalContainer}>
              <Text onPress={() => handlePressModal('none')}>X</Text>
              <SubmitRequest />
            </View>
          </View>
        </SafeAreaView>
      </Modal>

    </View>
  );
}

export default Profile;
