import { useCallback, useMemo, useState } from "react"

export const usePropertyFilter = () => {


    const [filterByType, setFilterByType] = useState<string>('')
    const [filterByCat, setFilterByCat] = useState<string>('')

    const filters = useMemo(() => {
        return {
            filterByType,
            filterByCat
        }
    }, [filterByType, filterByCat])
    console.log(filters, filterByType, 3858453);

    const manageAddFilter = (value: string, filterField: string) => {
        console.log(value, filterField, 3858453);

        if (filterField === 'propType') {
            setFilterByType(value)
        }
        if (filterField === 'propCat') {
            setFilterByCat(value)
        }
    }
    const manageRemoveFilter = (filterField: string) => {
        if (filterField === 'propType') {
            setFilterByType('')
        }
        if (filterField === 'propCat') {
            setFilterByCat('')
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