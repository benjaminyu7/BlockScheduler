import React, {Component} from 'react';
import {ScrollView,Text,View,StyleSheet,AsyncStorage} from 'react-native';
import BlockInput from './blockInput';
import TodoBlock from './todoBlock';
import {TipBar} from './tipBar';

class BlockContainer extends Component<Props> {
	constructor() {
		super();
		this.state={
			blockArray: null,
			currentArray: null,
			selected: -1,
			directory: null, //the block directory located in
		};
		this.loadRoot = this.loadRoot.bind(this);
		this.handleInput = this.handleInput.bind(this);
		this.selectBlock = this.selectBlock.bind(this);
		this.deleteBlock = this.deleteBlock.bind(this);
		this.changeDirectory = this.changeDirectory.bind(this);
	}

	//get all the blocks from storage and set the block state 'blockArray'
	componentDidMount() {
		this.loadRoot();
	}

	loadRoot () {
		AsyncStorage.getItem('urgentImportant').then((value)=>this.setState({blockArray: JSON.parse(value), currentArray: JSON.parse(value), selected: -1, directory:null})); 
	}
	/*creates the block data object w/ title, description, category, and parent
	*/

	treeToStorage () {
		//transforms the current tree to storage
	}

	storageToTree () {
		//loads the tree from storage
	}

	handleInput (newTitle,newDescription,newCategory) {
		//input function for BlockInput as props
		var urgentImportant ; 
		var newObject = {title:newTitle, description:newDescription, category: newCategory, parentBlock: this.state.directory, childrenBlock: []};
		if (this.state.currentArray === null) {
			this.setState({blockArray: [newObject]});
		} else {
			this.state.currentArray.push(newObject)
			this.setState((prevState)=>(  {currentArray: prevState.currentArray }));
		}
		//handles the input when there's a parent directory
		if (this.state.directory!== null) {
			this.state.directory.childrenBlock.push(newObject);
		} else {
			this.state.blockArray.push(newObject);
		}
		AsyncStorage.setItem('urgentImportant',JSON.stringify(this.state.blockArray));
	}
	
	//changes the toodblock directory for the blocks which are displayed
	changeDirectory(index){
		//Go to the parent's directory
		if(this.state.directory!==null&&index===-2) {
			if(this.state.directory.parentBlock===null) {
				this.loadRoot();
			} else {
				//load the parent directory
				this.setState((prevState)=>{return {
					currentArray: prevState.directory.parentBlock.childrenBlock,
					directory: prevState.directory.parentBlock,
					selected: -1,
				}});
			}
		} 
		//Go to the child's directory
		else {
			//sets the array block with the parent and children
			this.setState((prevState)=>{return {
				currentArray: prevState.currentArray[prevState.selected].childrenBlock,
				directory: prevState.currentArray[prevState.selected],
				selected: -1,
			}});
		}
	}

	/*Sets the selected block state, for editing and deleting
	 Double tap: goes into the block's directory if it has children
	 If it's the parent block, go to the parent's parent
	 */
	selectBlock (index) {
		if (index===this.state.selected) {
			this.changeDirectory(index);
			this.setState({selected: -1});
		}
		this.setState({selected: index});
	}

	//Handles the deletion of a block
	deleteBlock () {
		if (this.state.selected !== -1) {
			this.state.currentArray.splice(this.state.selected,1);
			this.setState((prevState)=>({currentArray:prevState.currentArray, selected: -1}));
			AsyncStorage.setItem('urgentImportant',JSON.stringify(this.state.blockArray));
		}	
	}

	render() {
		//Takes the blockArray State and creates all of the blocks
		var blocks = [];
		var x = 0;
		//Create the list of blocks from the state of block data, 4 categories
		if(this.state.directory!==null) {
			blocks.push(<TodoBlock key={-2} title={this.state.directory.title} description={this.state.directory.description} func={this.selectBlock} index={-2} selected={this.state.selected} category={this.state.directory.category}/>);
		}
		if (this.state.currentArray !== null) {
			for (x=this.state.currentArray.length-1; x>=0; x--) {
				blocks.push(<TodoBlock key={x} title={this.state.currentArray[x].title} description={this.state.currentArray[x].description} func={this.selectBlock} index={x} selected={this.state.selected} category={this.state.currentArray[x].category}/>);
			}
		}
		return(
			<View style={{alignItems:'center', flexDirection: 'column',flex:1}}>
				<TipBar />
				<ScrollView contentContainerStyle={todoStyle.container}> 
					{blocks}
				</ScrollView>
				<BlockInput func={this.handleInput} deleteBlock={this.deleteBlock} />
				<Text> {this.state.selected}</Text>
			</View>
		);
	}
}


const todoStyle = StyleSheet.create({
	container: {
		width:360,
		flexDirection: 'row',
		flexWrap: 'wrap',
	},
});

export {BlockContainer}
