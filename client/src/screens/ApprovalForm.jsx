import axios from 'axios';
import React from 'react';
import { View, Text, Button } from 'react-native';
import { useUser } from '../UserManager';
import styles from '../../public/styles/ApprovalForm';
import theme from '../../public/theme';

const requestApi = 'http://localhost:3000'; // TEMPORARY
// ${requestApi} DELETE ALL OCCURANCES

function ApprovalForm({ client }) {
  const { handleMessage } = useUser();
  const { fullName, email, organization } = client;

  const approveUser = () => {};

  const doNotApproveUser = () => {
    axios.delete(`${requestApi}/api/admin/deleteUser/${email}`)
      .then(({ data }) => handleMessage(`${fullName} deleted`))
      .catch((err) => console.log(err));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.question}>Would you like to approve this user?</Text>

      <View style={styles.nameContaner}>
        <Text style={styles.name}>{fullName}</Text>
        <Text style={styles.email}>{email}</Text>
      </View>

      <Text>organization name</Text>

      <View style={styles.btnContainer}>
        <Button title="Approve" />
        <Button title="Deny" onPress={doNotApproveUser} />
      </View>
    </View>
  );
}

export default ApprovalForm;
