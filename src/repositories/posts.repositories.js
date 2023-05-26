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
