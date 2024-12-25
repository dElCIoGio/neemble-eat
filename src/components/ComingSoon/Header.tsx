import { motion } from 'framer-motion'
import logo from "@/../public/neemble-eat-logo.png"

const Header = () => {
    return (
        <motion.header
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="pt-8 text-center"
        >
            <div className="flex justify-center">
                <img src={logo} className="w-40" alt=""/>
            </div>

        </motion.header>
    )
}

export default Header
