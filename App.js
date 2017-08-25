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
    this.loadLayout(
      'https://raw.githubusercontent.com/mforsyth/ollietalk/master/assets/layouts/hello.json',
    );
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
    console.log('clickHiImage', sound);
    this.playSound(sound);
  };

  loadLayout = async uri => {
    try {
      console.log('loadLayout uri', uri);
      let response = await fetch(uri);
      console.log('got response', response);
      let responseJson = await response.json();
      console.log('got responseJson', responseJson);
      this.setState({ pictures: responseJson });
      console.log('state is', this.state);
    } catch (error) {
      console.error(error);
    }
  };

  render() {
    let pictures = this.state ? this.state.pictures : [];
    return (
      <View style={styles.container}>
        <Text>Stuff:</Text>
        {pictures.map(pic =>
          <View key={pic.caption}>
            <TouchableHighlight onPress={this.onPressImage(pic.sound)}>
              <Image
                source={{ uri: pic.image }}
                style={{ width: 193, height: 110 }}
              />
            </TouchableHighlight>
            <Text>
              {pic.caption}
            </Text>
          </View>,
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
