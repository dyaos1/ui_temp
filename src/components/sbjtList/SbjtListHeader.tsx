const SbjtListHeader = () => {
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
                <div>&apos;20년<br/>까지</div>
                <div>&apos;21년<br/>예산</div>
                <div>&apos;22년<br/>요구</div>
                <div>&apos;23년<br/>이후</div>
                <div>국가</div>
                <div>해외<br/>기관</div>
            </div>
        </div>
    )
}

export default SbjtListHeader;