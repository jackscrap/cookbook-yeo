import React from "react";
import {
	View,
  SafeAreaView,
	ScrollView,
	Text,
	TouchableOpacity
} from "react-native";

import Head from "./head";
import Ctrl from "./ctrl";

import Hr from "./hr";

import DogEar from "./dogEar";

import * as firebase from "firebase";

export default class Profile extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			user: this.props.navigation.getParam("user", "..."),

			ln: [],
			recipe: []
		};
	}

	componentDidMount() {
    const
			root = firebase.database().ref(),
      ref = root.child("recipe");

    ref.on("value", snap => {
      this.setState({
        recipe: snap.val()
      });
    });
	}

  static navigationOptions = {
    headerLeft: null
  };

  render() {
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

				<Ctrl
					user={this.state.user}
					navigation={this.props.navigation}
				/>

				<Hr />

				<ScrollView
					style={{
						margin: 8
					}}
				>
					{
						Object.keys(this.state.recipe).map(
							(
								k
							) => {
								if (this.state.recipe[k].email == this.state.user.email) {
									return (
										<TouchableOpacity
											key={k}
											style={{
												padding: 4,
												margin: 8
											}}
											onPress={() =>
												this.props.navigation.navigate(
													"Recipe",
													{
														i: k
													}
												)
											}
										>
											<Text
												style={{
													fontSize: 26,
													color: "#303030"
												}}
											>
												{this.state.recipe[k].title}
											</Text>
										</TouchableOpacity>
									);
								}
							}
						)
					}
				</ScrollView>
			</SafeAreaView>
		);
  }
}
