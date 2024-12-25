import {TypographyH2, TypographyMuted} from "@/components/ui/Typography";
import {useGetAllTables} from "@/service/api/table";
import {useDashboardContext} from "@/context/dashboardContext";
import {Info, Minus, Plus} from "lucide-react"
import {Button} from "@/components/ui/button.tsx";
import {useMediaQuery} from "@/hooks/use-media-query.ts";
import {DESKTOP} from "@/lib/constants.ts";
import {TableCard} from "@/components/Dashboard/TableCard.tsx";
import {TablesTabContext} from "@/context/tablesTabContext.ts";
import {useState} from "react";
import {addTable, removeTable} from "@/api/restaurant/manager.ts";
import {Spinner} from "@/components/ui/spinner.tsx";
import {hasPermission} from "@/lib/utils.ts";
import {Permissions, Sections} from "@/schema.ts";


const MAXIMUM_TABLES = 20

export function TabTables() {

    window.document.title = "Neemble Eat - Mesas"

    const {user} = useDashboardContext()

    const canEdit: boolean = hasPermission(user, Sections.tables, Permissions.Update)

    const [isAdding, setIsAdding] = useState<boolean>(false)
    const [isReducing, setIsReducing] = useState<boolean>(false)

    const isDesktop = useMediaQuery(DESKTOP)

    const {restaurant} = useDashboardContext()

    const {data: tables, removeTable: removeTableMutation, addTable: addTableMutation} = useGetAllTables({restaurantId: restaurant.id})


    function handleRemoveTable(tableID: string){
        setIsAdding(false)
        setIsReducing(true)
        removeTable({restaurantID: restaurant.id, tableId: tableID}).
            then(() => {
                removeTableMutation(tableID)
                setIsReducing(false)
            })
            .catch(() => {
                setIsReducing(false)
            })
    }

    function handleAddTable(){
        setIsAdding(true)
        setIsReducing(false)
        addTable({restaurantID: restaurant.id}).
            then((newTable) => {
                addTableMutation(newTable)
                setIsAdding(false)
            })
            .catch(() => {
                setIsAdding(false)
            })
    }

    if(tables == undefined)
        return <div>
            <Spinner size="lg" className="mx-auto"/>
        </div>

    return (
        <TablesTabContext.Provider value={
        undefined}>
            <div>
                <div className="mb-8">
                    <TypographyH2>
                        Mesas e QR Codes
                    </TypographyH2>
                    <div className="flex gap-2 my-2 ">
                        <Info className="min-h-4 min-w-4 max-h-4 max-w-4 text-zinc-500 mt-0.5"/>
                        <TypographyMuted>
                            Cada mesa tem um QR Code que deve ser usado para entrar no menu do restaurante. Coloque cada
                            QR Code na mesa correspondente e estará tudo pronto para funcionamento. <br/>
                            <span className="italic ">Aconselhamos, para uma melhor experiência, que faça alterações no número de mesas, preferencialmente, fora do horário de serviço.</span>
                        </TypographyMuted>
                    </div>

                </div>
                <div className="flex laptop:items-center flex-col laptop:flex-row gap-2 mb-4">
                    <Button disabled={isReducing || tables.length == 0 || isAdding || !canEdit} variant="secondary" className="hover:bg-zinc-200 border border-zinc-200" onClick={() => {
                        const last = tables.at(-1)
                        if(last != undefined)
                            handleRemoveTable(last.id)
                    }}>
                        {
                            isReducing?
                                <Spinner size="sm" className="bg-zinc-600 dark:bg-white" />:
                                <Minus/>
                        }
                        Remover uma mesa
                    </Button>
                    <Button disabled={isAdding || isReducing || tables.length == MAXIMUM_TABLES || !canEdit} variant="secondary" className="hover:bg-zinc-200 border border-zinc-200" onClick={handleAddTable}>
                        {
                            isAdding?
                                <Spinner size="sm" className="bg-zinc-600 dark:bg-white" />:
                                <Plus/>
                        } Adicionar uma mesa
                    </Button>
                    <div className="border-l-2 border-zinc-200 pl-2">
                        <p className="font-poppins-semibold text-sm text-zinc-500"><span>{(MAXIMUM_TABLES - tables.length) == 0? "Número máximo de mesas alcançado": `Mesas: ${tables.length}/${MAXIMUM_TABLES}`}</span></p>
                    </div>
                </div>
                <div className={`grid gap-4 ${isDesktop ? 'grid-cols-4' : 'grid-cols-1'}`}>
                    {
                        tables &&
                        tables.map((table, index) =>
                            <TableCard table={table} index={index} key={index}/>
                        )
                    }
                </div>
            </div>
        </TablesTabContext.Provider>

    );
}

