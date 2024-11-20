import {FILTERS} from "@/lib/constants.ts";
import {Button} from "@/components/ui/button.tsx";
import {useOrdersTrackingContext} from "@/context/ordersTrackingContext.ts";


export function Header() {

    const { filterMode, handleFilterModeChange } = useOrdersTrackingContext()

    return (
        <div className="w-full">
            <div className={`flex  justify-between items-center`}>
                <div className="flex items-center gap-2">
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
                <div>

                </div>

            </div>
        </div>
    );
}

