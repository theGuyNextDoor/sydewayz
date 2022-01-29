import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Button } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import theme from '../../public/theme';

const styles = StyleSheet.create({
  formContainer: {
    height: '95%',
    padding: '2%',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#26C8D2',
  },
  subjectContainer: {
    flex: 1,
    width: '80%',
    alignItems: 'center',

    borderWidth: 1,
  },
  subjectInput: {
    backgroundColor: '#FFF',
    width: '80%',
  },
  descriptionContainer: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%',
    height: '50%',

    borderWidth: 1,
  },
  descriptionInput: {
    width: '90%',
    height: '20%',
    paddingLeft: '2%',

    backgroundColor: '#FFF',
  },
});

function SubmitRequest() {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      subject: '',
      description: '',
      email: '',
    },
  });

  const onSubmit = (form) => {
    reset({
      subject: '',
      description: '',
    });
    console.log(form);
  };

  return (
    <View style={styles.formContainer}>
      <View style={styles.subjectContainer}>
        <Text>subject:</Text>
        <Controller
          control={control}
          rules={{ required: true, maxLength: 20 }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.subjectInput}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="subject"
        />
        {errors.subject && <Text>error subject uncomment for production</Text>}
        {/* {errors.subject?.type === 'required' && <Text>subject is required</Text>} */}
        {/* {errors.subject?.type === 'maxLength' && <Text>subject cannot exceed 20</Text>} */}
      </View>
      <View style={styles.descriptionContainer}>
        <Text>description:</Text>
        <Controller
          control={control}
          rules={{ required: true, maxLength: 200 }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.descriptionInput}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="description"
        />
        {errors.description && <Text>error description uncomment for production</Text>}
        {/* {errors.description?.type === 'required' && <Text>description is required</Text>} */}
        {/* {errors.description?.type === 'maxLength' && <Text>description cannot exceed 200</Text>} */}
      </View>

      <Button
        title="Clear"
        onPress={() => {
          reset({
            subject: '',
            description: '',
          });
        }}
      />

      <Button
        title="Submit"
        onPress={handleSubmit(onSubmit)}
      />
    </View>
  );
}

export default SubmitRequest;
