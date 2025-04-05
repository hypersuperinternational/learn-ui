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
    const displayText = showFullText ? creator : truncatedText

    return (
        <div className="creator-display">
            <div className=''>
                Written by: {displayText}
                {needsTruncation && (
                    <div className='inline'>
                        <span>, </span>
                        <button 
                            onClick={() => setShowFullText(!showFullText)}
                            className="inline underline text-nowrap">
                            {showFullText ? 'Show less' : 'Show more'}
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default PaperObjectCreator