import React from "react";
import {
  SafeAreaView,
	View,
	Text,
	TouchableOpacity
} from "react-native";

import Head from "./head";
import UserHead from "./userHead";

import Hr from "./hr";

import * as firebase from "firebase";

export default class Profile extends React.Component {
	constructor(
		props
	) {
		super(props);

    this.state = {
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

		this.setState(
			{
				"email": "jackhasakeyboard@gmail.com"
			}
		);
	}

  render() {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          borderWidth: 26,
          borderColor: "#303030"
        }}
			>
				<Head />

				<Hr />

				<UserHead
					user={this.state.user}
					navigation={this.props.navigation}
				/>

				<Hr />

				<View>
					{
						this.state.recipe.map(
							(item, k) => {
								if (item.email == "nalma@telus.net") {
									return (
										<TouchableOpacity
											key={k}
											style={{
												padding: 4,
												margin: 8
											}}
											onPress={() =>
												this.props.navigation.navigate("Recipe", {
													i: k
												})
											}
										>
											<Text
												style={{
													fontSize: 26,
													color: "#303030"
												}}
											>
												{item.title}
											</Text>
										</TouchableOpacity>
									);
								}
							}
						)
					}
				</View>
      </SafeAreaView>
    );
  }
}
