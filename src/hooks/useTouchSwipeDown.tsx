import { useState, useRef } from "react"

const useTouchSwipe = (onSwipeThreshold: () => void, threshold = 80) => {
    const [swipingDown, setSwipingDown] = useState<boolean>(false)
    const [touchOffsetY, setTouchOffsetY] = useState<number>(0)
    const touchStartY = useRef<number | null>(null)

    const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
        touchStartY.current = e.touches[0].clientY
    };

    const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
        if (!touchStartY.current) return
        e.stopPropagation()
        const currentY = e.touches[0].clientY
        const deltaY = Math.abs(currentY) - Math.abs(touchStartY.current)
        if (e.currentTarget.scrollTop <= 0 && deltaY > 0) {
            setTouchOffsetY(deltaY)
            setSwipingDown(true)
        } else {
            setSwipingDown(false)
        }
    };

    const handleTouchEnd = () => {
        if (touchOffsetY > threshold) {
            onSwipeThreshold()
        }
        setTouchOffsetY(0)
        touchStartY.current = null
    };

    return { touchOffsetY, swipingDown, handleTouchStart, handleTouchMove, handleTouchEnd };
};

export default useTouchSwipe;
