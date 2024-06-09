import type { DeepReadonly } from "ts-essentials";
import { JSONConfigClient, JSONConfigItems, JSONConfigValue } from "./types";
import { assertIsKey, assertIsKeys, hasOwnProperty, pick } from "./utils";

const URL = "https://json.yz13.space";
const CONFIG_ID = process.env.JSON_CONFIG_ID;
const CONFIG_API_KEY = process.env.JSON_CONFIG_API_KEY;
const json = {
  getAll: async <T = JSONConfigItems>(
    keys?: (keyof T)[]
  ): Promise<DeepReadonly<T>> => {
    try {
      const url = `${URL}/${CONFIG_ID}/json`;
      const response = await fetch(url, { method: "GET" });
      if (response.ok) {
        const json = await response.json();
        console.log(json);
        if (keys === undefined) {
          return Promise.resolve(json as DeepReadonly<T>);
        } else if (Array.isArray(keys)) {
          assertIsKeys(keys);
          const search = Array.isArray(keys)
            ? new URLSearchParams(
                keys.map((key) => ["key", key] as [string, string])
              ).toString()
            : null;
          if (search === "") return Promise.resolve({} as DeepReadonly<T>);
          return Promise.resolve(pick(json, keys) as DeepReadonly<T>);
        } else {
          assertIsKeys(keys);
          return Promise.resolve(pick(json, keys) as DeepReadonly<T>);
        }
      } else return Promise.resolve({} as DeepReadonly<T>);
    } catch (e) {
      console.error(e);
      return Promise.resolve({} as DeepReadonly<T>);
    }
  },
  get: async <T = JSONConfigValue>(
    key: string
  ): Promise<DeepReadonly<T> | undefined> => {
    const url = `${URL}/${CONFIG_ID}/json`;
    const response = await fetch(url, { method: "GET" });
    if (response.ok) {
      const json = await response.json();
      assertIsKey(key);
      if (!hasOwnProperty(json, key)) return Promise.resolve(undefined);
      return Promise.resolve(json[key] as DeepReadonly<T>);
    } else return Promise.resolve(undefined);
  },
  has: async (key: string): Promise<boolean> => {
    try {
      const all = await json.getAll();
      assertIsKey(key);
      return Promise.resolve(hasOwnProperty(all, key));
    } catch (e) {
      console.error(e);
      return false;
    }
  },
};

function init(): void {
  const ID_EXIST = typeof process !== "undefined" && process.env.JSON_CONFIG_ID;
  const API_KEY_EXIST =
    typeof process !== "undefined" && process.env.JSON_CONFIG_API_KEY;
  if (!ID_EXIST || !API_KEY_EXIST)
    throw new Error(
      "@yz13/json-config: Can't reach JSON_CONFIG_API_KEY or JSON_CONFIG_ID or both"
    );
}

export const get: JSONConfigClient["get"] = (...args) => {
  init();
  return json.get(...args);
};

export const getAll: JSONConfigClient["getAll"] = (...args) => {
  init();
  return json.getAll(...args);
};

export const has: JSONConfigClient["has"] = (...args) => {
  init();
  return json.has(...args);
};
