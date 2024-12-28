import {TypographyH2} from "@/components/ui/Typography.tsx";
import {useDashboardContext} from "@/context/dashboardContext.ts";
import {InviteStaff} from "@/components/Dashboard/InviteStaff.tsx";
import {StaffDisplay} from "@/components/Dashboard/StaffDisplay.tsx";
import {useGetAllUsers} from "@/service/api/restaurant.ts";

export function TabStaff() {

    const {restaurant} = useDashboardContext()
    const emptyStaff = restaurant.users == undefined || restaurant.users?.length == 0

    const {data: users, updateUser} = useGetAllUsers({restaurantId: restaurant.id})

    return (
        <div className="flex-1 flex flex-col">
            <div className="mb-8">
                <TypographyH2>
                    Equipe do Restaurante
                </TypographyH2>
            </div>

            <div>
                <div className="flex justify-end">
                    <InviteStaff/>
                </div>
            </div>

            <div className="flex-1">
                {emptyStaff ?
                    <NoStaff/> :
                    <div>
                        {
                            users &&
                            <StaffDisplay users={users} updateUserMutation={updateUser}/>
                        }
                    </div>

                }
            </div>
        </div>
    );
}

function NoStaff() {
    return (
        <div className="flex justify-center items-center">
            <h1 className="font-poppins-light text-zinc-400 my-16">
                Parece que ainda não convidou ninguém para o seu restaurante
            </h1>
        </div>
    )
}

