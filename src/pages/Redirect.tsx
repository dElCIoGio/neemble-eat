import {useGetRestaurantMenuPage} from "@/service/api/pages.ts";
import {useNavigate, useParams} from "react-router-dom";
import {useEffect} from "react";


export function Redirect() {

    const {tableId} = useParams<{tableId: string}>()

    const {data} = useGetRestaurantMenuPage({tableId})
    const navigate = useNavigate()


    function formatUrlString(input: string): string {
        return input.trim().toLowerCase().replace(/\s+/g, '-');
    }

    useEffect(() => {
        if (data != undefined){
            navigate(`/menu/${formatUrlString(data.restaurant.name)}/${tableId}`, {replace: true})
        }
    }, [data, navigate]);

    if(!tableId){
        return <div>
            Para aceder ao menu, por favor escolha uma mesa e faça scan do nosso QR Code.
        </div>
    }


    return (
        <div>

        </div>
    );
}

