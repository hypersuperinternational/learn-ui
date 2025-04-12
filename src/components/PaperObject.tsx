import { useEffect, useRef, useState } from "react"
import { Loader, XCircle } from "lucide-react"

import PaperObjectCreator from "./PaperObjectCreator"
import useUiStore from "@/stores/useUiStore"
import { Button } from "./ui/button"
import useTouchSwipe from "@/hooks/useTouchSwipeDown"
import { scrollToTop } from "@/lib/utils"

interface PaperObjectProps {
    data: any
}

const PaperObject: React.FC<PaperObjectProps> = ({data}) => {
    const { aiHeadlines, setPaperOpen } = useUiStore()
    const { touchOffsetY, handleTouchStart, handleTouchMove, handleTouchEnd } = useTouchSwipe(() => closeOverlay())
    const [loadingImage, setLoadingImage] = useState<boolean>(true)

    const paperObjectRef = useRef<HTMLDivElement | null>(null)
    const [expanded, setExpanded] = useState<boolean>(false)
    const [overlayTop, setOverlayTop] = useState<number | null>(null)
    const [closing, setClosing] = useState<boolean>(false)
    
    const overlay = useRef<HTMLDivElement>(null)

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
    
    const handleTransitionEnd = (e: React.TransitionEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            if (!expanded) {
                setOverlayTop(null)
                setClosing(false)
            }
        }
    }

    const handleImageClick = (e: React.MouseEvent<HTMLImageElement>) => {
        if (!paperObjectRef.current) return
        const rect: DOMRect = paperObjectRef.current.getBoundingClientRect()
        setOverlayTop(rect.top)
        setPaperOpen(true)
    }

    const closeOverlay = () => {
        setExpanded(false)
        setClosing(true)
        setPaperOpen(false)
        if (overlay.current) scrollToTop(overlay.current, 100)
    }

    return (
        <div className="paper-object-container">
            <div className="paper-object flex flex-col gap-4" ref={paperObjectRef}>
                <div className="image-container relative w-full p-4 pb-0">
                    <div className={`image-container-inner overflow-hidden aspect-square rounded-3xl`}>
                        {(loadingImage && data.image_url) && (
                            <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                                <Loader className="h-4 w-4 animate-spin" />
                            </div>
                        )}
                        {data.image_url
                            ? <img
                                src={data.image_url}
                                alt=""
                                className={`relative w-full h-full object-cover ${loadingImage ? 'opacity-0' : 'opacity-100'}`}
                                onClick={handleImageClick}
                                onLoad={() => setLoadingImage(false)}
                                loading="lazy"
                            />
                            : <div className="w-full h-full bg-gray-200 flex justify-center items-center text-xs text-black/30">
                                No image
                            </div>
                        }
                    </div>
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
                className={`fixed top-0 left-0 w-screen h-screen z-10 bg-learn-main pointer-events-none ease-out-learn duration-300
                    ${expanded ? 'opacity-100' : 'opacity-0 delay-300'}`}>
            </div>
            <div 
                className={`paper-object-detail-overlay fixed pb-4 overflow-y-auto overscroll-contain touch-pan-y w-screen max-h-screen flex flex-col gap-4 left-0 z-20 ease-out-learn transition-all
                    ${!overlayTop && 'hidden'}
                    ${expanded ? 'duration-300' : 'duration-300'}`}
                style={{ 
                    top: expanded ? `${touchOffsetY}px` : `${overlayTop}px`,
                    WebkitOverflowScrolling: 'touch'
                }}
                ref={overlay}
                onScroll={e => closing && e.preventDefault()}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}>
                    <div 
                        className={`flex flex-col gap-4 ${expanded ? 'bg-learn-main duration-300' : 'bg-transparent duration-300 delay-300'}`}
                        onTransitionEnd={handleTransitionEnd}>
                        <div className={`image-container relative w-full overflow-hidden bg-learn-main ease-out-learn shrink-0
                            ${expanded ? 'p-0 duration-300' : 'p-4 pb-0 duration-300'}`}>
                            <div className={`image-container-inner overflow-hidden ease-out-learn
                                ${expanded ? 'aspect-[2/3] rounded-none duration-300' : 'aspect-square rounded-3xl duration-300'}`}>
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
                            <Button 
                                variant='ghost'
                                className={`fixed bg-black/10 text-white rounded-full aspect-square w-auto h-auto ease-out-learn transition-all
                                    ${expanded ? 'opacity-100 scale-100 top-4 right-4 duration-300' : 'opacity-0 scale-75 top-8 right-8 duration-300'}`}
                                onClick={() => closeOverlay()}>
                                    <XCircle className="size-4" />
                            </Button>
                        </div>
                    </div>
            </div>
        </div>
    )
}

export default PaperObject