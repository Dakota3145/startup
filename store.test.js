const request = require('supertest');
const app = require('./server');

test('getStore returns the desired store', (done) => {
  request(app)
    .get('/store/provo')
    .expect(200)
    .expect({ name: 'provo' })
    .end((err) => (err ? done(err) : done()));
});

test('putStore returns the desired store', (done) => {
  request(app)
    .put('/store/provo')
    .send({name: 'put'})
    .expect(200)
    .expect({ name: 'put', updated: true})
    .end((err) => (err ? done(err) : done()));
});