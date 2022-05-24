import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { StyleSheet } from 'react-native';
import { Appbar, Modal, Portal } from 'react-native-paper';
import HeaderModal from './HeaderModal';

const styles = StyleSheet.create({
  modalBox: { height: '80%', backgroundColor: '#fff' },
});

function HeaderNav({ navigation }) {
  const [modalView, setModalView] = useState(false);
  const dispatch = useDispatch();

  const toggleModal = () => {
    setModalView(!modalView);
  };

  const navigate = (screen) => {
    toggleModal();
    navigation.navigate(screen);
  };

  const logout = () => {
    dispatch({ type: 'logout' });
  };
  return (
    <>
      <Portal>
        <Modal
          visible={modalView}
          onDismiss={toggleModal}
          contentContainerStyle={styles.modalBox}
        >
          <HeaderModal navigate={navigate} logout={logout} />
        </Modal>
      </Portal>
      <Appbar.Header>
        <Appbar.Action icon="menu" onPress={toggleModal} />
        <Appbar.Content title="Sydewayz" style={{ flex: 1, alignItems: 'center' }} />
        <Appbar.Action icon="chat" onPress={() => navigate('Chat')} />
      </Appbar.Header>
    </>
  );
}

export default HeaderNav;
