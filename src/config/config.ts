import fs from 'fs';
import { IConfig, ENVIRONMENT } from './models/config';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function populateSecretsFromEnv(config: any): IConfig {
  for(const key in config) {

    if(typeof config[key] === 'object') {
      populateSecretsFromEnv(config[key]);
    } else if(typeof config[key] === 'string' && config[key][0] === '$') {
      const keyName = config[key].substring(1);
      config[key] = process.env[keyName];
    }
  }

  return config;
}

function loadConfigurationFromFile() {
  const env = process.env.APP || ENVIRONMENT.LOCAL;
  const filePath = `${process.env.PWD}/src/config/env/${env}.json`;

  const file = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(file);
}

function load(): IConfig {
  const config = loadConfigurationFromFile();
  const populatedConfig: IConfig = populateSecretsFromEnv(config);

  return populatedConfig;
}

const config: IConfig = load();

export default config;