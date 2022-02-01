import axios from 'axios';
import React from 'react';
import { ImageBackground, SafeAreaView, View, TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import { GoogleSignin, GoogleSigninButton } from '@react-native-google-signin/google-signin';
import { useUser } from '../UserManager';
import styles from '../../public/styles/Login';
import theme from '../../public/theme';
import { WEB_CLIENT_ID, IOS_CLIENT_ID, ANDROID_CLIENT_ID } from '../../../config';

const image = require('../../public/logo.png');

const requestApi = 'http://localhost:3000'; // TEMPORARY
// ${requestApi} DELETE ALL OCCURANCES

function Login() {
  const { loginUser, signinLoading, signupLoading } = useUser();

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
                      if (data[0].isAdmin && data[0].user_role_id === 1) {
                        loginUser(data[0], 'admin');
                      } else if (data.isAdmin && data[0].user_role_id === 2) {
                        loginUser(data[0], 'agent');
                      } else {
                        loginUser(data[0], 'end-user');
                      }
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
                axios.post(`${requestApi}/api/google/register`, user)
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
  };
  // GOOGLE AUTHENTICATION END

  return (
    <ImageBackground source={image}>
      <SafeAreaView style={theme.wrapper}>
        <View style={styles.container}>
          {/* SIGN IN */}
          {!signinLoading && (
          <TouchableOpacity
            style={styles.signin}
            onPress={() => handleGoogleSignIn('login')}
          >
            <Text style={theme.darkTxt}>Sign In</Text>
          </TouchableOpacity>
          )}

          {/* LOADING */}
          {signinLoading && (
          <View style={styles.signin} onPress={handleGoogleSignIn}>
            <ActivityIndicator size="large" color="#020033" />
          </View>
          )}

          {/* SIGN UP */}
          {!signupLoading && (
          <TouchableOpacity
            style={styles.signup}
            onPress={() => handleGoogleSignIn('signup')}
          >
            <Text style={theme.lightTxt}>Sign Up</Text>
          </TouchableOpacity>
          )}

          {/* LOADING */}
          {signupLoading && (
          <View style={styles.signup} onPress={handleGoogleSignIn}>
            <ActivityIndicator size="large" color="#26C8D2" />
          </View>
          )}
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

export default Login;
