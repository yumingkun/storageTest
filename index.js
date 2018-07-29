/** @format */

import {AppRegistry} from 'react-native';
// import App from './App';
import Storage from './page/Storage';
import {name as appName} from './app.json';
import './page/Init';//把storage设置成全局

AppRegistry.registerComponent(appName, () => Storage);
