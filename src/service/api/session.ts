import {CloseSessionProps} from "@/api/session/types.ts";
import {useMutation} from "@tanstack/react-query";
import {closeSession} from "@/api/session/managers.ts";


export function useCloseSession(attr: CloseSessionProps) {
    return useMutation({
        mutationFn: () => closeSession(attr),
        onSuccess: () => {
            console.log(`Session ${attr.sessionID} closed: `);
        },
        onError: error => {
            console.error(error)
        }
    })
}