import {useEditItemContext} from "@/context/editItemContext";
import {Credenza, CredenzaBody, CredenzaContent, CredenzaHeader, CredenzaTitle} from "@/components/ui/credenza.tsx";




function EditItem() {

    const {item, onOpenChange, isOpened} = useEditItemContext()

    return (
        <Credenza open={isOpened} onOpenChange={onOpenChange}>
            <CredenzaContent>
                <CredenzaHeader>
                    <CredenzaTitle>
                        {item?.name ? item.name : "Novo item"}
                    </CredenzaTitle>
                </CredenzaHeader>
                <CredenzaBody>
                    <EditItemContent/>
                </CredenzaBody>
            </CredenzaContent>
        </Credenza>
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