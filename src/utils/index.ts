export function hasOwnProperty<X, Y extends PropertyKey>(
  obj: X,
  prop: Y
): obj is X & Record<Y, unknown> {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

export function pick<T, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> {
  const ret: Partial<T> = {};
  keys.forEach((key) => {
    ret[key] = obj[key];
  });
  return ret as Pick<T, K>;
}

export function assertIsKey(key: unknown): asserts key is string {
  if (typeof key !== "string") {
    throw new Error("@yz13/json-config: Expected key to be a string");
  }
}

export function assertIsKeys(keys: unknown): asserts keys is string[] {
  if (!Array.isArray(keys) || keys.some((key) => typeof key !== "string")) {
    throw new Error(
      "@yz13/json-config: Expected keys to be an array of string"
    );
  }
}
