import {TypographyMuted} from "@/components/ui/Typography";
import {Input} from "@/components/ui/input";
import {Form, FormItem, FormField, FormControl, FormLabel, FormMessage} from "@/components/ui/form"
import {z} from 'zod';
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {TablesConfigSchema} from "@/lib/zodSchema.ts";
import {useSetupContext} from "@/context/setupContext.ts";
import {Button} from "@/components/ui/button.tsx";


type TablesConfigValues = z.infer<typeof TablesConfigSchema>

export function TablesConfig() {

	const form = useForm<TablesConfigValues>({
		resolver: zodResolver(TablesConfigSchema),
		mode: "onSubmit",
		defaultValues: {
			numberOfTables: 1,
		}
	})

	const {nextTab, prevTab} = useSetupContext()


	function onSubmit(data: TablesConfigValues) {
		console.log(data.numberOfTables)

		nextTab()
	}

	return (
		<div>
			<div>
				<TypographyMuted>
					Para que possamos gerar o número certo de códigos QR para o seu restaurante, precisamos que nos dê o número exato de mesas presentes no seu restaurante.
				</TypographyMuted>
				<TypographyMuted>
					Não se preocupe, poderá alterar à qualquer momento após a configuração da conta.
				</TypographyMuted>
			</div>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="h-full mt-8">
					<FormField
						name="numberOfTables"
						control={form.control}
						render={({field: {value, onChange, ...fieldProps}}) => (
							<FormItem>
								<div className="flex items-center">
									<FormLabel>
										Número de mesas: &nbsp;
									</FormLabel>
									<FormControl>
									<Input
										{...fieldProps}
										type="number"
										value={value}
										className={`max-w-[100px] placeholder:text-zinc-300`}
										onChange={(e) => onChange(Number(e.target.value))}
										placeholder="0-30"/>
								</FormControl>
								</div>

								<FormMessage/>
							</FormItem>
						)}/>
					<div className="my-8 fixed bottom-0 space-x-4">
						<Button onClick={prevTab}
						        type={"button"}>
							Anterior
						</Button>
						<Button type={"submit"}>
							Continuar
						</Button>
					</div>
				</form>
			</Form>
		</div>
	);
}

