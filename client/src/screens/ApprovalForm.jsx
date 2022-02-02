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

  const approveUser = () => {
    const usrObj = {
      user: {
        // custom_role_id: id,
        name: fullName,
        email,
        role: 'end-user',
        // organization: { name: organization },
      },
    };
    axios.post(`${requestApi}/api/zendesk/createUser`, usrObj)
      .then(({ data }) => {
        console.log('SCREENS ApprovalPorm - response:\n', data[0]); // DELETE ME
        axios.put(`${requestApi}/api/admin/updateId`, { id: data[0], email })
          .then(() => handleMessage(`${fullName} user verified`))
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  };

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
        <Button title="Approve" onPress={approveUser} />
        <Button title="Deny" onPress={doNotApproveUser} />
      </View>
    </View>
  );
}

export default ApprovalForm;
