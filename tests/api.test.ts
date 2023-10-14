import { expect } from "chai";
import * as api from "../src/api";
import * as nock from "nock";

// Some of these mocks do not necessarily return their expected type structures.
const root = nock(api.WAVEBREAK_URL);

describe("getTokenFromResp", () => {
  const fakeBearerToken = "fakeBearerToken";
  const resp = new Response("body", {
    status: 200,
    headers: {
      Authorization: `Bearer ${fakeBearerToken}`,
      "Content-Type": "application/json",
    },
  } as ResponseInit);

  it("should return the token from the Authorization header", () => {
    const token = api.getTokenFromResp(resp as any);

    expect(token).to.equal(fakeBearerToken);
  });

  it("should return undefined if no token is found", () => {
    const token = api.getTokenFromResp(new Response("body", {}) as any);

    expect(token).to.be.undefined;
  });
});

describe("login", () => {
  describe("success", () => {
    const json = { status: 200, user: "testuser", token: "testtoken" };
    const headers = {
      Authorization: `Bearer ${json.token}`,
      "Content-Type": "application/json",
    };

    it("should return the token and status if the response is ok", async () => {
      root.post("/users/sign_in").reply(200, json, headers);
      const resp = await api.login({ email: "test", password: "test" });

      expect(resp).to.eql(json);
    });
  });

  describe("error paths", () => {
    it("should return an error if the fetch fails", async () => {
      root.post("/users/sign_in").replyWithError("Failed to fetch");
      const resp = await api.login({ email: "test", password: "test" });

      expect(resp).to.eql({
        error: `request to ${api.WAVEBREAK_URL}/users/sign_in failed, reason: Failed to fetch`,
      });
    });

    it("should return an error if the response has an error", async () => {
      root.post("/users/sign_in").reply(401, { error: "Unauthorized" });
      const resp = await api.login({ email: "test", password: "test" });

      expect(resp).to.eql({ error: "Unauthorized" });
    });
  });
});

describe("signup", () => {
  const request = {
    email: "test",
    password: "test",
    username: "username",
  };

  describe("success", () => {
    const json = {
      status: 200,
      user: "testuser",
      token: "testtoken",
      email: "test@test.com",
      message: "success",
    };
    const headers = {
      Authorization: `Bearer ${json.token}`,
      "Content-Type": "application/json",
    };

    it("should return the token and status if the response is ok", async () => {
      root.post("/users/sign_up").reply(200, json, headers);
      const resp = await api.signup(request);

      expect(resp).to.eql(json);
    });
  });

  describe("error paths", () => {
    it("should return an error if the fetch fails", async () => {
      root.post("/users/sign_up").replyWithError("Failed to fetch");
      const resp = await api.signup(request);

      expect(resp).to.eql({
        error: `request to ${api.WAVEBREAK_URL}/users/sign_up failed, reason: Failed to fetch`,
      });
    });

    it("should return an error if the response has an error", async () => {
      root.post("/users/sign_up").reply(401, { error: "Unauthorized" });
      const resp = await api.signup(request);

      expect(resp).to.eql({ error: "Unauthorized" });
    });
  });
});

describe("logout", () => {
  const request = "testtoken";

  describe("success", () => {
    it("should return true if the response is ok", async () => {
      root.delete("/users/sign_out").reply(200, {});
      const resp = await api.logout(request);

      expect(resp).to.be.true;
    });
  });

  describe("error paths", () => {
    it("should return false if the fetch fails", async () => {
      root.delete("/users/sign_out").replyWithError("Failed to fetch");
      const resp = await api.logout(request);

      expect(resp).to.be.false;
    });

    it("should return false if the response has an error", async () => {
      root.delete("/users/sign_out").reply(401, { error: "Unauthorized" });
      const resp = await api.logout(request);

      expect(resp).to.be.false;
    });
  });
});

describe("ensureAuth", () => {
  const request = "testtoken";

  describe("success", () => {
    it("should return true if the response is ok", async () => {
      root.get("/valid_token").reply(200, {});
      const resp = await api.ensureAuth(request);

      expect(resp).to.be.true;
    });
  });

  describe("error paths", () => {
    it("should return false if the fetch fails", async () => {
      root.get("/valid_token").replyWithError("Failed to fetch");
      const resp = await api.ensureAuth(request);

      expect(resp).to.be.false;
    });

    it("should return false if the response has an error", async () => {
      root.get("/valid_token").reply(401, { error: "Unauthorized" });
      const resp = await api.ensureAuth(request);

      expect(resp).to.be.false;
    });
  });
});

