import React from "react";
import {
	createStackNavigator,
	createAppContainer
} from "react-navigation";
// import Orientation from "react-native-orientation";

import {
	ScreenOrientation
} from "expo";

import * as firebase from "firebase";

import Landing from "./landing";
import Recipe from "./recipe";
import SignUp from "./signUp";
import LogIn from "./logIn";
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
		// ScreenOrientation.allowAsync(ScreenOrientation.Orientation.LANDSCAPE);
	}

	componentWillUnmount() {
	}

  render() {
    return <Cont />;
  }
}
