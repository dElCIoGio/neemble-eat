import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import {InvitationToken} from "@/schema.ts";
import {Button} from "@/components/ui/button.tsx";
import {X, CheckCircle} from "@phosphor-icons/react"
import {InvitationLink} from "@/components/Dashboard/InvitationLink.tsx";


interface InvitationLinkDisplayProps {
    token: InvitationToken | undefined;
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
}

export function InvitationLinkDisplay({setIsOpen, isOpen, token}: InvitationLinkDisplayProps) {

    if (!token)
        return <div></div>

    return (
        <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
            <AlertDialogContent className="text-white bg-zinc-900 border-none p-4">
                <AlertDialogHeader>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-1.5">
                            <CheckCircle className="text-green-300" />
                            <AlertDialogTitle className="text-base font-poppins-regular">
                                Convite criado
                            </AlertDialogTitle>
                        </div>
                        <div className="flex justify-end">
                            <Button size="icon" onClick={() => setIsOpen(false)} className="">
                                <X className="p-0 m-0"/>
                            </Button>
                        </div>
                    </div>
                    <div className="text-left">
                        <div className="text-zinc-400 space-y-2">
                            <h2 className="">
                                Envie o link abaixo para o seu funcionário para que tenha acesso ao Painel de
                                Controlo
                            </h2>
                            <h3 className="italic text-sm">
                                Atenção: este link irá expirar automaticamente em 24h.
                            </h3>
                        </div>
                        <InvitationLink link={`${window.location.origin}/invite/${token.id}`}/>
                    </div>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel asChild className="bg-none hover:bg-zinc-800 text-white hover:text-white focus:bg-zinc-800">
                        <Button variant="ghost" className="text-white bg-zinc-900 hover:border-zinc-800 border-none">
                            Fechar
                        </Button>
                    </AlertDialogCancel>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}

