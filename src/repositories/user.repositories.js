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
	imageProfile,
	description
) {
	try {
		const result = await db.query(
			`INSERT INTO users (email, password, name, "imageProfile", description) VALUES ($1, $2, $3, $4, $5)`,
			[email, encryptPassword, name, imageProfile, description]
		);
		return result;
	} catch (err) {
		return err.message;
	}
}
export async function insertTokenDB(token, email) {
	try {
		const result = await db.query(`UPDATE users SET token=$1 WHERE email=$2`, [
			token,
			email,
		]);
		return result;
	} catch (err) {
		return err.message;
	}
}
export async function verifyUserByToken(token) {
	try {
		const result = await db.query(
			`SELECT users.name, users.email, users."imageProfile", users.description, posts.id ,posts.image, posts."postDescription", posts.likes, posts."postedAt"
			FROM users
			JOIN posts ON users.id = posts."userId" WHERE users.token = $1;`,
			[token]
		);
		return result;
	} catch (err) {
		return err.message;
	}
}
export async function verifyUserById(userId) {
	try {
		const result = await db.query(
			`SELECT * FROM followers WHERE "userId"= $1`,
			[userId]
		);
		return result;
	} catch (err) {
		return err.message;
	}
}
export async function insertFollower(userId) {
	try {
		const result = await db.query(
			`INSERT INTO following (userId) VALUES ($1)`,
			[userId]
		);
		return result;
	} catch (err) {
		return err.message;
	}
}
export async function removeFollower(userId) {
	try {
		const result = await db.query(`DELETE FROM following WHERE "userId"=$1`, [
			userId,
		]);
		return result;
	} catch (err) {
		return err.message;
	}
}
export async function verifyFollowersDB(id) {
	try {
		const result = await db.query(
			`SELECT users.id ,users.name, users."imageProfile", followers."userId" FROM users JOIN followers ON users.id = followers."userId" WHERE users.id=$1 `,
			[id]
		);
		return result;
	} catch (err) {
		return err.message;
	}
}
