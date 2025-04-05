import { Loader } from "lucide-react"
import { useState } from "react"

interface PaperObjectProps {
    data: any
}

const PaperObject: React.FC<PaperObjectProps> = ({data}) => {
    const [loadingImage, setLoadingImage] = useState<boolean>(true)

    return (
        <div className="paper-object-container p-4">
            <div className="paper-object flex flex-col gap-2">
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
                <h1 className="text-4xl px-4">
                    {data.title_org}
                </h1>
            </div>
        </div>
    )
}

export default PaperObject