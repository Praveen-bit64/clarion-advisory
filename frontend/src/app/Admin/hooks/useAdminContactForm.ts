'use client'

import { object } from "framer-motion/client";
import { useEffect, useState } from "react";

interface formValues {
    phone:string,
    email:string,
    address:string
}

interface formErrs {
     phone?:string,
    email?:string,
    address?:string
}

export const useAdminContactForm = () => {
    const [values,setValues] = useState<formValues>({
        phone:'',
        email:'',
        address:''
    })
    useEffect(() => {
         const getContactDetails = async () => {
        const res = await fetch('/api/adminSettings/getContact');
        const data = await res.json();
        // setContactInfo(data.contactInfo)
        setValues(data.contactInfo)
    }
    getContactDetails() 
    } ,[])
    const [error,setError] = useState<formErrs>({})
    const [isSubmitting,setIsSubmitting] = useState(false)

    const validate = (vals: formValues) => {
        const errs : formErrs = {}

        if(!vals.phone.trim()) errs.phone = 'Phone is Required';
        else if (!/^\d{1,14}$/.test(vals.phone)) errs.phone = 'Enter a Valid Phone Number';

        if(!vals.email.trim()) errs.email = 'Email is Required';
         else if (!/\S+@\S+\.\S+/.test(vals.email)) errs.email = 'Email is invalid';

        if (!vals.address.trim()) errs.address = 'Address is required';

        return errs
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = e.target
        setValues((prev) => ({...prev,[name]:value}))
    }

    const handleSubmit = async(onSuccess:(values:formValues) =>void) => {
        const validateErrors = validate(values)
        setError(validateErrors)

        if(Object.keys(validateErrors).length === 0) {
            setIsSubmitting(true)
            await onSuccess(values)
            setIsSubmitting(false)
        }
    }

    return {
        values,
        error,
        isSubmitting,
        handleChange,
        handleSubmit
    }

}