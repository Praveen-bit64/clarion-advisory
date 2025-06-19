import { compo } from "../types/components/globalComponent";

const GlobalContainer = (props: compo) => {
    const { children, className = '' } = props
    return (
        <div className={`${className} w-[90%] h-auto`}>{children}</div>
    );
}

export default GlobalContainer;