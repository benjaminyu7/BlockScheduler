import React, {Component} from 'react';
import {Platform,ScrollView, StyleSheet, Text, View, Button, TextInput} from 'react-native';
import {TodoBlock} from './todoBlock';
import {BlockContainer} from './blockContainer.js';
import BlockInput from './blockInput';

type Props = {};
export default class App extends Component<Props> {
  constructor() {
	  super();
	  this.state={text: "",
	  	description: ""};
  }
  render() {
    return (
      <View style={styles.container} >
	    <BlockContainer/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#F5FCFF',
    flex: 1,
  },
});
