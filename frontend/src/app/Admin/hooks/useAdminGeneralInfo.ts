import { useSiteInfo } from "@/app/context/SiteInfoContext"
import { useState } from "react"

interface siteInfo {
    siteName:string,
    siteLogo:File | null
}
interface siteInfoErr {
    siteName?:string,
    siteLogo?:string
}
export const useAdminGeneralInfo = () => {
    const {siteInfo} = useSiteInfo()
    const [generalValues,setGeneralValues] = useState<siteInfo>({
        siteName:`${siteInfo?.siteName}`,
        siteLogo:null
    })
    const [generalErros,setGeneralErros] = useState<siteInfoErr>({})
    const [isGeneralInfoSubmitting,setGeneralInfoSubmitting] = useState(false)

    const GeneralInfoValidate = (vals:siteInfo) => {
        const errs:siteInfoErr = {}
        //checks site name
        if(!vals.siteName.trim()) {
            errs.siteName = 'Site Name is Required'
        }else if(vals.siteName.length < 3){
            errs.siteName = 'Site Name is more than 3 Characters'
        }
        //checks site logo
       if (!vals.siteLogo) {
        errs.siteLogo = 'Site Logo is Required';
        } else if (!['image/jpeg', 'image/png', 'image/webp'].includes(vals.siteLogo.type)) {
        errs.siteLogo = 'Only PNG, JPG, or WEBP formats are allowed';
        }


        return errs;
    }

    const handleGeneralInfoChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        const {name,value,files} = e.target
        if(name === 'siteLogo'){
            setGeneralValues((prev) => ({
                ...prev,
                siteLogo:files ? files[0] : null
            }))
        }else {
            setGeneralValues((prev) => ({
                ...prev,
                [name]:value
            }))
        }
    }

    const handleOnGeneralInfoSubmit = async (onSuccess:(vals:siteInfo) => void) => {
        const validationErrs = GeneralInfoValidate(generalValues)
        setGeneralErros(validationErrs)

        if(Object.keys(validationErrs).length === 0) {
            setGeneralInfoSubmitting(true)
            await onSuccess(generalValues)
            setGeneralInfoSubmitting(false)
        }
    }

    return {
        generalValues,
        generalErros,
        isGeneralInfoSubmitting,
        handleGeneralInfoChange,
        handleOnGeneralInfoSubmit
    }
}