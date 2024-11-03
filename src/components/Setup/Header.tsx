import {SetUpTab} from "@/schema.ts";
import {TypographyH3, TypographyMuted} from "@/components/ui/Typography.tsx";


interface HeaderProps {
	tab: SetUpTab;
	name: string;
}


export function Header({tab, name}: HeaderProps) {


	return (
		<div className="w-full text-center font-poppins py-8">
			<TypographyH3>
				Seja bem vindo(a)
				<span className='font-poppins-semibold text-stone-500'>{name}</span>
			</TypographyH3>
            <TypographyMuted>
	            {
		            tab === "restaurant" ? "Detalhes do restaurante" :
			            tab === "tables" ? "Configuração das mesas" :
				            "Montagem do menu"
	            }
            </TypographyMuted>
                <p className='text-2xl my-3 font-poppins-semibold'>

                </p>
            </div>
	);
}

