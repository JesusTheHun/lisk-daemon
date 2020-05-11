import { Response } from 'express';
import os, { release } from 'os';
import crypto from 'crypto';
import * as disk from 'diskusage';
import util from 'util';

import { liskPath, networks, logFormats, snapshotServer } from '../constants';
import { SystemInfo } from '../types';

export const getSystemInfo = async (): Promise<SystemInfo> => {
  const path = os.platform() === 'win32' ? 'c:' : '/';

  const { total, free } = await disk.check(path);

  return {
    hostname: os.hostname(),
    loadAverage: os.loadavg(),
    uptime: os.uptime(),
    memory: { total: os.totalmem(), free: os.freemem() },
    disk: { total, free },
    cpus: os.cpus(),
    type: os.type(),
    release: release()
  };
};

export const bash = async (command: string): Promise<string> => {
  let sh = `bash ${liskPath}/lisk.sh ${command}`;

  if (command === 'rebuild') {
    sh = `bash ${liskPath}/lisk.sh ${command} -u ${snapshotServer}`;
  }

  const exec = util.promisify(require('child_process').exec);
  const { stdout } = await exec(sh);

  return stdout;
};

export const responseWrapper = (res: Response, status: number, message: string, data?: any): void => {
  res.status(status).send({ status, message, ...(data && { data }) });
};

export const hash = (data: string): string =>
  crypto
    .createHash('sha256')
    .update(data)
    .digest('hex');

export const isNetworkValid = (network: string | undefined): network is typeof networks[number] => {
  if (network === undefined) return false;
  return (networks as unknown as string[]).includes(network);
}

export const isLogFormatValid = (logFormat: string | undefined): logFormat is typeof logFormats[number] => {
  if (logFormat === undefined) return false;
  return (logFormats as unknown as string[]).includes(logFormat);
}

export const stringListToArray = (str: string | undefined): string[] => {
  if (str === undefined) return [];
  if (str.length === 0) return [];
  return str.split(',');
}
