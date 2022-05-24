import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { StyleSheet, SafeAreaView, View, Pressable } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useTheme, Button, TextInput, Snackbar, Text } from 'react-native-paper';
import { useForm, Controller } from 'react-hook-form';

const styles = StyleSheet.create({
  signInWrapper: { flex: 1, alignItems: 'center' },
  form: { width: '80%', alignItems: 'center' },
  input: { width: '100%' },
  toggleBox: { flexDirection: 'row', width: '80%' },
  spacing: { marginBottom: '4%' },
  logoBox: { justifyContent: 'center', alignItems: 'center', width: '100%', height: '40%' },
});

function SignIn({ navigation }) {
  const { colors } = useTheme();
  const { control, handleSubmit, reset, formState: { errors } } = useForm();
  const [snackbarErr, setSnackBarErr] = useState(null);
  const dispatch = useDispatch();
  const { regex } = useSelector((state) => state);

  const dismissSnackbar = () => {
    setSnackBarErr(null);
  };

  const submitSignIn = (data) => {
    // axios.get(`${DOMAIN}/login/${data.email}/${data.password}`)
    //   .then(({ data }) => {
    //     reset({ email: '', password: '' });
    //     dispatch({ type: 'login', payload: data });
    //   })
    //   .catch((err) => {
    //     if (err.response && err.response.status === 401) {
    //       setSnackBarErr('Login credientals are invalid');
    //     } else {
    //       setSnackBarErr('We\'re sorry something went wrong. Please try again');
    //     }
    //   });
    console.log('submitted');
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAwareScrollView contentContainerStyle={styles.signInWrapper}>

        <Snackbar
          wrapperStyle={{ top: 0, zIndex: 1 }}
          visible={snackbarErr}
          onDismiss={dismissSnackbar}
        >
          {snackbarErr}
        </Snackbar>

        <View style={[styles.logoBox, styles.spacing]}>
          <Text>Sydewayz Logo</Text>
        </View>

        <View style={[styles.form, styles.spacing]}>
          {errors.email && <Text style={{ color: colors.errTxt }}>Please enter a valid email</Text>}
          <Controller
            control={control}
            rules={{ required: true, pattern: regex }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={[styles.input, styles.spacing]}
                mode="outlined"
                label="email"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder="email"
                autoCapitalize="none"
                keyboardType="email-address"
              />
            )}
            name="email"
          />
          <Controller
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={[styles.input, styles.spacing]}
                mode="outlined"
                label="password"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                autoCapitalize="none"
                placeholder="password (case sensitive)"
                secureTextEntry={true}
              />
            )}
            name="password"
          />
          {/* <Text style={styles.spacing}>Having trouble logging in?</Text> */}
          <Button mode="contained" onPress={handleSubmit(submitSignIn)}>Sign In</Button>
        </View>

        {/* <View style={styles.toggleBox}>
          <Text>Don&#39;t have an account?</Text>
          <Pressable onPress={() => navigation.navigate('SignUp')}>
            <Text style={{ color: colors.loginToggleTxt }}> SIGN UP</Text>
          </Pressable>
        </View> */}

      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

export default SignIn;
