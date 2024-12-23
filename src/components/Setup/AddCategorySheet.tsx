import {Plus} from "lucide-react";
import {Button} from "@/components/ui/button.tsx";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger
} from "@/components/ui/sheet.tsx";
import {NewCategory} from "@/components/Setup/NewCategory.tsx";
import {Separator} from "@/components/ui/separator.tsx";
import {X} from "@phosphor-icons/react";
import {useIsMobile} from "@/hooks/use-mobile.tsx";
import {useEffect, useState} from "react";
import {NewItem} from "@/components/Setup/NewItem.tsx";
import {CategoryCreate, MenuItemCreate} from "@/schema.ts";
import {AddCategoryContext} from "@/context/addCategoryContext.ts";

interface AddCategorySheetProps {
    isOpen: boolean;
    onOpenChange: (isOpen: boolean) => void;
    onSubmitCategory: (category: CategoryCreate) => void;
}

export function AddCategorySheet({onOpenChange, isOpen, onSubmitCategory}: AddCategorySheetProps) {

    const isMobile = useIsMobile()
    const [isAdding, setIsAdding] = useState<boolean>(false)

    const [categoryName, setCategoryName] = useState<string>("")
    const [description, setDescription] = useState<string>("")
    const [items, setItems] = useState<MenuItemCreate[]>([])

    function addItem(newItem: MenuItemCreate) {
        setItems([...items, newItem])
        setIsAdding(false)
    }

    function handleSubmit(){
        if (categoryName != "")
            onSubmitCategory({
                items,
                description,
                name: categoryName
            })
    }

    useEffect(() => {
        if (!isOpen){
            setIsAdding(false)
            setCategoryName("")
            setDescription("")
            setItems([])
        }
    }, [isOpen]);

    function toggleAdding() {
        setIsAdding(prevState => !prevState)
    }

    return (
        <AddCategoryContext.Provider value={{
            categoryName,
            setCategoryName,
            items,
            description,
            setDescription,
            setItems,
            addItem
        }}>
            <Sheet onOpenChange={onOpenChange}
                open={isOpen}>
                <SheetTrigger asChild>
                    <Button className="max-h-8 max-w-8 laptop:max-w-fit tablet:max-w-fit shadow-md">
                        <Plus size={18} className="m-0 p-0"/>
                        <span className="hidden tablet:block laptop:block">Adicionar Categoria</span>
                    </Button>
                </SheetTrigger>
                <SheetContent side={isMobile? "bottom": "right"} className={`px-4 border-2 flex flex-col border-gray-200 transition-all ease-in-out duration-150 ${!isMobile ? "mr-2 h-[98%]": " h-[96%]"}  ${isAdding && "laptop:min-w-[80%]"} min-w-3/4  rounded-xl my-auto`}>
                    <SheetHeader className="">
                        <div className="flex justify-between">
                            <SheetTitle>
                                Nova Categoria
                            </SheetTitle>
                            <Button onClick={() => onOpenChange(false)} variant="ghost" size="icon">
                                <X/>
                            </Button>
                        </div>
                        <SheetDescription className="text-left">
                            Adicione facilmente uma categoria ao seu menu
                        </SheetDescription>
                    </SheetHeader>
                    <Separator className="my-2"/>
                    <div className="overflow-y-auto styled-scrollbar">
                        <div className=" flex flex-col laptop:flex-row laptop:divide-x laptop:divide-zinc-200">
                            <div className={`${isAdding && "laptop:w-1/3"} w-full pr-4`}>
                                <NewCategory name={categoryName} setName={setCategoryName}/>
                                <Button variant="secondary" disabled={isAdding} onClick={toggleAdding} className="w-full h-fit my-1 py-1 text-sm hover:border-zinc-300 rounded-lg border border-gray-200 text-zinc-500">
                                    <Plus className=""/>
                                    <span>Adicionar item</span>
                                </Button>
                            </div>
                            <div className="pb-4">
                                {isAdding && <NewItem onOpenChange={setIsAdding}/>}
                            </div>
                        </div>
                    </div>
                    <Button
                        type="button"
                        className="w-fit"
                        disabled={isAdding || categoryName == ""}
                        onClick={() => handleSubmit()}>
                        Confirmar categoria
                    </Button>
                </SheetContent>
            </Sheet>
        </AddCategoryContext.Provider>
    );
}

