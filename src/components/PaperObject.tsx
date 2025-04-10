import { useState } from "react"
import { motion } from "framer-motion"
import { Loader } from "lucide-react"

import PaperObjectCreator from "./PaperObjectCreator"
import useUiStore from "@/stores/useUiStore"

interface PaperObjectProps {
    data: any
    onImageClick: (data: any) => void
}

const PaperObject: React.FC<PaperObjectProps> = ({data, onImageClick}) => {
    const { aiHeadlines } = useUiStore()
    const [loadingImage, setLoadingImage] = useState<boolean>(true)

    return (
        <div className="paper-object-container p-4">
            <div className="paper-object flex flex-col gap-4">
                <div className="image-container relative w-full rounded-3xl overflow-hidden aspect-square">
                    {(loadingImage && data.image_url) && (
                        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                            <Loader className="h-4 w-4 animate-spin" />
                        </div>
                    )}
                    {data.image_url
                        ? <motion.img
                            layoutId={`image-${data.id}`}
                            src={data.image_url}
                            alt=""
                            className={`w-full h-full ${loadingImage ? 'opacity-0' : 'opacity-100'}`}
                            onClick={() => onImageClick(data)}
                            onLoad={() => setLoadingImage(false)}
                            loading="lazy"
                        />
                        : <div className="w-full h-full bg-gray-200 flex justify-center items-center text-xs text-black/30">
                            No image
                        </div>
                    }
                </div>
                <div className="data-container px-4 flex flex-col gap-2">
                    <h1 className="text-3xl leading-none">
                        {aiHeadlines
                            ? data.ai_headline
                            : data.title_org
                        }
                    </h1>
                    <div className="meta-data text-xs leading-tight text-black/30">
                        <div>
                            Fetched at: {data.created_at}
                        </div>
                        <div>
                            <PaperObjectCreator creator={data.creator} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PaperObject