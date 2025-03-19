import {TypographyH2} from "@/components/ui/Typography.tsx";
import {InviteStaff} from "@/components/Dashboard/InviteStaff.tsx";
import {StaffDisplay} from "@/components/Dashboard/StaffDisplay.tsx";
import {Loader2} from "lucide-react";
import {MemberRoleNames, Sections, UserJson, Permissions, RestaurantJson} from "@/schema.ts";
import {useState} from "react";


const exampleUsers: UserJson[] = [
    {
        id: "user-001",
        created_time: "2025-03-19T12:00:00Z",
        UUID: "550e8400-e29b-41d4-a716-446655440001",
        firstName: "Carlos",
        lastName: "Silva",
        email: "carlos.silva@example.com",
        role: {
            name: MemberRoleNames.Administrator,
            description: "Manages the entire restaurant operations and settings.",
            permissions: [
                { section: Sections.All, permissions: [Permissions.View, Permissions.Update, Permissions.Create, Permissions.Delete] },
            ],
        },
        phoneNumber: "+244912345001",
        restaurantID: "resto-98765",
    },
    {
        id: "user-002",
        created_time: "2025-03-19T12:05:00Z",
        UUID: "550e8400-e29b-41d4-a716-446655440002",
        firstName: "Maria",
        lastName: "Fernandes",
        email: "maria.fernandes@example.com",
        role: {
            name: MemberRoleNames.Manager,
            description: "Oversees daily operations and staff management.",
            permissions: [
                { section: Sections.ordersTracking, permissions: [Permissions.View, Permissions.Update] },
                { section: Sections.tablesTracking, permissions: [Permissions.View] },
                { section: Sections.staff, permissions: [Permissions.View, Permissions.Update] },
            ],
        },
        phoneNumber: "+244912345002",
        restaurantID: "resto-98765",
    },
    {
        id: "user-003",
        created_time: "2025-03-19T12:10:00Z",
        UUID: "550e8400-e29b-41d4-a716-446655440003",
        firstName: "João",
        lastName: "Pereira",
        email: "joao.pereira@example.com",
        role: {
            name: MemberRoleNames.Chef,
            description: "In charge of food preparation and kitchen operations.",
            permissions: [
                { section: Sections.menu, permissions: [Permissions.View, Permissions.Update] },
                { section: Sections.ordersTracking, permissions: [Permissions.View] },
            ],
        },
        phoneNumber: "+244912345003",
        restaurantID: "resto-98765",
    },
    {
        id: "user-004",
        created_time: "2025-03-19T12:15:00Z",
        UUID: "550e8400-e29b-41d4-a716-446655440004",
        firstName: "Ana",
        lastName: "Rodrigues",
        email: "ana.rodrigues@example.com",
        role: {
            name: MemberRoleNames.Waitstaff,
            description: "Takes customer orders and serves food and drinks.",
            permissions: [
                { section: Sections.ordersTracking, permissions: [Permissions.View, Permissions.Update] },
                { section: Sections.tables, permissions: [Permissions.View, Permissions.Update] },
            ],
        },
        phoneNumber: "+244912345004",
        restaurantID: "resto-98765",
    },
    {
        id: "user-005",
        created_time: "2025-03-19T12:20:00Z",
        UUID: "550e8400-e29b-41d4-a716-446655440005",
        firstName: "Ricardo",
        lastName: "Santos",
        email: "ricardo.santos@example.com",
        role: {
            name: MemberRoleNames.Bartender,
            description: "Prepares and serves drinks at the bar.",
            permissions: [
                { section: Sections.ordersTracking, permissions: [Permissions.View, Permissions.Update] },
            ],
        },
        phoneNumber: "+244912345005",
        restaurantID: "resto-98765",
    },
    {
        id: "user-006",
        created_time: "2025-03-19T12:25:00Z",
        UUID: "550e8400-e29b-41d4-a716-446655440006",
        firstName: "Luisa",
        lastName: "Moreira",
        email: "luisa.moreira@example.com",
        role: {
            name: MemberRoleNames.Accountant,
            description: "Handles financial records and billing.",
            permissions: [
                { section: Sections.settings, permissions: [Permissions.View, Permissions.Update] },
            ],
        },
        phoneNumber: "+244912345006",
        restaurantID: "resto-98765",
    },
];

const exampleRestaurant: RestaurantJson = {
    id: "resto-98765",
    created_time: "2025-03-19T12:00:00Z",
    name: "The Gourmet Spot",
    address: "123 Main Street, Luanda, Angola",
    phoneNumber: "+244912345678",
    users: ["12345", "67890"], // Array of user IDs associated with the restaurant
    bannerURL: "https://example.com/banner.jpg",
    description: "A fine dining restaurant specializing in Angolan and international cuisine.",
    orders: ["order-001", "order-002", "order-003"], // Order IDs
    sessions: ["session-001", "session-002"], // Session IDs
    menus: ["menu-001", "menu-002"], // Menu IDs
    tables: ["table-001", "table-002", "table-003"], // Table IDs
};


export function TabStaff() {

    const [users, setUsers] = useState<UserJson[]>(exampleUsers)

    const restaurant = exampleRestaurant;
    // const {restaurant} = useDashboardContext()
    const emptyStaff = restaurant.users == undefined || restaurant.users?.length == 0

    // const {data: users, updateUser} = useGetAllUsers({restaurantId: restaurant.id})


    function updateUser(updatedUser: UserJson): void {
        setUsers(users.map(user => (user.id === updatedUser.id ? updatedUser : user)));
    }


    if (users == undefined){
        return <div className="flex justify-center items-center h-full">
            <Loader2 className="animate-spin"/>
        </div>
    }

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

