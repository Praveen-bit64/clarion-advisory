'use client'

import React, { createContext, useContext, useEffect, useState } from "react"

interface PropertySchema {
    propertyType?: string[]
    amenities?: string[]
    cities?: string[]
    states?: string[]
    countries?: string[]
    bedroomSizes?: string[]
    bathrooms?: string[]
    tags?: string[]
}

interface PropertySchemaContextType {
    propertySchema: PropertySchema | null
    setPropertySchema: React.Dispatch<React.SetStateAction<PropertySchema | null>>
}

const PropertySchemaContext = createContext<PropertySchemaContextType | undefined>(undefined)

export const PropertySchemaProvider = ({ children }: { children: React.ReactNode }) => {
    const [propertySchema, setPropertySchema] = useState<PropertySchema | null>(null)

    useEffect(() => {
        const fetchPropertySchema = async () => {
            const res = await fetch('/api/propertySchema/getpropertyschema')
            const data = await res.json()

            if (!data.error) {
                setPropertySchema(data.propertySchema)
            }
        }
        fetchPropertySchema()
    }, [])

    return (
        <PropertySchemaContext.Provider value={{ propertySchema, setPropertySchema }}>
            {children}
        </PropertySchemaContext.Provider>
    )
}

export const usePropertySchema = () => {
    const context = useContext(PropertySchemaContext)
    if (!context) throw new Error("usePropertySchema must be used within PropertySchemaProvider")
    return context
}