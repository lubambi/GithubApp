import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Text,
    ScrollView,
    TouchableOpacity,
    Image,
    Alert,
} from 'react-native';
import CheckBox from 'react-native-check-box';
import NavigationBar from '../../common/NavigationBar';
import ViewUtils from '../../util/ViewUtils';
import LanguageDao, { FLAG_LANGUAGE } from '../../expand/dao/languageDao';
import ArrayUtils from '../../util/ArrayUtils';

export default class CustomKeyPage extends Component {
    constructor(props) {
        super(props);
        this.languageDao = new LanguageDao(FLAG_LANGUAGE.flag_key);
        this.changeValues = [];
        this.state = {
            dataArray: [],
        };
    }

    componentDidMount() {
        this.loadData();
    }

    loadData() {
        this.languageDao.fetch()
            .then((result) => {
                this.setState({
                    dataArray: result,
                });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    onSave() {
        if (this.changeValues.length === 0) {
            this.props.navigation.pop();
            return;
        }
        this.languageDao.save(this.state.dataArray);
        this.props.navigation.pop();
    }

    renderView() {
        if (!this.state.dataArray || this.state.dataArray.length === 0) return false;
        const len = this.state.dataArray.length;
        const views = [];
        for (let i = 0, l = len - 2; i < l; i += 2) {
            views.push(
                <View key={i}>
                    <View style={styles.item}>
                        {
                            this.renderCheckBox(this.state.dataArray[i], i)
                        }
                        {
                            this.renderCheckBox(this.state.dataArray[i + 1], i + 1)
                        }
                    </View>
                    <View style={styles.line} />
                </View>,
            );
        }
        views.push(
            <View key={len - 1}>
                <View style={styles.item}>
                    {len % 2 === 0
                        ? this.renderCheckBox(this.state.dataArray[len - 2], len - 2)
                        : null}
                    {
                        this.renderCheckBox(this.state.dataArray[len - 1], len - 1)
                    }
                </View>
                <View style={styles.line} />
            </View>,
        );
        return views;
    }

    renderCheckBox(data, index) {
        const leftText = data.name;
        const isChecked = this.isRemoveKey ? false : data.checked;
        return (
            <CheckBox
                style={{ flex: 1, padding: 10 }}
                onClick={() => this.onClick(data, index)}
                leftText={leftText}
                isChecked={isChecked}
                checkedImage={<Image style={{ tintColor: '#6495ED' }} source={require('./img/ic_check_box.png')} />}
                unCheckedImage={(
                    <Image
                        style={{ tintColor: '#6495ED' }}
                        source={require('./img/ic_check_box_outline_blank.png')}
                    />
                )}
            />
        );
    }

    onClick(data, index) {
        const item = Object.assign({}, data, {
            checked: !data.checked,
        });
        let { dataArray } = this.state;
        dataArray.splice(index, 1, item);
        this.setState({
            dataArray,
        });
        ArrayUtils.updateArray(this.changeValues, item);
    }

    onBack() {
        if (this.changeValues.length === 0) {
            this.props.navigation.pop();
            return;
        }
        Alert.alert(
            '提示',
            '要保存修改吗？',
            [
                {
                    text: '不保存',
                    onPress: () => {
                        this.props.navigation.pop();
                    },
                },
                { text: '保存', onPress: () => { this.onSave(); } },
            ],
        );
    }

    render() {
        const rightButton = (
            <TouchableOpacity onPress={() => this.onSave()}>
                <View style={{ margin: 10 }}>
                    <Text style={styles.title}>
                    保存
                    </Text>
                </View>
            </TouchableOpacity>
        );
        return (
            <View style={styles.container}>
                <NavigationBar
                    title="自定义标签"
                    style={{ backgroundColor: '#6495ED' }}
                    leftButton={ViewUtils.getLeftButton(() => this.onBack())}
                    rightButton={rightButton}
                />
                <ScrollView>
                    {this.renderView()}
                </ScrollView>

            </View>);
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    tips: {
        fontSize: 29,
    },
    title: {
        fontSize: 20,
        color: 'white',
    },
    line: {
        height: 0.3,
        backgroundColor: 'darkgray',
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
    },
});
