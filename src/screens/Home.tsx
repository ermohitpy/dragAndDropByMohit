import React, {useEffect, useState} from 'react';
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {images} from '../assets';
import DragAndDrop from '../components/DragAndDrop';

interface inputValues {
  red: string;
  green: string;
  yellow: string;
  brown: string;
}

const Home = () => {
  const [textInputValues, setTextInputValues] = useState<inputValues>({
    red: '',
    green: '',
    yellow: '',
    brown: '',
  });
  const [timer, setTimer] = useState<number | void | any>(60);

  const handleDrop = (color: string) => {
    setTextInputValues(prev => ({...prev, [color.toLowerCase()]: color}));
  };

  useEffect(() => {
    const timerInterval = setInterval(() => {
      setTimer(prev => (prev === 0 ? clearInterval(timerInterval) : prev - 1));
    }, 1000);
    return () => clearInterval(timerInterval);
  }, []);

  const renderTextInput = (color: string) => (
    <View
      style={[
        styles.inputView,
        {
          borderStyle: textInputValues[color] !== '' ? 'solid' : 'dashed',
          backgroundColor: textInputValues[color] !== '' ? 'white' : '#f2f4ee',
        },
      ]}>
      <TextInput
        editable={false}
        placeholder="Drag answer here"
        placeholderTextColor={'lightgrey'}
        style={{width: '85%', height: 40}}
        value={textInputValues[color]}
      />
      {textInputValues[color] !== '' && (
        <TouchableOpacity
          onPress={() => setTextInputValues(prev => ({...prev, [color]: ''}))}>
          <Image
            source={require('../assets/cross.png')}
            style={[styles.img, {height: 20, width: 20}]}
          />
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity>
          <Image source={images.menu} resizeMode="cover" style={styles.img} />
        </TouchableOpacity>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image source={images.clock} style={styles.img} />
          <Text style={[styles.txt, {paddingLeft: 4}]}>{`00:${timer}`}</Text>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={[styles.txt, {fontSize: 18, color: '#a7d054'}]}>
            {'01'}
          </Text>
          <Text style={[styles.txt, {fontSize: 18}]}>{' of 07'}</Text>
        </View>
      </View>
      <View style={styles.first}>
        <Image
          source={images.satisfaction}
          style={[styles.img, {height: 20, width: 20}]}
        />
        <Text style={[styles.txt, {fontSize: 16, paddingLeft: 9}]}>
          {'Match the following'}
        </Text>
      </View>
      <View style={{flex: 1, margin: 15}}>
        <View style={{flexDirection: 'row'}}>
          <Text style={[styles.txt, {fontSize: 20, color: '#a7d054'}]}>
            {'02'}
          </Text>
          <Text style={[styles.txt, {fontSize: 20}]}>
            {'.  Fill the most appropriate word \nin the blanks.'}
          </Text>
        </View>
        <Text style={[styles.txt, {fontSize: 19, marginVertical: 20}]}>
          {'Apple'}
        </Text>
        {renderTextInput('red')}
        <Text style={[styles.txt, {fontSize: 19, marginVertical: 20}]}>
          {'Watermelon'}
        </Text>
        {renderTextInput('green')}
        <Text style={[styles.txt, {fontSize: 19, marginVertical: 20}]}>
          {'Banana'}
        </Text>
        {renderTextInput('yellow')}
        <Text style={[styles.txt, {fontSize: 19, marginVertical: 20}]}>
          {'Kiwi'}
        </Text>
        {renderTextInput('brown')}
        <View style={styles.colorBtnView}>
          {['Red', 'Green', 'Yellow', 'Brown'].map(color => (
            <DragAndDrop
              key={color}
              heading={color}
              onDrop={handleDrop}
              active={textInputValues[color.toLowerCase()] !== '' ? 1 : 0}
            />
          ))}
        </View>
        <TouchableOpacity
          style={{backgroundColor: '#a7d054', marginTop: 60, borderRadius: 8}}>
          <Text style={[styles.skipTxt, {color: 'white'}]}>{'Continue'}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.skipBtn}>
          <Text style={styles.skipTxt}>{'Skip'}</Text>
          <Image
            source={images.arrow}
            style={[styles.img, {height: 15, width: 15}]}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {backgroundColor: '#f2f4ee', flex: 1},
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  img: {height: 35, width: 37, resizeMode: 'contain'},
  txt: {fontSize: 30, color: 'black'},
  first: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 15,
    padding: 5,
    paddingVertical: 14,
    borderBottomWidth: 0.7,
    borderColor: 'lightgrey',
  },
  inputView: {
    backgroundColor: 'white',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'lightgrey',
    marginVertical: -12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  colorBtnView: {marginTop: 40, flexDirection: 'row', alignItems: 'center'},
  skipBtn: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  skipTxt: {textAlign: 'center', fontSize: 20, padding: 10, color: 'black'},
});

export default Home;
