const frisby = require('frisby');
const { expect } = require('chai');

it('should return a status of 200 when a track is updated', () => {
	return frisby
	.patch('http://localhost:8000/api/tracks/1', {
		name: 'NewName',
		milliseconds: 1234,
		unitPrice: 5678
	})
	.expect('status', 200)
	.expect('json', 'name', 'NewName')
	.expect('json', 'milliseconds', 1234)
	.expect('json', 'unitPrice', 5678);
});

it('should return a status of 404 when the track does not exist', () => {
	return frisby
	.patch('http://localhost:8000/api/tracks/-1', {
		name: 'NewName',
		milliseconds: 1234,
		unitPrice: 5678
	})
	.expect('status', 404);
});

// it('should return a status of 422 when there are validation errors', () => {
// 	return frisby
// 	.patch('http://localhost:8000/api/tracks/1', {
// 		name: '',
// 		milliseconds: 'a',
// 		unitPrice: 'b'
// 	})
// 	.expect('status', 422)
// 	.expect(errors[0].message).to.equal('Name must be between 2 and 10 characters');
// });