import React from "react";

import * as firebase from "firebase";

import {
  View,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,

	StyleSheet
} from "react-native";

import Head from "./head";
import UserHead from "./userHead";

export default class Landing extends React.Component {
  constructor() {
    super();

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

		firebase.auth().onAuthStateChanged(user => {
			this.setState({
				user: user
			});
		});
  }

  alphabet() {
    var c = [],
      i = "a".charCodeAt(0);

    const j = "z".charCodeAt(0);

    for (; i <= j; ++i) {
      c.push(String.fromCharCode(i));
    }

    return c;
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

        <View
          style={{
            borderBottomColor: "#303030",
            borderBottomWidth: 6,
            marginLeft: 16,
            marginRight: 16,
            marginBottom: 16
          }}
        />

				<UserHead
					user={this.state.user}
					navigation={this.props.navigation}
				/>

        <View
          style={{
            borderBottomColor: "#303030",
            borderBottomWidth: 6,
            marginLeft: 16,
            marginRight: 16,
            marginBottom: 16
          }}
        />

        <ScrollView>
          {this.alphabet().map((c, k) => {
            return (
              <View
                key={k}
                style={{
                  padding: 8
                }}
              >
                <Text
                  style={{
                    margin: 8,
                    fontSize: 60,
                    // fontWeight: "bold",
                    color: "#303030"
                  }}
                >
                  {c.toUpperCase()}
                </Text>

                <View>
                  {
										this.state.recipe.map(
											(item, k) => {
												if (item.title[0].toLowerCase() == c) {
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
              </View>
            );
          })}
        </ScrollView>
      </SafeAreaView>
    );
  }
}

