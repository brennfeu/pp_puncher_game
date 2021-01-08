const MYSQL = require('mysql');
if (false) {
	const DB_CONNECTION = MYSQL.createConnection({
		host: DB_HOST,
		user: DB_LOGIN,
		password: DB_PASSWORD,
		database: DB_NAME
	});
	DB_CONNECTION.connect((err) => {
		if (err) {
			Logger.warning('Error connecting to DB :(', err);
			return;
		}

		console.log('Database Connection Established');
	});
}
