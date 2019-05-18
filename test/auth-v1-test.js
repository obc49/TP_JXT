const chai = require("chai")
const chaiHttp = require("chai-http")
const { app } = require("../app")
chai.should();
chai.use(chaiHttp)

describe("Users tests", () => {

it("login should be sucessed", done => {
    chai
        .request(app)
        .post("/v1/auth/login")
        .send({ login: "sid", password: "sidpass" })
        .end((err, res) => {
            res
               .should
               .have
               .status(200);
            res
               .should
               .be
               .json
            res
               .body
               .should
               .have
               .property("message")
            res
               .body
               .message
               .should
               .equal("Ok")
            res
               .body
               .should
               .have
               .property("access_token")
            done()
          })
      })
  it("login should fail", done => {
    chai
      .request(app)
      .post("/v1/auth/login")
      .send({ login: "poudre", password: "prop" })
      .end((err, res) => {
        res
           .should
           .have
           .status(401)
        res
           .should
           .be
           .json
        res
           .body
           .should
           .have
           .property("message")
        res
           .body
           .message
           .should
           .equal("Unauthorized")
        done()
      })
  })

  it("verify access should fail", done => {
    chai
      .request(app)
      .get("/v1/auth/verifyaccess")
      .set("Authorization", `bearer 289687618VHCVBJKHKGVJJVUVV`)
      .end((err, res) => {
        res
          .should
          .have
          .status(401)
        res
          .body
          .should
          .have
          .property("message")
        res
          .body
          .message
          .should
          .equal("Unauthorized");
        done()
      })
  })


  it("Verify access sucessfully", done => {
    chai
      .request(app)
      .post("/v1/auth/login")
      .send({ login: "sid", password: "sidpass" })
      .end((err, res) => {
        const token = res.body.access_token
        chai
            .request(app)
            .get("/v1/auth/verifyaccess")
            .set("Authorization", `bearer ${token}`)
            .end((err, res) => {
                res
                  .should
                  .have
                  .status(200)
                res
                  .body
                  .should
                  .have
                  .property("message")
                res
                  .body
                  .message
                  .should
                  .equal("Ok")
                done()
          })
      })
  })
})