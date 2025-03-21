import {useCallback, useState} from "react";
import {useForm} from "react-hook-form";
import {useDropzone} from "react-dropzone";
import {ItemSchema, MAX_IMAGE_SIZE, MB} from "@/lib/zodSchema.ts";
import {toast} from "sonner";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.tsx";
import {DollarSign, Upload} from "lucide-react";
import {Input} from "@/components/ui/input.tsx";
import {SelectCategory} from "@/components/Dashboard/SelectCategory.tsx";
import {Button} from "@/components/ui/button.tsx";
import {z} from "zod";
import {NewCategory} from "@/components/Dashboard/NewCategory";
import {Switch} from "@/components/ui/switch.tsx";
import {Textarea} from "@/components/ui/textarea.tsx";

type AddItemValues = z.infer<typeof ItemSchema>;


interface AddItemProps {
    onSubmit: (item: AddItemValues) => void
}

export function AddItemContent({onSubmit}: AddItemProps) {
    const [preview, setPreview] = useState<string | ArrayBuffer | null>(null);
    const [isAvailable, setIsAvailable] = useState<boolean>(true)
    const [isCreateCategoryOpen, setIsCreateCategoryOpen] = useState<boolean>(false)

    const form = useForm<AddItemValues>({
        defaultValues: {
            name: "",
            description: "",
            price: 0,
            categoryID: "",
            image: undefined,
            availability: true,
        }
    })

    const setCategory = (categoryID: string) =>{
        form.setValue("categoryID", categoryID)
    }

    const onDrop = useCallback(
        (acceptedFiles: File[]) => {
            const reader = new FileReader();
            try {
                reader.onload = () => setPreview(reader.result);
                reader.readAsDataURL(acceptedFiles[0]);
                form.setValue("image", acceptedFiles[0]);
                form.clearErrors("image");
            } catch (error) {
                console.error(error);
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

    const handleSubmit = (values: AddItemValues) => {
        toast.success(`Image uploaded successfully 🎉 ${values.image.name}`);
        onSubmit(values)
    };

    return <div>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="my-2 space-y-8">
                <div className="space-y-4">
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
                                        className={`mx-auto max-w-full flex cursor-pointer flex-col items-center justify-center gap-y-2 rounded-lg border border-dashed ${preview? "border-amethyst-300 bg-zinc-100" : "border-zinc-300 bg-white hover:bg-zinc-100"} transition-all duration-150 p-4 `}>
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
                                                    <Button className="rounded-xl w-fit">
                                                        <Upload
                                                            className={`size-6 ${preview ? "hidden" : "block"}`}/>
                                                        Upload
                                                    </Button>
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
                    <FormField
                        name="price"
                        control={form.control}
                        render={({field}) => (
                            <FormItem>
                                <div className={`flex items-center`}>
                                    <FormLabel className={""}>Preco do item</FormLabel>
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
                    <div className="flex items-center gap-x-4 mb-16">
                        <p>Categoria</p>
                        <SelectCategory setCategory={setCategory}
                                        isCategoryTabOpened={isCreateCategoryOpen}
                                        setIsCategoryTabOpened={(value) => setIsCreateCategoryOpen(value)}/>
                    </div>
                </div>
                <NewCategory isOpened={isCreateCategoryOpen} setIsOpened={(value) => setIsCreateCategoryOpen(value)}/>
                <Button
                    type="submit"
                    disabled={form.formState.isSubmitting || form.formState.isSubmitSuccessful || isCreateCategoryOpen}
                    className="">
                    Confimar
                </Button>
            </form>
        </Form>
    </div>
}
