import * as chai from "chai";
import supertest from "supertest";


const expect = chai.expect;
const requester = supertest('http://localhost:8080');

describe("Testing de la App", () => {
  describe("Test del router de sessions", () => {
    let cookie
    it("Logueo de usuario premium", async function () {
      this.timeout(50000);

      const userMock = {
        email: "adminCoder@coder.com",
        password: "adminCod3r123",
      };
      
      const loginResponse = await requester.post('/api/sessions/login').send(userMock)
      const { statusCode, headers} = loginResponse;
      expect(statusCode).to.be.equal(302);
      
      const cookieResult = headers['set-cookie'][0];
      expect(cookieResult).to.be.ok;
      cookie = {
        name: cookieResult.split('=')[0],
        value: cookieResult.split('=')[1]
      }
      expect(cookie.name).to.be.ok.and.equal('connect.sid')
      expect(cookie.value).to.be.ok

    });

    it('Envía la cookie e ingresa a los datos del usuario', async function() {
      this.timeout(50000)
      const result= await requester.get('/api/session/current').set("Cookie", [`${cookie.name}=${cookie.value}`]);
      console.log(result)
      //console.log(headers)
     //  const { statusCode: _statusCode, _body: bodyResponse } = result;
     //  expect(bodyResponse.payload.role).to.be.equal("premium");
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
