let express = require('express');
let knex = require('knex');
const bodyParser = require('body-parser');
const sequelize = require('sequelize');
const Track = require('./models/track');

let app = express();

app.use(bodyParser.json());

app.get('/api/genres', function(request, response) {

	let connection = knex({
		client: 'sqlite3',
		connection: {
			filename: 'chinook.db'
		}
	});

	connection.select()
		.from('genres')
		.then((genres) => {
			response.json(genres);
		});
});

app.get('/api/genres/:id', function(request, response) {
	let id = request.params.id;

	let connection = knex({
		client: 'sqlite3',
		connection: {
			filename: 'chinook.db'
		}
	});

	connection.select()
		.from('genres')
		.where('GenreId', id)
		.first()
		.then((genre) => {
			response.json(genre);
	});
});

app.get('/api/artists', function(request, response) {
	// let filter = req.query.f;

	let connection = knex({
		client: 'sqlite3',
		connection: {
			filename: 'chinook.db'
		}
	});

	if (request.query.filter)
	{
		connection.select()
		.from('artists')
		.where('Name', 'like', `%${request.query.filter}%`)
		.then((artists) => {
			response.json(artists);
		});
	}

	else
	{
		connection.select()
		.from('artists')
		.then((artists) => {
			response.json(artists);
		});
	}
});

app.get('/api/tracks/:id', function(request, response) {
	let { id } = request.params; // This syntax is called "destructuring"

	Track.findByPk(id).then((track) => {
		if (track) {
			response.json(track);
		} else {
			response.status(404).send();
		}
	});
});

app.patch('/api/tracks/:id', function(request, response) {
	let { id } = request.params;

	Track.findByPk(id).then((track) => {
		if (track) {
			track.update({
				name: request.body.name,
				milliseconds: request.body.milliseconds,
				unitPrice: request.body.unitPrice
			})
			.then((track) => {
				response.json(track);
			}, (validation) => {
				response.status(422).json({
					errors: validation.errors.map((error) => {
						return {
							attribute: error.path,
							message: error.message
						};
					})
				});
			});
		} else {
			response.status(404).send();
		}
	})
});

app.listen(process.env.PORT || 8000);