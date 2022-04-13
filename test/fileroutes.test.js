const assert = require('assert');
const expect = require('chai').expect
const request = require('supertest');
const app = require('../src/routes/fileroutes')


describe('index page respose', function() {

    it('should return OK status', function() {
      return request(app)
        .get('/')
        .then(function(response){
            assert.equal(response.status, 200)
        })
    });
});


describe('Get all method', function() {

    it('Get all records', function() {
      return request(app)
        .get('/getall')
        .then(function(response){
            assert.equal(response.status, 200)
        })
    });
});

describe('GetId', function() {
    it('Get user by Id', function (done) {
        request(app)
            .get('/getUserName/68')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });
    
});

describe('GetId', function() {
    it('Invalid userid ', function (done) {
        request(app)
            .get('/getUserName/6')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(404, done);
    });
    
});


