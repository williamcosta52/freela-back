import db from "../database/connection.database.js";

export async function verifyUserDB(email) {
	try {
		const result = await db.query(`SELECT * FROM users WHERE email= $1`, [
			email,
		]);
		return result;
	} catch (err) {
		return err.message;
	}
}
export async function insertUserDB(
	email,
	encryptPassword,
	name,
	image,
	description
) {
	try {
		const result = await db.query(
			`INSERT INTO users (email, password, name, image, description) VALUES ($1, $2, $3, $4, $5)`,
			[email, encryptPassword, name, image, description]
		);
		return result;
	} catch (err) {
		return err.message;
	}
}
