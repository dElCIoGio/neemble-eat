import {Button} from "@/components/ui/button.tsx";

interface Props {
	removeImage: () => void
	selectedImage: string | null
}


export function RestaurantBannerDisplay({removeImage, selectedImage}: Props) {

	if (selectedImage == null)
		return <div></div>
	return (
		<div>
			<div className={" w-fit"}>
				<div
					className='flex items-center justify-center border w-fit border-gray-300 rounded-lg p-4 mb-4 bg-gray-100'>
					<div
						className="flex items-center justify-center mt-4 w-32 h-20 overflow-hidden">
						<img src={selectedImage} alt="Banner Preview"
						     className="object-contain w-full h-full"/>
					</div>
				</div>
				<Button variant={"outline"}
				        className={"w-full"}
				        type={"button"}
				        onClick={removeImage}>
						Remover imagem
				</Button>
			</div>
		</div>
	);
}

