import joi from "joi";

export const signUpSchema = joi.object({
	email: joi.string().email().required(),
	password: joi.string().required().min(5),
	name: joi.string().required().min(3),
	image: joi.string(),
	description: joi.string(),
});
export const signInSchema = joi.object({
	email: joi.string().email().required(),
	password: joi.string().required(),
});
