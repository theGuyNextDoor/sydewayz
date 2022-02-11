import axios from 'axios';
import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { useUser } from '../UserManager';
import styles from '../../public/styles/Form';
import theme from '../../public/theme';

const requestApi = 'http://localhost:3000'; // TEMPORARY
// ${requestApi} DELETE ALL OCCURANCES

function RequestForm({ handleModalView }) {
  const { allRequests, setAllRequests } = useUser();
  const [request, setRequest] = useState({});
  const { user } = useUser();
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      subject: '',
      description: '',
      email: user.email,
    },
  });

  const onSubmit = (data) => {
    reset({
      subject: '',
      description: '',
    });
    axios.post(`${requestApi}/api/zendesk/createTicket`, data)
      .then(({ data }) => {
        // const { id, created_at, subject, description, status, priority } = data.request;

        console.log(data);

        // setAllRequests([...allRequests, data]);
      })
      .catch((err) => console.log(err));
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>

        <View style={styles.subjectContainer}>
          <Text>subject:</Text>
          <Controller
            control={control}
            rules={{ required: true, maxLength: 20 }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.subjectBox}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="subject"
          />
          {errors.subject && (
            <Text style={styles.errorMsg}>There is an error </Text>
          )}

          {/* {errors.subject?.type === 'required' && (
            <Text style={styles.errorMsg}>subject is required</Text>
          )}
          {errors.subject?.type === 'maxLength' && (
            <Text style={styles.errorMsg}>subject cannot exceed 20</Text>
          )} */}
        </View>

        <View style={styles.descriptionContainer}>
          <Text style={{ marginBottom: '2%' }}>description:</Text>

          <Controller
            control={control}
            rules={{ required: true, maxLength: 200 }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                multiline
                style={styles.descriptionBox}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="description"
          />
          {errors.description && (
            <Text style={styles.errorMsg}>There is an error </Text>
          )}

          {/* {errors.description?.type === 'required' && (
            <Text style={styles.errorMsg}>description is required</Text>
          )}

          {errors.description?.type === 'maxLength' && (
            <Text style={styles.errorMsg}>description cannot exceed 200</Text>
          )} */}
        </View>

        <View style={styles.btnContainer}>
          <Button
            title="Clear"
            onPress={() => {
              reset({ subject: '', description: '' });
            }}
          />
          <Button
            title="Submit"
            onPress={handleSubmit(onSubmit)}
          />
        </View>
      </View>
    </View>
  );
}

export default RequestForm;
