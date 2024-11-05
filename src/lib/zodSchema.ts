import {z} from "zod";

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

export const DESCRIPTION_MAX_SIZE: number = 300

export const RestaurantConfigSchema = z.object({
	image: z.instanceof(File).refine(file => {
		return file.type.startsWith('image/');
	}, {
		message: "Formato inválido. Apenas imagens são permitidas."
	}).refine(image => {
		const MAX_FILE_SIZE = 5 * 1024 * 1024;
		return image.size <= MAX_FILE_SIZE;
	}, {
		message: "Imagem grande demais. O tamanho máximo permitido são 5MB."
	}).optional().refine(file => file !== undefined, {
		message: "Nenhuma imagem foi selecionada. Por favor, inclua uma imagem."
	}),
	restaurantName: z.string().min(1, {
		message: "Escreva o nome do restaurante."
	}),
	phoneNumber: z.string().min(1, {
		message: "Escreva o número de telefone do restaurante."
	}),
	address: z.string().min(1, {
		message: "Escreva o endereço do restaurante."
	}),
	description: z.string().min(1, {
		message: `Escreva uma descrição de até ${DESCRIPTION_MAX_SIZE} caracteres.`
	}).max(DESCRIPTION_MAX_SIZE, {
		message: `O tamanho máximo da descrição são ${DESCRIPTION_MAX_SIZE} caracteres.`
	}),
});

export const MAX_NUMBER_OF_TABLES = 40

export const TablesConfigSchema = z.object({
	numberOfTables: z.number().int().positive({
		message: "Insira um número válido de mesas"
	}).min(1, {
		message: "Insira pelo menos uma mesa."
	}).max(MAX_NUMBER_OF_TABLES, {
		message: `O número máximo de mesas permitido é ${MAX_NUMBER_OF_TABLES}`
	}),
})