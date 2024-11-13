import {useEditItemContext} from "@/context/editItemContext";
import {Dialog, DialogContent, DialogHeader, DialogTitle} from "@/components/ui/dialog.tsx";




function EditItem() {

    const {item, onOpenChange, isOpened} = useEditItemContext()

    return (
        <Dialog open={isOpened} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        {item?.name ? item.name : "Novo item"}
                    </DialogTitle>
                </DialogHeader>
                <div className="px-4">
                    <EditItemContent/>
                </div>
            </DialogContent>
        </Dialog>
    );
}


function EditItemContent(){

    const {item} = useEditItemContext()

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