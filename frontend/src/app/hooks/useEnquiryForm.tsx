import { ChangeEvent, useState } from "react";

interface inputs {
    name: string;
    phone: string | number;
    email?: string | null;
    company?: string | null;
    message?: string | null;
}

interface inputErrs {
    name?: string;
    phone?: string | number;
    email?: string | null;
    company?: string | null;
    message?: string | null;
}

export const useEnquiryForm = () => {
    const [enquiryInputs, setEnquiryInputs] = useState<inputs>({
        name: "",
        phone: "",
        email: null,
        company: null,
        message: null,
    });

    const [enquiryInputErrs, setEnquiryInputErrs] = useState<inputErrs | null>(null);
    const [isEnquirySubmitting, setIsEnquirySubmitting] = useState(false);

    const validateEnquiry = (vals: inputs) => {
        const inputErrs: inputErrs = {};

        if (!vals?.name) inputErrs.name = "Enter Your Name";
        else if (vals.name.length > 80) inputErrs.name = "Enter a Valid Name";

        if (!vals.phone) inputErrs.phone = "Enter Phone";
        else if (String(vals?.phone).length > 15) inputErrs.phone = "Enter valid Phone";

        if (vals?.company && vals?.company?.length > 120)
            inputErrs.company = "Enter a Valid Company";

        if (vals?.email && vals?.email?.length > 80)
            inputErrs.email = "Enter a Valid Email";

        return inputErrs;
    };

    const onChangeEnquiryInputs = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setEnquiryInputs((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const onEnquirySubmit = async (onSubmit: (vals: inputs) => void) => {
        const validateerrs = validateEnquiry(enquiryInputs);
        setEnquiryInputErrs(validateerrs); // ✅ Important!

        if (Object.entries(validateerrs).length === 0) {
            setIsEnquirySubmitting(true);
            await onSubmit(enquiryInputs);
            setIsEnquirySubmitting(false);
            setEnquiryInputs({
                name: "",
                phone: "",
                email: "",
                company: "",
                message: "",
            });
        }
    };

    return {
        enquiryInputs,
        enquiryInputErrs,
        isEnquirySubmitting,
        validateEnquiry,
        onChangeEnquiryInputs,
        onEnquirySubmit,
    };
};
