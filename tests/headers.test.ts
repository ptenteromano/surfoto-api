import { expect } from "chai";
import * as H from "../src/headers";

const token = "testToken";

describe("getUnAuth", () => {
  it("should return the correct headers", () => {
    expect(H.getUnauth()).to.eql({
      method: "get",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
  });
});

describe("getJson", () => {
  it("should return the correct headers", () => {
    expect(H.getJson(token)).to.eql({
      method: "get",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        origin: "http://localhost:3000",
      },
    });
  });
});

describe("postNoTok", () => {
  it("should return the correct headers", () => {
    expect(H.postNoTok({})).to.eql({
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        origin: "http://localhost:3000",
      },
      body: JSON.stringify({}),
    });
  });
});

describe("postJson", () => {
  it("should return the correct headers", () => {
    expect(H.postJson(token, {})).to.eql({
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        origin: "http://localhost:3000",
      },
      body: JSON.stringify({}),
    });
  });
});

describe("postFile", () => {
  it("should return the correct headers", () => {
    const formData = new FormData();
    formData.append("test", "test");
    expect(H.postFile(token, formData)).to.eql({
      method: "post",
      headers: {
        Authorization: `Bearer ${token}`,
        origin: "http://localhost:3000",
      },
      body: JSON.stringify(formData),
    });
  });
});

describe("deleteJson", () => {
  it("should return the correct headers", () => {
    expect(H.deleteJson(token, {})).to.eql({
      method: "delete",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        origin: "http://localhost:3000",
      },
      body: JSON.stringify({}),
    });
  });
});

describe("patchJsonNoTok", () => {
  it("should return the correct headers", () => {
    expect(H.patchJsonNoTok({})).to.eql({
      method: "patch",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    });
  });
});

describe("patchJson", () => {
  it("should return the correct headers", () => {
    expect(H.patchJson(token, {})).to.eql({
      method: "patch",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        origin: "http://localhost:3000",
      },
      body: JSON.stringify({}),
    });
  });
});
