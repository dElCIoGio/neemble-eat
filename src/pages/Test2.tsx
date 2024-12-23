import {Item} from "@/components/ui/Item.tsx";
import {z} from "zod";
import {ItemSchema} from "@/lib/zodSchema.ts";

type ItemValues = z.infer<typeof ItemSchema>;


export function Test2() {

    function handleSubmit(item: ItemValues){
        console.log("ITEM SUBMITTED");
        console.log(item)
    }

    return (
        <div>
            <Item onSubmit={handleSubmit}>
                <Item.Name/>
                <Item.Price/>
                <Item.Description/>
                <Item.Availability/>
                <Item.Submit/>
            </Item>

        </div>
    );
}

