const expect = require("expect");
const {isRealString} = require("./validation.js");

describe("isRealString", () => {
    it("should reject non-string values", () => {
        var res = isRealString(98);
        expect(res).toBe(false);
    });
    
    it("should reject string with only space", () => {
        var res = isRealString("     ");
        expect(res).toBe(false);
    });
    
    it("should allow string with non-space characters", () => {
        var res = isRealString("    Andrew");
        expect(res).toBe(true);
    })
})
