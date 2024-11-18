import {ScrollArea} from "@/components/ui/scroll-area.tsx";
import {useMediaQuery} from "@/hooks/use-media-query.ts";
import {AddItemContent} from "@/components/Dashboard/AddItemContent.tsx";
import {
    DialogSheet,
    DialogSheetContent,
    DialogSheetDescription,
    DialogSheetHeader,
    DialogSheetTitle,
    DialogSheetTrigger
} from "@/components/ui/dialog-sheet";


interface AddProductProps {
    children?: React.ReactNode;
}

const desktop = "(min-width: 768px)"

function AddItem({ children }: AddProductProps) {

    const isDesktop = useMediaQuery(desktop)

    return (
        <DialogSheet>
            <DialogSheetTrigger asChild>
                {children}
            </DialogSheetTrigger>
            <DialogSheetContent className={`${isDesktop && "rounded-xl max-h-[90%] mx-auto"} px-0 laptop:px-4 laptop:max-h-[95%] overflow-y-scroll styled-scrollbar`}>
                <DialogSheetHeader>
                    <DialogSheetTitle>
                        Produto Novo
                    </DialogSheetTitle>
                    <DialogSheetDescription>
                        Adicione um novo produto ao seu menu.
                    </DialogSheetDescription>
                </DialogSheetHeader>
                    {
                        isDesktop?
                            <AddItemContent/>:
                                <ScrollArea className="overflow-y-auto styled-scrollbar px-4">
                                    <AddItemContent/>
                                </ScrollArea>

                    }
            </DialogSheetContent>
        </DialogSheet>
    );
}


export default AddItem;