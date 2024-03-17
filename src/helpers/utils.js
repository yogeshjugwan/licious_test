import { Alert, Linking, PermissionsAndroid, Platform } from 'react-native';
import { PERMISSIONS, RESULTS, request, requestMultiple } from 'react-native-permissions';

export const AlertBox = (
    title,
    textMessage,
    okText,
    OkOnPress,
    cancelText,
    cancelOnPress,
    askMeLaterText,
    askMeLaterOnPress
) => {
    return Alert.alert(title, textMessage, [
        askMeLaterText && {
            text: askMeLaterText,
            onPress: () => askMeLaterOnPress ? askMeLaterOnPress() : console.log('Ask me later pressed'),
        },
        cancelText && {
            text: cancelText,
            onPress: () => cancelOnPress ? cancelOnPress() : console.log('Cancel Pressed'),
            style: 'cancel',
        },
        okText && { text: okText, onPress: () => OkOnPress ? OkOnPress() : console.log('OK Pressed') },
    ])
}

export const toLocaleDateString = (val) => {
    let customDateTimeString = new Date(val);
    let date = val ? new Date(val) : new Date();
    let timestamp = Date.now();
    let toLocaleDateString = date.toLocaleDateString("en-us");
    let customValTimeString = date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })

    let day = date.getDate();
    let month_number = date.getMonth();
    let year = date.getFullYear();
    let h = date.getHours();
    let m = date.getMinutes();
    let s = date.getSeconds();
    let custonDate = `${year}-${month_number < 10 ? 0 : ''}${month_number + 1}-${day < 10 ? 0 : ''}${day}`
    var Days = ['Sun', 'Mon', 'Tues', 'Wed', 'Thu', 'Fri', 'Sat'];
    let day_name = Days[date.getDay()]
    let month_name = date.toLocaleString('default', { month: 'long' });
    let customDateTime = date.toLocaleDateString("en-us") + ' ' + h + ':' + m + ':' + s + ' ';
    let customTime = date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
    return { customDateTime, customTime, day, day_name, month_number, month_name, year, toLocaleDateString, customValTimeString, timestamp, custonDate }
}
