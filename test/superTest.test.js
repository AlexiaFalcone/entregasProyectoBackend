import chai from 'chai';
import supertest from 'supertest';

const expect = chai.expect;
const requester =supertest('http://localhost:8080');

describe('Testing de la App', ()=>{
    describe('Test para productos', ()=>{
        it('El endpoint POST debe crear un producto correctamente', async()=>{
            const prodMock = {
                title: "Polera",
                description: "Negra",
                price: 10000,
                code: "K",
                stock: 15,
                category: "Polera",
                owner: "premium"
            };

            const {statusCode, ok, _body} = await requester.post('api/products/products').send(prodMock);
            console.log(statusCode);
            console.log(ok);
            console.log(_body)
            expect(_body.payload).to.have.property('_id')

        });

        it('El endpoint GET, la respuesta debe tener un status 200, payload y debe ser un array', async()=>{
            const {statusCode, ok, _body} = await requester.get('api/products')
            expect(statusCode).to.equal(200);
            expect(_body).to.have.property('payload');
            expect(_body).to.be.an('array')
        })
    })
})