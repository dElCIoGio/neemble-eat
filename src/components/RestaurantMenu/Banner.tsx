import {useMenuContext} from "@/context/menuContext.ts";

export function Banner() {

	const {restaurant} = useMenuContext()

	return (
		<div
			className='justify-center flex items-center overflow-hidden'>
            <img
	            src={restaurant.bannerURL}
	            alt="description of image"
	            className='object-cover w-full max-h-40 laptop:max-h-60'
            />
        </div>
	);
}