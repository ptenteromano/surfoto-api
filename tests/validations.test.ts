import { expect } from "chai";
import * as V from "../src/validations";

describe("validateUsername", () => {
  describe("valid usernames", () => {
    it("returns true", () => {
      expect(V.validUsername("validUsername")).to.be.true;
    });

    it("returns true", () => {
      expect(V.validUsername("Valid_12345")).to.be.true;
    });

    it("returns true", () => {
      expect(V.validUsername("Valid^^99")).to.be.true;
    });
    it("returns true", () => {
      expect(V.validUsername("user")).to.be.true;
    });
  });

  describe("invalid usernames", () => {
    it("returns false", () => {
      expect(V.validUsername("1234abcd")).to.be.false;
    });

    it("returns false", () => {
      expect(V.validUsername("abc")).to.be.false;
    });

    it("returns false", () => {
      expect(V.validUsername("%%%^^&&&&")).to.be.false;
    });

    it("returns false", () => {
      expect(V.validUsername("a".repeat(26))).to.be.false;
    });
  });
});

describe("validateEmail", () => {
  describe("valid emails", () => {
    it("returns true", () => {
      expect(V.validEmail("test@test.com")).to.be.true;
    });

    it("returns true", () => {
      expect(V.validEmail("abc@123.co")).to.be.true;
    });

    it("returns true", () => {
      expect(V.validEmail("c.c@cc.info")).to.be.true;
    });
  });

  describe("invalid emails", () => {
    it("returns false", () => {
      expect(V.validEmail("test@test")).to.be.false;
    });

    it("returns false", () => {
      expect(V.validEmail("test@test.")).to.be.false;
    });

    it("returns false", () => {
      expect(V.validEmail("test@test.c")).to.be.false;
    });

    it("returns false", () => {
      expect(V.validEmail("test")).to.be.false;
    });

    it("returns false", () => {
      expect(V.validEmail("1234")).to.be.false;
    });
  });
});

describe("validatePassword", () => {
  describe("valid passwords", () => {
    it("returns true", () => {
      expect(V.validPassword("validPassword!")).to.be.true;
    });

    it("returns true", () => {
      expect(V.validPassword("validPassword8")).to.be.true;
    });

    it("returns true", () => {
      expect(V.validPassword("Valid_12345")).to.be.true;
    });

    it("returns true", () => {
      expect(V.validPassword("Valid^^99!")).to.be.true;
    });
  });

  describe("invalid passwords", () => {
    it("returns false", () => {
      expect(V.validPassword("1234abcd")).to.be.false;
    });

    it("returns false", () => {
      expect(V.validPassword("abc")).to.be.false;
    });

    it("returns false", () => {
      expect(V.validPassword("%%%^^&&&&!")).to.be.false;
    });

    it("returns false", () => {
      expect(V.validPassword("invalid!")).to.be.false;
    });
  });
});

describe("validPrice", () => {
  describe("valid prices", () => {
    it("returns true", () => {
      expect(V.validPrice(1)).to.be.true;
    });

    it("returns true", () => {
      expect(V.validPrice(1.0)).to.be.true;
    });

    it("returns true", () => {
      expect(V.validPrice("1.00")).to.be.true;
    });
  });

  describe("invalid prices", () => {
    it("returns false", () => {
      expect(V.validPrice(0)).to.be.false;
    });

    it("returns false", () => {
      expect(V.validPrice(0.99)).to.be.false;
    });

    it("returns false", () => {
      expect(V.validPrice("0.99")).to.be.false;
    });

    it("returns false", () => {
      expect(V.validPrice("301")).to.be.false;
    });

    it("returns false", () => {
      expect(V.validPrice("adada")).to.be.false;
    });
  });
});

describe("emailValidationMsg", () => {
  describe("valid emails", () => {
    it("returns null", () => {
      expect(V.emailValidationMsg("test@test.com")).to.be.null;
    });
  });

  describe("emails too short", () => {
    it("returns 'emails must be at least 3 characters long'", () => {
      expect(V.emailValidationMsg("te")).to.equal(
        "emails must be at least 3 characters long"
      );
    });
  });

  describe("invalid emails", () => {
    it("returns 'email must be valid'", () => {
      expect(V.emailValidationMsg("test@test")).to.equal("email must be valid");
    });
  });
});

describe("passwordValidationMsg", () => {
  describe("valid passwords", () => {
    it("returns null", () => {
      expect(V.passwordValidationMsg("validPassword!")).to.be.null;
    });
  });

  describe("passwords too short", () => {
    it("returns 'passwords must be at least 6 characters long'", () => {
      expect(V.passwordValidationMsg("te")).to.equal(
        "passwords must be at least 6 characters long"
      );
    });
  });

  describe("invalid passwords", () => {
    it("returns 'password must contain at least one capital letter, one lower case letter, and one number'", () => {
      expect(V.passwordValidationMsg("invalid!")).to.equal(
        "password must contain at least one capital letter, one lower case letter, and one number"
      );
    });
  });

  describe("invalid passwords", () => {
    it("returns 'password must contain at least one capital letter, one lower case letter, and one number'", () => {
      expect(V.passwordValidationMsg("invalid!")).to.equal(
        "password must contain at least one capital letter, one lower case letter, and one number"
      );
    });
  });
});

describe("usernameValidationMsg", () => {
  describe("valid usernames", () => {
    it("returns null", () => {
      expect(V.usernameValidationMsg("validUsername")).to.be.null;
    });
  });

  describe("usernames too short", () => {
    it("returns 'usernames must be at least 4 characters long'", () => {
      expect(V.usernameValidationMsg("te")).to.equal(
        "usernames must be at least 4 characters long"
      );
    });
  });

  describe("usernames too long", () => {
    it("returns 'usernames must be at least 4 characters long'", () => {
      expect(V.usernameValidationMsg("a".repeat(26))).to.equal(
        "usernames cannot be longer than 25 characters"
      );
    });
  });

  describe("invalid usernames", () => {
    it("returns 'username must be valid'", () => {
      expect(V.usernameValidationMsg("1234abcd")).to.equal(
        "usernames cannot start with a number or special character"
      );
    });
  });
});
