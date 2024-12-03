import {FILTERS, Tag} from "@/lib/constants.ts";
import {Button} from "@/components/ui/button.tsx";
import {useOrdersTrackingContext} from "@/context/ordersTrackingContext.ts";
import {Select, SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectItem} from "@/components/ui/select.tsx";
import {Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger} from "@/components/ui/sheet.tsx";
import {useState} from "react";



export function Header() {

    const { filterMode, handleFilterModeChange, orders, handleTableFilterChange} = useOrdersTrackingContext()
    const [isSheetOpen, setIsSheetOpen] = useState<boolean>(false)

    function toggleSheet() {
        setIsSheetOpen(!isSheetOpen)
    }

    return (
        <div className="w-full space-y-2">
            <div className={`flex justify-between items-center`}>
                <div className="laptop:hidden my-2">
                    <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen} defaultOpen={false}>
                        <SheetTrigger asChild>
                            <Button variant={"default"}>
                                Selecionar Mesa
                            </Button>
                        </SheetTrigger>
                        <SheetContent side={"left"}>
                            <SheetHeader>
                                <SheetTitle>{undefined}</SheetTitle>
                                <SheetDescription>
                                    {undefined}
                                </SheetDescription>
                            </SheetHeader>
                            <div className="flex flex-col gap-2">
                                {
                                    FILTERS.map((filter) =>
                                        filter.tag === filterMode.tag ?
                                            <Button key={filter.tag} className="text-sm bg-amethyst text-white hover:bg-amethyst-400" variant="secondary">
                                                {filter.name}
                                            </Button>:
                                            <Button onClick={() => {
                                                handleFilterModeChange(filter)
                                                toggleSheet()
                                            }} key={filter.tag} className="text-sm bg-white" variant="secondary">
                                                {filter.name}
                                            </Button>
                                    )
                                }
                            </div>

                        </SheetContent>
                    </Sheet>
                </div>
                <div className="laptop:flex items-center gap-2 hidden">

                    {
                        FILTERS.map((filter) =>
                            filter.tag === filterMode.tag ?
                            <Button key={filter.tag} className="text-sm bg-amethyst text-white hover:bg-amethyst-400" variant="secondary">
                                {filter.name}
                            </Button>:
                            <Button onClick={() => handleFilterModeChange(filter)} key={filter.tag} className="text-sm bg-white" variant="secondary">
                                {filter.name}
                            </Button>
                        )
                    }
                </div>
            </div>
            <div>
                <Select onValueChange={handleTableFilterChange} defaultValue={"All" as Tag}>
                    <SelectTrigger className="w-[180px] focus:ring-0 focus:outline-none ">
                        <SelectValue placeholder={"Selecione uma mesa"}/>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectItem value={"All" as Tag}>Todas</SelectItem>
                            {
                                [...new Set(orders.map(order => order.tableNumber))].map((tableNumber) => (
                                    <SelectItem key={tableNumber} value={tableNumber.toString()}>
                                        {`Mesa ${tableNumber}`}
                                    </SelectItem>
                                ))
                            }
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
        </div>
    );
}

