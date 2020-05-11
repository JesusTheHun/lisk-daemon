import { Config } from './types';
import { isLogFormatValid, isNetworkValid, stringListToArray } from './utils';

if (!isNetworkValid(process.env.NETWORK)) {
  throw new Error(`Invalid network ${process.env.NETWORK}`);
}

if (!isLogFormatValid(process.env.LOG_FORMAT)) {
  throw new Error(`Invalid logging format ${process.env.LOG_FORMAT}`);
}

const config: Config = {
  api: {
    port: Number(process.env.API_PORT) || 8765,
    whitelist: [ ...stringListToArray(process.env.WHITELIST), '127.0.0.1', '::1', '::ffff:127.0.0.1' ],
    maxRequestsPerSecond: Number(process.env.API_PORT) || 3
  },
  lisk: {
    network: process.env.NETWORK || 'testnet' // 'mainnet' | 'testnet'
  },
  logging: {
    format: process.env.LOG_FORMAT || 'common', // 'combined' | 'common' | 'dev' | 'short' | 'tiny'
    outputToConsole: process.env.LOG_TO_CONSOLE === 'true',
    outputToFile: process.env.LOG_TO_FILE === 'true',
    logFile: process.env.LOG_FILE || '../logs/access.log'
  },
  nodeCommands: {
    allow: process.env.ALLOW_COMMAND === 'true',
    key: process.env.COMMAND_KEY || '' // use empty string for no authentication
  }
};

export default config;
