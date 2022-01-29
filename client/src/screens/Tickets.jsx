import React from 'react';
import { StyleSheet, SafeAreaView, View, ScrollView, Text } from 'react-native';
import theme from '../../public/theme';
import { useUser } from '../UserManager';

// const requestApi = 'http://localhost:3000'; // TEMPORARY
// ${requestApi} DELETE ALL OCCURANCES

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: '5%',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    width: '80%',
    justifyContent: 'space-evenly',
    backgroundColor: '#26C8D2',

    // borderWidth: 1,
  },
  scroll: {
    height: '80%',
    width: '80%',
    marginTop: '5%',
    backgroundColor: '#26C8D2',
  },
  ticketContainer: {
    margin: '5%, 10%, 0%, 10%',
    height: 200,

    borderWidth: 1,
  },
});

function Tickets({ navigation }) {
  const { openTickets } = useUser();

  const tickets = openTickets.map((ticket, index) => {
    const { id, subject, description, status, priority } = ticket;

    return (
      <View style={styles.ticketContainer} key={index}>
        <Text>{status}</Text>
        <Text>{priority}</Text>
        <Text>{subject}</Text>
        <Text>{description}</Text>
      </View>
    );
  });

  return (
    <SafeAreaView style={theme.wrapper}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={theme.backgroundTxt}>your tickets</Text>
        </View>
        {/* <FlatList
          style={styles.flatList}
          data={data}
          renderItem={({ item }) => (
            <View style={styles.ticketContainer}>
              <Text>{item.description}</Text>
            </View>
          )}
        /> */}

        <ScrollView style={styles.scroll}>
          {tickets}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

export default Tickets;
