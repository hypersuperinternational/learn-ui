import { useEffect, useRef, useState } from "react"
import { Loader, XCircle } from "lucide-react"

import PaperObjectCreator from "./PaperObjectCreator"
import useUiStore from "@/stores/useUiStore"
import { Button } from "./ui/button"

interface PaperObjectProps {
    data: any
    onImageClick: (data: any) => void
}

const PaperObject: React.FC<PaperObjectProps> = ({data, onImageClick}) => {
    const { aiHeadlines, paperOpen, setPaperOpen } = useUiStore()
    const [loadingImage, setLoadingImage] = useState<boolean>(true)

    const paperObjectRef = useRef<HTMLDivElement | null>(null)
    const [expanded, setExpanded] = useState<boolean>(false)
    const [overlayTop, setOverlayTop] = useState<number | null>(null)

    const [touchOffsetY, setTouchOffsetY] = useState<number>(0);
    const touchStartY = useRef<number | null>(null);

    useEffect(() => {
        window.addEventListener('keydown', handleKeyPress, true)
        return () => {
            window.removeEventListener('keydown', handleKeyPress, true)
        }
    }, [expanded])

    useEffect(() => {
        if (overlayTop) {
            setTimeout(() => {
                setExpanded(true)
            }, 0)
        } else {
            setExpanded(false)
        }
    }, [overlayTop])

    const handleKeyPress = (e: KeyboardEvent) => {
        switch (e.key) {
            case 'Escape':
                closeOverlay()
                break
            default:
                break
        }
    }

    const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
        touchStartY.current = e.touches[0].clientY;
    };
    
    const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
        if (!touchStartY.current) return;
    
        const currentY = e.touches[0].clientY;
        const deltaY = currentY - touchStartY.current;
    
        const target = e.currentTarget;
        // Only apply offset if at the top
        if (target.scrollTop === 0 && deltaY > 0) {
            setTouchOffsetY(deltaY);
        }
    };
    
    const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
        if (touchOffsetY > 80) {
            closeOverlay();
        }
        setTouchOffsetY(0);
        touchStartY.current = null;
    };
    
    const handleTransitionEnd = (e: React.TransitionEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            if (!expanded) {
                setOverlayTop(null)
            }
        }
    }

    const handleImageClick = (e: React.MouseEvent<HTMLImageElement>) => {
        if (!paperObjectRef.current) return
        const rect = paperObjectRef.current.getBoundingClientRect()
        setOverlayTop(rect.top)
        setPaperOpen(true)
    }

    const closeOverlay = () => {
        setExpanded(false)
        setPaperOpen(false)
    }

    return (
        <div className="paper-object-container">
            <div className="paper-object flex flex-col gap-4" ref={paperObjectRef}>
                <div className="image-container relative w-full p-4 pb-0 overflow-hidden aspect-square">
                    {(loadingImage && data.image_url) && (
                        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                            <Loader className="h-4 w-4 animate-spin" />
                        </div>
                    )}
                    {data.image_url
                        ? <img
                            src={data.image_url}
                            alt=""
                            className={`relative w-full h-full object-cover rounded-3xl ${loadingImage ? 'opacity-0' : 'opacity-100'}`}
                            onClick={handleImageClick}
                            onLoad={() => setLoadingImage(false)}
                            loading="lazy"
                        />
                        : <div className="w-full h-full bg-gray-200 flex justify-center items-center text-xs text-black/30">
                            No image
                        </div>
                    }
                </div>
                <div className="data-container px-6 flex flex-col gap-2">
                    <h1 className="text-3xl leading-none font-medium">
                        {aiHeadlines
                            ? data.ai_headline
                            : data.title_org
                        }
                    </h1>
                    <div className="meta-data text-xs leading-tight text-black/30">
                        <div>
                            Fetched at: {data.created_at}
                        </div>
                        {/* <div>
                            <PaperObjectCreator creator={data.creator} />
                        </div> */}
                    </div>
                </div>
            </div>

            <div 
                className={`paper-object-detail-overlay fixed pb-4 overflow-y-auto overscroll-contain w-screen max-h-screen flex flex-col gap-4 left-0 z-20 ease-out-learn transition-all
                    ${!overlayTop && 'hidden'}
                    ${expanded ? 'duration-300' : 'duration-300'}`}
                style={{ 
                    top: expanded ? `${touchOffsetY}px` : `${overlayTop}px`,
                    WebkitOverflowScrolling: 'touch'
                }}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}>
                    <div 
                        className={`flex flex-col gap-4 ${expanded ? 'bg-learn-main duration-300' : 'bg-transparent duration-300 delay-300'}`}
                        onTransitionEnd={handleTransitionEnd}>
                        <div className={`image-container relative w-full overflow-hidden bg-learn-main ease-out-learn shrink-0
                            ${expanded ? 'p-0 aspect-[2/3] duration-300' : 'p-4 pb-0 aspect-square duration-300'}`}>
                            {(loadingImage && data.image_url) && (
                                <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                                    <Loader className="h-4 w-4 animate-spin" />
                                </div>
                            )}
                            {data.image_url
                                ? <img
                                    src={data.image_url}
                                    alt=""
                                    className={`relative w-full h-full object-cover ease-out-learn
                                        ${loadingImage ? 'opacity-0' : 'opacity-100'}
                                        ${expanded ? 'rounded-none duration-300' : 'rounded-3xl duration-300'}`}
                                    onClick={handleImageClick}
                                    onLoad={() => setLoadingImage(false)}
                                    loading="lazy"
                                />
                                : <div className="w-full h-full bg-gray-200 flex justify-center items-center text-xs text-black/30">
                                    No image
                                </div>
                            }
                        </div>
                        <div className={`data-container px-6 flex flex-col gap-2 ease-out-learn
                            ${expanded ? 'bg-learn-main duration-100' : 'bg-transparent duration-300'}`}>
                            <div className={`data-container-header flex flex-col gap-2 ease-out-learn
                                ${expanded ? 'bg-learn-main duration-50' : 'bg-transparent duration-300 delay-300'}`}> 
                                <h1 className="text-3xl leading-none font-medium">
                                    {aiHeadlines
                                        ? data.ai_headline
                                        : data.title_org
                                    }
                                </h1>
                                <div className="meta-data text-xs leading-tight text-black/30">
                                    <div>
                                        Fetched at: {data.created_at}
                                    </div>
                                    <div className={`transition-all duration-300 ease-out-learn ${expanded ? 'opacity-100' : 'opacity-0'}`}>
                                        <PaperObjectCreator creator={data.creator} />
                                    </div>
                                </div>
                            </div>
                            <div
                                className={`ai-key-takeaways flex flex-col gap-2 mt-4`}>
                                {data.ai_key_takeaways.map((keyTakeaway: any, index: number) => {
                                    return (
                                        <div 
                                            className={`key-takeaway rounded-md bg-white font-medium border border-gray-100 p-4 ease-out-learn transition-all
                                                ${expanded ? 'opacity-100 duration-500 ' : 'opacity-0 duration-300'}`}
                                            style={{ transitionDelay: (index + 1) * 50 + 'ms'}}
                                            key={index}>
                                            {typeof keyTakeaway.text === 'string'
                                                ? keyTakeaway.text
                                                : keyTakeaway.text.main
                                            }
                                        </div>
                                    )
                                })}
                            </div>
                        </div>

                        <Button 
                            variant='ghost'
                            className={`absolute text-white ease-out-learn transition-all
                                ${expanded ? 'opacity-100 scale-100 top-4 right-4 duration-300' : 'opacity-0 scale-75 top-8 right-8 duration-300'}`}
                            onClick={() => closeOverlay()}>
                                <XCircle className="size-4" />
                        </Button>
                    </div>
            </div>
        </div>
    )
}

export default PaperObject