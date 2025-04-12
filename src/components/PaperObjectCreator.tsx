import { UserCircle2 } from 'lucide-react'
import { useState } from 'react'

interface PaperObjectCreatorProps {
  creator: string
}

const PaperObjectCreator: React.FC<PaperObjectCreatorProps> = ({ creator }) => {
    if (!creator) {
        return null
    }
    const [showFullText, setShowFullText] = useState(false)
    const words = creator.split(' ')
    const truncatedText = words.slice(0, 5).join(' ')
    const needsTruncation = words.length > 5
    const displayText = (showFullText ? creator : truncatedText).replace(/^[,\s]+|[,\s]+$/g, "")

    return (
        <div className="creator-display">
            <div className='flex items-start gap-1'>
                <UserCircle2 className='size-4 shrink-0'/> {displayText}
                {needsTruncation && (
                    <div className='inline'>
                        <span>, </span>
                        <button 
                            onClick={() => setShowFullText(!showFullText)}
                            className="inline underline text-nowrap">
                            {showFullText ? 'Less' : 'More'}
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default PaperObjectCreator