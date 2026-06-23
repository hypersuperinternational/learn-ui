import { useEffect, useRef, useState } from 'react'
import { useSwipeable } from 'react-swipeable'
import { FileOutput } from 'lucide-react'

interface KeyTakeawaysInterface {
  data: any
  expanded: boolean
  indexChanged: (index: number) => void
}

const KeyTakeaways = ({ data, expanded, indexChanged }: KeyTakeawaysInterface) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [keyTakeaways, setKeyTakeaways] = useState<any[]>([])
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setKeyTakeaways(data.ai_key_takeaways?.filter((kt: any) => kt.citation && typeof kt.text === 'string'))
  }, [data])

  const handleScroll = () => {
    if (!scrollRef.current) return

    const scrollLeft = scrollRef.current.scrollLeft
    const itemWidth = scrollRef.current.offsetWidth

    const index = Math.round(scrollLeft / itemWidth)
    indexChanged(index)
    setCurrentIndex(index - 1)
  }

  return (
    <div
      className={`key-takeaways-container flex flex-col justify-end absolute z-10 w-full h-full bottom-0 left-0 p-6 pb-2
        ease-out-learn transition-all ${!expanded ? 'opacity-100 duration-300 delay-700' : 'opacity-0 duration-100'}`}
    >
      <div 
        className="key-takeaways-inner scrollbar-hidden relative max-w-full rounded-bl-3xl rounded-br-3xl overflow-x-scroll scroll-smooth snap-x snap-mandatory"
        ref={scrollRef}
        onScroll={handleScroll}>
        <div
          className="relative key-takeaways flex gap-2 items-end whitespace-nowrap transition-transform duration-300 ease-out-learn"
        >
          <div className='relative w-full key-takeaway-container shrink-0 p-2 
            snap-start snap-always text-white text-xl font-semibold whitespace-normal'>
            {data.ai_headline}
          </div>
          {keyTakeaways.map((keyTakeaway: any, index: number) => (
            <div key={index} className={`relative key-takeaway-container shrink-0 p-2 snap-start snap-always`}
                style={{maxWidth: `${100}%`}}>
              <div
                className={`key-takeaway whitespace-normal shrink-0 flex flex-col gap-1 rounded-xl font-medium text-white`}
              >
                <div>{keyTakeaway.text}</div>
                <div className="text-gray-400 font-normal text-xs flex items-center gap-0.5">
                  <FileOutput className="size-3" />
                  {keyTakeaway.citation}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className='position-indicator absolute w-full -bottom-4 left-0 flex items-center justify-center gap-2'>
        {keyTakeaways.map((keyTakeaway: any, index: number) => {
            return (
                <div className={`size-1 rounded-full ${index === currentIndex ? 'bg-gray-900' : 'bg-gray-900/15'}`}></div>
            )
        })}
      </div>
    </div>
  )
}

export default KeyTakeaways