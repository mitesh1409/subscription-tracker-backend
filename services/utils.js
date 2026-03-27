import { APP_ENV } from '../config/env.js';

const isProdEnv = () => APP_ENV === 'production';

export default isProdEnv;
