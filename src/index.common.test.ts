import fetchMock from "jest-fetch-mock";
import { get, getAll } from "./index";

fetchMock.enableMocks();

const URL = "https://json.yz13.space";
const CONFIG_ID = process.env.JSON_CONFIG_ID;

describe("getAll", () => {
  it("should fetch entire json", async () => {
    fetchMock.mockResponse(JSON.stringify({}));
    await expect(getAll()).resolves.toEqual({});
    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock).toHaveBeenCalledWith(`${URL}/${CONFIG_ID}/json`, {
      method: "GET",
    });
  });
});

describe("get", () => {
  describe("if item exist", () => {
    it("should fetch info by passed key", async () => {
      fetchMock.mockResponse(JSON.stringify({ number: 1 }));
      await expect(get("number")).resolves.toEqual(1);
      expect(fetchMock).toHaveBeenCalledTimes(2);
      expect(fetchMock).toHaveBeenCalledWith(`${URL}/${CONFIG_ID}/json`, {
        method: "GET",
      });
    });
  });
  describe("if item not exist", () => {
    it("should fetch info by passed key", async () => {
      fetchMock.mockResponse(JSON.stringify({ number: 1 }));
      await expect(get("_")).resolves.toEqual(undefined);
      expect(fetchMock).toHaveBeenCalledTimes(3);
      expect(fetchMock).toHaveBeenCalledWith(`${URL}/${CONFIG_ID}/json`, {
        method: "GET",
      });
    });
  });
});

// describe("has", () => {
//   describe("if item exist", () => {
//     it("should fetch json and check if this json has passed key", async () => {
//       await expect(has("number")).resolves.toEqual(true);
//     });
//   });
//   describe("if item not exist", () => {
//     it("should fetch json and check if this json has passed key", async () => {
//       await expect(has("_")).resolves.toEqual(false);
//     });
//   });
// });
