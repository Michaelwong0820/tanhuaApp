import React from 'react';
import {View} from 'react-native';
import Nav from './src/navigation/nav';
class App extends React.Component {
  render(h) {
    return (
      <View style={{flex: 1}}>
        <Nav />
      </View>
    );
  }
}
export default App;
