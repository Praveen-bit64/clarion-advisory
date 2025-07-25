import React, { useCallback, useState } from "react"

interface registerInput {
    name: string,
    profile?: File | null,
    email: string,
    city: string,
    phone?: number | null,
    password: any,
}
interface inputErr {
    name?: string,
    email?: string,
    city?: string,
    phone?: string,
    password?: string
}

export const useRegisterForm = () => {
    const [registerInputs, setRegisterInputs] = useState<registerInput>({
        name: '',
        profile: null,
        email: '',
        city: '',
        phone: null,
        password: ''
    });
    const [inputErrs, setInputErrs] = useState<inputErr | null>(null);
    const [isFormSubmitting, setIsFormSubmitting] = useState(false);

    // Add this reset function
    const resetForm = useCallback(() => {
        setRegisterInputs({
            name: '',
            profile: null,
            email: '',
            city: '',
            phone: null,
            password: ''
        });
        setInputErrs(null);
    }, []);

    const validateForm = (vals: registerInput) => {
        const inpErrors: inputErr = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!vals.name) inpErrors.name = 'Name Required';
        else if (vals.name.length > 35) inpErrors.name = 'Enter a Valid Name';

        if (!vals.email) inpErrors.email = 'Email is Required';
        else if (!emailRegex.test(vals.email)) inpErrors.email = 'Enter a Valid Email';

        if (!vals.city) inpErrors.city = "City is Required";
        else if (vals.city.length > 35) inpErrors.city = 'Enter a Valid City';

        if (String(vals?.phone)?.length < 5 || String(vals?.phone)?.length > 16) inpErrors.phone = "Enter a Valid Phone number";

        if (!vals.password) inpErrors.password = "Enter a Password";
        else if (vals.password.length < 6) inpErrors.password = "Password must be 6 character long";
        else if (vals.password.length > 30) inpErrors.password = "Password Character limit reached";

        setInputErrs(inpErrors);
        return inpErrors;
    };

    const registerOnchange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, files } = e.target;
        if (name === 'profile') {
            setRegisterInputs((prev) => ({
                ...prev,
                profile: files ? files[0] : null
            }));
        } else {
            setRegisterInputs((prev) => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const handleRegisterFormSubmit = async (onSubmit: (vals: registerInput) => void) => {
        const validation = validateForm(registerInputs);
        if (Object.keys(validation).length === 0) {
            setIsFormSubmitting(true);
            await onSubmit(registerInputs);
            setIsFormSubmitting(false);
            resetForm(); // Use the reset function here
        }
    };

    return {
        registerInputs,
        inputErrs,
        isFormSubmitting,
        registerOnchange,
        validateForm,
        handleRegisterFormSubmit,
        resetForm // Export the reset function
    };
};