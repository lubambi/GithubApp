import React from 'react';
import {
    Image,
    TouchableOpacity,
    View,
    Text,
} from 'react-native';

export default class ViewUtils {
    static getLeftButton(callBack) {
        return (
            <TouchableOpacity
                style={{ padding: 8 }}
                onPress={callBack}
            >
                <Image
                    style={{ width: 26, height: 26 }}
                    source={require('../../res/images/ic_arrow_back_white_36pt.png')}
                />
            </TouchableOpacity>
        );
    }

    static getRightButton(title, callBack) {
        return (
            <TouchableOpacity
                style={{ alignItems: 'center' }}
                onPress={callBack}
            >
                <View style={{ marginRight: 10 }}>
                    <Text style={{ fontSize: 20, color: '#FFFFFF' }}>
                        {title}
                    </Text>
                </View>
            </TouchableOpacity>
        );
    }
}
