import React from 'react';
import {View, Text, Image, StatusBar, StyleSheet} from 'react-native';
import {pxToDp} from '../../utils/styleKits';
import {Input} from 'react-native-elements';
import validate from '../../utils/validator';
import request from '../../utils/request';
import {ACCOUNT_LOGIN, ACCOUNT_VALIDATEVCODE} from '../../utils/api';
import ThBtn from '../../../components/ThBtn';
import {CodeField, Cursor} from 'react-native-confirmation-code-field';
import Toast from '../../utils/Toast';
class Login extends React.Component {
  constructor(prop) {
    super(prop);
    this.state = {
      phoneNumber: '13539074422',
      phoneValid: true,
      showLogin: true,
      vcodeTxt: '',
      countTxt: '',
      isCountDowning: false,
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
    if (res.code == '10000') {
      this.setState({
        showLogin: false,
      });
      this.countDown();
    }
  };
  // 倒计时
  countDown = () => {
    if (this.state.isCountDowning) {
      return;
    }
    let setCount = 60;
    this.setState({
      countTxt: `重新获取（${setCount}s）`,
      isCountDowning: true,
    });
    let timeId = setInterval(() => {
      setCount--;
      this.setState({
        countTxt: `重新获取（${setCount}s）`,
      });
      // setCount === 0 && clearInterval(timeId);
      if (setCount === 0) {
        this.setState({
          countTxt: '重新获取',
          isCountDowning: false,
        });
        clearInterval(timeId);
      }
    }, 1000);
  };
  // 输入验证码
  handleChangeVcode = (e) => {
    this.setState({
      vcodeTxt: e,
    });
    console.log(this.state.vcodeTxt);
  };
  // 重新获取验证码
  reGetVcode = () => {
    this.countDown();
  };
  // 确认输入验证码
  vcodeSubmitEditing = async () => {
    const {vcodeTxt, phoneNumber} = this.state;
    if (vcodeTxt.length < 6) {
      Toast.message('验证码错误', 2000);
      return;
    }
    const res = await request.post(ACCOUNT_VALIDATEVCODE, {
      phone: phoneNumber,
      vcode: vcodeTxt,
    });
    console.log(res);
    const {data, code} = res;
    if (code != '10000') {
      return;
    }
    if (data.isNew) {
      this.props.navigation.navigate('UserInfo');
      console.log(this.props);
    } else {
      alert('老用户');
    }
  };
  // 渲染登录页面
  renderLogin = () => {
    const {phoneNumber, phoneValid} = this.state;
    return (
      <>
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
        <View>
          <ThBtn
            onPress={this.phoneSubmitEditing}
            style={{
              width: '85%',
              height: pxToDp(40),
              alignSelf: 'center',
              borderRadius: pxToDp(20),
            }}>
            获取验证码
          </ThBtn>
        </View>
      </>
    );
  };
  // 渲染验证模块
  renderVCode = () => {
    const {phoneNumber, vcodeTxt, countTxt, isCountDowning} = this.state;
    return (
      <View>
        <View>
          <Text
            style={{color: '#888', fontWeight: 'bold', fontSize: pxToDp(20)}}>
            输入6位验证码
          </Text>
        </View>
        <View style={{marginTop: pxToDp(5)}}>
          <Text style={{color: '#888', fontSize: pxToDp(14)}}>
            已发到 +86 {phoneNumber}
          </Text>
        </View>
        <View>
          <CodeField
            value={this.state.vcodeTxt}
            onChangeText={this.handleChangeVcode}
            onSubmitEditing={this.vcodeSubmitEditing}
            cellCount={6}
            rootStyle={styles.codeFieldRoot}
            keyboardType="number-pad"
            textContentType="oneTimeCode"
            renderCell={({index, symbol, isFocused}) => (
              <Text
                key={index}
                style={[styles.cell, isFocused && styles.focusCell]}>
                {symbol || (isFocused ? <Cursor /> : null)}
              </Text>
            )}
          />
        </View>
        <View style={{marginTop: pxToDp(15)}}>
          <ThBtn
            onPress={this.reGetVcode}
            disabled={isCountDowning}
            style={{
              width: '85%',
              height: pxToDp(40),
              alignSelf: 'center',
              borderRadius: pxToDp(20),
            }}>
            {countTxt}
          </ThBtn>
        </View>
      </View>
    );
  };
  render(h) {
    const {showLogin} = this.state;
    return (
      <>
        <View>
          <StatusBar backgroundColor="transparent" translucent={true} />
          <Image
            style={{width: '100%', height: pxToDp(200)}}
            source={require('../../assets/res/profileBackground.jpg')}
          />
          <View style={{padding: pxToDp(20)}}>
            {showLogin ? this.renderLogin() : this.renderVCode()}
          </View>
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  root: {flex: 1, padding: 20},
  title: {textAlign: 'center', fontSize: 30},
  codeFieldRoot: {marginTop: 20},
  cell: {
    width: 40,
    height: 40,
    lineHeight: 38,
    fontSize: 24,
    borderBottomWidth: 2,
    borderColor: '#00000030',
    textAlign: 'center',
    color: '#9933CC',
  },
  focusCell: {
    borderColor: '#9933CC',
  },
});

export default Login;
