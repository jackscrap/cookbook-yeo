import React from "react";

import {
  SafeAreaView,
  TouchableOpacity,
  View,
  Text,
  ScrollView,

	StyleSheet
} from "react-native";

import * as firebase from "firebase";

import Triangle from "react-native-triangle";

export default class Recipe extends React.Component {
  static navigationOptions = {
    headerLeft: null
  };

  constructor(props) {
    super(props);

    this.state = {
      recipe: []
    };
  }

  componentDidMount() {
    this.setState({
      i: this.props.navigation.getParam("i")
    });

    const root = firebase.database().ref(),
      ref = root.child("recipe");

    ref.on("value", snap => {
      this.setState({
        recipe: snap.val()
      });

      const {
				navigation
			} = this.props;
    });
  }

  render() {
    return (
      <SafeAreaView
        style={{
          flexGrow: 1,
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

        <View>
          <Text
            style={{
              fontSize: 100,
              textAlign: "center",
              fontFamily: "Times New Roman",
              color: "#303030"
            }}
          >
            A
          </Text>
        </View>

        <View
          style={{
            borderBottomColor: "#303030",
            borderBottomWidth: 6,
            margin: 16
          }}
        />

        <ScrollView
					style={{
						height: 0
					}}
				>
          <View
            style={{
              padding: 8
            }}
          >
            <View
              style={{
                padding: 8
              }}
            >
              <Text
                style={{
                  fontSize: 40,
                  color: "#303030"
                }}
              >
                {this.state.recipe[this.state.i] != undefined
                  ? this.state.recipe[this.state.i].title
                  : "..."}
              </Text>

              <Text
                style={{
                  fontSize: 26,
                  color: "#303030"
                }}
              >
                {this.state.recipe[this.state.i] != undefined
                  ? this.state.recipe[this.state.i].author
                  : "..."}
              </Text>
            </View>

            <View
              style={{
                padding: 8
              }}
            >
              <Text
                style={{
                  fontSize: 26,
                }}
              >
                Notes
              </Text>

              {
								this.state.recipe[this.state.i] != undefined ? (
									this.state.recipe[this.state.i].note.map((item, k) => {
										return (
											<Text
												key={k}
											>
												{item}
											</Text>
										);
									})
								) : (
									<Text>...</Text>
								)
							}
						</View>

            <View
              style={{
                padding: 8
              }}
            >
              <Text
                style={{
                  fontSize: 26,
                  color: "#303030"
                }}
              >
                Ingredients
              </Text>

              {
								this.state.recipe[this.state.i] != undefined ? (
									this.state.recipe[this.state.i].ingredient.map((item, k) => {
										return (
											<Text
												key={k}

												style={{
													paddingLeft: 8
												}}
											>
												{`\u2022 ${item}`}
											</Text>
										);
									})
								) : (
									<Text>...</Text>
								)
							}
						</View>
					</View>

          <View
            style={{
              flex: 1,
              flexDirection: "row"
            }}
          >
            <ScrollView
              style={{
                padding: 8,
                height: "100%",
                width: "60%"
              }}
            >
              {this.state.recipe[this.state.i] != undefined ? (
                this.state.recipe[this.state.i].step.map((step, k) => {
                  return (
                    <View
                      key={k}
                      style={{
                        margin: 8
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 26,
                          color: "#303030"
                        }}
                      >
                        {k + 1}
                      </Text>

                      <Text
                        style={{
                          fontSize: 16,
                          color: "#303030"
                        }}
                      >
                        {step.title}
                      </Text>
                    </View>
                  );
                })
              ) : (
                <Text
                  style={{
                    color: "#303030"
                  }}
                >
                  ...
                </Text>
              )}
            </ScrollView>

            <ScrollView
              style={{
                padding: 8
              }}
            >
              {this.state.recipe[this.state.i] != undefined ? (
                this.state.recipe[this.state.i].step.map((step, k) => {
                  return (
                    <View
                      key={k}
                      style={{
                        margin: 8
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 40,
                          color: "#303030"
                        }}
                      >
                        {k + 1}
                      </Text>

                      <Text
                        style={{
                          fontSize: 26,
                          color: "#303030"
                        }}
                      >
                        {step.title}
                      </Text>

                      <Text
                        style={{
                          fontSize: 16,
                          color: "#303030"
                        }}
                      >
                        {step.desc}
                      </Text>
                    </View>
                  );
                })
              ) : (
                <Text
                  style={{
                    color: "#303030"
                  }}
                >
                  ...
                </Text>
              )}
            </ScrollView>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

