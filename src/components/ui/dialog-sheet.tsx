import {cn} from "@/lib/utils"
import { useMediaQuery } from "@/hooks/use-media-query"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import * as React from "react";

interface BaseProps {
    children: React.ReactNode
}

interface RootProps extends BaseProps {
    open?: boolean
    onOpenChange?: (open: boolean) => void
}

interface Props extends BaseProps {
    className?: string
    asChild?: true
}

const desktop = "(min-width: 768px)"


export function DialogSheet({children, ...props}: RootProps){
    const isDesktop = useMediaQuery(desktop)
    const DialogSheet = isDesktop ? Dialog : Sheet

    return (
        <>
            {
                isDesktop? <DialogSheet {...props}>{children}</DialogSheet>:
                    <DialogSheet {...props}>{children}</DialogSheet>
            }
        </>
    )
}

export function DialogSheetTrigger({className, children, ...props}: Props){
    const isDesktop = useMediaQuery(desktop)
    const DialogSheetTrigger = isDesktop ? DialogTrigger : SheetTrigger

    return <DialogSheetTrigger className={cn(className)} {...props}>
        {children}
    </DialogSheetTrigger>
}

export function DialogSheetClose({className, children, ...props}: Props){
    const isDesktop = useMediaQuery(desktop)
    const DialogSheetClose = isDesktop ? DialogClose : SheetClose

    return <DialogSheetClose className={className} {...props}>
        {children}
    </DialogSheetClose>
}

export function DialogSheetContent({className, children, ...props}: Props){
    const isDesktop = useMediaQuery(desktop)
    const DialogSheetContent = isDesktop ? DialogContent : SheetContent

    return <>
        {
            isDesktop ?
                <DialogSheetContent className={className} {...props}>
                {children}
            </DialogSheetContent>:
                <DialogSheetContent side={"bottom"} className={cn("rounded-t-2xl max-h-[90%]", className)} {...props}>
                    {children}
                </DialogSheetContent>
        }
    </>


}

export function DialogSheetHeader({className, children, ...props}: Props){
    const isDesktop = useMediaQuery(desktop)
    const DialogSheetHeader = isDesktop ? DialogHeader : SheetHeader

    return <DialogSheetHeader className={cn(className)} {...props}>{children}</DialogSheetHeader>
}

export function DialogSheetTitle({className, children, ...props}: Props){
    const isDesktop = useMediaQuery(desktop)
    const DialogSheetTitle = isDesktop ? DialogTitle : SheetTitle

    return <DialogSheetTitle className={className} {...props}>{children}</DialogSheetTitle>
}

export function DialogSheetDescription({className, children, ...props}: Props){
    const isDesktop = useMediaQuery(desktop)
    const DialogSheetDescription = isDesktop ? DialogDescription : SheetDescription

    return <DialogSheetDescription className={className} {...props}>{children}</DialogSheetDescription>
}

export function DialogSheetBody({className, children, ...props}: Props){
    return (
        <div className={cn("px-4 md:px-0", className)} {...props}>
            {children}
        </div>
    )
}

export function DialogSheetFooter({className, children, ...props}: Props) {
    const isDesktop = useMediaQuery(desktop)
    const DialogSheetFooter = isDesktop ? DialogFooter : SheetFooter

    return <DialogSheetFooter className={className} {...props}>
        {children}
    </DialogSheetFooter>
}