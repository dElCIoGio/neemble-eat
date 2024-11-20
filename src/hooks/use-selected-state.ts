import {useCallback, useState} from "react";


export function useSelectedState<T>(initialState: T) {
    const [selected, setSelected] = useState<T>(initialState);
    const handleSelect = useCallback((value: T) => {
        setSelected(value);
    }, []);
    return { selected, handleSelect };


}