import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {pxToDp} from '../../utils/styleKits';
import SvgUri from 'react-native-svg-uri';
import {mela, famela} from '../../assets/res/font/iconSvg';
import {Input} from 'react-native-elements';
import DatePicker from 'react-native-datepicker';
import Picker from 'react-native-picker';
import CityJson from '../../static/citys.json';
import THBtn from '../../../components/ThBtn';
class userInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nickname: '', // 昵称
      gender: '男', // 性别
      birthday: '', //生日
      city: '', //城市
      header: '', //头像
      lng: '', // 经度
      lat: '', // 纬度
      address: '', // 详细地址
    };
  }
  // 选择性别
  changeGender = (gender) => {
    console.log(gender);
    this.setState({
      gender,
    });
  };
  // 选择城市
  getPosition = () => {
    Picker.init({
      pickerData: CityJson,
      selectedValue: ['北京', '北京'],
      wheelFlex: [1, 1, 0], // 显示省和市
      pickerConfirmBtnText: '确定',
      pickerCancelBtnText: '取消',
      pickerTitleText: '选择城市',
      onPickerConfirm: (data) => {
        // data =  [广东，广州，天河]
        this.setState({
          city: data[1],
        });
      },
    });
    Picker.show();
  };
  render() {
    const {gender, nickname, birthday, city} = this.state;
    const dateNow = new Date();
    const currentDate = `${dateNow.getFullYear()}-${
      dateNow.getMonth() + 1
    }-${dateNow.getDate()}`;
    return (
      <View style={{backgroundColor: '#fff', flex: 1, padding: pxToDp(20)}}>
        {/* 标题 */}
        <Text style={styles.headerTitle}> 填写资料 </Text>
        <Text style={styles.headerTitle}> 提升我的魅力 </Text>
        {/* 图标 */}
        <View style={{marginTop: pxToDp(20)}}>
          <View
            style={{
              width: '50%',
              alignSelf: 'center',
              flexDirection: 'row',
              justifyContent: 'space-around',
            }}>
            <TouchableOpacity
              onPress={this.changeGender.bind(this, '男')}
              style={[
                styles.iconView,
                {backgroundColor: gender == '男' ? 'red' : '#eee'},
              ]}>
              <SvgUri svgXmlData={mela} width="36" height="36" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={this.changeGender.bind(this, '女')}
              style={[
                styles.iconView,
                {backgroundColor: gender == '女' ? 'red' : '#eee'},
              ]}>
              <SvgUri svgXmlData={famela} width="36" height="36" />
            </TouchableOpacity>
          </View>
        </View>
        {/* 输入框 */}
        <View>
          <Input
            value={nickname}
            placeholder="昵称设置"
            keyboardType="default"
            onChangeText={(nickname) => {
              this.setState({nickname});
            }}
          />
          <DatePicker
            androidMode="spinner"
            style={{width: '100%'}}
            date={birthday}
            mode="date"
            placeholder="生日设置"
            format="YYYY-MM-DD"
            minDate="1900-01-01"
            maxDate={currentDate}
            confirmBtnText="确认"
            cancelBtnText="取消"
            customStyles={{
              dateIcon: {
                display: 'none',
              },
              dateInput: {
                marginLeft: pxToDp(10),
                borderWidth: 0,
                borderBottomWidth: pxToDp(1.1),
                alignItems: 'flex-start',
                justifyContent: 'center',
              },
              placeholderText: {
                fontSize: pxToDp(17),
                color: '#afafaf',
              },
              // ... You can check the source to find the other keys.
            }}
            onDateChange={(birthday) => {
              this.setState({birthday});
            }}
          />
          <TouchableOpacity onPress={this.getPosition.bind(this)}>
            <Input
              inputStyle={{
                color: '#666',
                marginTop: pxToDp(20),
                fontSize: pxToDp(17),
                padding: 0,
              }}
              placeholder="所在位置"
              disabled={true}
              value={'当前位置：' + city}
            />
          </TouchableOpacity>
          <View>
            <THBtn
              style={{
                height: pxToDp(40),
                borderRadius: pxToDp(20),
                alignSelf: 'center',
              }}>
              设置头像
            </THBtn>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  headerTitle: {
    fontWeight: 'bold',
    color: '#666',
    fontSize: pxToDp(20),
  },
  iconView: {
    width: pxToDp(60),
    height: pxToDp(60),
    borderRadius: pxToDp(30),
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default userInfo;
