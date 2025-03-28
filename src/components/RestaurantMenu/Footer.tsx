import {useMenuContext} from "@/context/menuContext";
import {CharmLinkExternal} from "../../../public/icons/CharmLinkExternal.tsx";
import {CharmPhone} from "../../../public/icons/CharmPhone.tsx";


export function Footer() {

	const {restaurant} = useMenuContext()

	return (
		<div className='bg-gray-200 rounded-t-xl'>
            <div className='pt-5 pb-10 border-b border-gray-300 px-5 laptop:px-9'>
                <h1 className={`text-2xl font-poppins-semibold`}>
                    {restaurant.name}
                </h1>

                <div className='flex items-center'>
                    <CharmPhone className='mt-0.5'/>
	                <p className='ml-1 text-sm text-gray-600 font-semibold'>
                        <a href={`tel:${restaurant.phoneNumber}`}>{restaurant.phoneNumber}</a>

                    </p>
                </div>
            </div>
            <div className='flex justify-between pt-4 pb-16 px-5 laptop:px-9'>
                <div className='text-gray-600 underline text-sm'>
                    <div>
                        <a href="#" className='flex items-center'>
                            <p className='mr-1.5'>Política de Privacidade</p>
                            <CharmLinkExternal></CharmLinkExternal>
                        </a>
                    </div>
                    <div>
                        <a href="#" className='flex items-center'>
                            <p className='mr-1.5'>Termos de Serviço</p>
                            <CharmLinkExternal></CharmLinkExternal>
                        </a>
                    </div>
                </div>
                <div className='flex items-end'>
                    <h2 className='font-bold text-gray-600 text-sm'>Powered by <a
	                    href="https://www.neemble.net"
	                    className='hover:text-gray-400 transition-colors duration-300'
                    >neemble</a>
                    </h2>
                </div>
            </div>
        </div>
	);
}

