interface SbjtListHeader2Props {
    year: number
}

const yearFormatter = (year: number) => {
    return `'${year.toString().slice(2,4)}`
}


const SbjtListHeader2 = ({ year }: SbjtListHeader2Props) => {
    return (
        <div className="grid grid-cols-10 text-center bg-slate-300 font-semibold items-center">
            <div className="col-span-6 grid grid-cols-12 items-center content-center">
                <div className="col-span-4">
                    세부사업/내역사업/세부과제<br/>
                    (예타 사업은 &quot;예타&quot; 표기)
                </div>
                <div className="col-span-2">
                    사업기간<br/>
                    (총사업비(국비))
                </div>
                <div className="col-span-3">
                    주관기관<br/>
                    (협약기간)
                </div>
                <div className="col-span-3">
                    국내참여기관<br/>
                    (5개 내외)
                </div>
            </div>
            <div className="col-span-4 grid grid-cols-6 items-center content-center">
                <div>{`${yearFormatter(year-1)}년\n까지`}</div>
                <div>{`${yearFormatter(year)}년\n예산`}</div>
                <div>{`${yearFormatter(year+1)}년\n요구`}</div>
                <div>{`${yearFormatter(year+2)}년\이후`}</div>
                <div>국가</div>
                <div>해외<br/>기관</div>
            </div>
        </div>
    )
}

export default SbjtListHeader2;