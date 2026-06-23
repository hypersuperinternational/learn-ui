import { useEffect, useRef, useState } from "react"
import { useSwipeable } from 'react-swipeable'
import { ArrowDownToDot, Calendar, Captions, Clock, FileOutput, Link2, Loader, Locate, Newspaper, Star, X, XCircle } from "lucide-react"

import PaperObjectCreator from "./PaperObjectCreator"
import useUiStore from "@/stores/useUiStore"
import { Button } from "./ui/button"
import useTouchSwipe from "@/hooks/useTouchSwipeDown"
import { scrollToTop } from "@/lib/utils"
import KeyTakeaways from "./KeyTakeaways"

interface PaperObjectProps {
    data: any
}

const PaperObject: React.FC<PaperObjectProps> = ({data}) => {
    const { aiHeadlines, setPaperOpen } = useUiStore()
    const { touchOffsetY, swipingDown, handleTouchStart, handleTouchMove, handleTouchEnd } = useTouchSwipe(() => closeOverlay())
    const [loadingImage, setLoadingImage] = useState<boolean>(true)
    const [imagePos, setImagePos] = useState<{x: number, y: number, blur: number}>({x: 0, y: 0, blur: 0})

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

    const moveImageTo = (index: number) => {
        const tanslateX: number = 25 / data.ai_key_takeaways.length * index 
        setImagePos({
            x: tanslateX,
            y: imagePos.y,
            blur: index > 0 ? 4 : 0
        })
    }

    return (
        <div className="paper-object-container">
            <div 
                className="paper-object flex flex-col gap-6"
                onClick={handleImageClick}
                ref={paperObjectRef}>
                <div className="image-and-key-takeaways relative w-full p-4 pb-0">
                    <div className="image-container relative z-0 w-full">
                        <div className={`image-container-inner overflow-hidden aspect-square rounded-3xl shadow-2xl`}>
                            {(loadingImage && data.image_url) && (
                                <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                                    <Loader className="h-4 w-4 animate-spin" />
                                </div>
                            )}
                            {data.image_url
                                ? <img
                                    src={data.image_url}
                                    alt=""
                                    className={`relative w-full h-full scale-125 origin-left object-cover ease-in-out duration-700
                                        ${loadingImage ? 'opacity-0' : 'opacity-100'}`}
                                    style={{
                                        transform: `translateX(-${imagePos.x}%)`,
                                        filter: `blur(${imagePos.blur}px)`
                                    }}
                                    onLoad={() => setLoadingImage(false)}
                                    loading="lazy"
                                />
                                : <div className="w-full h-full bg-gray-200 flex justify-center items-center text-xs text-black/30">
                                    No image
                                </div>
                            }
                        </div>
                    </div>
                    <KeyTakeaways data={data} expanded={expanded} indexChanged={moveImageTo} />
                </div>
                <div className="data-container px-6 flex flex-col gap-2">
                    {/* <h1 className="text-3xl leading-8 font-medium">
                        {aiHeadlines
                            ? data.ai_headline
                            : data.title_org
                        }
                    </h1> */}
                    <div className={`meta-data absolute top-8 left-8 bg-white py-1 px-2 rounded-full flex flex-col gap-1 text-xs leading-tight text-gray-500`}>
                        <div className="flex items-center gap-3">
                            <div className="flex items-center gap-1">
                                <Calendar className="size-4" /> {data.created_at}
                            </div>
                            <div className="flex items-center gap-1">
                                <Star className="size-4" /> {data.score}
                            </div>
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
                    WebkitOverflowScrolling: 'touch',
                }}
                ref={overlay}
                onScroll={e => closing && e.preventDefault()}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}>
                    <div 
                        className={`flex flex-col gap-6 ${expanded ? 'bg-learn-main duration-300' : 'bg-transparent duration-300 delay-400'}`}
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
                                <div className={`ai-generated-image-overlay absolute bottom-4 right-4 px-1.5 bg-black/30 backdrop-blur-xl border-1 border-gray-100/20 rounded-full text-white/50 text-tiny uppercase font-semibold ease-out-learn duration-300
                                    ${expanded ? 'opacity-100 delay-500' : 'opacity-0'}`}>
                                    AI generated image
                                </div>
                            </div>
                        </div>
                        <div className={`data-container px-6 flex flex-col gap-4 ease-out-learn
                            ${expanded ? 'bg-learn-main duration-100' : 'bg-transparent duration-300'}`}>
                            <div className={`data-container-header flex flex-col gap-2 ease-out-learn
                                ${expanded ? 'bg-learn-main duration-50' : 'bg-transparent duration-300 delay-300'}`}> 
                                <h1 className="text-3xl leading-8 font-medium">
                                    {aiHeadlines
                                        ? data.ai_headline
                                        : data.title_org
                                    }
                                </h1>
                                <div className={`meta-data flex flex-col gap-1 text-xs leading-tight ease-out-learn duration-300
                                    ${expanded ? 'text-black' : 'text-gray-400'}`}>
                                    <div className="flex items-center gap-3">
                                        <div className="flex items-center gap-1">
                                            <Calendar className="size-4" /> {data.created_at}
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Star className="size-4" /> {data.score}
                                        </div>
                                    </div>
                                    <div className={`flex flex-col gap-1 duration-300 ease-out-learn ${expanded ? 'opacity-100' : 'opacity-0'}`}>
                                        <PaperObjectCreator creator={data.creator} />
                                        <div className="flex items-start gap-1">
                                            <Newspaper className="size-4 shrink-0" />
                                            <div className="shrink">
                                                {data.title_org}
                                            </div>
                                        </div>
                                        <div 
                                            className="original-link flex items-center justify-center gap-1 mt-6 bg-blue-800/5 text-blue-950 border-1 border-blue-800/20 rounded-full p-3 font-semibold"
                                            onClick={() => window.open(data.html_url, '_blank', 'noopener,noreferrer')}>
                                            <Link2 className="size-4" />
                                            Link to paper
                                        </div>
                                    </div>

                                </div>
                            </div>
                            <div
                                className={`ai-key-takeaways flex flex-col gap-2 mt-4 pb-12`}>
                                <h2 className={`flex items-center justify-center gap-0.5 text-xs font-medium text-center duration-300 ease-out-learn text-gray-400
                                    ${expanded ? 'opacity-100' : 'opacity-0'}`}>
                                    <Captions className="size-4" />
                                    Key Takeaways
                                </h2>
                                {data.ai_key_takeaways?.map((keyTakeaway: any, index: number) => {
                                    if (!keyTakeaway.citation || typeof(keyTakeaway.text) !== 'string') return null
                                    return (
                                        <div 
                                            className={`key-takeaway flex flex-col gap-1 rounded-xl bg-white text-sm font-medium border border-gray-100 p-4 ease-out-learn transition-all
                                                ${expanded ? 'opacity-100 duration-500 ' : 'opacity-0 duration-300'}`}
                                            style={{ transitionDelay: (index + 1) * 50 + 'ms'}}
                                            key={index}>
                                                <div className="">
                                                    {keyTakeaway.text}
                                                </div>
                                                <div className="text-gray-400 font-normal text-xs flex items-center gap-0.5">
                                                    <FileOutput className="size-3" />
                                                    {keyTakeaway.citation}
                                                </div>
                                        </div>
                                    )
                                })}
                            </div>
                            <Button 
                                variant='ghost'
                                className={`fixed bg-black/10 text-white rounded-full aspect-square w-auto h-auto ease-out-learn transition-all
                                    ${expanded ? 'opacity-100 scale-100 top-4 right-4 duration-300' : 'opacity-0 scale-75 top-8 right-8 duration-300'}`}
                                onClick={() => closeOverlay()}>
                                    <X className="size-4" />
                            </Button>
                        </div>
                    </div>
            </div>
        </div>
    )
}

export default PaperObject