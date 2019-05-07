import React from "react";
import {
  SafeAreaView,
	View,
	Text,
	TouchableOpacity
} from "react-native";

import Head from "./head";
import UserHead from "./userHead";

import Triangle from "react-native-triangle";

import Hr from "./hr";

import * as firebase from "firebase";

export default class Profile extends React.Component {
  static navigationOptions = {
    headerLeft: null
  };

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
        <TouchableOpacity
          style={{
            width: 60,
            height: 60,
            position: "absolute",
            zIndex: 1
          }}

          onPress={() =>
            this.props.navigation.dispatch({
              type: "Navigation/BACK"
            })
          }
        >
          <Triangle
            width={60}
            height={60}
            color="#fff"
            direction="up-left"
            style={{
              position: "absolute"
            }}
          />
          <Triangle
            width={60}
            height={60}
            color="#fff"
            direction="down-right"
            style={{
              shadowOffset: {
                width: 1,
                height: 1
              },
              shadowColor: "#111",
              shadowOpacity: 0.16,

              position: "absolute",
              left: 0,
              top: 0
            }}
          />
        </TouchableOpacity>

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