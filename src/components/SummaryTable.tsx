const SummaryTable = () => {
    return (
        <div className="px-5 pt-2 pb-5">
            <div className="grid grid-cols-10 p-1 text-center bg-slate-300 font-bold">
                <div className="col-span-4">사업명</div>
                <div className="col-span-3">2023 예산</div>
                <div className="col-span-3">2024 예산</div>
            </div>

            <div className="grid grid-cols-10 p-1 text-center font-semibold">
                <div className="col-span-4">소재부품기술개발</div>
                <div className="col-span-3">707,790</div>
                <div className="col-span-3">560,000</div>
            </div>


            <div className="grid grid-cols-10 p-1">
                <div className="col-span-4" style={{transform: "translateX(45%)"}}>- 소재부품패키지형</div>
                <div className="col-span-3 text-center">602,160</div>
                <div className="col-span-3 text-center">466,667</div>
            </div>


            <div className="grid grid-cols-10 p-1">
                <div className="col-span-4" style={{transform: "translateX(45%)"}}>- 소재부품이종기술융합형</div>
                <div className="col-span-3 text-center">86,991</div>
                <div className="col-span-3 text-center">93,333</div>
            </div>
        </div>
    )
}

export default SummaryTable