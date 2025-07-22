// components/EditModeToggle.tsx
import { MdEditNote, MdOutlineEditOff } from "react-icons/md";

interface Props {
    isEditMode: boolean;
    toggle: () => void;
}

const EditModeToggle = ({ isEditMode, toggle }: Props) => {
    return (
        <div
            onClick={toggle}
            className={`relative w-40 h-12 flex items-center rounded-full cursor-pointer transition-all duration-300 overflow-hidden
        ${isEditMode ? 'bg-orange-400' : 'bg-blue-500'}
      `}
        >
            {/* Text */}
            <div className="w-full flex justify-between px-4 text-white text-sm font-medium">
                <span className={`transition-opacity ${isEditMode ? 'opacity-100' : 'opacity-0'}`}>
                    Edit ON
                </span>
                <span className={`transition-opacity ${isEditMode ? 'opacity-0' : 'opacity-100'}`}>
                    Edit OFF
                </span>
            </div>

            {/* Toggle circle */}
            <div
                className={`absolute w-8 h-8 bg-white rounded-full shadow-md transition-all duration-300
          ${isEditMode ? 'left-[calc(100%-36px)]' : 'left-2'}
        `}
            >
                {isEditMode ? (
                    <MdEditNote className="text-orange-500 w-5 h-5 mx-auto mt-1.5" />
                ) : (
                    <MdOutlineEditOff className="text-blue-600 w-5 h-5 mx-auto mt-1.5" />
                )}
            </div>
        </div>
    );
};

export default EditModeToggle;
