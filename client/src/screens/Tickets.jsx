import React from 'react';
import { ImageBackground, View, ScrollView, Text } from 'react-native';
import { useUser } from '../UserManager';
import theme from '../../public/theme';
import styles from '../../public/styles/Tickets';

const image = require('../../public/logo.png');

function Tickets({ navigation }) {
  const { allTickets } = useUser();

  const tickets = allTickets.map((ticket, index) => {
    const { id, subject, description, status, priority } = ticket;

    return (
      <View key={index} style={styles.ticketContainer}>
        <View style={styles.statusContainer}>
          <Text style={styles.status}>
            status:   {status}
          </Text>
        </View>
        <View style={styles.messageContainer}>
          <Text style={styles.subject}>{subject}</Text>
          <Text style={styles.description}>{description}</Text>
        </View>
        <View style={styles.statusContainer}>
          <Text style={styles.priority}>
            urgency:   {priority}
          </Text>
        </View>
      </View>
    );
  });

  return (
    <ImageBackground source={image}>
      <View style={theme.container}>
        <ScrollView>
          {tickets}
        </ScrollView>
      </View>
    </ImageBackground>
  );
}

export default Tickets;
