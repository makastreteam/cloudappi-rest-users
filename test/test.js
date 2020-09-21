process.env.NODE_ENV = 'test';

const request = require('supertest');
const expect = require('chai').expect;
const server = require('../src/index');
const mongoose = require('mongoose');

var testId = mongoose.Types.ObjectId();

describe('GET Users', () => {
	it('getting all users', (done) => {
		request(server)
		.get('/users/getUsers')
		.then((res) => {
			expect(res.statusCode).to.equal(200);
			done();
		})
		.catch((err) => done(err));
	});
});

describe('POST User', () => {
	it('posting a user', (done) => {
		request(server)
		.post('/users/createUser')
		.send({
			name: "Laura Blasco Lujan",
			email: "laura@gmail.com",
			birthDate: "06/11/1989",
			address: {
				street: "Calle de la Plaza",
				state: "Europa",
				city: "Barcelona",
				country: "España",
				zip: "63259",
			}
		})
		.then((res) => {
			expect(res.statusCode).to.equal(201);
			done();
		})
		.catch((err) => done(err));
	});
});

describe('GET User id', () => {
	it('saving user id', (done) => {
		request(server)
		.get('/users/getUsers')
		.then((res) => {
			testId = res.body[0]._id;
			done();
		})
		.catch((err) => done(err));
	});
});

describe('GET User by id', () => {
	it('checking user properties', (done) => {
		request(server)
		.get('/users/getUserById/' + testId)
		.then((res) => {
			const body = res.body;
			expect(body.name).to.equal('Laura Blasco Lujan');
			expect(body.email).to.equal('laura@gmail.com');
			expect(body.birthDate).to.equal('06/11/1989');
			done();
		})
		.catch((err) => done(err));
	});
});

describe('PUT User properties', () => {
	it('updating user data', (done) => {
		request(server)
		.put('/users/updateUserById/' + testId)
		.send({
			name: "Laura BL",
			email: "lauraBL@gmail.com",
			birthDate: "06/01/1989",
			address: {
				street: "Calle de la Plaza",
				state: "Europa",
				city: "Barcelona",
				country: "España",
				zip: "63259",
			}
		})
		.then((res) => {
			expect(res.statusCode).to.equal(200);
			done();
		})
		.catch((err) => done(err));
	});
});

describe('GET User by id', () => {
	it('checking user updated properties', (done) => {
		request(server)
		.get('/users/getUserById/' + testId)
		.then((res) => {
			const body = res.body;
			expect(body.name).to.equal('Laura BL');
			expect(body.email).to.equal('lauraBL@gmail.com');
			expect(body.birthDate).to.equal('06/01/1989');
			done();
		})
		.catch((err) => done(err));
	});
});

describe('DELETE User by id', () => {
	it('deleting user', (done) => {
		request(server)
		.delete('/users/deleteUserById/' + testId)
		.then((res) => {
			expect(res.statusCode).to.equal(200);
			done();
		})
		.catch((err) => done(err));
	});
});