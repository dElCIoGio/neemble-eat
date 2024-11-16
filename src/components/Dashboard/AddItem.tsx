import {ScrollArea} from "@/components/ui/scroll-area.tsx";
import {useMediaQuery} from "@/hooks/use-media-query.ts";
import {AddItemContent} from "@/components/Dashboard/AddItemContent.tsx";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog.tsx";

interface AddProductProps {
    children?: React.ReactNode;
}

const desktop = "(min-width: 768px)"

function AddItem({ children }: AddProductProps) {

    const isDesktop = useMediaQuery(desktop)

    return (
        <Dialog>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent className="rounded-xl max-h-[90%] mx-auto px-0 laptop:px-4 laptop:max-h-[95%] overflow-y-scroll styled-scrollbar">
                <DialogHeader>
                    <DialogTitle>
                        Produto Novo
                    </DialogTitle>
                    <DialogDescription>
                        Adicione um novo produto ao seu menu.
                    </DialogDescription>
                </DialogHeader>
                    {
                        isDesktop?
                            <AddItemContent/>:
                                <ScrollArea className="overflow-y-auto styled-scrollbar px-4">
                                    <AddItemContent/>
                                </ScrollArea>

                    }
            </DialogContent>
        </Dialog>
    );
}

export default AddItem;