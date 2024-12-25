import { motion } from 'framer-motion'
import Header from '@/components/ComingSoon/Header'
import MainContent from '@/components/ComingSoon/MainContainer'
import Footer from '@/components/ComingSoon/Footer'

export default function ComingSoonPage() {
    return (
        <div className="min-h-screen flex flex-col bg-white text-gray-800">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
                className="flex-grow flex flex-col max-w-4xl mx-auto px-4 w-full"
            >
                <Header />
                <MainContent />
                <Footer />
            </motion.div>
        </div>
    )
}
