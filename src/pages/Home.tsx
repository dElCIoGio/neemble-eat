import {Link} from "react-router-dom";
import background from "@/../public/images/mesh.png"
import {URL_PATH_PREFIX} from "@/lib/constants.ts";

export function Home() {
	return (
		<div className="h-screen bg-cover ]" style={{backgroundImage: `url(${background})`}}>
			<div className="max-w-[920px] w-full mx-auto">
				<nav className="p-4 bg-opacity-50 text-white flex justify-between items-center">
					<h1 className="text-xl font-bold">Logo</h1>
					<div className="space-x-4">
						<Link to="/" className="text-white hover:text-gray-300">Home</Link>
						<Link to="/about" className="text-white hover:text-gray-300">About</Link>
						<Link to="/contact" className="text-white hover:text-gray-300">Contact</Link>
					</div>
					<Link to={`${URL_PATH_PREFIX}/login`} className="text-white border-white">
						Login
					</Link>
				</nav>
				<main>
					<h1>
						Exepecie a simplicidade em seu restaurante
					</h1>
				</main>
			</div>
		</div>
	);
}

