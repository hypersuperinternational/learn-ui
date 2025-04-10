import { motion } from "framer-motion"
import { useEffect } from "react"
import { Button } from "./ui/button"
import { XCircle } from "lucide-react"
import useUiStore from "@/stores/useUiStore"

interface PaperObjectDetailProps {
    data: any
    onClose: () => void
}

const PaperObjectDetail: React.FC<PaperObjectDetailProps> = ({ data, onClose }) => {
    const { aiHeadlines } = useUiStore()
    const easeQuadOut = [0.4, 0.0, 0.0, 0.9]

    const handleKeyPress = (e: KeyboardEvent) => {
        switch (e.key) {
            case 'Escape':
                onClose()
                break
            default:
                break
        }
    }

    useEffect(() => {
        window.addEventListener('keydown', handleKeyPress, true)
        return () => window.removeEventListener('keydown', handleKeyPress, true)
    }, [])

    return (
        <motion.div 
            className='paper-object-detail-container fixed inset-0 z-20 bg-white'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.1 }}>
            <div className='paper-object-detail relative flex flex-col gap-2'>
                <motion.img
                    layoutId={`image-${data.id}`}
                    src={data.image_url}
                    transition={{ duration: 0.25, ease: easeQuadOut }}
                    alt=""
                    className="w-full aspect-square object-cover"
                />
                <motion.h1 
                    className="text-3xl leading-none py-4 px-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25, ease: easeQuadOut }}
                    >
                    {aiHeadlines
                        ? data.ai_headline
                        : data.title_org
                    }
                </motion.h1>


                <Button variant="ghost" className="absolute top-2 right-2" onClick={onClose}>
                    <XCircle className="size-4" />
                </Button>
            </div>
        </motion.div>
    )
}

export default PaperObjectDetail