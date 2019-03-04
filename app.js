let express = require('express');
let knex = require('knex');

let app = express();

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

app.listen(process.env.PORT || 8000);