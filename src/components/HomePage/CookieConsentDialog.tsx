import { useEffect, useState } from "react"
import { Link, useLocation } from "react-router-dom"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { getCookieConsent, setCookieConsent, CookieConsent } from "@/lib/cookieConsent"

export function CookieConsentDialog() {
    const [open, setOpen] = useState(false)
    const location = useLocation()

    useEffect(() => {
        const isOnConsentPage = ["/cookie-policy", "/privacy-policy"].includes(location.pathname)
        const consent = getCookieConsent()

        if (!consent && !isOnConsentPage) {
            setOpen(true)
        }

        if (isOnConsentPage) {
            setOpen(false)
        }

    }, [location.pathname])

    const acceptAll = () => {
        const fullConsent: CookieConsent = {
            analytics: true,
            marketing: true,
            functional: true,
        }
        setCookieConsent(fullConsent)
        setOpen(false)
    }

    const rejectNonEssentials = () => {
        const minimalConsent: CookieConsent = {
            analytics: false,
            marketing: false,
            functional: true,
        }
        setCookieConsent(minimalConsent)
        setOpen(false)
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Utilizamos cookies</DialogTitle>
                    <DialogDescription className="text-sm text-muted-foreground mt-2 space-y-1">
                        <p>
                            Este website utiliza cookies para melhorar a sua experiência, analisar o tráfego e personalizar conteúdos.
                            Pode aceitar todos os cookies ou gerir as suas preferências.
                        </p>
                        <p className="mt-2">
                            Para mais informações, consulte a nossa{" "}
                            <Link to="/cookie-policy" className="underline underline-offset-4 text-primary">
                                Política de Cookies
                            </Link>{" "}
                            e{" "}
                            <Link to="/privacy-policy" className="underline underline-offset-4 text-primary">
                                Política de Privacidade
                            </Link>.
                        </p>
                    </DialogDescription>
                </DialogHeader>

                <DialogFooter className="flex justify-end gap-2 pt-4">
                    <Button variant="outline" onClick={rejectNonEssentials}>
                        Rejeitar Não Essenciais
                    </Button>
                    <Button onClick={acceptAll}>Aceitar Todos</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}