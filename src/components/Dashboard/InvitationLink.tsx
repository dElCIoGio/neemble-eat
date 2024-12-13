import { useState } from 'react';
import { Button } from "@/components/ui/button.tsx";
import { copyToClipboard } from "@/lib/utils.ts";
import { Copy, Check } from "@phosphor-icons/react";

interface InvitationLinkProps {
    link: string;
}

export function InvitationLink({link}: InvitationLinkProps) {
    const [isCopied, setIsCopied] = useState(false);
    const [opacity, setOpacity] = useState(1); // Start with full opacity

    const handleCopy = async () => {
        setOpacity(0); // Fade out the current icon
        copyToClipboard(link);
        setTimeout(() => {
            setIsCopied(true);
            setOpacity(1); // Fade in the new icon
        }, 150); // Delay for fading effect

        setTimeout(() => {
            setOpacity(0); // Start fade out for switching back
            setTimeout(() => {
                setIsCopied(false);
                setOpacity(1); // Fade in the original icon
            }, 150); // Match the fade in and out timing
        }, 2000); // How long to show the check icon
    };

    return (
        <div className="flex justify-between items-center p-4 bg-black text-white rounded-lg border-2 border-zinc-800 mt-4">
            <p className="hover:underline transition-all duration-200">
                {link}
            </p>
            <Button size="icon" onClick={handleCopy}>
                <div style={{ opacity, transition: 'opacity 300ms ease-in-out' }}>
                    {isCopied ? <Check /> : <Copy />}
                </div>
            </Button>
        </div>
    );
}
