// components/Loader.tsx
import React from "react";
import {
    Oval,
    Bars,
    ThreeDots,
    Puff,
    Rings,
    TailSpin,
    RotatingLines,
    ProgressBar,
} from "react-loader-spinner";

type LoaderType =
    | "oval"
    | "bars"
    | "dots"
    | "puff"
    | "rings"
    | "spin"
    | "progressbar"
    | "rotate";

type LoaderVariant = "inline" | "block" | "fullscreen";

interface LoaderProps {
    type?: LoaderType;
    color?: string;
    height?: number;
    width?: number;
    show?: boolean;
    variant?: LoaderVariant;
    className?: string; // optional extra Tailwind classes
}

const Loader: React.FC<LoaderProps> = ({
    type = "oval",
    color = "#4fa94d",
    height = 40,
    width = 40,
    show = true,
    variant = "block",
    className = "",
}) => {
    if (!show) return null;

    const commonProps = {
        color,
        height,
        width,
        visible: true,
    };

    const loaderMap: Record<LoaderType, React.ReactNode> = {
        oval: <Oval {...commonProps} secondaryColor={color} strokeWidth={2} />,
        bars: <Bars {...commonProps} />,
        dots: <ThreeDots {...commonProps} />,
        puff: <Puff {...commonProps} />,
        rings: <Rings {...commonProps} />,
        progressbar: <ProgressBar {...commonProps} />,
        spin: <TailSpin {...commonProps} />,
        rotate: (
            <RotatingLines
                strokeColor={color}
                strokeWidth="5"
                animationDuration="0.75"
                width={width.toString()}
                visible
            />
        ),
    };

    const wrapperClass = {
        inline: `inline-flex items-center justify-center ${className}`,
        block: `flex items-center justify-center w-full ${className}`,
        fullscreen: `fixed inset-0 z-50 bg-white bg-opacity-80 flex items-center justify-center ${className}`,
    }[variant];

    return <div className={wrapperClass}>{loaderMap[type]}</div>;
};

export default Loader;
