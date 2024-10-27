/* eslint-disable prefer-promise-reject-errors */
import type { AxiosRequestConfig } from 'axios';
import baseAxios, { AxiosError } from 'axios';
import type { ADT } from 'ts-adt';
import type { z } from 'zod';
import { ZodError } from 'zod';

export type APIError = ADT<{
  DECODE_ERROR: { message: string };
  UNKNOWN_ERROR: { message: string };
  AXIOS_ERROR: { message: string };
}>;

type Axios = <TSchema extends z.ZodTypeAny>(
  config: AxiosRequestConfig,
  schema: TSchema,
) => Promise<z.infer<typeof schema>>;

export const axios: Axios = (config, schema) => {
  return new Promise((resolve, reject) => {
    baseAxios({
      ...config,
      headers: {
        ...config.headers,
        'Access-Control-Allow-Origin': '*',
      },
    })
      .then((response) => {
        const user = schema.parse(response.data);
        resolve(user);
      })
      .catch((err) => {
        if (err instanceof ZodError) {
          reject({
            _type: 'DECODE_ERROR',
            message: JSON.stringify(err.errors),
          });
        }
        if (err instanceof AxiosError) {
          reject({
            _type: 'AXIOS_ERROR',
            message: err.message,
          });
        }
        reject({ _type: 'UNKNOWN_ERROR', message: 'Unknown err' });
      });
  });
};
