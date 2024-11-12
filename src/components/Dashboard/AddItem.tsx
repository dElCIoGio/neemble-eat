import {
    Credenza,
    CredenzaContent, CredenzaDescription,
    CredenzaHeader,
    CredenzaTitle,
    CredenzaTrigger
} from "@/components/ui/credenza.tsx";
import {Separator} from "@/components/ui/separator.tsx";
import {useState, useCallback} from "react";
import {AddItemSchema, MAX_IMAGE_SIZE, MB} from "@/lib/zodSchema.ts";
import {useForm} from "react-hook-form";
import {FormField, FormItem, Form, FormMessage, FormControl, FormLabel} from "@/components/ui/form.tsx";
import {Upload, DollarSign, ChevronsUpDown, Check} from "lucide-react"
import {Input} from "@/components/ui/input.tsx";
import {useDropzone} from "react-dropzone";
import { toast } from "sonner"
import {Button} from "@/components/ui/button.tsx";
import {z} from "zod";
import {ScrollArea} from "@/components/ui/scroll-area.tsx";
import {Popover, PopoverTrigger, PopoverContent} from "@/components/ui/popover";
import {useEditMenuContext} from "@/context/editMenuContext";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import { cn } from "@/lib/utils"
import {useMediaQuery} from "@/hooks/use-media-query.ts";

interface AddProductProps {
    children?: React.ReactNode;
}

const desktop = "(min-width: 768px)"

function AddItem({ children }: AddProductProps) {

    const isDesktop = useMediaQuery(desktop)

    return (
        <Credenza>
            <CredenzaTrigger asChild>
                {children}
            </CredenzaTrigger>
            <CredenzaContent className="max-h-[95%] lg:overflow-y-scroll lg:styled-scrollbar">
                <CredenzaHeader>
                    <CredenzaTitle>
                        Produto Novo
                    </CredenzaTitle>
                    <CredenzaDescription>
                        Adicione um novo produto ao seu menu.
                    </CredenzaDescription>
                </CredenzaHeader>
                    {
                        isDesktop? <AddItemContent/>:
                            <ScrollArea className="overflow-y-auto styled-scrollbar px-4">
                                <AddItemContent/>
                            </ScrollArea>

                    }
            </CredenzaContent>
        </Credenza>
    );
}

type AddItemValues = z.infer<typeof AddItemSchema>;

function AddItemContent() {
    const [preview, setPreview] = useState<string | ArrayBuffer | null>("");

    const form = useForm<AddItemValues>({
        defaultValues: {
            name: "",
            description: "",
            price: 0,
            category: "",
            image: undefined,
            isAvailable: true,
        }
    })


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

    const onSubmit = (values: AddItemValues) => {
        console.log(values);
        toast.success(`Image uploaded successfully 🎉 ${values.image.name}`);
    };

    return <div>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="my-8 space-y-8">
                <div className="space-y-4">
                    <FormField
                        name="image"
                        control={form.control}
                        render={() => (
                            <FormItem>
                                <FormLabel
                                    className={`${
                                        fileRejections.length !== 0 && "text-destructive"
                                    }`}
                                >
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
                                <Separator/>
                                <FormControl>
                                    <div
                                        {...getRootProps()}
                                        className={`mx-auto max-w-[350px] flex cursor-pointer flex-col items-center justify-center gap-y-2 rounded-lg border ${preview? "border-amethyst-300 bg-zinc-100":"border-foreground bg-white hover:bg-zinc-100"} transition-all duration-150 p-4 shadow-md`}
                                    >
                                        {preview && (
                                            <img
                                                src={preview as string}
                                                alt="Uploaded image"
                                                className="max-h-[150px] rounded-lg"
                                            />
                                        )}
                                        <Upload
                                            className={`size-8 ${preview ? "hidden" : "block"}`}
                                        />
                                        <Input {...getInputProps()} type="file"/>
                                        {isDragActive ? (
                                            <p className="text-center">Arraste a imagem para aqui!</p>
                                        ) : (
                                            <p className="text-center">Clique aqui ou arraste a imagem para fazer upload</p>
                                        )}
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
                                    <Input {...field} className="pb-28 pl-2 pt-4" variant="brand" placeholder="descrição do produto"/>
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
                        <SelectCategory/>
                    </div>
                </div>
                <Button
                    type="submit"
                    disabled={form.formState.isSubmitting}
                    className="">
                    Confimar
                </Button>
            </form>
        </Form>


    </div>
}

function SelectCategory() {

    const [open, setOpen] = useState<boolean>(false)
    const [value, setValue] = useState<string>("")
    const {menu} = useEditMenuContext()

    return <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
            <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="w-[220px] justify-between"
            >
                {menu.categories && value
                    ?  menu.categories.find((category) => category.name === value)?.name
                    : "Selecione uma categoria..."
                }
                <ChevronsUpDown className="opacity-50" />
            </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
            <Command>
                <CommandInput placeholder="Search framework..." />
                <CommandList>
                    <CommandEmpty>No framework found.</CommandEmpty>
                    <CommandGroup>
                        {menu.categories && menu.categories.map((category) => (
                            <CommandItem
                                key={category.name}
                                value={category.name}
                                onSelect={(currentValue) => {
                                    setValue(currentValue === value ? "" : currentValue)
                                    setOpen(false)
                                }}
                            >
                                {category.name}
                                <Check
                                    className={cn(
                                        "ml-auto",
                                        value === category.name ? "opacity-100" : "opacity-0"
                                    )}
                                />
                            </CommandItem>
                        ))}
                    </CommandGroup>
                </CommandList>
            </Command>
        </PopoverContent>
    </Popover>
}

export default AddItem;