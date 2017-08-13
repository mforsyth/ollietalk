import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
} from 'react-native';
import { Asset, Audio } from 'expo';

export default class App extends React.Component {
  playHello = async function() {
    try {
      const {
        soundObject,
        status,
      } = await Audio.Sound.create(require('./assets/sounds/hello.mp3'), {
        shouldPlay: true,
      });
      // Your sound is playing!
    } catch (error) {
      console.log(error);
    }
  };

  onPressImage = e => {
    console.log('clickHiImage');
    this.playHello();
  };

  render() {
    let pic = {
      uri:
        'http://www.fluentu.com/blog/wp-content/uploads/2016/04/how-to-say-hello-in-different-languages.jpg',
    };
    return (
      <View style={styles.container}>
        <TouchableHighlight onPress={this.onPressImage}>
          <Image source={pic} style={{ width: 193, height: 110 }} />
        </TouchableHighlight>
        <Text>Hello Ollie! It's Daddy!</Text>
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
