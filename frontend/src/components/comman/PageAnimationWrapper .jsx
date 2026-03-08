import { AnimatePresence, motion } from "motion/react"
import { useLocation } from "react-router-dom"

const PageAnimationWrapper = ({ children }) => {
    const location = useLocation()

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={location.pathname}
                initial={{ opacity: 0, scale: 0.98, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98, y: -20 }}
                transition={{ duration: 0.4 }}>{children}</motion.div>
        </AnimatePresence>
    )
}

export default PageAnimationWrapper
