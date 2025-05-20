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
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { getCookieConsent, setCookieConsent, CookieConsent } from "@/lib/cookieConsent"

export function CookieConsentDialog() {
    const [open, setOpen] = useState(false)
    const [customizing, setCustomizing] = useState(false)
    const location = useLocation()

    const [preferences, setPreferences] = useState<CookieConsent>({
        functional: true, // Essential, cannot be disabled
        analytics: false,
        marketing: false,
    })

    useEffect(() => {
        const isOnConsentPage = ["/cookie-policy", "/privacy-policy"].includes(location.pathname)
        const consent = getCookieConsent()
        if (!consent && !isOnConsentPage) setOpen(true)
    }, [location.pathname])

    const aceitarTodos = () => {
        const allConsent: CookieConsent = {
            functional: true,
            analytics: true,
            marketing: true,
        }
        setCookieConsent(allConsent)
        setOpen(false)
    }

    const rejeitarNaoEssenciais = () => {
        const minimalConsent: CookieConsent = {
            functional: true,
            analytics: false,
            marketing: false,
        }
        setCookieConsent(minimalConsent)
        setOpen(false)
    }

    const guardarPreferencias = () => {
        setCookieConsent(preferences)
        setOpen(false)
        setCustomizing(false)
    }

    const toggle = (key: keyof CookieConsent) => {
        if (key === "functional") return // essential, can't be changed
        setPreferences(prev => ({ ...prev, [key]: !prev[key] }))
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="">
                <DialogHeader>
                    <DialogTitle>Preferências de Cookies</DialogTitle>
                    <DialogDescription className="text-sm text-muted-foreground mt-2 space-y-1">
                        <p>
                            Utilizamos cookies para melhorar a sua experiência, analisar o tráfego e personalizar conteúdos.
                            Pode aceitar todos os cookies ou personalizar as suas preferências.
                        </p>
                        <p className="mt-2">
                            Saiba mais na nossa{" "}
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

                {customizing ? (
                    <div className="space-y-4 pt-4">
                        <div className="flex items-center space-x-3">
                            <Checkbox checked disabled id="functional" />
                            <Label htmlFor="functional">Cookies essenciais (obrigatórios)</Label>
                        </div>
                        <div className="flex items-center space-x-3">
                            <Checkbox id="analytics" checked={preferences.analytics} onCheckedChange={() => toggle("analytics")} />
                            <Label htmlFor="analytics">Cookies de análise (opcional)</Label>
                        </div>
                        <div className="flex items-center space-x-3">
                            <Checkbox id="marketing" checked={preferences.marketing} onCheckedChange={() => toggle("marketing")} />
                            <Label htmlFor="marketing">Cookies de marketing (opcional)</Label>
                        </div>

                        <DialogFooter className="flex justify-end gap-2 pt-2">
                            <Button variant="outline" onClick={() => setCustomizing(false)}>
                                Cancelar
                            </Button>
                            <Button onClick={guardarPreferencias}>Guardar Preferências</Button>
                        </DialogFooter>
                    </div>
                ) : (
                    <DialogFooter className="flex justify-end gap-2 pt-4">
                        <Button variant="outline" onClick={rejeitarNaoEssenciais}>
                            Rejeitar Não Essenciais
                        </Button>
                        <Button variant="outline" onClick={() => setCustomizing(true)}>
                            Personalizar
                        </Button>
                        <Button onClick={aceitarTodos}>Aceitar Todos</Button>
                    </DialogFooter>
                )}
            </DialogContent>
        </Dialog>
    )
}