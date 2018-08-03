import React, {Component} from 'react';
import {Picker,Text,View,StyleSheet,TextInput,Button, AsyncStorage} from 'react-native';

export default class BlockInput extends React.Component<props> {
	constructor(func, deleteBlock){
		super();
		this.state = {title: "", description: "",category:'urgentImportant'};
		this.setBlock = this.setBlock.bind(this);
		this.changeState=func;
		this.deleteBlock=deleteBlock;
	}
	setBlock(){
		//Updates the parent's state
		this.props.func(this.state.title,this.state.description, this.state.category);
	}
	render() {
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
						<Button onPress={this.props.deleteBlock} title='Delete'  />
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
	}
}
			