describe("confirmAccount", () => {
  const request = "testtoken";
  const endpoint = `/users/confirmation?confirmation_token=${request}`;

  describe("success", () => {
    it("should return true if the response is ok", async () => {
      root.get(endpoint).reply(200, { success: "success" });
      const resp = await api.confirmAccount(request);

      expect(resp).to.eql("success");
    });
  });

  describe("error paths", () => {
    it("should return false if the fetch fails", async () => {
      root.get(endpoint).replyWithError("Failed to fetch");
      const resp = await api.confirmAccount(request);

      expect(resp).to.eql(
        `request to ${api.WAVEBREAK_URL}${endpoint} failed, reason: Failed to fetch`
      );
    });

    it("should return false if the response has an error", async () => {
      root.get(endpoint).reply(401, { error: "Unauthorized" });
      const resp = await api.confirmAccount(request);

      expect(resp).to.eql("Unauthorized");
    });
  });
});

describe("requestResetPassword", () => {
  const request = "test@test.com";

  describe("success", () => {
    it("should return true if the response is ok", async () => {
      root.post("/users/password").reply(200, { success: "success" });
      const resp = await api.requestResetPassword(request);

      expect(resp).to.eq("Please check your email for a reset link");
    });
  });

  describe("error paths", () => {
    it("should return false if the fetch fails", async () => {
      root.post("/users/password").replyWithError("Failed to fetch");
      const resp = await api.requestResetPassword(request);

      expect(resp).to.eql(
        `request to ${api.WAVEBREAK_URL}/users/password failed, reason: Failed to fetch`
      );
    });

    it("should return false if the response has an error", async () => {
      root.post("/users/password").reply(401, { error: "Unauthorized" });
      const resp = await api.requestResetPassword(request);

      expect(resp).to.eql("Unauthorized");
    });
  });
});

describe("resetPassword", () => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: "Bearer testToken",
  };
  describe("success", () => {
    it("should return true if the response is ok", async () => {
      root.patch("/users/password").reply(200, { success: "success" }, headers);
      const resp = await api.resetPassword("testToken", "testPassword");

      expect(resp).to.eql({ success: "success", token: "testToken" });
    });
  });

  describe("error paths", () => {
    it("should return false if the fetch fails", async () => {
      root.patch("/users/password").replyWithError("Failed to fetch");
      const resp = await api.resetPassword("testToken", "testPassword");

      expect(resp).to.eql(
        `request to ${api.WAVEBREAK_URL}/users/password failed, reason: Failed to fetch`
      );
    });

    it("should return false if the response has an error", async () => {
      root.patch("/users/password").reply(401, { error: "Unauthorized" });
      const resp = await api.resetPassword("testToken", "testPassword");

      expect(resp).to.eql({ error: "Unauthorized" });
    });
  });
});

describe("fetchPhotos", () => {
  const endpoint = "/photos/index/1?limit=15";

  describe("success", () => {
    it("should return the photos if the response is ok", async () => {
      root.get(endpoint).reply(200, { photos: "photos" });
      const resp = await api.fetchPhotos(1);

      expect(resp).to.eql({ photos: "photos" });
    });
  });

  describe("error paths", () => {
    it("should return an error if the fetch fails", async () => {
      root.get(endpoint).replyWithError("Failed to fetch");
      const resp = await api.fetchPhotos(1);

      expect(resp).to.eql({
        error: `request to ${api.WAVEBREAK_URL}${endpoint} failed, reason: Failed to fetch`,
      });
    });

    it("should return an error if the response has an error", async () => {
      root.get(endpoint).reply(401, { error: "Unauthorized" });
      const resp = await api.fetchPhotos(1);

      expect(resp).to.eql({ error: "Unauthorized" });
    });
  });
});

describe("fetchPhotoById", () => {
  describe("success", () => {
    it("should return the photo if the response is ok", async () => {
      root.get("/photos/1").reply(200, { photo: "photo" });
      const resp = await api.fetchPhotoById("testToken", "1");

      expect(resp).to.eql({ photo: "photo" });
    });
  });

  describe("error paths", () => {
    it("should return an error if the fetch fails", async () => {
      root.get("/photos/1").replyWithError("Failed to fetch");
      const resp = await api.fetchPhotoById("testToken", "1");

      expect(resp).to.eql({
        error: `request to ${api.WAVEBREAK_URL}/photos/1 failed, reason: Failed to fetch`,
      });
    });

    it("should return an error if the response has an error", async () => {
      root.get("/photos/1").reply(401, { error: "Unauthorized" });
      const resp = await api.fetchPhotoById("testToken", "1");

      expect(resp).to.eql({ error: "Unauthorized" });
    });
  });
});

