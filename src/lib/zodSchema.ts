import {z} from "zod";

export const MB = 1024 * 1024;

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

export const RESTAURANT_BANNER_MAX_IMAGE_SIZE = 15

export const RestaurantConfigSchema = z.object({
	image: z.instanceof(File).refine(file => {
		return file.type.startsWith('image/');
	}, {
		message: "Formato inválido. Apenas imagens são permitidas."
	}).refine(image => {
		const MAX_FILE_SIZE = RESTAURANT_BANNER_MAX_IMAGE_SIZE * MB;
		return image.size <= MAX_FILE_SIZE;
	}, {
		message: `Imagem grande demais. O tamanho máximo permitido são ${RESTAURANT_BANNER_MAX_IMAGE_SIZE}MB.`
	}).refine(file => file.size !== 0,
		{
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


export const MAX_NUMBER_OF_CHARACTERS_ITEM_NAME = 55
export const MAX_NUMBER_OF_CHARACTERS_ITEM_DESCRIPTION = 300
export const MAX_IMAGE_SIZE = 15

export const ItemSchema = z.object({
	availability: z.boolean().default(true),
	image: z.instanceof(File).refine(file => {
		return file.type.startsWith('image/');
	}, {
		message: "Formato inválido. Apenas imagens são permitidas."
	}).refine(file => file.size > MAX_IMAGE_SIZE * MB, {
		message: `Imagem grande demais. O tamanho máximo permitido são ${MAX_IMAGE_SIZE}MB.`
	}).refine(file => file.size !== 0, {
		message: "Nenhuma imagem foi selecionada. Por favor, inclua uma imagem."
	}),
	name: z.string().min(1, {
		message: "Inclua um nome para o seu produto."
	}).max(MAX_NUMBER_OF_CHARACTERS_ITEM_NAME, {
		message: `O nome deve ter no máximo ${MAX_NUMBER_OF_CHARACTERS_ITEM_NAME} caracteres.`
	}),
	description: z.string().min(1, {
		message: "Inclua uma descrição para o seu produto."
	}).max(MAX_NUMBER_OF_CHARACTERS_ITEM_DESCRIPTION, {
		message: `A descrição deve ter no máximo ${MAX_NUMBER_OF_CHARACTERS_ITEM_DESCRIPTION} caracteres.`
	}),
	price: z.number().int().positive({
		message: "Insira um preço válido."
	}),
	categoryID: z.string().min(1, {
		message: "Inclua uma categoria para o seu produto."
	}),
})


export const CategorySchema = z.object({
	name: z.string().min(1, {
		message: "Inclua um nome para a categoria."
	}),
	description: z.string()
})