// 手机中的元素宽度 = 手机屏幕宽度 * 元素的宽度 / 设计稿的宽度
import {Dimensions} from 'react-native';

/**
 * 屏幕宽度
 * */
export const screenWidth = Dimensions.get('window').width;
/**
 * 屏幕高度
 *  */
export const screenHeight = Dimensions.get('window').height;

/**
 * @param {Number} elePx 元素宽度
 * */

export const pxToDp = (elePx) => (screenWidth * elePx) / 375;
