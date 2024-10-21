'use client'

import numberHandler from "@/utils/numberHandler";
import { useEffect, useRef, useState } from "react";
import { HT_DataRow } from "@/data/ht_mapper";

// interface UnitCostCaluculatorParam {
//     payload: string
// }

const filter = (string: string|undefined|null) => {
    if (string === undefined || string === null ) {
        return ""
    }
    const filterRe = /(\d{1,})/g
    const filtered = filterRe.exec(string)
    if (filtered) {
        return filtered[0]
    } else {
        return ""
    }
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


interface UnitCostCalProps {
    payload: string
    // eslint-disable-next-line
    setVisible: any

    rowCount: number
    HT: HT_DataRow[]
    // eslint-disable-next-line
    setHT: any
}

const UnitCostCalculator = ( { payload, setVisible, setHT, HT, rowCount} : UnitCostCalProps ) => {

    // \d{1,5}\s{0,1}개
    // x\s{0,1}(\d|,){1,}\s{0,1}백만
    // x\s{0,1}\d/\d{1,2}
    // =\s{0,1}(\d|,){1,}\s{0,1}백만
    // \(\w{0,4}\)

    const [description, setDesc] = useState("")
    const [editable, setEditable] = useState(true)
    const editableRef = useRef(editable)

    const [editableSum, setEditableSum] = useState(true)
    const editableSumRef = useRef(editableSum)
    

    const countRe = /\d{1,5}\s{0,1}개/g;
    const [count, setCount] = useState(
        filter(countRe.exec(payload)?.[0])
    )
    // eslint-disable-next-line
    const countOC = (e: any) => {
        setCount(e.target.value)
        setEditable(true)
        editableRef.current = true
    }

    const unitCostRe = /x\s{0,1}(\d|,){1,}\s{0,1}백만/g
    const [unitCost, setUnitCost] = useState(
        filter(unitCostRe.exec(payload)?.[0])
    )
    // eslint-disable-next-line
    const unitCostOC = (e: any) => {
        setUnitCost(e.target.value)
        setEditable(true)
        editableRef.current = true
    }

    const monthsRe = /x\s{0,1}\d{1,2}\/\d{1,2}/g
    const [months, setMonths] = useState(
        filter(monthsRe.exec(payload)?.[0])
    )
    // eslint-disable-next-line
    const monthsOC = (e: any) => {
        setMonths(e.target.value)
        setEditable(true)
        editableRef.current = true
    }

    const sumRe = /=\s{0,1}(\d|,){1,}\s{0,1}백만/g
    const [sum, setSum] = useState(
        filter(sumRe.exec(payload)?.[0])
    )
    // eslint-disable-next-line
    const sumOC = (e: any) => {
        setSum(e.target.value)
        setEditableSum(true)
        editableSumRef.current = true
    }

    useEffect(() => {
        setDesc("단가계산기 입니다. 입력후 확인을 누르세요.")
    }, [])

    useEffect(() => {
        if (Number(count) && Number(unitCost) && Number(months) && Number(sum)) {
            if( Number(months) < 1 || 12 < Number(months) ) {
                setDesc("유효한 개월 수를 입력하세요(1~12사이)")
            }
        } else {
            setDesc("유효한 숫자를 입력하세요")
        }
    }, [count, unitCost, months, sum])

    // useEffect(() => {
    //     if (Number(unitCost)) {
    //         setDesc("단가를 입력하세요")
    //         editableRef.current = true
    //     } else {
    //         setDesc("유효한 숫자를 입력해 주세요.")
    //         editableRef.current = false
    //     }
    // }, [unitCost])

    // useEffect(() => {
    //     if (Number(months) && 0 < Number(months) && Number(months) < 13 ) {
    //         setDesc("개월을 입력하세요")
    //         editableRef.current = true
    //     } else {
    //         setDesc("유효한 숫자를 입력해 주세요.")
    //         editableRef.current = false
    //     }
    // }, [months])

    // useEffect(() => {
    //     if (Number(sum)) {
    //         setDesc("총액을 입력하세요")
    //         setEditable(true)
    //         editableSumRef.current = true
    //     } else {
    //         setDesc("유효한 숫자를 입력해 주세요.")
    //         editableSumRef.current = false
    //     }
    // }, [sum])

    useEffect(() => {
        if(editableRef.current) {
            setSum(rounder((Number(count) * Number(unitCost) * Number(months) / 12).toString()))
            editableRef.current = false
        }
    }, [count, unitCost, months])

    useEffect(() => {
        if(editableSumRef.current) {
            setUnitCost(rounder((Number(sum) / Number(count) / Number(months) * 12).toString()))
            editableSumRef.current = false
        }
    }, [count, months, sum])

    const confirm = () => {
        const headerRe = /\(.{0,4}\)/;
        const header = headerRe.test(payload) ? headerRe.exec(payload)?.[0] + " " : ""

        HT[rowCount].updated = `${header}${count}개 x ${numberHandler(unitCost)}백만 x ${months}/12 = ${numberHandler(sum)} 백만원`
        setHT(HT)
        setVisible(false)
    }

    return (
    <div className="fixed inset-0 z-50 w-full h-full flex justify-center items-center bg-gray-500 bg-opacity-80">
        <div className="grid grid-cols-5 w-80 opacity-100 text-center bg-white">
            <div className="">갯수</div>
            <div className="">단가</div>
            <div className="">개월</div>
            <div className="">총액</div>
            <div></div>

            <input className="text-center" value={count} 
                onChange={countOC} 
                onClick={() => { setDesc("갯수를 입력하세요") }}/>
            <input className="text-center" value={unitCost} 
                onChange={unitCostOC} 
                onClick={() => { setDesc("단가를 입력하세요") }} />
            <input className="text-center" value={months} 
                onChange={monthsOC}
                onClick={() => { setDesc("개월를 입력하세요") }} />
            <input className="text-center" value={sum} 
                onChange={sumOC}
                onClick={() => { setDesc("총액를 입력하세요") }} />
            <button
                onClick={()=>{console.log(confirm())}}
            > 확인</button>

            <div className="text-base font-light font-sans col-span-4">
                {description}
            </div>
            <button
                onClick={() => (setVisible(false))}
            >닫기</button>
        </div>
    </div>
        
    )
}

export default UnitCostCalculator;
