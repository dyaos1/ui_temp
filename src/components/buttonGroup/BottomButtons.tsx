import Link from "next/link";

const BottomButtons = () => {
    return (
        <div className="flex flex-row justify-end px-10">
            <button 
                className="mx-3 mt-1 hover:bg-slate-300 text-md rounded-md border-2 border-slate-300"
               
                >
                <div className="grid grid-cols-5 gap-1 mx-4 my-1">
                    <div className="col-span-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25M9 16.5v.75m3-3v3M15 12v5.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                        </svg>
                    </div>
                    <p className="text-left col-span-3">Excel</p>
                </div>
            </button>
            <button 
                className="mx-3 mt-1 hover:bg-slate-300 text-md rounded-md border-2 border-slate-300"
               
                >
                <div className="grid grid-cols-5 gap-1 mx-4 my-1">
                    <div className="col-span-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                        </svg>
                    </div>
                    <p className="text-left col-span-3">Print</p>
                </div>
            </button>
            <Link 
                className="mx-3 mt-1 hover:bg-slate-300 text-md rounded-md border-2 border-slate-300"
                href="/"
                >
                <div className="grid grid-cols-5 gap-1 mx-4 my-1">
                    <div className="col-span-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5.636 5.636a9 9 0 1 0 12.728 0M12 3v9" />
                        </svg>
                    </div>
                    <p className="text-left col-span-3">Close</p>
                </div>
            </Link>
        </div>
    )
}

export default BottomButtons;