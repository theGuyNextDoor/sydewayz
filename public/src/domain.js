import { Platform } from 'react-native';

const DOMAIN = Platform.OS === 'android' ? 'http://10.0.2.2:3000' : 'http://localhost:3000';

export default DOMAIN;
