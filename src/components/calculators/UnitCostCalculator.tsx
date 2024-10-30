/* eslint-disable */
'use client'

import numberHandler from "@/utils/numberHandler"
import { rounderNumber } from "@/utils/rounder"
import { useEffect, useRef, useState } from "react"

// import numberHandler from "@/utils/numberHandler";
// import { useEffect, useRef, useState } from "react";
// import { HT_DataRow } from "@/data/ht_mapper";

// interface UnitCostCaluculatorParam {
//     payload: string
// }


const filter = (string: string|undefined|null) => {
    if (string === undefined || string === null ) {
        return ""
    }
    const filterRe = /(\d|,){1,}/
    const filtered = filterRe.exec(string)
    if (filtered) {
        return filtered[0].replace(",", "")
    } else {
        return ""
    }
}

const translator = (type: string ):  "신규" | "기일치" | "종료" | "계속" => {
    if (type ==="new") { return "신규" }
    if (type ==="concord") { return "기일치" }
    if (type ==="end") { return "종료" }
    if (type ==="continue") { return "계속" }
    throw Error("no type error")
}

const untrasnlator = (typeST: string): "new" | "concord" | "end" | "continue" => {
    if (typeST ==="신규") { return "new" }
    if (typeST ==="기일치") { return "concord" }
    if (typeST ==="종료") { return "end" }
    if (typeST ==="계속") { return "continue" }
    throw Error("no type error")

}

// const checkEul = (target: string) => {
//     //target의 마지막 음절의 유니코드(UTF-16) 
//     const charCode = target.charCodeAt(target.length - 1);

//     //유니코드의 한글 범위 내에서 해당 코드의 받침 확인
//     const consonantCode = (charCode - 44032) % 28;
    
//     if(consonantCode === 0){
//         //0이면 받침 없음 -> 를
//         return `${target}를`;
//     }
//     //1이상이면 받침 있음 -> 을
//     return `${target}을`;
// }

// eslint-disable-next-line
const rounder = (param: any) : string => {
    if (typeof(param) !== "string") {
        return ""
    }
    if (Number(param)) {
        return (Math.round(Number(param))).toString()
    } else {
        return ""
    }
}

interface UnitCostCalculatorProps {
    // eslint-disable-next-line
    setVisible: any

    dataState: UCCParam
    calculatorTarget: number

    // eslint-disable-next-line
    setUCState: any
}



interface UCCParam {
    total: number|null,
    new: {
        count: number|null,
        unitCost: number|null,
        months: number|null,
        sum: number|null,
        toString: string
    },
    concord: {
        count: number|null,
        unitCost: number|null,
        months: number|null,
        sum: number|null,
        toString: string
    },
    end: {
        count: number|null,
        unitCost: number|null,
        months: number|null,
        sum: number|null,
        toString: string
    },
    continue: {
        count: number|null,
        unitCost: number|null,
        months: number|null,
        sum: number|null,
        toString: string
    }
}



