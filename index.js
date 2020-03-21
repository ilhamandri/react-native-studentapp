import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import Routes from './source/Routes';

AppRegistry.registerComponent(appName, () => Routes);
