import {Card} from "@/components/ui/card.tsx";
import {Button} from "@/components/ui/button";
import {X} from "lucide-react"
import {TypographyH3} from "@/components/ui/Typography";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea.tsx";
import {useEditMenuContext} from "@/context/editMenuContext.ts";
import {addCategory} from "@/api/menu/manager.ts";
import {useState} from "react";
import {Label} from "@/components/ui/label.tsx";
import {Spinner} from "@/components/ui/spinner.tsx";


interface NewCategoryProps {
    isOpened: boolean;
    setIsOpened: (value: boolean) => void;
}


export function NewCategory({isOpened, setIsOpened}: NewCategoryProps & { setIsOpened: (value: boolean) => void}) {

    const [name, setName] = useState<string>("")
    const [description, setDescription] = useState<string>("")
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const {addCategory: addCategoryMutation, menu} = useEditMenuContext()



    function onSubmit() {
        if (name.trim() == "" || menu.id === undefined)
            return;
        if (menu.categories != undefined){
            if (menu.categories.find((category) => category.name.toLowerCase() == name.toLowerCase()) == undefined){
                setIsLoading(true)
                addCategory({menuID: menu.id, description, name, items: []})
                    .then((category) => {
                        addCategoryMutation(category);
                        setIsLoading(false)
                    }
                ).catch((error) => {
                    console.log(error)
                    setIsLoading(false)
                })
            }
        }
    }

    if(!isOpened)
        return <div></div>

    return <Card className="p-4 bg-zinc-50">
        <div className="flex justify-end">
            <Button className="w-8 h-8"
                variant="ghost"
                onClick={() => setIsOpened(false)}>
                <X className="w-4 h-4 p-0 text-zinc-500"/>
            </Button>
        </div>
        <div className="space-y-4">
            <TypographyH3>Nova categoria</TypographyH3>
             <div className="space-y-2.5">
                <div className="space-y-1.5">
                    <Label>Nome</Label>
                    <Input variant="brand"
                           placeholder="Nome da categoria"
                           onChange={event => setName(event.target.value)}/>
                </div>
                 <div className="space-y-1.5">
                     <Label>Descrição</Label>
                     <Textarea variant="brand" placeholder="descrição da categoria" onChange={event => setDescription(event.target.value)}/>
                 </div>
             </div>

            <Button disabled={isLoading} type="button" className="mt-4" onClick={onSubmit}>
                {
                    isLoading?
                        <>
                            <Spinner className="bg-white"/> Adicionando
                        </>:
                        "Criar Categoria"
                }
            </Button>
        </div>
    </Card>
}

