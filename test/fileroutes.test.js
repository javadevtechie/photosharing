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

    it('should return OK status', function() {
      return request(app)
        .get('/getall')
        .then(function(response){
            assert.equal(response.status, 200)
        })
    });
});