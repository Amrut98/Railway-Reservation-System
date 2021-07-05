let chai = require('chai');
let chaiHttp = require('chai-http');
const { response } = require('express');
let server = require('../app');

chai.use(chaiHttp);

chai.should();



describe('Tasks API', () => {
    //GET
    describe('GET /trainlist', () => {
            it("it should get all the tasks", (done) => {
                chai.request(server)
                    .get('/train')
                    .end((err, response) => {
                        response.body.length.should.be.eq(4);
                        done();
                    })
            })
        })
        //GET by id
    describe('GET /trainlist/:id', () => {
        it("it should get by id", (done) => {
            const taskId = "60dfeef831f7132550f3fc5a"
            chai.request(server)
                .get('/trains' + taskId)
                .end((err, response) => {
                    response.body.should.be.a('object');
                    done();
                })
        })
    })




})