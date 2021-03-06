import React from "react";
import {
	View,
  SafeAreaView,
	ScrollView,
	Text,
	TextInput,
	TouchableOpacity,

	StyleSheet
} from "react-native";

import Head from "./head";
import Hr from "./hr";
import Ctrl from "./ctrl";
import DogEar from "./dogEar";

import style from "./style";

import * as firebase from "firebase";

export default class New extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			email: this.props.navigation.getParam("user", "...").email,
			author: this.props.navigation.getParam("user", "...").displayName,

			title: "",
			ingredient: [
				""
			],
			note: "",
			step: [
				{
					header: "",
					inst: ""
				}
			],

			errorMessage: null,

			user: this.props.navigation.getParam("user", "...")
		};
	}

  static navigationOptions = {
    headerLeft: null
  };

	post = () => {
		let i = firebase.database().ref().child("recipe").push(
			{
				"email": this.state.email,
				"author": this.state.author,

				"title": this.state.title,
				"ingredient": this.state.ingredient,
				"note": this.state.note,
				"step": this.state.step
			}
		).key;

		this.props.navigation.navigate(
			"Recipe",
			{
				i: i
			}
		);
	}

	render() {
		const styles = StyleSheet.create({
			head: {
				margin: 8,
				fontSize: 26
			},
			txt: {
				margin: 8
			},
			textInput: {
				padding: 8,
				margin: 8,
				height: 40,
				borderBottomWidth: 6,
				borderColor: "#303030"

				// borderWidth: 2,
				// borderColor: "grey"
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

				<Ctrl
					user={this.state.user}
					navigation={this.props.navigation}
				/>

				<Hr />

				<ScrollView>
					<View
						style={{
							padding: 8
						}}
					>
						<Text
							style={{
								fontSize: 26,
								margin: 8
							}}
						>
							Title
						</Text>

						<TextInput
							placeholder="Title"
							autoCapitalize="none"
							style={
								style.txtInput
							}
							onChangeText={
								title => this.setState({
									title: title
								})
							}
							value={
								this.state.title
							}
						/>

						<Text
							style={{
								fontSize: 26,
								margin: 8
							}}
						>
							Notes
						</Text>

						<TextInput
							placeholder="Notes"
							autoCapitalize="none"
							style={
								style.txtInput
							}
							onChangeText={
								note => this.setState({
									note: note
								})
							}
							value={
								this.state.note
							}
						/>

						<View>
							<Text
								style={
									styles.head
								}
							>
								Ingredients
							</Text>

							<TouchableOpacity
								onPress={
									() => {
										this.setState({
											ingredient: [
												...this.state.ingredient,
												""
											]
										});
									}
								}
							>
								<Text
									style={{
										margin: 8,
										color: "grey"
									}}
								>
									New
								</Text>
							</TouchableOpacity>

							<View>
								{
									this.state.ingredient.map((val, i) => {
										return (
											<TextInput
												key={i}
												placeholder="Ingredient"
												style={
													style.txtInput
												}
												onChangeText={
													(txt) => {
														this.state.ingredient[i] = txt;
													}
												}
											>
												{
													val.body
												}
											</TextInput>
										)
									})
								}
							</View>
						</View>

						<View>
							<Text
								style={
									styles.head
								}
							>
								Steps
							</Text>

							<TouchableOpacity
								onPress={
									() => {
										this.setState({
											step: [
												...this.state.step,
												{
													title: "",
													desc: ""
												}
											]
										});
									}
								}
							>
								<Text
									style={{
										margin: 8,
										color: "grey"
									}}
								>
									New
								</Text>
							</TouchableOpacity>

							<View>
								{
									this.state.step.map((val, i) => {
										return (
											<View
												key={i}
											>
												<Text
													style={{
														margin: 8,
														fontSize: 40
													}}
												>
													{
														i
													}
												</Text>

												<TextInput
													placeholder="Header"
													onChangeText={
														(txt) => {
															this.state.step[i]["title"] = txt;
														}
													}
													style={
														style.txtInput
													}
												>
													{
														val.name
													}
												</TextInput>

												<TextInput
													placeholder="Instructions"
													onChangeText={
														(txt) => {
															this.state.step[i]["desc"] = txt;
														}
													}
													style={
														style.txtInput
													}
												>
													{
														val.body
													}
												</TextInput>
											</View>
										)
									})
								}
							</View>
						</View>
					</View>

					<TouchableOpacity
						onPress={
							this.post
						}
						style={{
							padding: 8
						}}
					>
						<Text
							style={{
								margin: 8,
								color: "grey"
							}}
						>
							Enter
						</Text>
					</TouchableOpacity>
				</ScrollView>
			</SafeAreaView>
		);
	}
}
