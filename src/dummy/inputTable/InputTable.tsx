const InputTable = () => {
    return(
        <div className="mx-5 mt-2 mb-5">
            <div className="grid grid-cols-12 text-center bg-slate-300 font-semibold">
                <div className="col-span-2">사업명</div>
                <div className="col-span-5">수정전</div>
                <div className="col-span-5">수정후</div>
            </div>

            <div className="grid grid-cols-12 text-center font-semibold">
                <div className="col-span-2">소재부품기술개발</div>
                <div className="col-span-5 grid grid-cols-4 gap-4">
                    <div className="col-start-2 text-right">요구금액</div>
                    <div className="text-left">8,681</div>
                    <div></div>
                </div>
                <div className="col-span-5 grid grid-cols-4">
                    <div className="col-start-2 text-right mx-2">요구금액</div>
                    <input className="text-left box-border w-full px-2 border border-solid border-black" value={0} />
                    <div></div>
                </div>
            </div>
            <div className="grid grid-cols-12 text-center">
                <div className="col-span-2 p-1">소재부품패키지형</div>
                <div className="col-span-5 grid grid-cols-9 text-sm p-1">
                    <div className="col-span-1">신규</div>
                    <div className="col-span-2 grid grid-cols-3">
                        <div className="col-span-1 text-right mx-1">개수:</div>
                        <div className="col-span-2 text-left mx-1">0개</div>
                    </div>
                    <div className="col-span-2 grid grid-cols-3">
                        <div className="col-span-1 text-right mx-1">단가:</div>
                        <div className="col-span-2 text-left mx-1">0백만원</div>
                    </div>
                    <div className="col-span-2 grid grid-cols-3">
                        <div className="col-span-1 text-right mx-1">개월:</div>
                        <div className="col-span-2 text-left mx-1">0/12</div>
                    </div>
                    <div className="col-span-2 grid grid-cols-3">
                        <div className="col-span-1 text-right mx-1">총액:</div>
                        <div className="col-span-2 text-left mx-1">0백만원</div>
                    </div>
                </div>
                <div className="col-span-5">
                    
                </div>
            </div>

        </div>
    )
}

export default InputTable