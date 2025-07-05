import { useSocialData } from "@/app/context/SocialLinksContext"
import { useState } from "react"

interface socialLinks {
    insta?:string,
    twitter?:string,
    linkedin?:string,
    facebook?:string,
}
interface socialErrs {
    insta?:string,
    twitter?:string,
    linkedin?:string,
    facebook?:string,
}
export const useSocailLinks = () => {
    const {socialData} = useSocialData()
    const [socialLinks,setSocialLinks] = useState<socialLinks>({
        insta:`${socialData?.insta}`,
        twitter:`${socialData?.twitter}`,
        linkedin:`${socialData?.linkedin}`,
        facebook:`${socialData?.facebook}`
    })

    const [socialErrs,setSocialErrs] = useState<socialErrs | null>(null)
    const [isSocialSubmitting,setIsSocialSubmitting] = useState(false)

    const validateSocialLinks = (links: socialLinks): socialErrs => {
            const errors: socialErrs = {};

            const validators: Record<keyof socialLinks, RegExp> = {
                facebook: /^https?:\/\/(www\.)?facebook\.com\/[A-Za-z0-9_.-]+\/?$/,
                insta: /^https?:\/\/(www\.)?instagram\.com\/[A-Za-z0-9_.-]+\/?$/,
                twitter: /^https?:\/\/(www\.)?twitter\.com\/[A-Za-z0-9_.-]+\/?$/,
                linkedin: /^https?:\/\/(www\.)?linkedin\.com\/in\/[A-Za-z0-9_-]+\/?$/,
                // youtube: /^https?:\/\/(www\.)?youtube\.com\/(channel|user|@)?\/?[A-Za-z0-9_-]+\/?$/,
            };

            for (const platform in links) {
                const value = links[platform as keyof socialLinks];
                const validator = validators[platform as keyof socialLinks];

                if (value && !validator.test(value)) {
                errors[platform as keyof socialErrs] = `Invalid ${platform} URL`;
                }
            }

        return errors;
        }

        const onChangeSocialHandler = (e:React.ChangeEvent<HTMLInputElement>) => {
            const {name,value} = e.target

            setSocialLinks((prev) => ({
                ...prev,
                [name]:value
            }))
        }

        const handleSocialSubmit = async (onSocialSubmit:(vals:socialLinks) => void) => {
            const validateErrs = validateSocialLinks(socialLinks)
            setSocialErrs(validateErrs)

            if(Object.keys(validateErrs).length === 0) {
                setIsSocialSubmitting(true)
                await onSocialSubmit(socialLinks)
                setIsSocialSubmitting(false)
            }
        }

        return {
            socialLinks,
            socialErrs,
            isSocialSubmitting,
            onChangeSocialHandler,
            handleSocialSubmit
        }
}