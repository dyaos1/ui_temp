interface HTHeaderProps {
    year: number
}

const HTHeader = ({ year }: HTHeaderProps) => {
    return (
        <div>
            <div className="grid grid-cols-12 text-center items-center bg-slate-300 p-1 font-semibold">
                <div className="col-span-2">
                    사업명
                </div>

                <div className="col-span-2">
                    {`${year-1}년`}
                </div>

                <div className="col-span-2">
                    {`${year}년`}
                </div>

                <div className="col-span-4 grid grid-cols-2">
                    <div className="col-span-2">
                        {`${year+1}년`}
                    </div>
                    <div className="col-span-1">
                        한도내
                    </div>
                    <div className="col-span-1">
                        한도외
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

export default HTHeader;