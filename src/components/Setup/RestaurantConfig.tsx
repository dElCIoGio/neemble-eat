import {Input} from "@/components/ui/input.tsx";
import {Upload} from "lucide-react"
import {ChangeEvent, useState} from "react";
import {Button} from "../ui/button";
import {Label} from "@radix-ui/react-label";

export function RestaurantConfig() {

	const [, setSelectedImageFile] = useState<File | null>(null);
	const [selectedImageURL, setSelectedImageURL] = useState<string | null>(null);

	const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file && file.type.startsWith('image/')) {
			setSelectedImageURL(URL.createObjectURL(file));
			setSelectedImageFile(file)
			console.log(file)
		}
	};

	return (
		<div>
			<Label>Escolha uma imagem para o deu restaurante. Não se preocupe, poderá alterar à qualquer momento</Label>
			{selectedImageURL ?
				<div className={"w-fit"}>
					<div
						className='flex items-center justify-center border w-fit border-gray-300 rounded-lg p-4 mb-4 bg-gray-100'>
						<div
							className="flex items-center justify-center mt-4 w-32 h-20 overflow-hidden">
							<img src={selectedImageURL} alt="Banner Preview"
							     className="object-contain w-full h-full"/>
						</div>
					</div>
					<Button variant={"outline"}
					        className={"w-full"}
					        onClick={() => setSelectedImageURL(null)}>
						Remover imagem
					</Button>
				</div> :
				<label
					className={`border border-gray-200 w-40 h-24 flex flex-col items-center justify-center px-4 py-4 bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase cursor-pointer hover:bg-gray-100 transition-colors duration-300`}>
					<Upload/>
					<Input type="file"
					       placeholder={""}
					       id='picture'
					       accept="image/*"
					       className={"hidden"}
					       onChange={handleImageChange}/>
				</label>
			}
		</div>
	);
}

