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
import {z} from "zod";
import {ItemSchema} from "@/lib/zodSchema.ts";
import {addMenuItem} from "@/api/category/manager.ts";
import {useEditMenuContext} from "@/context/editMenuContext.ts";
import {MenuItemJson} from "@/schema.ts";


interface AddProductProps {
    children?: React.ReactNode;
}

type AddItemValues = z.infer<typeof ItemSchema>;

const desktop = "(min-width: 768px)"

function AddItem({ children }: AddProductProps) {

    const {addItem} = useEditMenuContext()

    const isDesktop = useMediaQuery(desktop)

    function handleSubmit(values: AddItemValues) {
        if (values.categoryID)
            addMenuItem({
                image: values.image,
                availability: values.availability,
                categoryID: values.categoryID,
                description: values.description,
                price: values.price,
                name: values.name
            }).then((item) => {
                if (item.id && item.categoryID && item.created_time && item.imageURL){
                    const newItem: MenuItemJson = {
                        name: item.name,
                        availability: item.availability != undefined?
                            item.availability: true,
                        categoryID: item.categoryID,
                        price: item.price,
                        description: item.description != undefined?
                            item.description: "",
                        id: item.id,
                        created_time: item.created_time,
                        imageURL: item.imageURL
                    }
                    addItem(item.categoryID, newItem)
                }

            })
    }

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
                            <AddItemContent onSubmit={handleSubmit}/>:
                                <ScrollArea className="overflow-y-auto styled-scrollbar px-4">
                                    <AddItemContent onSubmit={handleSubmit}/>
                                </ScrollArea>

                    }
            </DialogSheetContent>
        </DialogSheet>
    );
}


export default AddItem;