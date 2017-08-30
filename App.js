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

  onPressImage = pic => e => {
    console.log('onPressImage', pic);
    pic.sound.playAsync();
  };

  loadPicture = async p => {
    const { sound, status } = await Expo.Audio.Sound.create({
      uri: p.soundUri,
    });
    const retVal = { ...p, sound };
    console.log('retVal', retVal);
    return retVal;
  };

  loadLayout = async uri => {
    try {
      let response = await fetch(uri);
      let responseJson = await response.json();
      const pics = await Promise.all(responseJson.map(this.loadPicture));
      console.log('pics is', pics);
      this.setState({ pictures: pics });
    } catch (error) {
      console.error(error);
    }
  };

  render() {
    let pictures = this.state ? this.state.pictures : [];
    return (
      <View style={styles.container}>
        <Text>Stuff:</Text>
        {pictures.map(pic => (
          <View key={pic.caption}>
            <TouchableHighlight onPress={this.onPressImage(pic)}>
              <Image
                source={{ uri: pic.imageUri }}
                style={{ width: 193, height: 110 }}
              />
            </TouchableHighlight>
            <Text>{pic.caption}</Text>
          </View>
        ))}
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
