import React, {Component} from 'react';
import {TouchableOpacity, Picker,Text,View,StyleSheet,TextInput,Button, AsyncStorage} from 'react-native';

export default class BlockInput extends React.Component<props> {
	constructor(func, deleteBlock){
		super();
		this.state = {title: "", description: "",category:'urgentImportant', mode:'display'};
		this.setBlock = this.setBlock.bind(this);
		this.changeState=func;
		this.deleteBlock=deleteBlock;
		this.changeMode=this.changeMode.bind(this);
		this.deleteMode=this.deleteMode.bind(this);
	}
	setBlock(){
		//Updates the parent's state
		this.props.func(this.state.title,this.state.description, this.state.category);
		this.changeMode();
	}
	//Changes the mode of the input from display to blockInput
	changeMode(){
		if (this.state.mode === 'display') {
			this.setState((prevState)=>{return {mode: 'edit'};});
		} else {
			this.setState({mode: 'display'});
		}
	}
	//changes the mode and deletes the selected block
	deleteMode() {
		this.props.deleteBlock();
		this.changeMode();
	}
	render() {
		if (this.state.mode==='edit') {
			return (
				<View>
					<View style={{flexDirection: 'row'}}>
						<TextInput placeholder='Title' onChangeText={(text)=>this.setState({title:text})} style={{width:100}}/>
						<TextInput placeholder='Description' onChangeText={(text)=>this.setState({description:text})} style={{width:260}}/>

					</View>
					<View style={{flexDirection: 'row'}}>
						<View style={{width:80}}>
							<Button onPress={this.setBlock} title='Create'  />
						</View>
						<View style={{width:80}}>
							<Button onPress={this.deleteMode} title='Delete'  />
						</View>
						<Picker
							selectedValue={this.state.category}
							onValueChange={(itemValue, itemIndex)=>this.setState({category: itemValue})}
							style={{width:200 }}
						>
							<Picker.Item label='Urgent Important' value='urgentImportant' />
							<Picker.Item label='Important' value='important' />
							<Picker.Item label='Urgent Unimportant' value='urgentUnimportant' />
							<Picker.Item label='Unimportant' value='unimportant' />
						</Picker>
					</View>
				</View>
			);
		} else if (this.state.mode==='display') {
			return (
				<TouchableOpacity onPress={this.changeMode}>
					<Text>Input a block</Text>
				</TouchableOpacity>
			);
		}
	}
}
			
