import {createContext, useCallback, useContext, useState, ReactNode} from 'react';
import {z} from "zod";
import {ItemSchema, MAX_IMAGE_SIZE, MB} from "@/lib/zodSchema.ts";
import {useForm, UseFormReturn} from "react-hook-form";
import {useDropzone} from "react-dropzone";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";
import {DollarSign, Upload} from "lucide-react";
import {Textarea} from "@/components/ui/textarea.tsx";
import {Switch} from "@/components/ui/switch.tsx";

type ItemValues = z.infer<typeof ItemSchema>;

interface ItemProps {
    name?: string;
    description?: string;
    price?: number;
    categoryID?: string;
    image?: string;
    availability?: boolean;

}

interface Props extends ItemProps {
    children: ReactNode;
    onSubmit: (values: ItemValues) => void;
}

type ItemForm = UseFormReturn<{
    availability: boolean,
    image: File,
    name: string,
    description: string,
    price: number,
    categoryID?: string | undefined
}, unknown, undefined>

interface ContextProps {
    form: ItemForm;
    preview: string | ArrayBuffer | null;
    setPreview: (preview: string | ArrayBuffer | null) => void;
    isAvailable: boolean
    setIsAvailable: (isAvailable: boolean) => void;
}

const ItemContext = createContext<ContextProps | undefined>(undefined)

function useItemContext(){

    const context = useContext(ItemContext)

    if (!context){
        throw new Error('useItemContext must be used as an ItemContext')
    }

    return context
}

export function Item({ name, description, price, categoryID, image, availability, children, onSubmit}: Props) {

    const [isAvailable, setIsAvailable] = useState<boolean>(false)
    const [preview, setPreview] = useState<string | ArrayBuffer | null>(image != undefined? image: null);

    const form = useForm<ItemValues>({
        defaultValues: {
            name: name || "",
            description: description || "",
            price: price || 0.0,
            categoryID: categoryID || "",
            image: undefined,
            availability: availability || false,
        }
    })

    const handleSubmit = (values: ItemValues) => {
        onSubmit({
            price: values.price,
            description: values.description,
            availability: isAvailable,
            name: values.name,
            image: values.image
        })
    }

    return (
        <ItemContext.Provider value={{
            form,
            preview,
            setPreview,
            isAvailable,
            setIsAvailable
        }}>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)}>
                    {children}
                </form>
            </Form>
        </ItemContext.Provider>
    );
}

Item.Image = function Image(){

    const {form, preview, setPreview} = useItemContext()

    const onDrop = useCallback(
        (acceptedFiles: File[]) => {
            const reader = new FileReader();
            try {
                reader.onload = () => setPreview(reader.result);
                reader.readAsDataURL(acceptedFiles[0]);
                form.setValue("image", acceptedFiles[0]);
                form.clearErrors("image");
            } catch (error) {
                console.log(error);
                setPreview(null);
                form.resetField("image");
            }
        },
        [form],
    );

    const { getRootProps, getInputProps, isDragActive, fileRejections } =
        useDropzone({
            onDrop,
            maxFiles: 1,
            maxSize: MAX_IMAGE_SIZE * MB,
            accept: { "image/png": [], "image/jpg": [], "image/jpeg": [] },
        });

    return(
        <FormField
            name="image"
            control={form.control}
            render={() => (
                <FormItem>
                    <FormLabel
                        className={`${
                            fileRejections.length !== 0 && "text-destructive"}`}>
                        <h2 className="font-semibold tracking-tight">
                            Adicione uma imagem
                            <span
                                className={
                                    form.formState.errors.image || fileRejections.length !== 0
                                        ? "text-destructive"
                                        : "text-muted-foreground"
                                }
                            ></span>
                        </h2>
                    </FormLabel>
                    <FormControl>
                        <div
                            {...getRootProps()}
                            className={`mx-auto max-w-full flex cursor-pointer flex-col items-center justify-center gap-y-2 rounded-lg border border-dashed ${preview? "border-amethyst-300 bg-zinc-100" : "border-zinc-300 bg-white hover:bg-zinc-50"} transition-all duration-150 p-4 `}>
                            {preview && (
                                <img
                                    src={preview as string}
                                    alt="Uploaded image"
                                    className="max-h-[150px] rounded-lg"
                                />
                            )}



                            <Input {...getInputProps()} type="file"/>
                            {
                                isDragActive ?
                                    <p className="text-center">Arraste a imagem para aqui!</p> :
                                    preview != null?
                                        <p className="text-center text-xs text-zinc-600">Imagem selecionada</p> :
                                        <div className="flex flex-col items-center space-y-2.5">
                                            <Upload className={`size-4 text-zinc-400 ${preview ? "hidden" : "block"}`}/>
                                            <div>
                                                <p className="text-center text-sm font-poppins-medium">
                                                    Clique aqui ou arraste a imagem para fazer upload
                                                </p>
                                                <p className="text-center text-xs text-zinc-600">
                                                    Formatos: JPG, JPEG ou PNG | Tamanho máximo
                                                    de {MAX_IMAGE_SIZE}MB.
                                                </p>
                                            </div>
                                        </div>
                            }
                        </div>
                    </FormControl>
                    <FormMessage>
                        {fileRejections.length !== 0 && (
                            <p>
                                A imagem deve conter no maximo {MAX_IMAGE_SIZE}MB e ser dos tipos, jpg, ou jpeg.
                            </p>
                        )}
                    </FormMessage>
                </FormItem>
            )}
        />
    )
}

