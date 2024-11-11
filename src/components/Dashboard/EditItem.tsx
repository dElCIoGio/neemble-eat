import {useIsMobile} from "@/hooks/use-mobile.tsx";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    Drawer,
    DrawerContent
    , DrawerFooter,
    DrawerHeader,
    DrawerTitle,
} from "@/components/ui/drawer";
import {useEditMenuContext} from "@/context/editMenuContext.ts";

interface EditItemProps {
    isOpen: boolean;
    onOpenChange: (state: boolean) => void;
}


function EditItem() {

    const {onOpenChange, isOpened} = useEditMenuContext()
    const isMobile = useIsMobile()

    return (
        <div>
            {
                isMobile ? <EditItemDrawer isOpen={isOpened} onOpenChange={onOpenChange}/> :
                    <EditItemDialog isOpen={isOpened} onOpenChange={onOpenChange}/>
            }

        </div>
    );
}

function EditItemDrawer({isOpen, onOpenChange}: EditItemProps) {

    const {item} = useEditMenuContext()

    return (
        <Drawer open={isOpen} onOpenChange={onOpenChange}>
            <DrawerContent>
                <DrawerHeader>
                    <DrawerTitle>
                        {item?.name ? item.name : "Novo item"}
                    </DrawerTitle>
                </DrawerHeader>
                <EditItemContent/>
                <DrawerFooter>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    )
}

function EditItemDialog({isOpen, onOpenChange}: EditItemProps) {

    const {item} = useEditMenuContext()

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        {item?.name ? item.name : "Novo item"}
                    </DialogTitle>
                </DialogHeader>
                <EditItemContent/>

                <DialogFooter>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

function EditItemContent(){

    const {item} = useEditMenuContext()

    return (
        <div>
            {
                item && item.imageURL &&
                <img src={item?.imageURL}
                     alt=""
                     className='rounded-md object-cover w-full max-h-52'/>
            }
        </div>

    )
}

export default EditItem;