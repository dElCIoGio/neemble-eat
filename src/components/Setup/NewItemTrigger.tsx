import {Plus} from "lucide-react";
import {Button} from "@/components/ui/button.tsx";


interface Props {
    onOenChange: () => void
}

export function NewItemTrigger({onOenChange}: Props) {



    return (
        <Button variant="secondary" onClick={onOenChange} className="w-full h-fit my-1 py-1 text-sm hover:border-zinc-300 rounded-lg border border-gray-200 text-zinc-500">
            <Plus className=""/>
            <span>Adicionar item</span>
        </Button>

    );
}

