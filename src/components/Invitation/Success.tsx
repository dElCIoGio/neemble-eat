import { motion } from 'framer-motion';
import {CheckCircle} from "@phosphor-icons/react"
import {Button} from "@/components/ui/button"
import {Link} from "react-router-dom";
import {URL_PATH_PREFIX} from "@/lib/constants.ts";


export function Success() {
    return (
        <div className="flex items-center justify-center h-screen">
            <motion.div
                className="flex flex-col items-center"
                initial={{scale: 0}}
                animate={{scale: 1}}
                transition={{duration: 0.5, ease: 'easeOut'}}
            >
                <motion.div
                    className="w-16 h-16 text-white rounded-full flex items-center justify-center"
                    initial={{opacity: 0, rotate: -180}}
                    animate={{opacity: 1, rotate: 0}}
                    transition={{duration: 0.5, ease: 'easeOut'}}
                >
                    <CheckCircle className="text-green-500" size={50}/>
                </motion.div>
                <div className="space-y-4 flex flex-col items-center justify-center">
                    <motion.p
                        className="mt-4 text-green-500 font-semibold"
                        initial={{opacity: 0, y: 20}}
                        animate={{opacity: 1, y: 0}}
                        transition={{delay: 0.3, duration: 0.5, ease: 'easeOut'}}
                    >
                        Conta criada com sucesso!
                    </motion.p>
                    <motion.div
                        initial={{opacity: 0, y: 20}}
                        animate={{opacity: 1, y: 0}}
                        transition={{delay: 1.5, duration: 0.5, ease: 'easeOut'}}>
                        <Button variant="secondary">
                            <Link to={`${URL_PATH_PREFIX}/login`}>
                                Log In
                            </Link>
                        </Button>
                    </motion.div>
                </div>

            </motion.div>
        </div>
    );
}