Item.Name = function Name(){

    const {form} = useItemContext()

    return (
        <FormField
            name="name"
            control={form.control}
            render={({field}) => (
                <FormItem>
                    <FormLabel>Nome</FormLabel>
                    <FormControl>
                        <Input {...field} variant="brand" placeholder="nome do produto"/>
                    </FormControl>
                </FormItem>
            )}/>
    )
}

Item.Description = function Description(){

    const {form} = useItemContext()

    return (
        <FormField
            name="description"
            control={form.control}
            render={({field}) => (
                <FormItem>
                    <FormLabel>Descrição</FormLabel>
                    <FormControl>
                        <Textarea {...field} className="" placeholder="descrição do produto"/>
                    </FormControl>
                </FormItem>
            )}/>
    )
}

Item.Price = function Price(){

    const {form} = useItemContext()

    return (
        <FormField
            name="price"
            control={form.control}
            render={({field}) => (
                <FormItem>
                    <div className={`flex items-center`}>
                        <FormLabel>Preço do item</FormLabel>
                    </div>
                    <FormControl>
                        <Input
                            variant="brand"
                            type="number"
                            startIcon={DollarSign}
                            {...field}/>
                    </FormControl>
                    <FormMessage/>
                </FormItem>
            )}/>
    )

}

Item.Availability = function Availability(){

    const {form, isAvailable, setIsAvailable} = useItemContext()

    return (
        <FormField
            name="availability"
            control={form.control}
            render={({field}) => (
                <FormItem className="mb-8">
                    <div className="flex items-center">
                        <div className="w-28">
                            <FormLabel className={`${isAvailable? "bg-amethyst-900 text-amethyst-600": "bg-zinc-100 text-zinc-500"} rounded-md p-1 shadow-sm transition-all duration-150`}>
                                &nbsp;{isAvailable? "Disponível": "Indisponível"}&nbsp;
                            </FormLabel>
                        </div>

                        <FormControl>
                            <Switch
                                className={`${isAvailable && "data-[state=checked]:bg-amethyst-200"} shadow-sm`}
                                checked={field.value}
                                onCheckedChange={(checked) => {
                                    setIsAvailable(checked)
                                    field.onChange(checked)
                                }}/>
                        </FormControl>
                    </div>
                </FormItem>
            )}
        />
    )

}

Item.Submit = function Submit(){

    const {form} = useItemContext()

    return (
        <Button
            type="submit"
            disabled={form.formState.isSubmitting}
            className="">
            Confimar
        </Button>
    )
}