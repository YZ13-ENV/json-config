import { DeepReadonly } from "ts-essentials";

export type JSONConfigItems = Record<string, JSONConfigValue>;
export type JSONConfigValue =
  | string
  | number
  | boolean
  | null
  | { [x: string]: JSONConfigValue }
  | JSONConfigValue[];

export interface JSONConfigClient {
  /**
   * Read a single value.
   *
   * @param key - the key to read
   * @returns the value stored under the given key, or undefined
   */
  get: <T = JSONConfigValue>(
    key: string
  ) => Promise<DeepReadonly<T> | undefined>;
  /**
   * Reads multiple or all values.
   *
   * Allows you to read all or only selected keys of an Edge Config at once.
   *
   * @param keys - the keys to read
   * @returns Returns all entries when called with no arguments or only entries matching the given keys otherwise.
   */
  getAll: <T = JSONConfigItems>(keys?: (keyof T)[]) => Promise<DeepReadonly<T>>;
  /**
   * Check if a given key exists in the Edge Config.
   *
   * @param key - the key to check
   * @returns true if the given key exists in the Edge Config.
   */
  has: (key: string) => Promise<boolean>;
}
