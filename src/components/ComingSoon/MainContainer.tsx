import { motion } from 'framer-motion'
import {useState} from "react";
import {Input} from "@/components/ui/input.tsx";
import {registerNewLead} from "@/api/general/manager.ts";

const MainContent = () => {
    const [email, setEmail] = useState('')

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        registerNewLead({email}).then(() => {
            setEmail('')
            alert('Obrigado por se inscrever, entrarémos em contacto em breve!')
        })

    }

    return (
        <motion.main
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex-grow flex flex-col items-center justify-center text-center"
        >
            <h2 className="text-2xl font-poppins-semibold mb-6">Em breve em Angola</h2>
            <p className="mb-8 max-w-md text-gray-600">
                Prepare-se para uma nova experiência de pedidos em restaurantes.
                Cardápios digitais, pedidos fáceis e acompanhamento em tempo real.
            </p>
            <form onSubmit={handleSubmit} className="flex flex-col items-center w-full max-w-sm">
                <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Seu e-mail"
                    required
                    className="mb-4 p-2 w-full border border-purple-200 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-200 text-gray-800"
                />
                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="bg-purple-600 text-white py-2 px-6 rounded-md w-full transition duration-300 ease-in-out hover:bg-purple-700"
                    type="submit"
                >
                    Mantenha-me informado
                </motion.button>
            </form>
        </motion.main>
    )
}

export default MainContent
