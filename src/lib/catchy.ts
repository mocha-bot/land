// this utility function wraps a promise and catches errors of a specific type.
// it makes your code more catch-strict and less error - prone
// since the `try-catch` must parse the errors to be caught
async function catchy<T, E extends new (message?: string) => Error>(
  promise: Promise<T>,
  errsToCatch?: Array<E>,
  verbose?: boolean,
): Promise<[undefined, T] | [InstanceType<E>]> {
  try {
    const v = await promise;
    return [undefined, v] as [undefined, T];
  } catch (err) {
    /* eslint-disable curly */
    /* eslint-disable no-console */
    if (verbose) console.error(err);

    if (errsToCatch === undefined) {
      return [err as InstanceType<E>];
    }

    if (errsToCatch.some((errType) => err instanceof errType)) {
      return [err as InstanceType<E>];
    }

    throw err;
  }
}

export { catchy };
