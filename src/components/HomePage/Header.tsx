import logo from "../../../public/neemble-eat-logo.png";
import {Sheet, SheetContent, SheetTrigger} from "@/components/ui/sheet.tsx";
import {AlignCenter} from "lucide-react";
import {Link} from "react-router-dom";
import {URL_PATH_PREFIX} from "@/lib/constants.ts";
import {Button} from "@/components/ui/button.tsx";
import {useIsMobile} from "@/hooks/use-mobile.tsx";

export function Header() {

    const isMobile = useIsMobile()

    return (
        <nav className="pt-4 px-4 bg-opacity-50 flex justify-between items-center">
            <img src={logo} className="max-w-28 p-0" alt=""/>
            {isMobile ? <Sheet>
                    <SheetTrigger asChild><AlignCenter/></SheetTrigger>
                    <SheetContent className="py-12">

                        <div className="flex flex-col gap-3">
                            <Link to={`${URL_PATH_PREFIX}/login`} className="font-poppins-semibold">
                                Login
                            </Link>
                            <Link to={`${URL_PATH_PREFIX}/signup`} className="font-poppins-semibold">
                                Começe agora
                            </Link>
                        </div>

                    </SheetContent>
                </Sheet> :
                <div className="flex items-center gap-3">
                    <Button asChild className="rounded-full text-french_gray-300 hover:text-french_gray-200 hover:no-underline" variant="link">
                        <Link to={`${URL_PATH_PREFIX}/login`} className="border-white">
                            Login
                        </Link>
                    </Button>
                    <Button asChild className="rounded-xl px-5">
                        <Link to={`${URL_PATH_PREFIX}/signup`} className="border-white">
                            Começe agora
                        </Link>
                    </Button>

                </div>
            }

        </nav>

    );
}

