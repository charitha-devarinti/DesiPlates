const SkeletonCard = () => {
    return ( 
        <div className="bg-white rounded-[32px] overflow-hidden shadow-sm border border-slate-100 flex flex-col h-full animate-pulse">
        {/*Image placeholder */}
        <div className="h-52 bg-slate-200"/>
        <div className="p-5 flex flex-col flex-1 gap-4">
            {/* ttile & price palceholder */}
            <div className="flex justify-between">
                <div className="h-6 w-32 bg-slate-200 rounded"/>
                <div className="h-6 w-12 bg-slate-200 rounded"/>
            </div>
            {/*badge placeholder */}
            <div className="h-6 w-24 bg-orange-50 rounded-full"/>
            {/*description */}
            <div className="space-y-2">
                <div className="h-3 w-full bg-slate-100 rounded"/>
                <div className="h-3 w-2/3 bg-slate-100 rounded"/>
            </div>
            {/*button placeholder */}
            <div className="mt-auto h-11 w-full bg-slate-200 rounded-2xl"/>
        </div>
        </div>
     );
}
 
export default SkeletonCard;