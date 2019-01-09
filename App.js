import React from "react";
import {
  Button,
  Text,
	TextInput,
  View,
  SafeAreaView,
  ScrollView,
  NestedScrollView,
  TouchableOpacity,

	StyleSheet
} from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";

import * as firebase from "firebase";

import Triangle from "react-native-triangle";

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: "AIzaSyAKkeYEno7MYy9nhn4QjYQEVfxGIkp0FcA",
    authDomain: "cookbook-1a91d.firebaseapp.com",
    databaseURL: "https://cookbook-1a91d.firebaseio.com",
    projectId: "cookbook-1a91d",
    storageBucket: "cookbook-1a91d.appspot.com",
    messagingSenderId: "1083763890339"
  });
}

class SignUp extends React.Component {
	state = {
		email: '',
		password: '',
		errorMessage: null
	};

	handleSignUp = () => {
		firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(() => this.props.navigation.navigate("Landing"))
      .catch(error => this.setState({ errorMessage: error.message }))
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
			<View style={styles.container}>
        <Text>Sign Up</Text>
        {this.state.errorMessage &&
          <Text style={{ color: 'red' }}>
            {this.state.errorMessage}
          </Text>}
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
        <Button title="Sign Up" onPress={this.handleSignUp} />
        <Button
          title="Already have an account? Login"
					onPress={() => {
						this.props.navigation.navigate("LogIn")}
					}
        />
      </View>
		);
	}
}

class LogIn extends React.Component {
	state = {
		email: "",
		password: "",
		errorMessage: null
	}

  handleLogin = () => {
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
			<View style={
				styles.container
			}>
        <Text>Log In</Text>
        {this.state.errorMessage &&
          <Text style={{ color: 'red' }}>
            {this.state.errorMessage}
          </Text>}

        <TextInput
          style={styles.textInput}
          autoCapitalize="none"
          placeholder="Email"
          onChangeText={email => this.setState({ email })}
          value={
						this.state.email
					}
        />

        <TextInput
          secureTextEntry
          style={styles.textInput}
          autoCapitalize="none"
          placeholder="Password"
          onChangeText={password => this.setState({ password })}
          value={
						this.state.password
					}
        />

        <Button
					title="Log In"
					onPress={
						this.handleLogin
					}
				/>

        <Button
          title="Don't have an account? Sign Up"
          onPress={
						() => this.props.navigation.navigate("SignUp")
					}
        />
      </View>
    )
  }
}

class Head extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <SafeAreaView>
        <View>
          <Text
            style={{
              margin: 8,
              fontFamily: "Times New Roman",
              fontSize: 100,
              textAlign: "center",
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
            marginLeft: 16,
            marginRight: 16,
            marginBottom: 16
          }}
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
      </SafeAreaView>
    );
  }
}

class Landing extends React.Component {
  constructor() {
    super();

    this.state = {
      ln: [],
      recipe: []
    };
  }

  componentDidMount() {
    const root = firebase.database().ref(),
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
				<View
				>
					<Text
						style={{
						fontSize: 16
						}}
					>
						{
							this.state.user ? this.state.user.email : "asdf"
						}
					</Text>
					<TouchableOpacity
					>
						<Text
							style={{
							fontSize: 16
							}}
						>
							Log Out
						</Text>
					</TouchableOpacity>
				</View>

        <Head />

				<View>
					<TouchableOpacity
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
						onPress={
							() => this.props.navigation.navigate(
								"SignIn"
							)
						}
					>
						<Text>
							Log In
						</Text>
					</TouchableOpacity>
				</View>

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

class Recipe extends React.Component {
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

      const { navigation } = this.props;
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

export default class App extends React.Component {
  render() {
    return <Cont />;
  }
}
