import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Upload, FileText } from "lucide-react"




const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB

export default function DocumentUploader() {
    const [file, setFile] = useState<File | null>(null)
    const [error, setError] = useState("")
    // const navigate = useNavigate()

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0]
        if (selectedFile) {
            if (selectedFile.size > MAX_FILE_SIZE) {
                setError("File size exceeds 10MB limit")
                setFile(null)
            } else {
                setError("")
                setFile(selectedFile)
            }
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!file) {
            setError("Please select a document type and upload a file")
            return
        }

    }

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>Submeta um comprovativo</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="flex items-center justify-center w-full">
                        <label
                            htmlFor="dropzone-file"
                            className={`flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg  ${(file == null)? "hover:bg-gray-100 cursor-pointer" : "hidden"} bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700  dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600`}
                        >
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <Upload className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" />
                                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                    <span className="font-semibold">Clique para submeter</span> ou arraste o documento
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">PDF, DOC ou DOCX (MAX. 10MB)</p>
                            </div>
                            <input
                                id="dropzone-file"
                                type="file"
                                disabled={!(file == null)}
                                className="hidden"
                                accept=".pdf,.doc,.docx"
                                onChange={handleFileChange}
                            />
                        </label>
                    </div>
                    {file && (
                        <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                            <FileText className="w-4 h-4" />
                            <span>{file.name}</span>
                            <span>
                                {Math.round(file.size / 1024)} KB
                            </span>
                            <Button onClick={() => setFile(null)} className={`${file != null ? "text-sm hover:bg-transparent" : "hidden"}`} variant={"ghost"}>
                                Remover
                            </Button>
                        </div>
                    )}
                    <Button type="submit" disabled={file == null} className="w-full">
                        Submeter
                    </Button>
                    {error && <p className="text-red-500 text-sm">{error}</p>}
                </form>
            </CardContent>
        </Card>
    )
}