import {PermissionsAndroid, Platform} from 'react-native';
import {init, Geolocation} from 'react-native-amap-geolocation';
import axios from 'axios';
class Geo {
  async initGeo() {
    if (Platform.OS === 'android') {
      await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
      );
    }
    await init({
      // 高德地图key
      ios: '6f5fe05009fda0f4cb123c5b4d8b644e',
      android: '6f5fe05009fda0f4cb123c5b4d8b644e',
    });
    return Promise.resolve();
  }
  async getCurrentPosition() {
    return new Promise((resolve, reject) => {
      console.log('开始定位');
      Geolocation.getCurrentPosition(({coords}) => {
        resolve(coords);
      }, reject);
    });
  }
  async getCityByLocation() {
    await init({
      // 高德地图key
      ios: '6f5fe05009fda0f4cb123c5b4d8b644e',
      android: '6f5fe05009fda0f4cb123c5b4d8b644e',
    });
    const {longitude, latitude} = await this.getCurrentPosition();
    const res = await axios.get('https://restapi.amap.com/v3/geocode/regeo', {
      params: {
        location: `${longitude},${latitude}`,
        // 高德地图web_api key
        key: '83e9dd6dfc3ad5925fc228c14eb3b4d6',
      },
    });
    return Promise.resolve(res.data);
  }
}

export default new Geo();
