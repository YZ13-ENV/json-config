import fetchMock from "jest-fetch-mock";
import { get, getAll } from "./index";

describe("getAll", () => {
  it("should fetch entire json", async () => {
    fetchMock.mockResponse(JSON.stringify({}));
    await expect(getAll()).resolves.toEqual({});
  });
});

describe("get", () => {
  describe("if item exist", () => {
    it("should fetch info by passed key", async () => {
      fetchMock.mockResponse(JSON.stringify(""));
      await expect(get("string")).resolves.toEqual("");
    });
  });
  describe("if item not exist", () => {
    it("should fetch info by passed key", async () => {
      fetchMock.mockResponse(JSON.stringify(undefined));
      await expect(get("_")).resolves.toEqual(undefined);
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