describe("createPhoto", () => {
  describe("success", () => {
    it("should return the photo if the response is ok", async () => {
      root.post("/photos").reply(200, { photo: "photo" });
      const resp = await api.createPhoto("testToken", new FormData());

      expect(resp).to.eql({ photo: "photo" });
    });
  });

  describe("error paths", () => {
    it("should return an error if the fetch fails", async () => {
      root.post("/photos").replyWithError("Failed to fetch");
      const resp = await api.createPhoto("testToken", new FormData());

      expect(resp).to.eql({
        error: `request to ${api.WAVEBREAK_URL}/photos failed, reason: Failed to fetch`,
      });
    });

    it("should return an error if the response has an error", async () => {
      root.post("/photos").reply(401, { error: "Unauthorized" });
      const resp = await api.createPhoto("testToken", new FormData());

      expect(resp).to.eql({ error: "Unauthorized" });
    });
  });
});

describe("bulkCreatePhotos", () => {
  describe("success", () => {
    it("should return the photo if the response is ok", async () => {
      root.post("/photos/bulk").reply(200, { photos: "photos" });
      const resp = await api.bulkCreatePhotos("testToken", new FormData());

      expect(resp).to.eql({ photos: "photos" });
    });
  });

  describe("error paths", () => {
    it("should return an error if the fetch fails", async () => {
      root.post("/photos/bulk").replyWithError("Failed to fetch");
      const resp = await api.bulkCreatePhotos("testToken", new FormData());

      expect(resp).to.eql({
        error: `request to ${api.WAVEBREAK_URL}/photos/bulk failed, reason: Failed to fetch`,
      });
    });

    it("should return an error if the response has an error", async () => {
      root.post("/photos/bulk").reply(401, { error: "Unauthorized" });
      const resp = await api.bulkCreatePhotos("testToken", new FormData());

      expect(resp).to.eql({ error: "Unauthorized" });
    });
  });
});

describe("cartItems", () => {
  describe("success", () => {
    it("should return the cart items if the response is ok", async () => {
      root.get("/cart").reply(200, { cart: "cart" });
      const resp = await api.cartItems("testToken");

      expect(resp).to.eql({ cart: "cart" });
    });
  });

  describe("error paths", () => {
    it("should return an error if the fetch fails", async () => {
      root.get("/cart").replyWithError("Failed to fetch");
      const resp = await api.cartItems("testToken");

      expect(resp).to.eql({
        error: `request to ${api.WAVEBREAK_URL}/cart failed, reason: Failed to fetch`,
      });
    });

    it("should return an error if the response has an error", async () => {
      root.get("/cart").reply(401, { error: "Unauthorized" });
      const resp = await api.cartItems("testToken");

      expect(resp).to.eql({ error: "Unauthorized" });
    });
  });
});

describe("cartItemsWithIntent", () => {
  const request = "testToken";

  describe("success", () => {
    it("should return the cart items if the response is ok", async () => {
      root.post("/cart/with_payment_intent").reply(200, { cart: "cart" });
      const resp = await api.cartItemsWithIntent(request);

      expect(resp).to.eql({ cart: "cart" });
    });
  });

  describe("error paths", () => {
    it("should return an error if the fetch fails", async () => {
      root.post("/cart/with_payment_intent").replyWithError("Failed to fetch");
      const resp = await api.cartItemsWithIntent(request);

      expect(resp).to.eql({
        error: `request to ${api.WAVEBREAK_URL}/cart/with_payment_intent failed, reason: Failed to fetch`,
      });
    });

    it("should return an error if the response has an error", async () => {
      root
        .post("/cart/with_payment_intent")
        .reply(401, { error: "Unauthorized" });
      const resp = await api.cartItemsWithIntent(request);

      expect(resp).to.eql({ error: "Unauthorized" });
    });
  });
});

describe("addCartItem", () => {
  describe("success", () => {
    it("should return the cart item if the response is ok", async () => {
      root.post("/cart").reply(200, { cart_item: "cart_item" });
      const resp = await api.addCartItem("testToken", "testUuid");

      expect(resp).to.eql({ cart_item: "cart_item" });
    });
  });

  describe("error paths", () => {
    it("should return an error if the fetch fails", async () => {
      root.post("/cart").replyWithError("Failed to fetch");
      const resp = await api.addCartItem("testToken", "testUuid");

      expect(resp).to.eql({
        error: `request to ${api.WAVEBREAK_URL}/cart failed, reason: Failed to fetch`,
      });
    });

    it("should return an error if the response has an error", async () => {
      root.post("/cart").reply(401, { error: "Unauthorized" });
      const resp = await api.addCartItem("testToken", "testUuid");

      expect(resp).to.eql({ error: "Unauthorized" });
    });
  });
});

