// const chai = require('chai');
// const chaiHttp = require('chai-http');
// const app = require('../app');
// //const database = require("../routes/dbRoute");
// var assert = require("assert");


// chai.should();
// chai.use(chaiHttp);
// // before((done) => {
// //     app.on('MongoConnected', () => {
// //         console.log("here");
// //         done();
// //     });
// // });


// describe('Get /train', () => {
//     it('it should get all data', (done) => {
//         chai.request(app)
//             .get('/train')
//             .end((err, response) => {
//                 response.should.have.status(200);
//                 response.body.should.be.a('array');
//                 done();
//             })
//     })
//     it('it should not GET all the trains', (done) => {
//         chai.request(app)
//             .get('/trains')
//             .end((err, res) => {
//                 res.should.have.status(404);
//                 done();
//             });
//     });
// })


// // .set('Cookie', 'jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZDk4YjVlZTcxZDFlNWNkOGRiM2QyNyIsImVtYWlsIjoic3VuaWxoaXBwQDEyMyIsInVzZXJUeXBlIjp0cnVlLCJpYXQiOjE2MjUwNDk0OTQsImV4cCI6MTYyNTMwODY5NH0.pbbezijmk9aynrm4wNEeTNVV6dpNxU-FmEVp3OktJ10;')


// describe('post /train', () => {
//     it('it should post data', (done) => {
//         demo = {
//             train_id: 355,
//             name: "Bengal Express",
//             source: "Mumbai",
//             destination: "Kolkata",
//             date: "07/12/2021",
//             time: "7:00",
//             price: 1000

//         }
//         chai.request(app)
//             .post('/train')
//             .send(demo)
//             .end((err, response) => {
//                 response.should.have.status(200);
//                 done();
//             })
//     })
//     it('Should NOT POST the train details', (done) => {
//         user = {

//             name: "Varanasi Exp",
//             source: "hydrabad",
//             destination: "Varanasi",
//             date: "20/05/2021",
//             time: "8:00"
//         }
//         chai.request(app)
//             .post("/trains")
//             .send(user)
//             .end((err, response) => {
//                 response.should.have.status(404);
//                 done();
//             })
//     })
// })

// describe('/put/:id book', () => {
//     it('it should UPDATE a train given the id', (done) => {
//         const demo = {
//             name: "Mumbai Express"
//         }
//         id = '60dfeef831f7132550f3fc5a';
//         chai.request(app)
//             .patch('/train/' + id)
//             .send(demo)
//             .end((err, response) => {
//                 response.should.have.status(200);
//                 // response.body.should.have.property('message').eql("Train updated Successfully!")

//                 done();
//             })
//     })
//     it('it should Not UPDATE a train given the id', (done) => {
//         const demo = {
//             name: "Jam Nagar Exp"
//         }
//         id = '60dfef1531f7132550f3fc5c';
//         chai.request(app)
//             .put('/trains/' + id)
//             .send(demo)
//             .end((err, response) => {
//                 response.should.have.status(404);
//                 done();
//             })
//     })
// });


// describe('/DELETE/:id train', () => {
//     it('it should DELETE a train given the id', (done) => {
//         let id = '60e2118f8d81111068aba92b';
//         chai.request(app)
//             .delete('/train/' + id)
//             .end((err, res) => {
//                 res.should.have.status(200);
//                 done();
//             });
//     });
//     it('it should Not DELETE a train given the id', (done) => {
//         let id = '60e216278d81111068aba92d';
//         chai.request(app)
//             .delete('/trains/' + id)
//             .end((err, res) => {
//                 res.should.have.status(404);
//                 done();
//             });
//     });
// });


let chai = require('chai');
let chaiHttp = require('chai-http');
const { response } = require('express');
let server = require('../app');

chai.use(chaiHttp);

chai.should();

//GET
describe('Tasks API', () => {

    describe('GET /trainlist', () => {
        it("it should GET all the tasks", (done) => {
            chai.request(server)
                .get('/train')
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('array');
                    done();
                })
        })
        it("it should NOT GET all the tasks", (done) => {
            chai.request(server)
                .get('/trains')
                .end((err, response) => {
                    if (err) done(err);
                    response.should.have.status(404);
                    done();
                })
        })

    })


    //GET by id
    describe('GET /trainlist/:id', () => {
        it("it should get by id", (done) => {
            const taskId = "60dfeef831f7132550f3fc5a"
            chai.request(server)
                .get('/train/' + taskId)
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                    // response.body.should.have.property('_id');
                    done();
                })
        })

        it("it should NOT GET by id", (done) => {
            const taskId = "123"
            chai.request(server)
                .get('/trainlists/' + taskId)
                .end((err, response) => {
                    if (err) done(err);
                    response.should.have.status(404);
                    done();
                })
        })
    })

    //POST
    describe('POST /addtrain', () => {
        it("it should POST new task", (done) => {
            const task = {

                train_id: 89,
                name: "Buma Express",
                source: "Delhi",
                destination: "Vijapur",
                date: "06/12/2021",
                time: "7:00",
                price: 1000


            };
            chai.request(server)
                .post('/train')
                .send(task)
                .end((err, response) => {
                    // response.should.have.status(200);
                    response.body.should.be.a('object');
                    done();
                })
        })
        it("it should NOT POST new task without parameters", (done) => {
            const task = {
                time: "11 Hrs"
            };
            chai.request(server)
                .post('/trains')
                .send(task)
                .end((err, response) => {

                    response.should.have.status(404);
                    done();
                })
        })

    })

    //PUT
    describe('PUT /updatetrain', () => {
        it("it should PUT a task", (done) => {
            const taskId = "60dfeef831f7132550f3fc5a";
            const task = {
                train_id: 759,
                name: "Buddy Express",
                source: "Mumbai",
                destination: "Jodhpur",
                date: "06/12/2021",
                time: "7:00",
                price: 1000
            };
            chai.request(server)
                .patch('/train/' + taskId)
                .send(task)
                .end((err, response) => {
                    // response.should.have.status(200);
                    response.body.should.be.a('object');
                    // response.body.should.have.property('name');
                    done();
                })
        })
    })

    it("it should NOT PUT new task without 3 parameters", (done) => {
        const task = {
            time: "10 Hrs",
        };
        chai.request(server)
            .patch('/trains')
            .send(task)
            .end((err, response) => {
                response.should.have.status(404);
                done();
            })
    })


    //DELETE
    describe('DELETE /deletetrain/:id', () =>
        it("it should DELETE a task", (done) => {
            const taskId = "60e224631c19d31aa85617ee";
            chai.request(server)
                .delete('/train/' + taskId)
                .end((err, response) => {
                    response.body.should.be.a('object');
                    // response.should.have.status(200);
                    done();
                })
        })
    )
    it("it should NOT Delete new task without 3 parameters", (done) => {
        const taskId = "60dff53931f7132550f3fc74";
        chai.request(server)
            .delete('/deletetrains')
            .end((err, response) => {

                response.should.have.status(404);
                done();
            })
    })
})