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
import Profile from "./profile";
import Hr from "./hr";

export default class Ctrl extends React.Component {
	constructor(props) {
		super(props);
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
				<View>
					<View
						style={{
							padding: 8,
							flexDirection: "row"
						}}
					>
						<TouchableOpacity
							onPress={
								() => this.props.navigation.navigate(
									"Profile",
									{
										user: this.props.user
									}
								)
							}
						>
							<Text
								style={{
									fontSize: 16,
									margin: 8
								}}
							>
								{this.props.user.email}
							</Text>
						</TouchableOpacity>
					</View>

					<Hr />

					<View
						style={{
							margin: 8,
							flexDirection: "row"
						}}
					>
						<TouchableOpacity
							style={{
								margin: 8,
								fontSize: 16
							}}
							onPress={
								() => this.props.navigation.navigate(
									"New",
									{
										user: this.props.user
									}
								)
							}
						>
							<Text>
								New
							</Text>
						</TouchableOpacity>
				
						<TouchableOpacity
							style={{
								margin: 8,
								marginLeft: "auto",
								fontSize: 16
							}}
							onPress={
								this.handleSignOut
							}
						>
							<Text>
								Log Out
							</Text>
						</TouchableOpacity>
					</View>
				</View>
			);
		} else {
			return (
				<View
					style={{
						flexDirection: "row",
						margin: 8
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
							fontSize: 16,
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
