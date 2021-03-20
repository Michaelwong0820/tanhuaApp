import React from 'react';
import {View, Text, Image, StatusBar} from 'react-native';
import {pxToDp} from '../../utils/styleKits';
import {Input} from 'react-native-elements';
import validate from '../../utils/validator';
import request from '../../utils/request';
import {ACCOUNT_LOGIN} from '../../utils/api';
class Login extends React.Component {
  constructor(prop) {
    super(prop);
    this.state = {
      phoneNumber: '',
      phoneValid: true,
    };
  }
  phoneNumberChangeText = (phoneNumber) => {
    this.setState({
      phoneNumber,
    });
  };
  // 手机号码输入完成
  phoneSubmitEditing = async () => {
    this.setState({
      phoneValid: true,
    });
    const {phoneNumber} = this.state;
    const isPhone = validate.validatePhone(phoneNumber);
    // 检验手机号是否正确
    if (!isPhone) {
      // 手机不正确
      this.setState({
        phoneValid: false,
      });
      return;
    }
    const res = await request.post(ACCOUNT_LOGIN, {phone: phoneNumber});
    console.log(res);
  };
  render(h) {
    const {phoneNumber, phoneValid} = this.state;
    return (
      <>
        <View>
          <StatusBar backgroundColor="transparent" translucent={true} />
          <Image
            style={{width: '100%', height: pxToDp(220)}}
            source={require('../../assets/res/profileBackground.jpg')}
          />
          <View style={{padding: pxToDp(20)}}>
            <View>
              <Text
                style={{
                  fontSize: pxToDp(20),
                  color: '#888',
                  fontWeight: 'bold',
                }}>
                手机号登录注册
              </Text>
            </View>
            <View style={{marginTop: pxToDp(20)}}>
              <Input
                placeholder="请输入手机号"
                leftIcon={{
                  type: 'font-awesome',
                  name: 'phone',
                  color: '#ccc',
                  fontSize: pxToDp(16),
                }}
                value={phoneNumber}
                inputStyle={{color: '#333'}}
                maxLength={11}
                keyboardType="phone-pad"
                errorMessage={phoneValid ? '' : '手机号码格式不正确'}
                onChangeText={this.phoneNumberChangeText}
                onSubmitEditing={this.phoneSubmitEditing}
              />
            </View>
          </View>
        </View>
      </>
    );
  }
}

export default Login;
