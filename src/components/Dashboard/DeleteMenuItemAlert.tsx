import {
    AlertDialog, AlertDialogAction, AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription, AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle
} from "@/components/ui/alert-dialog.tsx";
import {MenuItem} from "@/schema.ts";


interface DeleteMenuItemAlertProps {
    item: MenuItem;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

function DeleteMenuItemAlert({item, onOpenChange, open}: DeleteMenuItemAlertProps) {
    return (
        <AlertDialog open={open} onOpenChange={onOpenChange}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Tem a certeza que quer eliminar {item.name}?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Ao confirmar, voce ira eliminar o item {item.name} do seu menu.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction>Confirmar</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}

export default DeleteMenuItemAlert;