const UnitCostCalculator = ({ setVisible, dataState, calculatorTarget, setUCState }: UnitCostCalculatorProps) => {

    console.log(dataState)
    const [initialData, setInitialData] = useState(JSON.parse(JSON.stringify(dataState)))

    const [editable, ] = useState(false)
    const editableRef = useRef(editable)

    // eslint-disable-next-line
    const [newFormulaIndex, setFormulaNewIndex] = useState("")

    // \d{1,5}\s{0,1}개
    // x\s{0,1}(\d|,){1,}\s{0,1}백만
    // x\s{0,1}\d/\d{1,2}
    // =\s{0,1}(\d|,){1,}\s{0,1}백만
    // \(\w{0,4}\)

    type DataKeys = "new" | "concord" | "end" | "continue" 
    
    // eslint-disable-next-line
    const [typeST, setTypeST] = useState("")
    const [countST, setCountST] = useState("")
    const [unitCostST, setUnitCostST] = useState("")
    const [monthsST, setMonthsST] = useState("")
    const [sumST, setSumST] = useState("")


    // eslint-disable-next-line
    const onClickFormula = (e: any) => {
        const valueArr = e.currentTarget.dataset.value.split("-")
        const [type, index] = (valueArr.length > 1) ? valueArr : [ valueArr[0], "" ]
        if(index) { setFormulaNewIndex(index) }

        setCountST((dataState[type as DataKeys].count || "").toString())
        setUnitCostST((dataState[type as DataKeys].unitCost || "").toString())
        setMonthsST((dataState[type as DataKeys].months || "").toString())
        setSumST((dataState[type as DataKeys].sum || "").toString())

        setTypeST(translator(type))
    }

    const [newFormula, setNewFormula] = useState(false)

    const onClickNewFormula = () => {
        setCountST("")
        setUnitCostST("")
        setMonthsST("")
        setSumST("")
        setTypeST("신규")
        setNewFormula(true)
    }

    const onClickConfirm = () => {
        const newArrival = `${numberHandler(countST)}개 x ${numberHandler(rounder(unitCostST))}백만 x ${monthsST}/12\n = ${numberHandler(rounder(sumST))} 백만원`
        if(newFormula  && typeST === "신규") {
            // const newNew = [...dataState.new.toString, newArrival]
            // const newDataState = {...dataState}
            // newDataState["new"] = newNew
            // setDataState(newDataState)
            // setNewFormula(false)
        } else if(newFormula === false && typeST === "신규") {
            // const newDataState = {...dataState}
            // newDataState["new"][Number(newFormulaIndex)] = newArrival
            // setDataState(newDataState)
        } else {
            const newDataState = {...dataState}
            const type = untrasnlator(typeST)
            const typeToString = (typeST !== "신규") && (`(${typeST}) `)
            newDataState[type as DataKeys] = {
                count: Number(countST),
                unitCost: Number(rounder(unitCostST)),
                months: Number(monthsST),
                sum: Number(rounder(sumST)),
                toString: `${typeToString}${countST}개 x ${rounder(unitCostST)}백만 x ${monthsST}/12개월 = ${rounder(sumST)} 백만원`
            }
            setUCState(newDataState, calculatorTarget)
        }
    }

    const onClickApply = () => {
        setVisible(false)
        setInitialData(dataState)
    }

    const onClickClear = () => {
        setUCState(initialData, calculatorTarget)
        setCountST("")
        setUnitCostST("")
        setMonthsST("")
        setSumST("")
        setTypeST("")
    }

    const onClickClose = () => {
        onClickClear()
        setVisible(false)
    }

    useEffect(() => {
        try {
            if (editableRef.current) {
                const sumRef = (Number(countST.replace(",", ""))*Number(unitCostST.replace(",", ""))*Number(monthsST.replace(",", ""))/12).toString()
                setSumST(sumRef)
                editableRef.current = false
            }

        } catch {
            setSumST("")
        }
        
        }, [countST, unitCostST, monthsST]
    )

    useEffect(() => {
        try {
            if (editableRef.current)
            {
                const unitCostRef = (Number(sumST.replace(",", ""))/Number(countST.replace(",", ""))*Number(monthsST.replace(",", ""))/12).toString()
                setUnitCostST(unitCostRef)
                editableRef.current = false
            }
        } catch {

        }
    }, [sumST])


    return (
    <div className="fixed inset-0 z-50 w-full h-full flex flex-col justify-center items-center bg-gray-500 bg-opacity-80">
        <div className="w-4/6 px-3 py-5 h-full opacity-100 text-center bg-white">
            <div className="grid grid-cols-12 mb-1">
                <div className="col-start-12">
                    <button 
                        className="rounded-md border-1 border-solid my-1 p-2 w-full"
                        onClick={onClickClose}
                    >닫기</button>
                </div>
            </div>
            <div className="grid grid-cols-5">
                <div className="col-span-2 grid grid-rows-12">
                    <div className="row-span-1 border border-solid items-center content-center">
                        <div>수정전</div>
                    </div>
                    <div className="row-span-4 border border-solid grid grid-rows-5 p-2 ">
                        <div className="grid grid-cols-12 content-center">
                            <div className="col-span-3 p-1">구분</div>
                            <input className="col-span-9 border border-solid rounded p-1 mx-1"
                                value={typeST}
                                readOnly
                            />
                        </div>
                        <div className="grid grid-cols-12 content-center">
                            <div className="col-span-3 p-1">갯수</div>
                            <input 
                                className="col-span-9 border border-solid rounded p-1 mx-1"
                                value={countST}
                                onChange={(e) => {
                                    editableRef.current = true
                                    setCountST(e.target.value)
                                }}
                            />
                        </div>
                        <div className="grid grid-cols-12 content-center">
                            <div className="col-span-3 p-1">단가</div>
                            <input 
                                className="col-span-9 border border-solid rounded p-1 mx-1"
                                value={unitCostST}
                                onChange={(e) => {
                                    editableRef.current = true
                                    setUnitCostST(e.target.value)
                                }}
                            />
                        </div>
                        <div className="grid grid-cols-12 content-center">
                            <div className="col-span-3 p-1">기간</div>
                            <input 
                                className="col-span-9 border border-solid rounded p-1 mx-1"
                                value={monthsST}
                                onChange={(e) => {
                                    editableRef.current = true
                                    setMonthsST(e.target.value)
                                }}
                            />
                        </div>
                        <div className="grid grid-cols-12 content-center">
                            <div className="col-span-3 p-1">총액</div>
                            <input 
                                className="col-span-9 border border-solid rounded p-1 mx-1"
                                value={sumST}
                                onChange={(e) => {
                                    editableRef.current = true
                                    setSumST(e.target.value)
                                }}
                            />
                        </div>
                    </div>
                </div>
                <div className="col-span-1 grid grid-rows-10">
                    <div className="row-span-1"></div>
                    <div className="row-span-1 px-4 py-2">
                        <button 
                            className="w-full h-full rounded-lg border-solid border-1 border-blue-600"
                            onClick={onClickClear}
                        >초기화</button>
                    </div>
                    <div className="row-span-1 px-4 py-2">
                        <button 
                            className="w-full h-full rounded-lg border-solid border-1 border-blue-600"
                            onClick={onClickConfirm}
                        >{">>"}</button>
                    </div>
                    <div className="row-span-1 px-4 py-2">
                        <button 
                            className="w-full h-full rounded-lg border-solid border-1 border-blue-600"
                            onClick={onClickApply}
                        >적용</button>
                    </div>
                </div>
                <div className="col-span-2 grid grid-rows-12">
                    <div className="row-span-1 border border-solid items-center content-center">
                        <div>수정후</div>
                    </div>
                    <div className="row-span-11 border border-solid text-left p-1">
                        <div className="m-1">
                            신규과제
                        </div>
                        {
                            // 나중에 list type 으로 바꿀것
                            dataState.new.toString
                            // (<div data-value={"new"}></div>)
                        }
                        <div 
                            className="p-2 hover:cursor-pointer hover:bg-cyan-100"
                            onClick={onClickNewFormula}
                        > </div>
                        <div className="m-1">
                            계속과제
                        </div>
                        <div 
                            className="m-1 hover:bg-cyan-100 hover:cursor-pointer text-left" 
                            data-value={"concord"}
                            onClick={onClickFormula}
                        >
                            {dataState.concord.toString}
                        </div>
                        <div 
                            className="m-1 hover:bg-cyan-100 hover:cursor-pointer text-left" 
                            data-value={"continue"}
                            onClick={onClickFormula}
                        >
                            {dataState.continue.toString}
                        </div>
                        <div 
                            className="m-1 hover:bg-cyan-100 hover:cursor-pointer text-left" 
                            data-value={"end"}
                            onClick={onClickFormula}
                        >
                            {dataState.end.toString}
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    </div>
        
    )
}

export default UnitCostCalculator;
