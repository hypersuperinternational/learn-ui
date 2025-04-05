import { Loader } from "lucide-react"
import { useState } from "react"
import PaperObjectCreator from "./PaperObjectCreator"

interface PaperObjectProps {
    data: any
}

const PaperObject: React.FC<PaperObjectProps> = ({data}) => {
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
                        ? <img
                            src={data.image_url}
                            alt=""
                            className={`w-full h-full ${loadingImage ? 'opacity-0' : 'opacity-100'}`}
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
                        {data.ai_headline}
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