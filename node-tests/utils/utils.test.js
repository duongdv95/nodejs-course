const expect = require("expect");

const utils = require("./utils");
describe("Utils", () => {
    
    describe("#add", () => {
        it("should add two numbers", () => {
            var res = utils.add(33, 11);
            
            expect(res).toBe(44).toBeA("number");
            // if (res !== 44) {
            //     throw new Error(`Expected 44, but got ${res}`);
            // }
        });
    });

    
    it("should async add two numbers", (done) => {
        utils.asyncAdd(4, 3, (sum) => {
            expect(sum).toBe(7).toBeA("number");
            done();
        })
    })
    
    it("should square the number", () => {
        var res = utils.square(5);
        expect(res).toBe(25).toBeA("number");
        // if (res !== 25) {
        //     throw new Error(`Expected 25, but got ${res}`);
        // }
    });
    
    it("should async square the number", (done) => {
        utils.asyncSquare(5, (square) => {
            expect(square).toBe(25).toBeA("number");
            done();
        })
    })
});


it("should set firstName and lastName", () => {
    var user = {location: "Philadelphia", age: 25};
    var res = utils.setName(user, "Andrew Mead");
    
    expect(res).toInclude({
        firstName: "Andrew",
        lastName: "Mead"
    })
});
// it("should expect some values", () => {
//     // expect({name: "Andrew"}).toEqual({name: "Andrew"});
//     // expect([2,3,4]).toExclude(1);
//     expect({
//         name: "Daniel",
//         age: 23,
//         location: "Irvine"
//     }).toInclude({
//         age: 22
//     })
// })