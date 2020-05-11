import os from 'os';
import { logFormats, networks } from './constants';

export interface Config {
  api: {
    port: number;
    whitelist: string[];
    maxRequestsPerSecond: number;
  };
  lisk: {
    network: typeof networks[number];
  };
  logging: {
    format: typeof logFormats[number];
    outputToConsole: boolean;
    outputToFile: boolean;
    logFile: string;
  };
  nodeCommands: {
    allow: boolean;
    key: string;
  };
}

export interface SystemInfo {
  hostname: string;
  loadAverage: number[];
  uptime: number;
  memory: {
    total: number;
    free: number;
  };
  disk: {
    total: number;
    free: number;
  };
  cpus: os.CpuInfo[];
  type: string;
  release: string;
}
