import { MdSearchOff } from "react-icons/md";

const NoResults = () => {
    return (
        <div className="w-full flex flex-col justify-center items-center py-16 px-4 text-center">
            <MdSearchOff className="text-6xl text-gray-400 mb-4" />
            <h2 className="text-xl font-semibold text-gray-700 mb-2">No Properties Found</h2>
            <p className="text-sm text-gray-500 max-w-md">
                We couldn’t find any properties matching your current filters. Try adjusting your filters or searching in a different location.
            </p>
        </div>
    );
};
export default NoResults;