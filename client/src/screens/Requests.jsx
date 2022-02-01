import React from 'react';
import { ImageBackground, View, ScrollView, Text } from 'react-native';
import { useUser } from '../UserManager';
import theme from '../../public/theme';
import styles from '../../public/styles/Requests';

const image = require('../../public/logo.png');

function Requests({ navigation }) {
  const { allRequests } = useUser();

  const requests = allRequests.map((request, index) => {
    const { id, subject, description, status, priority } = request;

    return (
      <View key={index} style={styles.requestContainer}>
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
          {requests}
        </ScrollView>
      </View>
    </ImageBackground>
  );
}

export default Requests;
