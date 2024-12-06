import {TypographyH2} from "@/components/ui/Typography.tsx";
import {useDashboardContext} from "@/context/dashboardContext.ts";
import {Button} from "@/components/ui/button.tsx";
import {UserPlus} from "@phosphor-icons/react"

export function TabStaff() {

    const {restaurant} = useDashboardContext()
    const emptyStaff = restaurant.staff == undefined || restaurant.staff?.length == 0

    return (
        <div>
            <div className="mb-8">
                <TypographyH2>
                    Equipe do Restaurante
                </TypographyH2>
            </div>

            <div>
                <div className="flex justify-end">
                    <Button>
                        <UserPlus/> Convidar membro
                    </Button>
                </div>

            </div>


            <div className="h-full">
                {emptyStaff ?
                    <NoStaff/> :
                    <div>

                    </div>
                }
            </div>

        </div>
    );
}

function NoStaff() {
    return (
        <div>
            Parece que não convidou
        </div>
    )
}

