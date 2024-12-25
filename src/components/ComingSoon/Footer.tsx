import { motion } from 'framer-motion'

const Footer = () => {
    return (
        <motion.footer
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="py-8 text-center text-sm text-gray-500"
        >
            <p>&copy; 2024 Neemble Eat. Todos os direitos reservados.</p>
            <p className="mt-2">Luanda, Angola</p>
        </motion.footer>
    )
}

export default Footer

