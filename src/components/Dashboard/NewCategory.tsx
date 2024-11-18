import {Card} from "@/components/ui/card.tsx";
import {Button} from "@/components/ui/button";
import {X} from "lucide-react"
import {TypographyH3} from "@/components/ui/Typography";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea.tsx";

interface NewCategoryProps {
    isOpened: boolean;
    setIsOpened: (value: boolean) => void;
}

export function NewCategory({isOpened, setIsOpened}: NewCategoryProps & { setIsOpened: (value: boolean) => void}) {


    if(!isOpened)
        return <div></div>

    return <Card className="p-2 bg-zinc-50">
        <div className="flex justify-end">
            <Button className="w-8 h-8"
                variant="ghost"
                onClick={() => setIsOpened(false)}>
                <X className="w-4 h-4 p-0 text-zinc-500"/>
            </Button>
        </div>
        <div className="">
            <TypographyH3>Nova categoria</TypographyH3>

            <div className="flex flex-col gap-2 mt-4">
                <Label>
                    Nome:
                </Label>
                <Input placeholder="Nome da categoria"/>
            </div>
            <div className="flex flex-col gap-2 mt-8">
                <Label>
                    Descrição:
                </Label>
                <Textarea placeholder="descrição da categoria"/>
            </div>
            <Button className="mt-4">
                Criar Categoria
            </Button>
        </div>
    </Card>
}

