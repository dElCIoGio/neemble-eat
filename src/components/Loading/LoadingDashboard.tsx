import {Spinner} from "@/components/ui/spinner.tsx";


export function LoadingDashboard() {
    return (
        <div className="flex flex-col space-y-4 justify-center items-center h-dvh w-full">
            <h1 className="font-poppins-semibold">Bem-vindo(a) ao Neemble Eat</h1>
            <Spinner className="bg-black"/>
        </div>
    );
}

