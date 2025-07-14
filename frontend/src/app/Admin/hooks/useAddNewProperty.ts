'use client'

import React, { useEffect, useState } from 'react'

interface newPropertyVals {
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
  metaTitle?: string | null
  propertyPhone?:string | number | null,
  propertyWapp?:string | number | null,
  metaDescription?: string | null
  propertyAddress: string
  propertyState: string
  propertyCity: string
  propertyCountry: string
  zipCode: string | number
  isBedroomAvailable: boolean
  bedrooms?: string | number
  bathrooms?: string | number
  propertySize?: string | number
  furnished?: string | number
  featureTag: string | boolean
  customFields?: object | boolean
  amenities: string[]
}

interface newPropertyErrs {
  [key: string]: string | undefined
}

interface formStatus {
  formOne: boolean | string
  formTwo: boolean | string
  formThree: boolean | string
  formFour: boolean | string
  formFive: boolean | string
}

export const useAddNewProperty = (props:{isBetroom:boolean,amenitiesSelected:string[]}) => {
    const {isBetroom = true,amenitiesSelected=[]} = props
  const [newPropertyValues, setNewPropertyValues] = useState<newPropertyVals>({
    title: '',
    description: '',
    propertyCategory: 'Apartment',
    propertyType: 'rent',
    propertyPrice: '',
    propertyStatus: 'Publish',
    customSlug: null,
    thumbnailImage: null,
    galleryImage: [],
    propertyVideo: '',
    altTag: null,
    metaTitle: null,
    propertyPhone:null,
    propertyWapp:null,
    metaDescription: null,
    propertyAddress: '',
    propertyState: '',
    propertyCity: '',
    propertyCountry: '',
    zipCode: '',
    isBedroomAvailable: isBetroom,
    bedrooms: '',
    bathrooms: '',
    propertySize: '',
    furnished: '',
    featureTag: false,
    customFields: false,
    amenities:amenitiesSelected
  })
console.log(newPropertyValues,"newPropertyValues");

    // 🔁 Sync amenities when prop changes
  useEffect(() => {
    setNewPropertyValues(prev => ({
      ...prev,
      amenities: amenitiesSelected,
    }));
  }, [amenitiesSelected]);

  // 🔁 Optionally sync isBetroom too
  useEffect(() => {
    setNewPropertyValues(prev => ({
      ...prev,
      isBedroomAvailable: isBetroom,
    }));
  }, [isBetroom]);

  const [addNewPropertyErrs, setAddNewPropertyErrs] = useState<newPropertyErrs | null >(null)
  const [isNewPropertySubmitting, setIsNewPropertySubmitting] = useState(false)
  const [formStatus, setFormStatus] = useState<formStatus>({
    formOne: false,
    formTwo: false,
    formThree: false,
    formFour: false,
    formFive: false
  })

const handleOnchangeNewProperty = (
  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
) => {
  const { name, value } = e.target;

  if (
    e.target instanceof HTMLInputElement &&
    e.target.type === 'file'
  ) {
    const input = e.target as HTMLInputElement;
    const files = input.files;

    if (name === 'thumbnailImage' && files?.[0]) {
      setNewPropertyValues((prev) => ({
        ...prev,
        thumbnailImage: files[0],
      }));
      return;
    }

    if (name === 'galleryImage' && files) {
      setNewPropertyValues((prev) => ({
        ...prev,
        galleryImage: Array.from(files),
      }));
      return;
    }
     if (name === 'propertyVideo' && files?.[0]) {
      setNewPropertyValues((prev) => ({
        ...prev,
        propertyVideo: files[0],
      }));
      return;
    }
  }
  

  if (name === 'customSlug') {
    const formattedSlug = value.toLowerCase().replace(/\s+/g, '-');
    setNewPropertyValues((prev) => ({
      ...prev,
      customSlug: formattedSlug,
    }));
    return;
  }

  if (name === 'amenities') {
    setNewPropertyValues((prev) => ({
      ...prev,
      amenities: prev.amenities.includes(value)
        ? prev.amenities.filter((a) => a !== value)
        : [...prev.amenities, value],
    }));
    return;
  }

  setNewPropertyValues((prev) => ({
    ...prev,
    [name]: value,
  }));
};

  const validateNewPropertyVals = (vals: newPropertyVals) => {
    const errors: newPropertyErrs = {}

    if (!vals.title.trim()) errors.title = 'Title is required'
    else if (vals.title.length < 8) errors.title = 'Title is too short'
    else if (vals.title.length > 100) errors.title = 'Title limit exceeded'

    if (!vals.description.trim()) errors.description = 'Description is required'
    else if (vals.description.length < 50) errors.description = 'Description is too short'
    else if (vals.description.length > 2500) errors.description = 'Description limit exceeded'

    if (!String(vals.propertyPrice).trim()) errors.propertyPrice = 'Property price is required'
    else if (String(vals.propertyPrice).length > 7) errors.propertyPrice = 'Enter a valid property price'

    if (vals.customSlug && vals.customSlug.length < 6) errors.customSlug = 'Slug must be at least 6 characters'
    if (vals.customSlug && vals.customSlug.length > 36) errors.customSlug = 'Slug must be less than 36 characters'

    if (!vals.thumbnailImage) errors.thumbnailImage = 'Thumbnail image is required'
    else if (!['image/jpeg', 'image/png', 'image/webp', 'image/avif'].includes(vals.thumbnailImage.type))
      errors.thumbnailImage = 'Only PNG, JPG, avif or WEBP formats allowed'

    if (!vals.galleryImage || vals.galleryImage.length === 0) errors.galleryImage = 'Gallery images are required'
    else if (vals.galleryImage.length > 10) errors.galleryImage = 'Maximum 10 images allowed'
    else if (vals.galleryImage.some(file => !['image/jpeg', 'image/png', 'image/webp'].includes(file.type)))
      errors.galleryImage = 'Invalid gallery image format'

      if (!vals.propertyState.trim()) errors.propertyState = 'Select property State'
  if (!vals.propertyCity.trim()) errors.propertyCity = 'Select property City'
  if (!vals.propertyCountry.trim()) errors.propertyCountry = 'Select property Country'
  if (!vals.bedrooms && vals.isBedroomAvailable) errors.bedrooms = 'Select number of bedrooms';
if (!vals.bathrooms && vals.isBedroomAvailable) errors.bathrooms = 'Select number of bathrooms';
if (!vals.furnished) errors.furnished = 'Select furnished status';


    
    if (vals.altTag && (vals.altTag.length < 2 || vals.altTag.length > 18)) errors.altTag = 'Alt tag must be 2–18 chars'
    if (vals.metaTitle && (vals.metaTitle.length < 8 || vals.metaTitle.length > 22)) errors.metaTitle = 'Meta title must be 8–22 chars'
    if (vals.metaDescription && (vals.metaDescription.length < 20 || vals.metaDescription.length > 52)) errors.metaDescription = 'Meta description must be 20–32 chars'

    if (!vals.propertyAddress.trim()) errors.propertyAddress = 'Address is required'
    else if (vals.propertyAddress.length < 7) errors.propertyAddress = 'Address is too short'
    else if (vals.propertyAddress.length > 58) errors.propertyAddress = 'Address too long'

    if (vals.propertySize === '' || vals.propertySize === null || isNaN(Number(vals.propertySize))) {
    errors.propertySize = 'Valid Property Size is required';
    } else if (!isFinite(Number(vals.propertySize))) {
    errors.propertySize = 'Enter a valid Property Size';
    } else if (Number(vals.propertySize) <= 0) {
    errors.propertySize = 'Property Size must be greater than 0';
    } else if (String(vals.propertySize).length > 8) {
    errors.propertySize = 'Property Size is too long';
    }


    if (!String(vals.zipCode).trim()) errors.zipCode = 'Zip code is required'
    else if (String(vals.zipCode).length > 9) errors.zipCode = 'Zip code too long'

    if (vals.amenities.length === 0) errors.amenities = 'At least one amenity is required'

    return errors
  }

const handleFormStatus = (errors: newPropertyErrs) => {
  const fieldGroups: Record<keyof formStatus, (keyof newPropertyErrs)[]> = {
    formOne: ['title', 'description', 'propertyPrice', 'customSlug'],
    formTwo: ['thumbnailImage', 'galleryImage', 'altTag', 'metaTitle', 'metaDescription'],
    formThree: ['propertyAddress','propertyState','propertyCity','propertyCountry', 'zipCode'],
    formFour: ['propertySize','bedrooms','bathrooms','furnished'],
    formFive: ['amenities']
  };

  const newStatus: formStatus = {
    formOne: false,
    formTwo: false,
    formThree: false,
    formFour: false,
    formFive: false,
  };

  Object.entries(fieldGroups).forEach(([key, fields]) => {
    const hasError = fields.some(field => field in errors);
    newStatus[key as keyof formStatus] = hasError ? false : 'pass';
  });

  setFormStatus(newStatus);
};


const handleAddNewPropertySubmit = async (onSubmit: (vals: newPropertyVals) => Promise<void>) => {
  const validationErrors = validateNewPropertyVals(newPropertyValues);
  setAddNewPropertyErrs(validationErrors);
  handleFormStatus(validationErrors);

  if (Object.keys(validationErrors).length === 0) {
    try {
      setIsNewPropertySubmitting(true);
      await onSubmit(newPropertyValues); // await here is important if onSubmit is async
    } finally {
      setIsNewPropertySubmitting(false); // always reset submission state
    }
  }
};


  return {
    newPropertyValues,
    addNewPropertyErrs,
    isNewPropertySubmitting,
    formStatus,
    handleOnchangeNewProperty,
    handleAddNewPropertySubmit,
    validateNewPropertyVals,
    setAddNewPropertyErrs,
    handleFormStatus,
    setNewPropertyValues
  }
}
