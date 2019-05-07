import React from "react";
import {
	createStackNavigator,
	createAppContainer
} from "react-navigation";
import Orientation from "react-native-orientation";

// import {
// 	ScreenOrientation
// } from "expo";

import * as firebase from "firebase";

import Head from "./head";
import UserHead from "./userHead";
import Landing from "./landing";
import SignUp from "./signUp";
import LogIn from "./logIn";
import Recipe from "./recipe";
import Profile from "./profile";

import auth from "./auth";

if (!firebase.apps.length) {
  firebase.initializeApp(
		auth.firebase
  );
}

const Nav = createStackNavigator(
  {
    Landing: Landing,
    Recipe: Recipe,
		SignUp: SignUp,
		LogIn: LogIn,
		Profile: Profile
  }, {}
);

const Cont = createAppContainer(Nav);

export default class App extends React.Component {
	componentDidMount() {
		// const initial = Orientation.getInitialOrientation();
	}

	componentWillUnmount() {
		// Orientation.removeOrientationListener(this._orientationDidChange)
	}

  render() {
    return <Cont />;
  }
}
