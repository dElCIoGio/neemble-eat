import {getInvitationToken} from "@/api/invitation-token/managers.ts";
import {GetInvitationTokenProps} from "@/api/invitation-token/type.ts";
import {useQuery} from "@tanstack/react-query";

export function useGetInvitationToken (attr: GetInvitationTokenProps){
    const queryKey = ["getInvitationToken", attr.tokenId];
    return useQuery({
        queryKey,
        queryFn: () => getInvitationToken(attr)
            .then(token => token),
        staleTime: Infinity
    })
}