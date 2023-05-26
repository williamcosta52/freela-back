import bcrypt from "bcrypt";
import {
	insertFollower,
	insertTokenDB,
	insertUserDB,
	removeFollower,
	verifyUserById,
	verifyUserByToken,
	verifyUserDB,
} from "../repositories/user.repositories.js";
import { v4 as uuid } from "uuid";

export async function signUp(req, res) {
	const { email, password, name, imageProfile, description } = req.body;
	const encryptPassword = bcrypt.hashSync(password, 10);
	try {
		const verifyUser = await verifyUserDB(email);
		if (verifyUser.rows.lenght)
			return res.status(409).send({ message: "Email já cadastrado" });
		await insertUserDB(email, encryptPassword, name, imageProfile, description);
		res.status(201).send({ message: "Cadastro finalizado!" });
	} catch (err) {
		res.send(err.message);
	}
}
export async function signIn(req, res) {
	const { email, password } = req.body;
	try {
		const verifyUser = await verifyUserDB(email);
		if (!verifyUser.rows.lenght)
			return res.status(401).send({ message: "Usuário não encontrado!" });
		const comparePassword = bcrypt.compareSync(
			password,
			verifyUser.rows[0].password
		);
		if (!comparePassword)
			return res.status(401).send({ message: "Senha inválida" });
		const token = uuid();
		await insertTokenDB(token, email);
		res.status(200).send({ token: token });
	} catch (err) {
		res.send(err.message);
	}
}
export async function infosUser(req, res) {
	const { authorization } = req.headers;
	const token = authorization?.replace("Bearer ", "");
	if (!token) return res.sendStatus(401);
	try {
		const verifyUser = await verifyUserByToken(token);
		if (!verifyUser.rows.length)
			return res.status(401).send({ message: "Acesso negado!" });
		delete verifyUser.rows[0].password;
		res.status(200).send(verifyUser);
	} catch (err) {
		res.send(err.message);
	}
}
export async function follow(req, res) {
	const { userId } = req.body;
	const { authorization } = req.headers;
	const token = authorization?.replace("Bearer ", "");
	if (!token) return res.sendStatus(401);
	try {
		const verifyUser = await verifyUserByToken(token);
		if (!verifyUser.rows.length) return res.sendStatus(401);
		const verifyFollowUser = await verifyUserById(userId);
		if (verifyFollowUser.rows.length) {
			await removeFollower(verifyFollowUser.rows[0].id);
			res.status(200).send({ message: "Parou de seguir" });
		} else {
			await insertFollower(verifyFollowUser.rows[0].id);
			res.status(200).send({ message: "Seguindo" });
		}
	} catch (err) {
		res.send(err.message);
	}
}
