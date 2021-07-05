const chai = require('chai');
const chaiHttp = require('chai-http');
const book = require('../book');
var assert = require("assert");


chai.should();
chai.use(chaiHttp);


// post flight 
describe('post /books/addbook', () => {
    it('it should post data', (done) => {
        demo = {
            train_id: "60dfeef831f7132550f3fc5a",
            Departure: "2021-06-05T18:30:00.000+00:00",
            numOfSeats: 10
        }
        chai.request(book)
            .post('/addbook')
            .set('Cookie', 'jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZGYzMDI4YmU5ZTBiMzdhYzliNWViMCIsImlhdCI6MTYyNTQ4MDA2NCwiZXhwIjoxNjI1NzM5MjY0fQ.tovoEAgk9JeFFo-4KH1KFwqB2ZQ9XNr_wNR2pTwqPw8')
            .send(demo)
            .end((err, response) => {
                // console.log(response)
                response.should.have.status(200);
                // response.body.should.have.property('message').eql("Train Booked Successfully!")
                done();
            })
    })
    it('Should NOT POST the book details', (done) => {
        user = {
            train_id: "60dfeef831f7132550f3fc5a",
            Departure: "2021-06-05T18:30:00.000+00:00",
            numOfSeats: 9
        }
        chai.request(book)
            .post("/addbooks")
            .send(user)
            .end((err, response) => {
                response.should.have.status(404);
                done();
            })
    })
})


//get books
// describe('Get /books', () => {
//     it('it should get all data', (done) => {
//         chai.request(book)
//             .get('/books/viewBook')
//             .set('Cookie', 'jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZDFmNTRjYzgzMTFmNDg4MGM1OTQ3MyIsImVtYWlsIjoic3VuaWxoaXBwQDEyMyIsImlhdCI6MTYyNTEyMDE1MiwiZXhwIjoxNjI1Mzc5MzUyfQ.VqVIAPF-Jhljys3B8kfM-OxBd4--bSVp1HooGn_5wXM')
//             .end((err, response) => {
//                 response.should.have.status(200);
//                 done();
//             })
//     })
//     it('it should not GET all the Flights', (done) => {
//         chai.request(book)
//             .get('/book/viewBook')
//             .end((err, res) => {
//                 res.should.have.status(404);
//                 done();
//             });
//     });
// })


// // delete flight 
// describe('/books/delBook/:id flight', () => {
//     it('it should DELETE a book given the id', (done) => {
//         let id = '60dd622a6b5b3510b013e97e';
//         chai.request(book)
//             .delete('/books/delBook/' + id)
//             .set('Cookie', 'jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZDk4YjVlZTcxZDFlNWNkOGRiM2QyNyIsImVtYWlsIjoic3VuaWxoaXBwQDEyMyIsInVzZXJUeXBlIjp0cnVlLCJpYXQiOjE2MjUwNDk0OTQsImV4cCI6MTYyNTMwODY5NH0.pbbezijmk9aynrm4wNEeTNVV6dpNxU-FmEVp3OktJ10;')
//             .end((err, res) => {
//                 res.should.have.status(200);
//                 res.body.should.be.a('object');
//                 res.body.should.have.property('message').eql("ticket Deleted Successfully!")
//                 done();
//             });
//     });
//     it('it should Not DELETE a book given the id', (done) => {
//         let id = '60cb3ac6f402ad0e2cea4305';
//         chai.request(book)
//             .delete('/book/delBook/' + id)
//             .end((err, res) => {
//                 res.should.have.status(404);
//                 done();
//             });
//     });
// });