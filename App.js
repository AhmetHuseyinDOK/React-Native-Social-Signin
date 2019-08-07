/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Fragment} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';
import { GoogleSignin, GoogleSigninButton,statusCodes } from 'react-native-google-signin';
import api from './api';
import Axios from 'axios';
GoogleSignin.configure({
  webClientId:"871511627309-0hdhsjjavqqh4kpkhqr257kbvcruh89g.apps.googleusercontent.com"
});
class App extends React.Component{
  state = {
    userInfo: null
  }

  componentDidMount(){
    this.getCurrentUserInfo();
  }

  getCurrentUserInfo = async () => {
    try {
      const userInfo = await GoogleSignin.signInSilently();
      this.setState({ userInfo });
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_REQUIRED) {
        this.signIn();
      } else {
        // some other error
      }
    }
  };

  signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      this.setState({ userInfo });
      let res = await api.verifyGoogle(userInfo.idToken);
      //let res = await api.hello();
      //let res = await Axios.get("https://api.github.com/");
      alert(JSON.stringify(res));
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      }else{
        alert(error.message);
      }
      //  else if (error.code === statusCodes.IN_PROGRESS) {
      //   // operation (f.e. sign in) is in progress already
      // } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      //   // play services not available or outdated
      // } else {
        
      // }
    }
  };

  signOut = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      this.setState({ userInfo: null }); // Remember to remove the user from your app's state as well
    } catch (error) {
      console.error(error);
    }
  };

  render = () => {
    return (
      <Fragment>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView>
            {this.state.userInfo === null ? (
              <GoogleSigninButton
              style={{ width: 192, height: 48 }}
              size={GoogleSigninButton.Size.Wide}
              color={GoogleSigninButton.Color.Dark}
              onPress={this.signIn}
              disabled={this.state.isSigninInProgress} />
            ):(
              <View>
              <Text>{JSON.stringify(this.state.userInfo)}</Text>
              <Button onPress={this.signOut} title="Sign Out"/>
              </View>
            )}
            

        </SafeAreaView>
      </Fragment>
    );
  };
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },  
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18, 
    fontWeight: '400',  
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
