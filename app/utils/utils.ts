// ---------------------
// ----- Functions -----
// ---------------------

/**
 * Hides sensitive data from the given object.
 */
export function hideSensitiveData<T>(data: T): T {
  if (typeof data === 'object' && data !== null) {
    const clonedData = structuredClone(data);

    if ('password' in clonedData) {
      clonedData.password = '<<REDACTED>>';
    }

    return clonedData;
  }

  return data;
}

/**
 * Sleeps for the given number of milliseconds.
 * @default 1000ms
 */
export async function sleep(ms: number = 1000): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
