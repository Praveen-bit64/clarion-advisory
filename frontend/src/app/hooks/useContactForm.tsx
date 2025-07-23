'use client'
import { useState } from "react"

interface inputVals {
    fName: string,
    lName: string,
    phone?: string,
    email: string,
    company?: string,
    message?: string
}

interface inputValsErrs {
    fName?: string,
    lName?: string,
    phone?: string,
    email?: string,
    company?: string,
    message?: string
}

export const useContactForm = () => {
    const [inputValues, setInputValues] = useState<inputVals>({
        fName: '',
        lName: '',
        phone: '',
        email: '',
        company: '',
        message: ''
    })

    const [inputErrs, setInputErrs] = useState<inputValsErrs>({})
    const [isContactFormSubmitting, setIsContactFormSubmitting] = useState(false)

    const contactOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target

        setInputValues((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const validateContactForm = (vals: inputVals) => {
        const valsErrs: inputValsErrs = {};
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if (!vals.fName) valsErrs.fName = 'First Name is Required!';
        if (!vals.email) {
            valsErrs.email = 'Email is Required';
        } else if (!emailRegex.test(vals.email)) {
            valsErrs.email = 'Enter a valid email';
        }

        if (!vals.message) valsErrs.message = 'Enter a short message';

        setInputErrs(valsErrs);
        return valsErrs;
    };

    const submitContactForm = async (onSubmit: (vals: inputVals) => void) => {
        const inputErrss = validateContactForm(inputValues)
        setInputErrs(inputErrss)
        if (Object.entries(inputErrs).length === 0) {
            setIsContactFormSubmitting(true)
            onSubmit(inputValues)
            setIsContactFormSubmitting(false)
            setInputValues({
                fName: '',
                lName: '',
                phone: '',
                email: '',
                company: '',
                message: ''
            })
        }
    }

    return {
        inputValues,
        inputErrs,
        isContactFormSubmitting,
        contactOnChange,
        validateContactForm,
        submitContactForm
    }
}