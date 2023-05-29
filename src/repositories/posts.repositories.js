import db from "../database/connection.database.js";
import dayjs from "dayjs";

export async function insertPost(image, postDescription, userId) {
	const date = dayjs();
	try {
		const result = await db.query(
			`INSERT INTO posts (image, "postDescription", "userId", "postedAt") VALUES ($1, $2, $3, $4)`,
			[image, postDescription, userId, date]
		);
		return result;
	} catch (err) {
		return err.message;
	}
}
export async function publicComment(idPost, comment, userId) {
	const date = dayjs();
	try {
		const result = await db.query(
			`INSERT INTO comments ("postId", comment, "userId", "postedAt") VALUES ($1, $2, $3)`,
			[idPost, comment, userId, date]
		);
		return result;
	} catch (err) {
		return err.message;
	}
}
export async function verifyPubliById(id) {
	try {
		const result = await db.query(`SELECT * FROM posts WHERE id = $1`, [id]);
		return result;
	} catch (err) {
		return err.message;
	}
}
export async function verifyLikeDB(idPost, userId) {
	try {
		const result = await db.query(
			`SELECT * FROM likes WHERE "likedBy" = $1 AND "idPost" = $2`,
			[userId, idPost]
		);
		return result;
	} catch (err) {
		return err.message;
	}
}
export async function insertLike(id) {
	try {
		const result = await db.query(
			`UPDATE posts SET likes = likes + 1 WHERE id = $1`,
			[id]
		);
		return result;
	} catch (err) {
		return err.message;
	}
}
export async function removeLike(idPost) {
	try {
		const result = await db.query(
			`UPDATE posts SET likes = likes - 1 WHERE id = $1`,
			[idPost]
		);
		return result;
	} catch (err) {
		return err.message;
	}
}
export async function addLike(idPost, userId) {
	try {
		const result = await db.query(
			`INSERT INTO likes ("likedBy", "idPost") VALUES ($1, $2)`,
			[userId, idPost]
		);
		return result;
	} catch (err) {
		return err.message;
	}
}
export async function removeLikeDB(idPost, userId) {
	try {
		const result = await db.query(
			`DELETE FROM likes WHERE "likedBy" = $1 AND "idPost" = $2`,
			[userId, idPost]
		);
		return result;
	} catch (err) {
		return err.message;
	}
}
export async function likesDB() {
	try {
		const result = await db.query("SELECT * FROM likes;");
		return result;
	} catch (err) {
		return err.message;
	}
}
