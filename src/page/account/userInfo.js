import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {pxToDp} from '../../utils/styleKits';
import SvgUri from 'react-native-svg-uri';
import {mela, famela} from '../../assets/res/font/iconSvg';
import {Input} from 'react-native-elements';
import DatePicker from 'react-native-datepicker';
import Picker from 'react-native-picker';
import CityJson from '../../static/citys.json';
import THBtn from '../../../components/ThBtn';
import Toast from '../../utils/Toast';
// import ImagePicker from 'react-native-image-crop-picker';
import {Overlay} from 'teaset';
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
  componentDidMount() {}
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
  // 选择头像
  chooeseHeadImg = async () => {
    const {nickname, birthday, city} = this.state;
    // 选项验证是否为空
    if (!nickname || !birthday || !city) {
      Toast.sad('选项内容不能为空', 2000, 'center');
      return;
    }
    // ImagePicker.openPicker({
    //   width: 300,
    //   height: 400,
    //   cropping: true,
    // }).then((image) => {
    //   console.log(image);
    // });
    let overlayView = (
      <Overlay.View
        style={{flex: 1, backgroundColor: '#000'}}
        modal={true}
        overlayOpacity={0}
        ref={(v) => (this.overlayView = v)}>
        <View
          style={{
            marginTop: pxToDp(30),
            alignSelf: 'center',
            width: pxToDp(334),
            height: pxToDp(334),
            position: 'relative',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            style={{
              width: '100%',
              height: '100%',
              position: 'absolute',
              top: 0,
              left: 0,
              zIndex: 100,
            }}
            source={require('../../assets/res/scan.gif')}
          />
          <Image
            style={{width: '60%', height: '60%'}}
            source={{
              uri:
                'data:image/jpeg;base64,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',
            }}
          />
        </View>
      </Overlay.View>
    );
    Overlay.show(overlayView);
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
              onPress={this.chooeseHeadImg.bind(this)}
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
