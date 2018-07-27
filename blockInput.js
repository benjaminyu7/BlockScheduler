import React, {Component} from 'react';
import {Text,View,StyleSheet,TextInput,Button, AsyncStorage} from 'react-native';

export default class BlockInput extends React.Component<props> {
	constructor(func){
		super();
		this.state = {title: "", description: ""};
		this.setBlock = this.setBlock.bind(this);
		this.changeState=func;
	}
	setBlock(){
		//Updates the parent's state
		this.props.func(this.state.title,this.state.description);
	}
	render() {
		return (
			<View>
				<TextInput placeholder='Title' onChangeText={(text)=>this.setState({title:text})}/>
			        <TextInput placeholder='Description' onChangeText={(text)=>this.setState({description:text})}/>
				<Button onPress={this.setBlock} title='Make a block!'/>
			</View>
		);
	}
}
			
