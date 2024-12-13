import {useState} from "react";
import {useEditMenuContext} from "@/context/editMenuContext.ts";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Check, ChevronsUpDown, Plus} from "lucide-react";
import {Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList} from "@/components/ui/command.tsx";
import {cn} from "@/lib/utils.ts";
import {Category} from "@/schema.ts";

interface SelectCategoryProps {
    defaultCategory?: Category;
    isCategoryTabOpened: boolean;
    setIsCategoryTabOpened: (value: boolean) => void;
    setCategory: (id: string) => void;
}

export function SelectCategory({setIsCategoryTabOpened, isCategoryTabOpened, defaultCategory, setCategory}: SelectCategoryProps) {

    const [open, setOpen] = useState<boolean>(false)
    const [value, setValue] = useState<string>(defaultCategory? defaultCategory.id? defaultCategory.id: "": "")
    const {menu} = useEditMenuContext()

    function toggleNewCategoryTab() {
        setIsCategoryTabOpened(!isCategoryTabOpened)
    }

    return <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
            <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="w-[220px] justify-between"
            >
                {menu.categories && value
                    ?  menu.categories.find((category) => category.id === value)?.name
                    : "Selecione uma categoria"
                }
                <ChevronsUpDown className="opacity-50" />
            </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
            <Command>
                <CommandInput placeholder="Procure a categoria..." />
                <CommandList>
                    <CommandEmpty>
                        Não foi possível encontrar...
                    </CommandEmpty>
                    {
                        !isCategoryTabOpened &&
                        <Button className="w-full my-2 rounded-none bg-zinc-100 hover:bg-zinc-200 font-poppins-semibold"
                                variant="secondary"
                                onClick={() => toggleNewCategoryTab()}>
                            <Plus/>
                            Nova Categoria
                        </Button>
                    }
                    <CommandGroup>
                        {menu.categories && menu.categories.map((category) => (
                            <CommandItem
                                key={category.id}
                                value={category.id}
                                onSelect={(currentValue) => {
                                    setValue(currentValue === value ? "" : currentValue)
                                    setCategory(currentValue)
                                    setOpen(false)
                                }}>
                                {category.name}
                                <Check
                                    className={cn(
                                        "ml-auto",
                                        value === category.id ? "opacity-100" : "opacity-0"
                                    )}
                                />
                            </CommandItem>
                        ))}
                    </CommandGroup>
                </CommandList>
            </Command>
        </PopoverContent>
    </Popover>
}