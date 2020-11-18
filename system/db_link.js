const MYSQL = require('mysql');
const DB_CONNECTION = MYSQL.createConnection({
	host: DB_HOST,
	user: DB_LOGIN,
	password: DB_PASSWORD,
	database: DB_NAME
});
DB_CONNECTION.connect((err) => {
    if (err) {
        console.log('Error connecting to DB :(');
        console.log(err);
        return;
    }

    console.log('Database Connection Established');
});
