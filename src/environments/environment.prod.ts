import { Values } from 'src/app/core/models/fields';

const apiVersions: Values<string> = {
  v1: 'json_server',
  v2: 'django_backend'
}

const apiBaseUrls: Values<string> = {
  [apiVersions.v1]: 'http://localhost:3000/',
  [apiVersions.v2]: 'http://localhost:8000/'
}

export const environment = {
  production: true,
  apiVersions: apiVersions,
  defaultApiVersions: apiVersions.v1,
  apiBaseUrls: apiBaseUrls,
};
