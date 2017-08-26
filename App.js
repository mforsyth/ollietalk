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
    pic.sound.play();
  };

  loadPicture = async p => {
    console.log('loadPicture', p);
    const { caption, image, sound } = p;
    const soundObject = Audio.Sound
      .create({
        uri: sound,
      })
      .then(s => {
        console.log('s is', s);
        s.loadAsync();
      });
    console.log('SoundObject', soundObject);
    return {
      caption,
      image,
      sound: soundObject,
    };
  };

  loadLayout = async uri => {
    try {
      let response = await fetch(uri);
      let responseJson = await response.json();
      await this.setState({ pictures: responseJson.map(this.loadPicture) });
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
            <TouchableHighlight onPress={this.onPressImage(pic)}>
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
