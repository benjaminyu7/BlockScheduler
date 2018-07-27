import React, {Component} from 'react';
import {Text,View,StyleSheet,AsyncStorage} from 'react-native';
import BlockInput from './blockInput';
import TodoBlock from './todoBlock';

class BlockContainer extends Component<Props> {
	constructor() {
		super();
		this.state={
			blockArray: null,
		};
		this.handleInput = this.handleInput.bind(this);
	}

	//get all the blocks from storage and set the block state 'blockArray'
	componentDidMount() {
		AsyncStorage.getItem('urgentImportant').then((value)=>this.setState({blockArray: JSON.parse(value)})); 
		console.log("MOUNT" + this.state.blockArray);
	}

	handleInput (newTitle,newDescription) {
		//input function for BlockInput as props
		console.log("WHAT IS THIS" + this.state.blockArray);
		var urgentImportant ; 
		if (this.state.blockArray === null) {
			this.setState({blockArray: [{title:newTitle, description:newDescription}]});
		} else {
			this.state.blockArray.push({title: newTitle , description: newDescription})
			this.setState((prevState)=>(  {blockArray: prevState.blockArray }));
		}
		console.log(this.state.blockArray);
		AsyncStorage.setItem('urgentImportant',JSON.stringify(this.state.blockArray));
	}


	//Sets the selected block state, for editing and deleting
	selectBlock (index) {
	}

	render() {
		//Takes the blockArray State and creates all of the blocks
		var blocks = [];
		var x;
		if (this.state.blockArray !== null) {
			for (x=0; x<this.state.blockArray.length; x++) {
				blocks.push(<TodoBlock key={x} title={this.state.blockArray[x].title} description={this.state.blockArray[x].description}/>);
				console.log(x);
			}
		}
		console.log("RENDER: " + this.state.blockArray);
			
		return(
			<View style={{alignItems: 'center'}}>
				<View style={todoStyle.container}>
					{blocks}
				</View>
				<BlockInput func={this.handleInput}/>
			</View>
		);
	}
}


const todoStyle = StyleSheet.create({
	container: {
		flexDirection: 'row',
		flexWrap: 'wrap',
	}
});

export {BlockContainer}
