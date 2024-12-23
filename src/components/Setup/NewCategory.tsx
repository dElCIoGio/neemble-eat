import {Label} from "@/components/ui/label.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Separator} from "@/components/ui/separator.tsx";
import {ItemsDisplay} from "@/components/Setup/ItemsDisplay.tsx";
import {Textarea} from "@/components/ui/textarea.tsx";

interface Props {
    name: string;
    setName: (name: string) => void;
}

export function NewCategory({setName}: Props) {

    return (
        <div>
            <div className="space-y-3">
                <div className="space-y-1.5">
                    <Label htmlFor="name" className="text-right">
                        Nome*
                    </Label>
                    <Input variant="brand" id="name" placeholder="Nome da categoria" className=""
                           onChangeCapture={e => setName(e.currentTarget.value)}/>
                </div>
                <div className="space-y-1.5 ">
                    <Label htmlFor="description" className="text-right">
                        Descrição
                    </Label>
                    <Textarea id="description" placeholder="Descriva brevemente o seu restaurante"/>
                </div>
            </div>
            <Separator className="my-4"/>
            <ItemsDisplay/>
        </div>

    );
}

