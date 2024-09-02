import * as chai from "chai";
import supertest from "supertest";

const expect = chai.expect;
const requester = supertest("http://localhost:8080");

describe("Testing de la App", () => {
  describe("Test del router de sessions", () => {
    it("Logueo de usuario premium", async function () {
      this.timeout(50000);

      const userMock = {
        email: "adminCoder@coder.com",
        password: "adminCod3r123",
      };

      const login = await requester.post("/api/sessions/login").send(userMock);

      const { statusCode, _body, headers } = login;
      console.log(statusCode);
      console.log(_body);
      console.log(headers);
      expect(statusCode).to.be.equal(302);
      expect(_body.status).to.be.equal("success");

      const result = await requester
        .get("/api/session/current")
        .set("Cookie", headers["set-cookie"]);
      const { statusCode: _statusCode, _body: body } = result;
      expect(body.payload.role).to.be.equal("premium");
    });
  });

  // describe('Test para productos', ()=>{

  //     it('El endpoint POST debe crear un producto correctamente', async()=>{

  //         const prodMock = {
  //             title: "Polera",
  //             description: "Negra",
  //             price: 10000,
  //             code: "K",
  //             stock: 15,
  //             category: "Polera",
  //             owner: "premium"
  //         };

  //         const {statusCode, ok, _body} = await requester.post('api/products/products').send(prodMock);
  //         console.log(statusCode);
  //         console.log(ok);
  //         console.log(_body)
  //         expect(_body.payload).to.have.property('_id')

  //     });

  //     it('El endpoint GET, la respuesta debe tener un status 200, payload y debe ser un array', async()=>{
  //         const {statusCode, ok, _body} = await requester.get('api/products')
  //         expect(statusCode).to.equal(200);
  //         expect(_body).to.have.property('payload');
  //         expect(_body).to.be.an('array')
  //     })
  // })
});
