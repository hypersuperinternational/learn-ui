import { supabase } from "@/lib/supabase"
import useItemStore from "@/stores/useItemStore"
import { useEffect, useRef, useState } from "react"

const DataFetcher: React.FC = () => {
    const { loading, appendItems, setLoading } = useItemStore()
    const [page, setPage] = useState<number>(0)
    const observerRef = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            try {
                const { data, error } = await supabase
                    .from('n8n_table')
                    .select('*')
                    .range(page * 5, page * 5 + 4)

                if (error) throw error
                if (data.length) appendItems(data)
            } catch (err) {
                console.error('Error fetching data:', err)
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [page])

    useEffect(() => {
        if (!observerRef.current) return

        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && !loading) {
                setPage((prev) => prev + 1)
            }
        })

        observer.observe(observerRef.current)
        return () => observer.disconnect()
    }, [loading])

    return (
        <div ref={observerRef} className="h-10" />
    )
}

export default DataFetcher
