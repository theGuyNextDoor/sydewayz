import React from 'react';
import { SafeAreaView, Modal, TouchableOpacity, TouchableHighlight, View } from 'react-native';
import RequestForm from './RequestForm';
import ApprovalForm from './ApprovalForm';
import styles from '../../public/styles/ReusableModal';
import theme from '../../public/theme';

function ReusableModal({ openModal, client }) {
  return (
    <Modal
      animationType="slide"
      transparent
    >
      <TouchableOpacity style={styles.wrapper} onPress={() => openModal(client)}>
        <TouchableHighlight style={styles.container}>
          {client ? <ApprovalForm client={client} /> : <RequestForm />}
        </TouchableHighlight>
      </TouchableOpacity>
    </Modal>
  );
}

export default ReusableModal;
