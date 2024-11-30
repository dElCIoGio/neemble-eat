import {useGetRestaurantMenuPage} from "@/service/api/pages.ts";
import {useNavigate, useParams} from "react-router-dom";
import {Rescan} from "@/pages/Rescan.tsx";
import {useEffect} from "react";


export function Test() {

    const {tableId} = useParams<{tableId: string}>()

    const {data: {menu, restaurant}, isStale} = useGetRestaurantMenuPage({tableId})

    const navigate = useNavigate()

    useEffect(() => {
        if (restaurant != undefined && menu == undefined) {
            navigate("/menu")
        }
    })

    if (isStale) {
        return <Rescan />
    }

    if (menu === undefined || restaurant === undefined) {
        return <div>Carregando</div>
    }

    return (
     <div>

     </div>
    )
}