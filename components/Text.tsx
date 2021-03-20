import React from 'react';
import {View, Text} from 'react-native';

class Demo extends React.Component {
  constructor(porp) {
    super(porp);
  }
  componentDidMount() {
    console.log('im');
    
  }
  render() {
    return (
      <View>
        <Text>Im text</Text>
      </View>
    );
  }
}

export default Demo;
