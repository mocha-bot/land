import { describe, expect, test } from '@jest/globals';

import { catchy } from './catchy';

async function getUser() {
  throw new Error('user not found');
}

async function getMetadata() {
  return Promise.resolve('metadata found!');
}

describe('Catchy Module - Single Function', () => {
  test('Given a promise that throws an error, when calling catchy, then it should return the error', async () => {
    const [err, user] = await catchy(getUser());
    expect(err).toBeInstanceOf(Error);
    expect(user).toBeUndefined();
  });

  test('Given a promise that resolves, when calling catchy, then it should return the value', async () => {
    const [err, metadata] = await catchy(getMetadata());
    expect(err).toBeUndefined();
    expect(metadata).toBe('metadata found!');
  });

  test('Given a promise that throws an error, when calling catchy with an error to catch, then it should return the error', async () => {
    const [err, user] = await catchy(getUser(), [Error]);
    expect(err).toBeInstanceOf(Error);
    expect(user).toBeUndefined();
  });
});

describe('Catchy Module - Multiple Functions', () => {
  test('Given a multiple function calls, when some of them throw an error, then it should return the first error', async () => {
    const [errMetadata, metadata] = await catchy(getMetadata());
    expect(errMetadata).toBeUndefined();
    expect(metadata).toBe('metadata found!');

    const [errUser, user] = await catchy(getUser());
    expect(errUser).toBeInstanceOf(Error);
    expect(user).toBeUndefined();
  });

  test('Given a multiple function calls, when some of them throw an error, then it should return the first error', async () => {
    const [errUser, user] = await catchy(getUser());
    expect(errUser).toBeInstanceOf(Error);
    expect(user).toBeUndefined();

    const [errMetadata, metadata] = await catchy(getMetadata());
    expect(errMetadata).toBeUndefined();
    expect(metadata).toBe('metadata found!');
  });
});
