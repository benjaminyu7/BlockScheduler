import React, {Component} from 'react';
import {Text, View, StyleSheet, AsyncStorage, TouchableOpacity, Button, TextInput} from 'react-native';

class TipBar extends Component<Props> {
	constructor () {
		super();
		this.state={ currentTip: 0, tipArray: [], mode: 'display' };
		this.addTip = this.addTip.bind(this);
		this.changeMode = this.changeMode.bind(this);
		this.displayTip = this.displayTip.bind(this);
		this.deleteTip = this.deleteTip.bind(this);
	}

	componentDidMount() {
		//load the tips from the AsyncStorage
		AsyncStorage.getItem('tipJar').then((value)=>this.setState({tipArray:JSON.parse(value)}));
		if(this.state.tipArray===null) {
			this.setState({tipArray:[]});
		}
		setInterval(this.displayTip,3000);
	}

	displayTip() {
		if(this.state.tipArray!==null) {
			this.setState((prevState)=>({currentTip: (prevState.currentTip+1)%(prevState.tipArray.length)}));
		}
	}
	
	//adds a tip to the tip jar
	addTip () {
		if(this.state.tipArray!==null) {
			this.state.tipArray.push(this.state.newTip);
		} else {
			this.state.tipArray=[this.state.newTip];
		}
		this.setState((prevState)=>{{tipArray: prevState.tipArray}});
		//set the tips in the AsyncStorage
		AsyncStorage.setItem('tipJar',JSON.stringify(this.state.tipArray));
		this.changeMode();
	}

	deleteTip (toDelete) {
		this.state.tipArray.splice(toDelete, 1);
		this.setState((prevState)=>{{tipArray: prevState.tipArray}});
		AsyncStorage.setItem('tipJar',JSON.stringify(this.state.tipArray));
		this.changeMode();
	}
	//changes state to edit mode, double tap the tip
	changeMode () {
		if (this.state.mode === 'display') {
			this.setState((prevState)=>{return {mode: 'edit', editTip: prevState.currentTip};});
		} else {
			this.setState({mode: 'display'});
		}
	}
	render () {
		//This is the tip display that should change on an interval
		if(this.state.mode==='display') {
			if(this.state.tipArray!==null&&this.state.tipArray.length!==0) {
				return(
					<View>
						<View style={{height:20}}/>
						<TouchableOpacity onPress={this.changeMode} style={{flexDirection: 'row', height:20,}}>
							<Text style={{textAlign: 'center'}}>{this.state.tipArray[this.state.currentTip]}</Text>
						</TouchableOpacity>
					</View>
				);
			}
			else {
				return(
					<View>
						<View style={{height:20}}/>
						<TouchableOpacity onPress={this.changeMode} style={{flexDirection: 'row', height:20}}>
							<Text style={{flex: 1, textAlign: 'center'}}>Make some tips!</Text>
						</TouchableOpacity>
					</View>
				);
			}
		}
		//This is the edit mode
		else {
			return(
				<TouchableOpacity style={{flexDirection:'row',}} onPress={this.changeMode}>
					<Button onPress={this.deleteTip.bind(this,this.state.editTip)} title='Delete'/>
					<TextInput style={{width: 200}} placeholder='Input a Tip!' onChangeText={(text)=>this.setState({newTip:text})}/>
					<Button onPress={this.addTip} title='Make a tip'/>
				</TouchableOpacity>
			);
		}
	}
}
export {TipBar}
