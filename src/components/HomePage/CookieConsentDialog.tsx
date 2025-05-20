
import { useEffect, useState } from "react"
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

    useEffect(() => {
        const consent = getCookieConsent()
        if (!consent) setOpen(true)
    }, [])

    const acceptAll = () => {
        const allConsent: CookieConsent = {
            analytics: true,
            marketing: true,
            functional: true,
        }
        setCookieConsent(allConsent)
        setOpen(false)
    }

    const rejectAll = () => {
        const minimalConsent: CookieConsent = {
            analytics: false,
            marketing: false,
            functional: true, // Functional is usually required
        }
        setCookieConsent(minimalConsent)
        setOpen(false)
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>We value your privacy</DialogTitle>
                    <DialogDescription>
                        We use cookies to personalize your experience. You can accept all, reject non-essential ones, or customize later.
                    </DialogDescription>
                </DialogHeader>

                <DialogFooter className="flex justify-end gap-2">
                    <Button variant="outline" onClick={rejectAll}>
                        Reject Non-Essential
                    </Button>
                    <Button onClick={acceptAll}>Accept All</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
