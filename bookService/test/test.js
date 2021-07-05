const chai = require('chai');
const chaiHttp = require('chai-http');
const book = require('../book');
//const database = require("../routes/dbRoute");
var assert = require("assert");


chai.should();
chai.use(chaiHttp);

// get book
describe('Get /book', () => {
    it('it should get all data', (done) => {
        chai.request(book)
            .get('/viewBook')
            .end((err, response) => {
                response.should.have.status(200).json(user);
                done();
            })
    })
})


describe('post /book/addbook', () => {
    it('it should post data', (done) => {
        const BookingObj = {
            user_id: "60e15b36c039e72d00b0717a",
            train_id: "60e15a75494961508487486f",
            Departure: new Date(req.body.Departure),
            numOfticket: 5
        }
        chai.request(book)
            .post('/addbook')
            .send(demo)
            .end((err, response) => {
                response.should.have.status(200);
                done();
            })
    })
})


//DELETE by id
describe('/DELETE/:id book', () => {
    it('it should DELETE a book given the id', (done) => {
        let id = '60dffe8f87cccd09dcb46188';
        chai.request(book)
            .delete('/delBook' + id)
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });
});