'use client'

import { createContext, useContext, useEffect, useState } from "react"

// Define a proper type for each property
interface Property {
    id: string | number
    title: string
    description: string
    propertyCategory: string
    propertyType: string
    propertyPrice: string | number
    propertyStatus: string
    customSlug?: string | null
    thumbnailImage: File | null
    galleryImage: File[] | null
    propertyVideo: string | File
    altTag?: string | null
    editedAt?: string
    listedAt?: string
    metaTitle?: string | null
    metaDescription?: string | null
    propertyAddress: string
    propertyState: string
    propertyCity: string
    propertyCountry: string
    zipCode: string | number
    isBedroomAvailable: boolean | string
    bedrooms?: string | number
    bathrooms?: string | number
    propertySize?: string | number
    furnished?: string | number
    featureTag: string | boolean
    customFields?: object | boolean
    amenities: string[]
}

// Define the provider context interface
interface PropertyContextType {
    properties: Property[]
    setProperties: React.Dispatch<React.SetStateAction<Property[]>>
    fetchListedProperties: () => void
}

//  Provide default value as undefined to enforce useContext check
export const ListedPropertyContext = createContext<PropertyContextType | undefined>(undefined)

export const ListedPropertyProvider = ({ children }: { children: React.ReactNode }) => {
    const [properties, setProperties] = useState<Property[]>([])
    const fetchListedProperties = async () => {
        try {
            const res = await fetch('/api/properties/getproperty')
            const data = await res.json()
            if (!data.error) {
                setProperties(data.properties)
            }
        } catch (err) {
            console.error("Failed to fetch properties", err)
        }
    }
    useEffect(() => {


        fetchListedProperties()
    }, [])

    return (
        <ListedPropertyContext.Provider value={{ properties, setProperties, fetchListedProperties }}>
            {children}
        </ListedPropertyContext.Provider>
    )
}

export const useListedProperties = () => {
    const context = useContext(ListedPropertyContext)
    if (!context) throw new Error("useListedProperties must be used within a ListedPropertyProvider")
    return context
}
