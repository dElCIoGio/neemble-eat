import * as z from 'zod'

export const LogInSchema = z.object({
	email: z.string().email({
		message: 'Insira um e-mail válido',
	}),
	password: z.string().min(6, {
		message: 'Insira uma palavra-passe com o mínimo de 6 caracteres',
	})
})

export const RegisterSchema = z.object({
	firstName: z.string().min(1, {
		message: "Por favor, insira o seu primeiro nome",
	}),
	lastName: z.string().min(1, {
		message: "Por favor, insira o seu último nome",
	}),
	phoneNumber: z.string().min(1, {
		message: "Por favor, insira o seu número de telefone",
	}),
	email: z.string().email({
		message: 'Por favor, insira um e-mail válido',
	}),
	password: z.string().min(6, {
		message: 'A palavra-passe deve ter no mínimo 6 caracteres',
	}),
	confirmPassword: z.string().min(6, {
		message: 'Por favor, confirme a sua palavra-passe',
	}),
}).refine((data) => data.password === data.confirmPassword, {
	message: "As palavras-passe não coincidem",
	path: ["confirmPassword"],
});

export const AdditionalNoteSchema = z.object({
	note: z.string()
})