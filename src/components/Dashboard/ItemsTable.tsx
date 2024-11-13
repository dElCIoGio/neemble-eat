import {Menu, MenuItem} from "@/schema.ts";
import {Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table.tsx";
import EditItem from "@/components/Dashboard/EditItem.tsx";
import {EditItemContext} from "@/context/editItemContext.ts";
import {useEffect, useState} from "react";

interface TableProps{
    menu: Menu;
    search: string;
    selectedCategory: string;
}


function ItemsTable({menu, search, selectedCategory}: TableProps) {

    const [editingItem, setEditingItem] = useState<boolean>(false)
    const [selectedItem, setSelectedItem] = useState<MenuItem | undefined>(undefined)

    useEffect(() => {
        console.log(selectedItem)
        setEditingItem(!!selectedItem)
    }, [selectedItem])

    return (
        <div>
            <Table className="z-0">
                <TableCaption>
                    {search === "" ? "Todos os itens do menu." : `Itens com o termo "${search}" no nome.`}
                    <p>
                        {selectedCategory === "All" ? "" : `\nCategoria: ${selectedCategory}.`}
                    </p>
                </TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Nome</TableHead>
                        <TableHead>Categoria</TableHead>
                        <TableHead>Disponibilidade</TableHead>
                        <TableHead>Preço</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        menu.categories &&
                        menu.categories
                            .filter(category => selectedCategory === "All" || category.name === selectedCategory)
                            .map(category => (
                                category.items
                                    .filter(item => search === ""? item: item.name.toLowerCase().includes(search.toLowerCase()))
                                    .map(item => (
                                            <TableRow
                                                onClick={() => setSelectedItem(item)}
                                                key={item.id? item.id: item.name} className={`${item.availability != true ? "bg-zinc-100": "cursor-pointer"} prevent-select`}>
                                                <TableCell className="font-poppins-semibold max-w-[200px] text-nowrap truncate">{item.name}</TableCell>
                                                <TableCell className="text-nowrap">{category.name}</TableCell>
                                                <TableCell>
                                                    <span className={`${item.availability == true && "text-green-700 font-poppins-semibold bg-green-100 py-0.5 px-2 rounded-full"} prevent-select`}>
                                                        {item.availability ? "Disponível" : "Indisponível"}
                                                    </span>
                                                </TableCell>
                                                <TableCell className="text-nowrap text-zinc-600 font-poppins-semibold">{item.price} Kz</TableCell>
                                            </TableRow>
                                    )
                                ))
                            )
                    }
                </TableBody>
            </Table>


                <EditItemContext.Provider value={{
                    item: selectedItem,
                    isOpened: editingItem,
                    onOpenChange: (isOpened: boolean) => setEditingItem(isOpened),
                }}>
                    <EditItem/>
                </EditItemContext.Provider>


        </div>
    );
}

export default ItemsTable;