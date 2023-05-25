import bcrypt from "bcrypt";
import {
	insertUserDB,
	verifyUserDB,
} from "../repositories/user.repositories.js";

export async function signUp(req, res) {
	const { email, password, name, image, description } = req.body;
	const encryptPassword = bcrypt.hashSync(password, 10);
	try {
		const verifyUser = await verifyUserDB(email);
		if (verifyUser.rows.lenght)
			return res.status(409).send({ message: "Email já cadastrado" });
		await insertUserDB(email, encryptPassword, name, image, description);
		res.status(201).send({ message: "Cadastro finalizado!" });
	} catch (err) {
		res.send(err.message);
	}
}
export async function signIn(req, res) {}
