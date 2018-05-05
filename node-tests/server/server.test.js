const request = require("supertest");
const expect = require("expect");

var app = require("./server.js").app;

describe("server", () => {
    describe("GET /", () => {
        it("should return hello world response", (done) => {
            request(app)
                .get("/")
                .expect(404)
                .expect((res) => {
                    expect(res.body).toInclude({
                        error: "Page not found."
                    })
                })
                .end(done);
        });
    });
    
    describe("GET /users", () => {
        it("should return a user object", (done) => {
            request(app)
                .get("/users")
                .expect(200)
                .expect((res) => {
                    expect(res.body).toInclude({
                        firstName: "Daniel",
                        age: 23
                    })
                })
                .end(done);
        })
    });
});



