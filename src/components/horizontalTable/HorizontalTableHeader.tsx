const HorizontalTableHeader = () => {

    return (
        <div>
            <div className="grid grid-cols-12 text-center items-center bg-slate-300 p-1 font-semibold">
                <div className="col-span-2">
                    사업명
                </div>

                <div className="col-span-2">
                    2023
                </div>

                <div className="col-span-2">
                    2024
                </div>

                <div className="grid grid-cols-2 col-span-4">
                    <div className="col-span-2">
                        2025
                    </div>
                    <div className="col-span-1">
                        수정전
                    </div>
                    <div className="col-span-1">
                        수정후
                    </div>

                </div>

                <div className="col-span-1">
                    증감
                </div>

                <div className="col-span-1">
                    %
                </div>
            </div>
        </div>
    )
}

export default HorizontalTableHeader;