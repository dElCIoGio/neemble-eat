import {URL_PATH_PREFIX} from "@/lib/constants";
import {Link} from "react-router-dom";
import {Button} from "@/components/ui/button";

function AuthError() {
	return (
		<div className='flex items-center justify-center w-full h-dvh'>
            <div>
                <div>
                    <h1 className={`font-semibold text-2xl text-center py-2`}>
                        Não pode proceguir ainda...
                    </h1>
                    <h2 className={`text-center`}>
                        Notamos que não tem uma sessão iniciada. Para que possa proceguir, escolha umas opções abaixo
                    </h2>
                </div>
                <div className={`flex justify-center py-12 space-x-3`}>
	                <Button>
		                <Link to={`${URL_PATH_PREFIX}/login`}>
	                            Iniciar Sessão
	                        </Link>
	                </Button>
	                <Button>
		                <Link to={`${URL_PATH_PREFIX}/signup`}>
			                Criar Conta
						</Link>
	                </Button>
                </div>
            </div>
        </div>
	);
}

export default AuthError;