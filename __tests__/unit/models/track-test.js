const { expect } = require('chai');
const Track = require('./../../../models/track');

describe('track', () => {
	describe('milliseconds', () => {
		it('should fail validation when not numeric', async () => {
			try {
				let track = new Track({
					name: 'test',
					milliseconds: 1,
					unitPrice: 1
				});
				await track.validate();
			} catch (error) {
				expect(error.errors[0].message).to.equal('Milliseconds must be numeric');
			}
		});

		it('should pass validation when numeric', async () => {
			let track = new Track({
				name: 'test',
				milliseconds: 1,
				unitPrice: 1
			});
			await track.validate();
		});
	});
});