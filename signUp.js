import React from "react";
import {
	View,
	Text,
	TextInput,
	Button,
	TouchableOpacity,
	SafeAreaView,

	StyleSheet
} from "react-native";

import * as firebase from "firebase";

import Head from "./head";
import Hr from "./hr";
import DogEar from "./dogEar";

import Triangle from "react-native-triangle";

export default class SignUp extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			username: "",
			email: "",
			password: "",
			errorMessage: null
		};
	}

  static navigationOptions = {
    headerLeft: null
  };

	handleSignUp = () => {
		firebase
      .auth()
      .createUserWithEmailAndPassword(
				this.state.email,
				this.state.password
			)
			.then(
				() => {
					let user = firebase.auth().currentUser;

					user.updateProfile({
						displayName: this.state.username
					}).then(() => {
						alert(Object.keys(user))
					}).catch((err) => {
						alert(err);
					});

					this.props.navigation.navigate("Landing");
				}
			)
      .catch((err) => this.setState({
				errorMessage: err.message
			}));
	}

	render() {
		const styles = StyleSheet.create({
			textInput: {
				padding: 8,
				margin: 8,
				height: 40,
				borderBottomWidth: 6,
				borderColor: "#303030"
			}
		});

		return (
      <SafeAreaView
        style={{
          flex: 1,
          borderWidth: 26,
          borderColor: "#303030"
        }}
      >
				<DogEar
					navigation={this.props.navigation}
				/>

				<Head />

				<Hr />

				<View
					style={{
						padding: 8
					}}
				>
					<Text
						style={{
							margin: 8,
							fontSize: 26
						}}
					>
						Sign Up
					</Text>
				</View>

				{
					this.state.errorMessage && <Text style={{
							margin: 8,
							padding: 8,
							color: "red"
						}}
					>
						{this.state.errorMessage}
					</Text>
				}

				<View
					style={{
						margin: 8
					}}
				>
					<TextInput
						placeholder="Username"
						autoCapitalize="none"
						style={
							styles.textInput
						}
						onChangeText={
							username => this.setState({
								username
							})
						}
						value={
							this.state.username
						}
					/>

					<TextInput
						placeholder="E-mail"
						autoCapitalize="none"
						style={
							styles.textInput
						}
						onChangeText={
							email => this.setState({
								email
							})
						}
						value={
							this.state.email
						}
					/>

					<TextInput
						secureTextEntry
						placeholder="Password"
						autoCapitalize="none"
						style={
							styles.textInput
						}
						onChangeText={
							password => this.setState({
								password
							})
						}
						value={
							this.state.password
						}
					/>
				</View>

        <TouchableOpacity
					style={{
						margin: 8,
						padding: 8
					}}
					onPress={
						this.handleSignUp
					}
				>
					<Text>
						Enter
					</Text>
        </TouchableOpacity>
      </SafeAreaView>
		);
	}
}
