import {Button} from "@/components/ui/button.tsx";
import {UserPlus} from "@phosphor-icons/react"
import {useDashboardContext} from "@/context/dashboardContext.ts";
import {createInvitationToken} from "@/api/invitation-token/managers.ts";
import {InvitationLinkDisplay} from "@/components/Dashboard/InvitationLinkDisplay.tsx";
import {useState} from "react";
import {InvitationToken} from "@/schema.ts";
import {Spinner} from "@/components/ui/spinner.tsx";


export function InviteStaff() {

    const {restaurant} = useDashboardContext()
    const [isAlertOpen, setIsAlertOpen] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [token, setToken] = useState<InvitationToken | undefined>(undefined)


    function getInvitationToken(){
        setIsLoading(true)
        createInvitationToken({restaurantId: restaurant.id}).then((token) => {
            setToken(token)
            setIsAlertOpen(true)
            setIsLoading(false)
        })
    }

    return (
        <div>
            <InvitationLinkDisplay token={token} isOpen={isAlertOpen} setIsOpen={setIsAlertOpen}/>
            {
                isLoading?
                    <Button type="button" className="flex items-center" disabled >
                        <Spinner className="bg-white"/> Aguarde
                    </Button>:
                    <Button onClick={getInvitationToken}>
                        <UserPlus/> Convidar membro
                    </Button>
            }
        </div>

    );
}

