import { describe, expect, jest, test } from '@jest/globals';

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
  test('Given a multiple function calls, when some of them throw an error at the end, then it should return the error', async () => {
    const [errMetadata, metadata] = await catchy(getMetadata());
    expect(errMetadata).toBeUndefined();
    expect(metadata).toBe('metadata found!');

    const [errUser, user] = await catchy(getUser());
    expect(errUser).toBeInstanceOf(Error);
    expect(user).toBeUndefined();
  });

  test('Given a multiple function calls, when some of them throw an error at the beginning, then it should return the error', async () => {
    const [errUser, user] = await catchy(getUser());
    expect(errUser).toBeInstanceOf(Error);
    expect(user).toBeUndefined();

    const [errMetadata, metadata] = await catchy(getMetadata());
    expect(errMetadata).toBeUndefined();
    expect(metadata).toBe('metadata found!');
  });
});

describe('Catchy Module - Verbose Mode', () => {
  test('Given a promise that throws an error, when calling catchy with verbose mode, then it should return the error and log it', async () => {
    const consoleError = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});
    const [err, user] = await catchy(getUser(), undefined, true);

    expect(err).toBeInstanceOf(Error);
    expect(user).toBeUndefined();
    expect(consoleError).toHaveBeenCalled();

    consoleError.mockRestore();
  });

  test('Given a promise that resolves, when calling catchy with verbose mode, then it should return the value', async () => {
    const consoleError = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    const [err, metadata] = await catchy(getMetadata(), undefined, true);
    expect(err).toBeUndefined();
    expect(metadata).toBe('metadata found!');
    expect(consoleError).not.toHaveBeenCalled();

    consoleError.mockRestore();
  });
});
