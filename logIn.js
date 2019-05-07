import React from "react";
import {
	View,
	Text,
	TextInput,
	Button,

	StyleSheet
} from "react-native";

import * as firebase from "firebase";

export default class SignIn extends React.Component {
	state = {
		email: "",
		password: "",
		errorMessage: null
	};

	handleLogIn = () => {
		const {
			email,
			password
		} = this.state

    firebase
      .auth()
			.signInWithEmailAndPassword(
				email,
				password
			)
      .then(() => this.props.navigation.navigate("Landing"))
			.catch(error => this.setState({
				errorMessage: error.message
			}));
	}

	constructor(props) {
		super(props);
	}

	render() {
		const styles = StyleSheet.create({
			container: {
				flex: 1,
				justifyContent: 'center',
				alignItems: 'center'
			},
			textInput: {
				height: 40,
				width: '90%',
				borderColor: 'gray',
				borderWidth: 1,
				marginTop: 8
			}
		});

		return (
			<View
				style={styles.container}
			>
        <Text>Log In</Text>
        {
					this.state.errorMessage &&
          <Text
						style={{ color: 'red' }}
					>
            {this.state.errorMessage}
          </Text>
				}

        <TextInput
          placeholder="Email"
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={email => this.setState({ email })}
          value={this.state.email}
        />
        <TextInput
          secureTextEntry
          placeholder="Password"
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={password => this.setState({ password })}
          value={this.state.password}
        />
        <Button title="Log In" onPress={this.handleLogIn} />
      </View>
		);
	}
}
