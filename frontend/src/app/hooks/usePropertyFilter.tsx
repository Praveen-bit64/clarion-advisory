import { useCallback, useMemo, useState } from "react"

export const usePropertyFilter = () => {


    const [filterByType, setFilterByType] = useState<string>('')
    const [filterByCat, setFilterByCat] = useState<string>('')
    const [filterByBeds, setFilterByBeds] = useState<string>('')

    const filters = useMemo(() => {
        return {
            filterByType,
            filterByCat,
            filterByBeds
        }
    }, [filterByType, filterByCat, filterByBeds])
    console.log(filters, filterByType, 3858453);

    const manageAddFilter = (value: string, filterField: string) => {
        console.log(value, filterField, 3858453);

        if (filterField === 'propType') {
            setFilterByType(value)
        }
        if (filterField === 'propCat') {
            setFilterByCat(value)
        }
        if (filterField === 'byBeds') {
            setFilterByBeds(value)
        }
    }
    const manageRemoveFilter = (filterField: string) => {
        if (filterField === 'propType') {
            setFilterByType('')
        }
        if (filterField === 'propCat') {
            setFilterByCat('')
        }
        if (filterField === 'byBeds') {
            setFilterByBeds('')
        }
    }

    const [manages, setManages] = useState({
        manageAddFilter,
        manageRemoveFilter
    })

    return {
        filters,
        manages
    }

}   