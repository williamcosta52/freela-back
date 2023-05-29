import { verifyUserByToken } from "../repositories/user.repositories.js";
import {
	addLike,
	insertLike,
	insertPost,
	publicComment,
	removeLikeDB,
	verifyLikeDB,
	verifyPubliById,
} from "../repositories/posts.repositories.js";
import { removeLike } from "../repositories/posts.repositories.js";

export async function publiPost(req, res) {
	const { image, postDescription } = req.body;
	const { authorization } = req.headers;
	const token = authorization?.replace("Bearer ", "");
	if (!token) return res.sendStatus(401);
	try {
		const verifyUser = await verifyUserByToken(token);
		if (verifyUser.rows.length === 0)
			return res.status(401).send({ message: "Acesso negado!" });
		const userId = verifyUser.rows[0].id;
		await insertPost(image, postDescription, userId);
		res.status(201).send({ message: "Post criado com sucesso!" });
	} catch (err) {
		res.send(err.message);
	}
}
export async function postComment(req, res) {
	const { idPost } = req.params;
	const { comment } = req.body;
	if (!idPost) return res.sendStatus(404);
	const { authorization } = req.headers;
	const token = authorization?.replace("Bearer ", "");
	if (!token) return res.sendStatus(401);
	try {
		const verifyUser = await verifyUserByToken(token);
		if (!verifyUser.rows.length)
			return res.status(401).send({ message: "Acesso negado!" });
		const userId = verifyUser.rows[0].id;
		await publicComment(idPost, comment, userId);
		res.sendStatus(201);
	} catch (err) {
		res.send(err.message);
	}
}
export async function like(req, res) {
	const { authorization } = req.headers;
	const token = authorization?.replace("Bearer ", "");
	if (!token) return res.sendStatus(401);
	const { id } = req.params;
	try {
		const verifyUser = await verifyUserByToken(token);
		if (verifyUser.rows.length === 0)
			return res.status(401).send({ message: "usuário não encontrado" });
		const verifyPubli = await verifyPubliById(id);
		if (verifyPubli.rows.length === 0)
			return res.status(404).send({ message: "Publicação não encontrada" });
		const verifyLike = await verifyLikeDB(id, verifyUser.rows[0].id);
		if (verifyLike.rows.length === 0) {
			await addLike(id, verifyUser.rows[0].id);
			await insertLike(id, verifyUser.rows[0].id);
			res.status(200).send({ message: "liked" });
		} else {
			await removeLike(id, verifyUser.rows[0].id);
			await removeLikeDB(id, verifyUser.rows[0].id);
			res.status(200).send({ message: "not-liked" });
		}
	} catch (err) {
		res.send(err.message);
	}
}
