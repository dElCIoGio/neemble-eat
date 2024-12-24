import {useParams} from "react-router-dom";
import {useGetInvitationToken} from "@/service/api/invitation-token.ts";
import {SignUpForm} from "@/components/SignUp/SignUpForm.tsx";
import {useState} from "react";
import {Roles, UserJson} from "@/schema.ts";
import {useGetRestaurant} from "@/service/api/restaurant.ts";
import {addUser} from "@/api/restaurant/manager.ts";
import {deleteInvitationToken} from "@/api/invitation-token/managers.ts";
import {Success} from "@/components/Invitation/Success.tsx";

export function InvitationPage() {



    const {tokenId} = useParams() as unknown as {tokenId: string};
    const [tab, setTab] = useState<"credentials" | "person">("credentials")
    const {data: token, isError, isLoading: isTokenLoading} = useGetInvitationToken({tokenId})
    const {data: restaurant, isLoading: isRestaurantLoading} = useGetRestaurant({restaurantId:token?.restaurant_id})
    const [accountCreated, setAccountCreated] = useState<boolean>(false)


    function handleSubmit(user: UserJson){
        if (token) {
            addUser({
                restaurantID: token.restaurant_id,
                userID: user.id,
            }).then(() => {
                deleteInvitationToken({tokenId})
                setAccountCreated(true)
            })
        }
    }

    if (accountCreated)
        return <Success/>

    if (isRestaurantLoading || isTokenLoading) {
        return <div></div>
    }

    if (isError) {
        return <div>Link expirado</div>
    }



    return (
        <div>
            {
                token != undefined && restaurant != undefined &&
                <div className="flex flex-col items-center justify-center w-full h-screen">
                    <h1 className="my-4 w-[60%] text-center font-poppins-semibold text-lg">
                        Você foi convidado(a) a acessar o restaurante {restaurant.name}
                    </h1>
                    <SignUpForm tab={tab} submitAction={handleSubmit} handleTabChange={setTab} role={Roles.Waitstaff}/>
                </div>
            }
        </div>
    );
}

