import { View, Text, TextInput } from 'react-native'
import React from 'react'
import { widthToDp } from '../helpers/Responsive'
import * as Config from '../helpers/Config';
const CustomInput = ({
    commonWidth = widthToDp(100),
    commonHeight = widthToDp(10),
    borderColor = Config.Colors.themeColor,
    onChangeText,
    inputValue,
    placeholder,
    keyboardType,
    autoComplete,
    errorMessage,
    numberOfLines,
    autoCapitalize,
    leftImage,
    tintColor,
    rightImage,
    commmonBorderRadius = widthToDp(2),
    commonBackgroundColor,
    CommonBorderWidth,
    commonElevation,
    onFocusFunction,
    editable = true,
    multiline = false,
    inputRef
}) => {

    return (
        <View
            style={{
                width: commonWidth,
                height: commonHeight,
                borderWidth: 1,
                borderRadius: commmonBorderRadius,
                backgroundColor: commonBackgroundColor,
                borderWidth: CommonBorderWidth,
                elevation: commonElevation,
            }}>
            {leftImage ?
                <View style={{
                    paddingLeft: 10,
                    justifyContent: 'center',
                    height: commonHeight,
                    width: commonWidth,
                    position: 'absolute'
                }}>
                    <Image source={leftImage} style={{
                        width: 20,
                        height: 20,
                        tintColor: { tintColor }
                    }} />
                </View>
                : null}
            <TextInput
            ref={inputRef}
                editable={editable}
                style={{
                    width: commonWidth,
                    // height: commonHeight,
                    paddingLeft: leftImage ? 50 : 15,
                    fontFamily: Config.fontFamilys.Poppins_Light,
                    borderWidth: 1,
                    borderColor: borderColor,
                    borderRadius: commmonBorderRadius,
                    color: Config.Colors.black,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
                enablesReturnKeyAutomatically={true}
                onFocus={onFocusFunction}
                placeholderTextColor={Config.Colors.black}
                onChangeText={(text) => onChangeText(text)}
                value={inputValue}
                placeholder={placeholder}
                keyboardType={keyboardType}
                autoComplete={autoComplete}
                // autoComplete='given-name'
                multiline={multiline}
                numberOfLines={numberOfLines}
                autoCapitalize={autoCapitalize}
            />
            {rightImage ?
                <View style={{
                    paddingLeft: 10,
                    justifyContent: 'center',
                    height: commonHeight,
                    width: commonWidth,
                    position: 'absolute'
                }}>
                    <Image source={rightImage} style={{
                        width: 20,
                        height: 20,
                        tintColor: { tintColor }
                    }} />
                </View>
                : null}
            {errorMessage ?
                <Text style={{ color: borderColor }}>{errorMessage}</Text>
                : null}
        </View>
    )
}

export default React.memo(CustomInput)