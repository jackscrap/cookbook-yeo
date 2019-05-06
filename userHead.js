import React from "react";

import * as firebase from "firebase";

import {
  View,
  TouchableOpacity,
  Text,

	StyleSheet
} from "react-native";

import {
	createStackNavigator,
	createAppContainer
} from "react-navigation";

import Landing from "./landing";
import Recipe from "./recipe";
import SignUp from "./signUp";
import LogIn from "./logIn";

const Nav = createStackNavigator(
  {
    Landing: Landing,
    Recipe: Recipe,
		SignUp: SignUp,
		LogIn: LogIn
  },
  {}
);

const Cont = createAppContainer(Nav);

export default class UserHead extends React.Component {
	constructor(
		props
	) {
		super();
	}

	handleSignOut = () => {
		firebase
			.auth()
			.signOut()
			.then(() => {
				() => this.props.navigation.navigate(
					"Landing"
				)
			}
		);
	}

	render() {
		if (this.props.user) {
			return (
				<View
					style={{
						padding: 8,
						flexDirection: "row"
					}}
				>
					<Text
						style={{
							fontSize: 16,
							padding: 8
						}}
					>
						{this.props.user.email}
					</Text>

					<TouchableOpacity
						onPress={
							this.handleSignOut
						}
					>
						<Text
							style={{
								fontSize: 16,
								padding: 8
							}}
						>
							Log Out
						</Text>
					</TouchableOpacity>
				</View>
			);
		} else {
			return (
				<View
					style={{
						flexDirection: "row",
						padding: 8
					}}
				>
					<TouchableOpacity
						style={{
							margin: 8
						}}
						onPress={
							() => this.props.navigation.navigate(
								"SignUp"
							)
						}
					>
						<Text>
							Sign Up
						</Text>
					</TouchableOpacity>

					<TouchableOpacity
						style={{
							margin: 8,
							marginLeft: "auto"
						}}
						onPress={
							() => this.props.navigation.navigate(
								"LogIn"
							)
						}
					>
						<Text>
							Log In
						</Text>
					</TouchableOpacity>
				</View>
			);
		}
	}
}
