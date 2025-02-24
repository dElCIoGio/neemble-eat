// import logo from "../../../public/neemble-eat-logo.png";
import { Button } from "@/components/ui/button"
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { Badge } from "@/components/ui/badge"
import {Link, NavLink} from "react-router-dom";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"

// import {useIsMobile} from "@/hooks/use-mobile.tsx";

export function Header() {

    // const isMobile = useIsMobile()

    return (
        <>
            {/* Announcement Banner */}
            <div className="w-full bg-zinc-800 text-white text-center py-2 text-sm">
                <span>Oferta Especial para Novos Restaurantes: </span>
                <Link to="#" className="text-purple-300 hover:text-purple-100">
                    1 Mês Grátis
                </Link>
            </div>

            <header className="border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center gap-8">
                            <div className="flex items-center gap-2">
                                <Sheet>
                                    <SheetTrigger asChild>
                                        <Button variant="ghost" size="icon" className="md:hidden">
                                            <Menu className="h-6 w-6" />
                                            <span className="sr-only">Abrir menu</span>
                                        </Button>
                                    </SheetTrigger>
                                    <SheetContent side="left" className="w-[300px]">
                                        <SheetHeader>
                                            <SheetTitle>Neemble Eat</SheetTitle>
                                        </SheetHeader>
                                        <div className="mt-6 space-y-4">
                                            <div className="space-y-2">
                                                <div className="text-sm font-medium text-gray-500 px-2">Soluções</div>
                                                <div className="space-y-1">
                                                    <Link to="#" className="block px-2 py-1 text-sm hover:bg-gray-100 rounded-md">
                                                        Menu Digital
                                                    </Link>
                                                    <Link to="#" className="block px-2 py-1 text-sm hover:bg-gray-100 rounded-md">
                                                        Gestão de Pedidos
                                                    </Link>
                                                    <Link to="#" className="block px-2 py-1 text-sm hover:bg-gray-100 rounded-md">
                                                        Análise de Dados
                                                    </Link>
                                                </div>
                                            </div>

                                            <Link to="price" className="block px-2 py-1 text-sm hover:bg-gray-100 rounded-md">
                                                Preços
                                            </Link>

                                            <div className="space-y-2">
                                                <div className="text-sm font-medium text-gray-500 px-2">Recursos</div>
                                                <div className="space-y-1">
                                                    <Link to="#" className="block px-2 py-1 text-sm hover:bg-gray-100 rounded-md">
                                                        Sistema QR Code
                                                        <Badge className="ml-2 bg-emerald-100 text-emerald-700">POPULAR</Badge>
                                                    </Link>
                                                    <Link to="#" className="block px-2 py-1 text-sm hover:bg-gray-100 rounded-md">
                                                        Dashboard da Cozinha
                                                    </Link>
                                                    <Link to="#" className="block px-2 py-1 text-sm hover:bg-gray-100 rounded-md">
                                                        Relatórios Analíticos
                                                    </Link>
                                                </div>
                                            </div>

                                            <div className="space-y-2">
                                                <div className="text-sm font-medium text-gray-500 px-2">Links Rápidos</div>
                                                <div className="space-y-1">
                                                    <NavLink to="blog" className="block px-2 py-1 text-sm hover:bg-gray-100 rounded-md">
                                                        Blog
                                                    </NavLink>
                                                    <NavLink to="about-us" className="block px-2 py-1 text-sm hover:bg-gray-100 rounded-md">
                                                        Sobre Nós
                                                    </NavLink>
                                                    <NavLink to="contact" className="block px-2 py-1 text-sm hover:bg-gray-100 rounded-md">
                                                        Contato
                                                    </NavLink>
                                                </div>
                                            </div>

                                            <div className="pt-4 mt-4 border-t">
                                                <Button className="w-full bg-purple-600 hover:bg-purple-500 text-white">Agendar Demo</Button>
                                            </div>
                                        </div>
                                    </SheetContent>
                                </Sheet>
                                <NavLink to="" className="font-bold text-xl">
                                    Neemble Eat
                                </NavLink>
                            </div>

                            <NavigationMenu className="hidden md:flex">
                                <NavigationMenuList>
                                    <NavigationMenuItem>
                                        <NavigationMenuTrigger>Soluções</NavigationMenuTrigger>
                                        <NavigationMenuContent>
                                            <ul className="grid w-[200px] gap-2 p-4">
                                                <li>
                                                    <NavigationMenuLink asChild>
                                                        <Link to="#" className="block p-2 hover:bg-gray-50 rounded-md">
                                                            Menu Digital
                                                        </Link>
                                                    </NavigationMenuLink>
                                                </li>
                                                <li>
                                                    <NavigationMenuLink asChild>
                                                        <Link to="#" className="block p-2 hover:bg-gray-50 rounded-md">
                                                            Gestão de Pedidos
                                                        </Link>
                                                    </NavigationMenuLink>
                                                </li>
                                                <li>
                                                    <NavigationMenuLink asChild>
                                                        <Link to="#" className="block p-2 hover:bg-gray-50 rounded-md">
                                                            Análise de Dados
                                                        </Link>
                                                    </NavigationMenuLink>
                                                </li>
                                            </ul>
                                        </NavigationMenuContent>
                                    </NavigationMenuItem>

                                    {/* Preços */}
                                    <NavigationMenuItem>
                                        <NavigationMenuLink asChild>
                                            <NavLink to="price" className="block p-2">
                                                Preços
                                            </NavLink>
                                        </NavigationMenuLink>
                                    </NavigationMenuItem>

                                    {/* Recursos */}
                                    <NavigationMenuItem>
                                        <NavigationMenuTrigger>Recursos</NavigationMenuTrigger>
                                        <NavigationMenuContent>
                                            <ul className="grid w-[300px] gap-2 p-4">
                                                <li>
                                                    <NavigationMenuLink asChild>
                                                        <Link
                                                            to="#"
                                                            className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-md"
                                                        >
                                                            Sistema QR Code
                                                            <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100">POPULAR</Badge>
                                                        </Link>
                                                    </NavigationMenuLink>
                                                </li>
                                                <li>
                                                    <NavigationMenuLink asChild>
                                                        <Link to="#" className="block p-2 hover:bg-gray-50 rounded-md">
                                                            Dashboard da Cozinha
                                                        </Link>
                                                    </NavigationMenuLink>
                                                </li>
                                                <li>
                                                    <NavigationMenuLink asChild>
                                                        <Link to="#" className="block p-2 hover:bg-gray-50 rounded-md">
                                                            Relatórios Analíticos
                                                        </Link>
                                                    </NavigationMenuLink>
                                                </li>
                                            </ul>
                                        </NavigationMenuContent>
                                    </NavigationMenuItem>
                                </NavigationMenuList>
                            </NavigationMenu>
                        </div>

                        <div className="flex items-center space-x-4 md:space-x-8">
                            <NavLink to="contact" className="hidden md:block text-gray-600 hover:text-gray-900">
                                Contacto
                            </NavLink>
                            <Button variant="secondary" size="sm" className="bg-zinc-800 text-xs text-white hover:bg-zinc-600">
                                Agendar Demo
                            </Button>
                        </div>
                    </div>
                </div>
            </header>
        </>

    );
}

