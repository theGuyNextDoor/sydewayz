import axios from 'axios';
import React from 'react';
import { StyleSheet, SafeAreaView, View, TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import { GoogleSignin, GoogleSigninButton } from '@react-native-google-signin/google-signin';
import { useUser } from '../UserManager';
import theme from '../../public/theme';
import { WEB_CLIENT_ID, IOS_CLIENT_ID, ANDROID_CLIENT_ID } from '../../../config';

const requestApi = 'http://localhost:3000'; // TEMPORARY
// ${requestApi} DELETE ALL OCCURANCES

const styles = StyleSheet.create({
  admin: {
    flex: 3,
    alignItems: 'flex-end',
    paddingRight: 10,
  },
  btnContainer: {
    flex: 1,
  },
  signIn: {
    backgroundColor: '#26C8D2',
    alignItems: 'center',
    justifyContent: 'center',
    height: '50%',
  },
  signUp: {
    backgroundColor: '#020033',
    alignItems: 'center',
    justifyContent: 'center',
    height: '50%',
  },
});

function Login() {
  const { loginUser } = useUser();

  const handleMessage = (message) => {
    alert(message); // CREATE CUSTOM ALERT
  };

  // GOOGLE AUTHENTICATION BEGIN
  const handleGoogleSignIn = (action) => {
    const config = {
      webClientId: WEB_CLIENT_ID,
      iosClientId: IOS_CLIENT_ID,
      androidClientId: ANDROID_CLIENT_ID,
      scopes: ['user'],
    };

    GoogleSignin.configure(config);

    GoogleSignin.hasPlayServices()
      .then((hasPlayService) => {
        if (hasPlayService) {
          GoogleSignin.signIn()
            .then(({ user }) => {
              // LOGIN
              if (action === 'login') {
                const { email } = user;
                axios.get(`${requestApi}/api/google/login/${email}`)
                  .then(({ data }) => {
                    if (Array.isArray(data)) {
                      loginUser(data[0]);
                    } else {
                      handleMessage(data);
                    }
                  })
                  .catch((err) => {
                    console.log(err);
                    handleMessage('ERROR IN DATABASE LOG IN'); // CHECK ERROR
                  });
              }
              // SIGNUP
              if (action === 'signup') {
                axios.post(`${requestApi}/api/google/register`, profile)
                  .then(({ data }) => handleMessage(data))
                  .catch((err) => {
                    console.log(err);
                    handleMessage('ERROR IN DATABASE SIGN UP'); // CHECK ERROR
                  });
              }
            })
            .catch((err) => {
              console.log(err);
            });
        }
      })
      .catch((err) => {
        console.log(err);
      });

    // GoogleSignin.hasPlayService()
    //   .then((response) => {
    //     const { type } = response;
    //     const profile = response.user;

    //     if (type === 'success') {
    //       // LOGIN
    //       if (action === 'login') {
    //         const { email } = profile;
    //         axios.get(`${requestApi}/api/google/login/${email}`)
    //           .then(({ data }) => {
    //             if (Array.isArray(data)) {
    //               loginUser(data[0]);
    //             } else {
    //               handleMessage(data);
    //             }
    //           })
    //           .catch((err) => {
    //             console.log(err);
    //             handleMessage('ERROR IN DATABASE LOG IN'); // CHECK ERROR
    //           });
    //       }
    //       // SIGNUP
    //       if (action === 'signup') {
    //         axios.post(`${requestApi}/api/google/register`, profile)
    //           .then(({ data }) => handleMessage(data))
    //           .catch((err) => {
    //             console.log(err);
    //             handleMessage('ERROR IN DATABASE SIGN UP'); // CHECK ERROR
    //           });
    //       }
    //     } else {
    //       handleMessage('Google sign in was canceled');
    //     }
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //     handleMessage('ERROR WITH GOOGLE CONNECTION'); // CHECK ERROR
    //   });
  };
  // GOOGLE AUTHENTICATION END

  return (
    <SafeAreaView style={theme.wrapper}>

      <View style={styles.admin}>
        <Text>admin</Text>
      </View>

      <View style={styles.btnContainer}>
        <TouchableOpacity
          style={styles.signIn}
          onPress={() => handleGoogleSignIn('login')}
        >
          <Text style={theme.darkTxt}>Sign In With Google</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.signUp}
          onPress={() => handleGoogleSignIn('signup')}
        >
          <Text style={theme.lightTxt}>Sign Up</Text>
        </TouchableOpacity>

        {/* <TouchableOpacity style={styles.signIn} onPress={handleGoogleSignIn}>
          <ActivityIndicator size="large" color="black" />
        </TouchableOpacity> */}
      </View>

    </SafeAreaView>
  );
}

export default Login;
