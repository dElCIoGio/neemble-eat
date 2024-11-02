import {Button} from "@/components/ui/button.tsx";
import {Link} from "react-router-dom";

export function Home() {
	return (
		<div>
			<Button asChild>
				<Link to={`/login`}>
					Iniciar Sessão
				</Link>
			</Button>
			<Button asChild>
				<Link to={`/signup`}>
					Criar Conta
				</Link>
			</Button>
		</div>
	);
}

