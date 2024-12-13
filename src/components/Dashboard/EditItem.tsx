import {useEditItemContext} from "@/context/editItemContext";
import {z} from "zod";
import {ItemSchema, MAX_IMAGE_SIZE, MB} from "@/lib/zodSchema.ts";
import {useCallback, useState} from "react";
import {useForm} from "react-hook-form";
import {useDropzone} from "react-dropzone";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.tsx";
import {Switch} from "@/components/ui/switch.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";
import {DollarSign, Upload} from "lucide-react";
import {Textarea} from "@/components/ui/textarea.tsx";
import {SelectCategory} from "@/components/Dashboard/SelectCategory.tsx";
import {NewCategory} from "@/components/Dashboard/NewCategory.tsx";
import {useMediaQuery} from "@/hooks/use-media-query.ts";
import {DESKTOP} from "@/lib/constants.ts";
import {
    DialogSheet,
    DialogSheetContent,
    DialogSheetDescription,
    DialogSheetHeader,
    DialogSheetTitle,
} from "@/components/ui/dialog-sheet";
import {ScrollArea} from "@/components/ui/scroll-area.tsx";
import {UpdateMenuItem} from "@/schema.ts";
import {useEditMenuContext} from "@/context/editMenuContext.ts";
import {updateItem} from "@/api/menu-item/managers.ts";
import {Spinner} from "@/components/ui/spinner.tsx";
import {useDashboardContext} from "@/context/dashboardContext.ts";


type EditItemValues = z.infer<typeof ItemSchema>;

function EditItem() {

    const isDesktop = useMediaQuery(DESKTOP)
    const {item, onOpenChange, isOpened} = useEditItemContext()

    return (
        <DialogSheet open={isOpened} onOpenChange={onOpenChange}>
            <DialogSheetContent className={`${isDesktop && "rounded-xl max-h-[90%] mx-auto"} px-0 laptop:px-4 laptop:max-h-[95%] overflow-y-scroll styled-scrollbar`}>
                <DialogSheetHeader>
                    <DialogSheetTitle>
                        {item?.name ? item.name : "Novo item"}
                    </DialogSheetTitle>
                    <DialogSheetDescription>{undefined}</DialogSheetDescription>
                </DialogSheetHeader>
                <div className="">
                    {
                        isDesktop?
                            <EditItemContent/>:
                            <ScrollArea className="overflow-y-auto styled-scrollbar p-2">
                                <EditItemContent/>
                            </ScrollArea>
                    }
                </div>
            </DialogSheetContent>
        </DialogSheet>
    );
}


function EditItemContent(){
    const {item, onOpenChange} = useEditItemContext()

    const {menu, updateItem: mutation} = useEditMenuContext()

    const [preview, setPreview] = useState<string | ArrayBuffer | null>(
        item? item.imageURL != null? item.imageURL: null: null);
    const [isAvailable, setIsAvailable] = useState<boolean>(true)
    const [isCreateCategoryOpen, setIsCreateCategoryOpen] = useState<boolean>(false)

    const {restaurant} = useDashboardContext()
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const form = useForm<EditItemValues>({
        defaultValues: {
            name: item? item.name : "",
            description: item? item.description: "",
            price: item? item.price: 0,
            categoryID: item? item.categoryID: "",
            image: undefined,
            availability: item? item.availability : true,
        }
    })

    const setCategory = (categoryID: string) => {
        console.log(categoryID)
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
                console.log(error);
                setPreview(null);
                form.resetField("image");
            }
        },
        [form],
    );

    const onSubmit = (values: EditItemValues) => {
        const {categoryID, description, availability, name, price, image} = values;
        if (!item){
            return
        }
        if (item.id == undefined)
            return;

        setIsLoading(true)
        const update: UpdateMenuItem = {}

        if (name != item.name)
            update.name = name;

        if (categoryID != item.categoryID)
            update.categoryID = categoryID;

        if (description != item.description)
            update.description = description;

        if (availability != item.availability)
            update.availability = availability;

        if (price != item.price)
            update.price = price;

        if (image != undefined)
            update.imageFile = image;

        console.log(update)

        if (Object.keys(update).length > 0)
            updateItem({updates: update, menuItemId: item.id, restaurantId: restaurant.id}).then((newCategory) => {
                if (item.id != undefined){
                    mutation(item.categoryID, item.id, newCategory)
                    onOpenChange(false)
                }
                setIsLoading(false)
            })
    };

    const { getRootProps, getInputProps, isDragActive, fileRejections } =
        useDropzone({
            onDrop,
            maxFiles: 1,
            maxSize: MAX_IMAGE_SIZE * MB,
            accept: { "image/png": [], "image/jpg": [], "image/jpeg": [] },
        });

    return (
        <div className="p-2">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="my-2 space-y-8">
                    <div className="space-y-4">
                        <FormField
                            name="availability"
                            control={form.control}
                            render={({field}) => (
                                <FormItem className="mb-8">
                                    <div className="flex items-center">
                                        <div className="w-28">
                                            <FormLabel
                                                className={`${isAvailable ? "bg-amethyst-900 text-amethyst-600" : "bg-zinc-100 text-zinc-500"} rounded-md p-1 shadow-sm transition-all duration-150`}>
                                                &nbsp;{isAvailable ? "Disponível" : "Indisponível"}&nbsp;
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
                                            className={`mx-auto max-w-full flex cursor-pointer flex-col items-center justify-center gap-y-2 rounded-lg border border-dashed ${preview ? "border-amethyst-300 bg-zinc-100" : "border-zinc-300 bg-white hover:bg-zinc-100"} transition-all duration-150 p-4 `}>
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
                                                    preview != null ?
                                                        <p className="text-center text-xs text-zinc-600">Imagem
                                                            selecionada</p> :
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
                                                A imagem deve conter no maximo {MAX_IMAGE_SIZE}MB e ser dos tipos, jpg,
                                                ou jpeg.
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
                                        <Textarea {...field} className="" variant="brand" placeholder="descrição do produto"/>
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
                            <SelectCategory
                                setCategory={setCategory}
                                isCategoryTabOpened={isCreateCategoryOpen}
                                defaultCategory={menu.categories?.find((c) => c.id == item?.categoryID)}
                                setIsCategoryTabOpened={(value) => setIsCreateCategoryOpen(value)}/>
                        </div>
                    </div>
                    <NewCategory isOpened={isCreateCategoryOpen}
                                 setIsOpened={(value) => setIsCreateCategoryOpen(value)}/>
                    {
                        isLoading?
                            <Button
                                type="button"
                                disabled={true}>
                                <Spinner className="bg-white"/> Aguarde
                            </Button>:
                            <Button
                                type="submit"
                                disabled={form.formState.isSubmitting || isCreateCategoryOpen}>
                                Confirmar
                            </Button>
                    }

                </form>
            </Form>
        </div>

    )
}

export default EditItem;