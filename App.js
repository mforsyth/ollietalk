import React from 'react';
import { StyleSheet, Text, View, Image, TouchableHighlight } from 'react-native';
// import Sound from 'react-native-sound';

export default class App extends React.Component {
  onPressImage = e => {
    console.log('clickHiImage');
  };

  render() {
    let pic = {
      uri: 'http://www.fluentu.com/blog/wp-content/uploads/2016/04/how-to-say-hello-in-different-languages.jpg',
    };
    return (
      <View style={styles.container}>
        <TouchableHighlight onPress={this.onPressImage}>
        <Image
          source={pic}
          style={{ width: 193, height: 110 }}
          />
        </TouchableHighlight>
        <Text>Hello Ollie!  It's Daddy!</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
