'use client'

import { useEffect, useRef, useState } from "react";

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


interface UnitCostCalProps {
    payload: string
    // eslint-disable-next-line
    setVisible: any
    // eslint-disable-next-line
    setPayload: any
}

const UnitCostCalculator = ( { payload, setVisible, setPayload} : UnitCostCalProps ) => {

    // \d{1,5}\s{0,1}개
    // x\s{0,1}(\d|,){1,}\s{0,1}백만
    // x\s{0,1}\d/\d{1,2}
    // =\s{0,1}(\d|,){1,}\s{0,1}백만

    const [description, setDesc] = useState("단가계산기 입니다. 입력후 확인을 누르세요.")
    const [editable, setEditable] = useState(true)
    const editableRef = useRef(editable)

    const countRe = /\d{1,5}\s{0,1}개/g;
    const [count, setCount] = useState(
        filter(countRe.exec(payload)?.[0])
    )
    // eslint-disable-next-line
    const countOC = (e: any) => {
        setCount(e.target.value)
    }

    const unitCostRe = /x\s{0,1}(\d|,){1,}\s{0,1}백만/g
    const [unitCost, setUnitCost] = useState(
        filter(unitCostRe.exec(payload)?.[0])
    )
    // eslint-disable-next-line
    const unitCostOC = (e: any) => {
        setUnitCost(e.target.value)
    }

    const monthsRe = /x\s{0,1}\d{1,2}\/\d{1,2}/g
    const [months, setMonths] = useState(
        filter(monthsRe.exec(payload)?.[0])
    )
    // eslint-disable-next-line
    const monthsOC = (e: any) => {
        setMonths(e.target.value)
    }

    const sumRe = /=\s{0,1}(\d|,){1,}\s{0,1}백만/g
    const [sum, setSum] = useState(
        filter(sumRe.exec(payload)?.[0])
    )
    // eslint-disable-next-line
    const sumOC = (e: any) => {
        setSum(e.target.value)
    }

    useEffect(() => {
        if (Number(count)) {
            setDesc("갯수를 입력하세요")
            editableRef.current = true
        } else {
            setDesc("유효한 숫자를 입력해 주세요.")
            editableRef.current = false
        }
    }, [count])

    useEffect(() => {
        if (Number(unitCost)) {
            setDesc("단가를 입력하세요")
            editableRef.current = true
        } else {
            setDesc("유효한 숫자를 입력해 주세요.")
            editableRef.current = false
        }
    }, [unitCost])

    useEffect(() => {
        if (Number(months) && 0 < Number(months) && Number(months) < 13 ) {
            setDesc("개월을 입력하세요")
            editableRef.current = true
        } else {
            setDesc("유효한 숫자를 입력해 주세요.")
            editableRef.current = false
        }
    }, [months])

    useEffect(() => {
        if (Number(sum)) {
            setDesc("갯수를 입력하세요")
            setEditable(true)
            editableRef.current = true
        } else {
            setDesc("유효한 숫자를 입력해 주세요.")
            editableRef.current = false
        }
    }, [sum])

    useEffect(() => {
        if(editableRef.current) {
            editableRef.current = false
            setSum((Number(count) * Number(unitCost) * Number(months) / 12).toString())
        }
    }, [count, unitCost, months])

    useEffect(() => {
        if(editableRef.current) {
            editableRef.current = false
            setUnitCost((Number(sum) / Number(count) / Number(months) * 12).toString())
        }
    }, [count, months, sum])

    const confirm = () => {
        return `${count}개 x ${unitCost}백만 x ${months}/12 = ${sum} 백만원`
    }

    return (
        <div className="grid grid-cols-5 w-80 text-center">
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
                onClick={()=>{setPayload(confirm())}}
            > 확인</button>

            <div className="text-base font-light font-sans col-span-4">
                {description}
            </div>
            <button
                onClick={() => (setVisible(false))}
            >닫기</button>
        </div>
    )
}

export default UnitCostCalculator;
