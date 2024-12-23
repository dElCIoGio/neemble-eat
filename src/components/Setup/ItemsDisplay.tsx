
import {ItemCard} from "@/components/Setup/ItemCard.tsx";
import {useAddCategoryContext} from "@/context/addCategoryContext.ts";


export function ItemsDisplay() {

    const { items } = useAddCategoryContext()


    return (
        <div>
            <h1 className="text-zinc-500 text-sm">
                Ítens
            </h1>
            <div className="space-y-1.5">
                {
                    items.map((item, i) => <ItemCard item={item} key={i}/>)
                }
            </div>
        </div>
    );
}

