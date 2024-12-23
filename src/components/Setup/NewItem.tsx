import {z} from "zod";
import {ItemSchema} from "@/lib/zodSchema.ts";
import {Item} from "@/components/ui/Item.tsx";
import {Separator} from "@/components/ui/separator.tsx";
import {Button} from "@/components/ui/button.tsx";
import {useAddCategoryContext} from "@/context/addCategoryContext.ts";

type AddItemValues = z.infer<typeof ItemSchema>;

interface NewItemProps {
    onOpenChange: (isOpen: boolean) => void;
}

export function NewItem({ onOpenChange }: NewItemProps) {

    const { addItem } = useAddCategoryContext()

    function handleSubmit(values: AddItemValues) {
        const availability = values.availability
        const name = values.name
        const description = values.description
        const price = values.price
        const imageFile = values.image

        addItem({
            name: name,
            availability: availability,
            description: description,
            price: price,
            imageFile: imageFile
        })
    }

    return (
        <div className="laptop:px-4">
            <Separator className="laptop:hidden mt-4"/>
            <h1 className="my-4 text-lg font-poppins-semibold">
                Adicione um Ítem
            </h1>
            <Item onSubmit={handleSubmit}>
                <div className="space-y-4">
                    <Item.Availability/>
                    <Item.Image/>
                    <Item.Name/>
                    <Item.Price/>
                    <Item.Description/>
                    <div className="space-x-2">
                        <Item.Submit/>
                        <Button variant="secondary" type="button" onClick={() => onOpenChange(false)}>
                            Cancelar
                        </Button>
                    </div>
                </div>
            </Item>
        </div>

    );
}

