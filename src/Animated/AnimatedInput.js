//import liraries
import React, {Component, useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  Animated,
} from 'react-native';
import {widthToDp} from '../helpers/Responsive';
import * as Constant from '../helpers/Constants';
import * as Config from '../helpers/Config';

// create a component
const AnimatedInput = ({
  placeHolderText,
  showImage = false,
  onBlur,
  onFocus,
  inputMode,
  _onChangeText,
  secureText = false,
  containerWidth = widthToDp(90),
  imagePath,
  value,
  id,
  _onPressImage,
  keyboardType = 'default',
  defaultValue = null,
  editable = true,
  //   textHide = true,
}) => {
  const [imageAlter, setImageAlter] = useState(true);
  const [focus, setFocus] = useState();
  const [textLength, setTextLength] = useState('');

  const inputPosition = useRef(new Animated.Value(widthToDp(6))).current;
  const inputFontSize = useRef(new Animated.Value(widthToDp(5))).current;
  //   const [inputFontSize, setInputFontSize] = useState(new Animated.Value(widthToDp(4.5)));

  useEffect(() => {
    if (defaultValue) {
      setTextLength(defaultValue);
      handleInputFocus();
    }
  }, [defaultValue]);
  const handleInputFocus = () => {
    if (textLength?.length === 0) {
      console.log('handleInputFocus');
      Animated.parallel([
        Animated.timing(inputPosition, {
          toValue: widthToDp(3.8),
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(inputFontSize, {
          toValue: widthToDp(3.5),
          duration: 300,
          useNativeDriver: false,
        }),
      ]).start();
    }
    setFocus(true);
  };

  const handleInputBlur = () => {
    if (textLength?.length === 0) {
      console.log('handleInputBlur');
      Animated.parallel([
        Animated.timing(inputPosition, {
          toValue: widthToDp(6),
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(inputFontSize, {
          toValue: widthToDp(4.5),
          duration: 300,
          useNativeDriver: false,
        }),
      ]).start();
    }
    setFocus(false);
  };

  const _textChange = text => {
    _onChangeText(text);
    setTextLength(text);
  };
  // console.log('TExtLength Value==>', textLength);
  return (
    <View
      style={{
        ...styles.container,
        ...{
          borderBottomColor: focus
            ? Config?.input_text_focused_bottom_colored
            : Config?.input_text_blur_bottom_colored,
          width: containerWidth,
        },
      }}>
      <View style={styles.subContainer}>
        <Animated.View style={[{transform: [{translateY: inputPosition}]}]}>
          <Animated.Text
            style={{
              ...{fontSize: widthToDp(4)},
              ...{
                color: focus
                  ? Config?.input_text_focused_bottom_colored
                  : textLength.length > 0
                  ? Config?.input_text_focused_bottom_colored
                  : Config?.input_text_blur_bottom_colored,

                paddingHorizontal: widthToDp(0.8),
              },
            }}>
            {placeHolderText}
          </Animated.Text>
        </Animated.View>

        <View
          style={{
            ...styles.inputTextContainer,
            ...{
              //   borderBottomColor: focus
              //     ? Config?.input_text_focused_bottom_colored
              //     : Config?.input_text_blur_bottom_colored,
            },
          }}>
          <TextInput
            style={styles.textInput}
            // placeholder={placeHolderText}
            secureTextEntry={secureText ? imageAlter : false}
            onFocus={event => handleInputFocus()}
            onBlur={event => handleInputBlur()}
            onChangeText={text => _textChange(text)}
            value={value}
            keyboardType={keyboardType}
            defaultValue={defaultValue}
            editable={editable}
          />
          {/* {showImage ? (
            <TouchableOpacity onPress={() => _onPressImage(id)}>
              <Image
                style={styles.textImage}
                source={
                  !imagePath
                    ? imageAlter
                      ? Constant.hide_pass_icon
                      : Constant.visble_pass_icon
                    : imagePath
                }
              />
            </TouchableOpacity>
          ) : null} */}
        </View>
      </View>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    // backgroundColor: '#2c3e50',
    // marginBottom: widthToDp(3),
    paddingHorizontal: widthToDp(2),
    borderTopEndRadius: widthToDp(1),
    borderTopStartRadius: widthToDp(1),
    borderBottomWidth: widthToDp(0.6),
    backgroundColor: Config.buttonTextColor,
    height: widthToDp(16),
    justifyContent: 'center',
  },
  subContainer: {},
  textContainer: {
    position: 'absolute',
    zIndex: 99,
  },
  inputTextContainer: {
    flexDirection: 'row',
  },
  textInput: {
    width: '90%',
    fontSize: widthToDp(4.5),
    color: '#000',
  },
  textImage: {
    width: widthToDp(5),
    height: widthToDp(5),
    resizeMode: 'contain',
  },
});

//make this component available to the app
export default AnimatedInput;
