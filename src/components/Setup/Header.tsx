import {TypographyH3} from "@/components/ui/Typography.tsx";


interface HeaderProps {
	name: string;
}


export function Header({name}: HeaderProps) {


	return (
		<div className="w-full text-center font-poppins py-8">
			<TypographyH3>
				Seja bem vindo(a)
				<span className='font-poppins-semibold text-stone-500'>{name}</span>
			</TypographyH3>

                <p className='text-2xl my-3 font-poppins-semibold'>

                </p>
            </div>
	);
}