describe("updateCartItem", () => {
  describe("success", () => {
    it("should return the cart item if the response is ok", async () => {
      root.patch("/cart").reply(200, { cart_item: "cart_item" });
      const resp = await api.updateCartItem(
        "testToken",
        "testUuid",
        "testStatus"
      );

      expect(resp).to.eql({ cart_item: "cart_item" });
    });
  });

  describe("error paths", () => {
    it("should return an error if the fetch fails", async () => {
      root.patch("/cart").replyWithError("Failed to fetch");
      const resp = await api.updateCartItem(
        "testToken",
        "testUuid",
        "testStatus"
      );

      expect(resp).to.eql({
        error: `request to ${api.WAVEBREAK_URL}/cart failed, reason: Failed to fetch`,
      });
    });

    it("should return an error if the response has an error", async () => {
      root.patch("/cart").reply(401, { error: "Unauthorized" });
      const resp = await api.updateCartItem(
        "testToken",
        "testUuid",
        "testStatus"
      );

      expect(resp).to.eql({ error: "Unauthorized" });
    });
  });
});

describe("inCart", () => {
  const endpoint = "/cart/in_cart/testUuid";

  describe("success", () => {
    it("should return the cart item if the response is ok", async () => {
      root.get(endpoint).reply(200, { cart_item: "cart_item" });
      const resp = await api.inCart("testToken", "testUuid");

      expect(resp).to.eql({ cart_item: "cart_item" });
    });
  });

  describe("error paths", () => {
    it("should return an error if the fetch fails", async () => {
      root.get(endpoint).replyWithError("Failed to fetch");
      const resp = await api.inCart("testToken", "testUuid");

      expect(resp).to.eql({
        error: `request to ${api.WAVEBREAK_URL}${endpoint} failed, reason: Failed to fetch`,
      });
    });

    it("should return an error if the response has an error", async () => {
      root.get(endpoint).reply(401, { error: "Unauthorized" });
      const resp = await api.inCart("testToken", "testUuid");

      expect(resp).to.eql({ error: "Unauthorized" });
    });
  });
});

describe("createPaymentIntent", () => {
  describe("success", () => {
    it("should return the payment intent if the response is ok", async () => {
      root
        .post("/payment_intent")
        .reply(200, { payment_intent: "payment_intent" });
      const resp = await api.createPaymentIntent("testToken");

      expect(resp).to.eql({ payment_intent: "payment_intent" });
    });
  });

  describe("error paths", () => {
    it("should return an error if the fetch fails", async () => {
      root.post("/payment_intent").replyWithError("Failed to fetch");
      const resp = await api.createPaymentIntent("testToken");

      expect(resp).to.eql({
        error: `request to ${api.WAVEBREAK_URL}/payment_intent failed, reason: Failed to fetch`,
      });
    });

    it("should return an error if the response has an error", async () => {
      root.post("/payment_intent").reply(401, { error: "Unauthorized" });
      const resp = await api.createPaymentIntent("testToken");

      expect(resp).to.eql({ error: "Unauthorized" });
    });
  });
});

describe("completeOrder", () => {
  describe("success", () => {
    it("should return the completed order", async () => {
      root.post("/orders/v2").reply(200, { order: "testOrder" });
      const resp = await api.completeOrder("testToken", "paymentId");

      expect(resp).to.eql({ order: "testOrder" });
    });
  });

  describe("error paths", () => {
    it("should return an error if the fetch fails", async () => {
      root.post("/orders/v2").replyWithError("Failed to fetch");
      const resp = await api.completeOrder("testToken", "paymentId");

      expect(resp).to.eql({
        error: `request to ${api.WAVEBREAK_URL}/orders/v2 failed, reason: Failed to fetch`,
      });
    });

    it("should return an error if the response has an error", async () => {
      root.post("/orders/v2").reply(401, { error: "Unauthorized" });
      const resp = await api.completeOrder("testToken", "paymentId");

      expect(resp).to.eql({ error: "Unauthorized" });
    });
  });
});

describe("fetchFullProfile", () => {
  describe("success", () => {
    it("should return the full profile", async () => {
      root.get("/profile").reply(200, { profile: "testProfile" });
      const resp = await api.fetchFullProfile("testToken");

      expect(resp).to.eql({ profile: "testProfile" });
    });
  });

  describe("error paths", () => {
    it("should return an error if the fetch fails", async () => {
      root.get("/profile").replyWithError("Failed to fetch");
      const resp = await api.fetchFullProfile("testToken");

      expect(resp).to.eql({
        error: `request to ${api.WAVEBREAK_URL}/profile failed, reason: Failed to fetch`,
      });
    });

    it("should return an error if the response has an error", async () => {
      root.get("/profile").reply(401, { error: "Unauthorized" });
      const resp = await api.fetchFullProfile("testToken");

      expect(resp).to.eql({ error: "Unauthorized" });
    });
  });
});
