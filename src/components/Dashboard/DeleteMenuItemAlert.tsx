import {
    AlertDialog, AlertDialogAction, AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription, AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle
} from "@/components/ui/alert-dialog.tsx";
import {MenuItem} from "@/schema.ts";
import {removeCategoryItem} from "@/api/category/manager.ts";
import {useState} from "react";


interface DeleteMenuItemAlertProps {
    item: MenuItem;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

function DeleteMenuItemAlert({item, onOpenChange, open}: DeleteMenuItemAlertProps) {

    const [state, setState] = useState<"idle" | "loading" | "deleted">("idle")

    function handleDelete() {
        if (!item.id) return;
        setState("loading")
        removeCategoryItem({
            itemID: item.id,
            categoryID: item.categoryID
        }).then(() => {
            setState("deleted")
        }).catch((error) => {
            console.error(error)
            setState("idle")
        })
    }

    return (
        <AlertDialog open={open} onOpenChange={onOpenChange}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Tem a certeza que quer eliminar {item.name}?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Ao confirmar, você ira eliminar o item {item.name} do seu menu.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    {
                        state != "deleted" && <>
                            <AlertDialogCancel>Cancelar</AlertDialogCancel>
                            <AlertDialogAction onClick={handleDelete}>
                                {
                                    state == "loading" ?
                                        "A eliminar..." :
                                            state == "idle" &&
                                            "Confirmar"
                                }
                            </AlertDialogAction>
                        </>
                    }
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}

export default DeleteMenuItemAlert;