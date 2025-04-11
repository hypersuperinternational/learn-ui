import { useEffect } from "react"
import { XCircle } from "lucide-react"

import { Button } from "./ui/button"
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
        console.log(data.ai_key_takeaways)
        window.addEventListener('keydown', handleKeyPress, true)
        return () => {
            window.removeEventListener('keydown', handleKeyPress, true)
        }
    }, [])

    return (
        <div 
            className='paper-object-detail-container fixed w-screen h-screen overflow-scroll inset-0 pb-8 z-20 bg-white'
            onScroll={e => e.stopPropagation()}
            >
            <div className='paper-object-detail relative flex flex-col gap-4'>
                <img
                    src={data.image_url}
                    alt=""
                    className="w-full aspect-square object-cover"
                />
                <h1 
                    className="text-3xl leading-none px-8"
                    >
                    {aiHeadlines
                        ? data.ai_headline
                        : data.title_org
                    }
                </h1>
                <div
                    className="flex flex-col gap-2 px-8">
                    {data.ai_key_takeaways.map((keyTakeaway: any, index: number) => {
                        return (
                            <div className="key-takeaway rounded-md border border-gray-100 p-4" key={index}>
                                {typeof keyTakeaway.text === 'string'
                                    ? keyTakeaway.text
                                    : keyTakeaway.text.main
                                }
                            </div>
                        )
                    })}
                </div>


                <Button variant="ghost" className="fixed top-2 right-2" onClick={onClose}>
                    <XCircle className="size-4" />
                </Button>
            </div>
        </div>
    )
}

export default PaperObjectDetail