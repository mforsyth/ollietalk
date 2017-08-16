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
  constructor(props) {
    super(props);
    this.loadLayout('./assets/layouts/hello.json');
  }

  playSound = async sound => {
    try {
      const { soundObject, status } = await Audio.Sound.create(require(sound), {
        shouldPlay: true,
      });
      // Your sound is playing!
    } catch (error) {
      console.log(error);
    }
  };

  onPressImage = sound => e => {
    console.log('clickHiImage');
    this.playSound(sound);
  };

  loadLayout = async uri => {
    try {
      // let response = await fetch(uri);
      // let responseJson = await response.json();
      console.log('loadLayout uri', uri);
      let responseJson = require(uri);
      this.setState({ layout: responseJson });
      console.log('state is', this.state);
    } catch (error) {
      console.error(error);
    }
  };

  render() {
    let layout = this.state ? this.state.layout : [];
    return (
      <View style={styles.container}>
        <Text>Stuff:</Text>
        {layout.map(pic =>
          <div>
            <TouchableHighlight onPress={this.onPressImage(pic.sound)}>
              <Image
                source={{ uri: pic.image }}
                style={{ width: 193, height: 110 }}
              />
            </TouchableHighlight>
            <Text>
              {pic.caption}
            </Text>
          </div>,
        )}
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
