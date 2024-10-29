'use client'

import { rounderNumber, rounderNumberTwo } from "@/utils/rounder"
import { useEffect, useRef, useState } from "react"

interface DashboardDisplay {
    se: {
        name: string,
        in: {
            amount: number|null
        }
        out: {
            amount: number|null
        }
    }
    ne: {
        name: string,
        in: {
            amount: number|null,
            new: {
                count: number|null,
                sum: number|null,
                unitCost: number|null
            },
            continuous: {
                count: number|null,
                sum: number|null,
                unitCost: number|null
            },
            weight: number|null
        },
        out: {
            amount: number|null,
            new: {
                count: number|null,
                sum: number|null,
                unitCost: number|null
            },
            continuous: {
                count: number|null,
                sum: number|null,
                unitCost: number|null
            },
            weight: number|null
        }
    }[]
}

interface DashboardProps {
    dashboardData: DashboardDisplay

    // eslint-disable-next-line
    setDashboardData: any
}

const TempDashboard = ({ dashboardData, setDashboardData }: DashboardProps) => {

    const [seInAmount, setSeInAmount] = useState((dashboardData.se.in.amount)?.toString() || "")
    // eslint-disable-next-line
    const onChangeSeInAmount = (e: any) => {
        const demand: string = e.target.value
        if (Number(demand) || demand == "") {
            const initialValue = (seInAmount !== "" && Number(seInAmount)) ? Number(seInAmount) : 0
            setSeInAmount(demand)
        }
    }

    const [neInAmounts, setNeInAmount] = useState(dashboardData.ne.map(e => { return { amount: e.in.amount, weight: e.in.weight }}))
    // eslint-disable-next-line
    const onChangeNeInAmounts = (e: any) => {
        const demand: string = e.target.value
        const temp = [...neInAmounts]

        if(Number(demand) || demand == "") {       
            const idx = Number(e.currentTarget.dataset.value)
            console.log(idx)
            
            temp[idx].amount = Number(e.target.value)
            setNeInAmount(temp)
        }
    }

    // 세부사업 요구금액 변경시
    useEffect(() => {
        const temp = [...neInAmounts]
        
        temp.map((e, i) => {
            if(Number(seInAmount)) {
                temp[i].amount = (Number(seInAmount) * Number(e.weight))
            } else if (seInAmount == "") {
                temp[i].amount = null
            }
        } )
        setNeInAmount(temp)
    }, [seInAmount])

    const [neInUnitValues, setNeInUnitValues] = useState(
        dashboardData.ne.map(e => { 
            return {
                new: {
                    count: e.in.new.count,
                    sum: e.in.new.sum,
                    unitCost: e.in.new.unitCost
                }, 
                continuous: {
                    count: e.in.continuous.count,
                    sum: e.in.continuous.sum,
                    unitCost: e.in.continuous.unitCost
                }
            }
        })
    )

    // 
    const justEditted = useRef("")

    //eslint-disable-next-line
    const onChangeNeInUnitValues = (e: any) => {
        if(Number(e.target.value) || e.target.value === "") {
            const changed = e.currentTarget.dataset.value 

            const idx: number = Number(changed.split("-")[0])
            const aaa: "new"|"continuous" = changed.split("-")[1]
            const bbb: "count"|"sum"|"unitCost"  = changed.split("-")[2]

            justEditted.current = changed

            const temp = [
                ...neInUnitValues
            ]
            temp[idx][aaa][bbb] = Number(e.target.value)
            setNeInUnitValues(temp)
        }
    }

    // 내역사업 요구금액 변경시
    useEffect(() => {
        const temp = [...neInAmounts]
        const temp2 = [...neInUnitValues]
        temp.map((e, i) => {
            const denominator = e.amount || 0
            const numerator = (denominator || 0) - (temp2[i].continuous.sum || 0)
            if (denominator > 0) {
                const weight = numerator/denominator!
                temp2[i].new.sum = rounderNumber(weight * (denominator || 0))
                temp2[i].continuous.sum = rounderNumber(denominator - (temp2[i].new.sum || 0))
            } else if (denominator === 0) {
                temp2[i].new.sum = 0
                temp2[i].continuous.sum = 0
            }
        })
        setNeInUnitValues(temp2)
    }, [neInAmounts])

    // 단가 산식 변경시
    useEffect(() => {
        const temp = [...neInUnitValues]

        if (justEditted.current.split("-").length > 0) {
            const idx: number = Number(justEditted.current.split("-")[0])
            const aaa: "new"|"continuous" = justEditted.current.split("-")[1] as "new"|"continuous"
            const bbb: "count"|"sum"|"unitCost"  = justEditted.current.split("-")[2] as "count"|"sum"|"unitCost"

            if (bbb === "sum") {
                const sum = neInAmounts[idx].amount
                const opposite = temp[idx][aaa][bbb]
                const target: "new"|"continuous" = (aaa==="new") ? "continuous" : "new"
                temp[idx][target].sum = (sum||0)-(opposite||0)
            }
            justEditted.current = ""
        }

        temp.map((e, i) => {
            temp[i].new.unitCost = (e.new.count) 
                ? Number(((e.new.sum || 0) / e.new.count).toFixed(1))
                : 0
            temp[i].continuous.unitCost = (e.continuous.count) 
                ? Number(((e.continuous.sum || 0) / e.continuous.count).toFixed(1))
                : 0
        })
        setNeInUnitValues(temp)
    }, [neInUnitValues])

    return (
        <div className="mx-5 mt-2 mb-5">
            <div className="grid grid-cols-5 bg-slate-300 text-center items-center font-semibold p-1">
                <div className="col-span-1">사업명</div>
                <div className="col-span-2">실링금액</div>
                <div className="col-span-2">한도외</div>
            </div>

            <div className="grid grid-cols-5 text-center items-center font-semibold bg-slate-100 p-1">
                <div className="col-span-1">{dashboardData.se.name}</div>
                <div className="col-span-2">
                    <div className="p-1 justify-center items-center content-center text-center">
                        <input 
                            className=""
                            value={seInAmount}
                            onChange={onChangeSeInAmount}
                        />
                    </div>
                </div>
                <div className="col-span-2">

                </div>
            </div>
            {
                dashboardData.ne.map((e, i) => (
                    <div className="text-center items-center" key={e.name + i}>
                        <div className="grid grid-cols-5 bg-slate-100 p-1">
                            <div className="col-span-1">
                                {e.name}
                            </div>
                            <div className="col-span-2 grid grid-rows-3 text-left">
                                <div className="justify-center items-center content-center text-center">
                                    <input 
                                        className=""
                                        data-value={i}
                                        value={neInAmounts[i].amount||0}
                                        onChange={onChangeNeInAmounts}
                                    />
                                </div>
                                <div className="grid grid-cols-7 p-1">
                                    <div className="col-span-1">신규</div>
                                    <div className="col-span-1 px-1 text-right">갯수:</div>
                                    <input 
                                        className="col-span-1 px-1"
                                        value={neInUnitValues[i].new.count || ""}
                                        data-value={`${i}-new-count`}
                                        onChange={onChangeNeInUnitValues}
                                    />
                                    <div className="col-span-1 px-1 text-right">총액:</div>
                                    <input 
                                        className="col-span-1" 
                                        value={neInUnitValues[i].new.sum || ""}
                                        data-value={`${i}-new-sum`}
                                        onChange={onChangeNeInUnitValues}
                                    />
                                    <div className="col-span-1 px-1 text-right">평단가:</div>
                                    <input 
                                        className="col-span-1" 
                                        value={neInUnitValues[i].new.unitCost || ""}
                                        data-value={`${i}-new-unitCost`}
                                        onChange={onChangeNeInUnitValues}
                                    />
                                </div>
                                <div className="grid grid-cols-7 p-1">
                                    <div className="col-span-1">계속</div>
                                    <div className="col-span-1 px-1 text-right">갯수:</div>
                                    <div className="col-span-1 px-1 text-left">
                                        {neInUnitValues[i].continuous.count}
                                    </div>
                                    <div className="col-span-1 px-1 text-right">총액:</div>
                                    <input 
                                        className="col-span-1" 
                                        value={neInUnitValues[i].continuous.sum || ""}
                                        data-value={`${i}-continuous-sum`}
                                        onChange={onChangeNeInUnitValues}
                                    />
                                    <div className="col-span-1 px-1 text-right">평단가:</div>
                                    <input 
                                        className="col-span-1" 
                                        value={neInUnitValues[i].continuous.unitCost || ""}
                                        data-value={`${i}-continuous-unitCost`}
                                        onChange={onChangeNeInUnitValues}
                                    />
                                </div>
                            </div>
                            <div className="col-span-2"></div>
                        </div>
                    </div>
                    
                ))

            }
            <p>
                (설명)<br/>
                1. 한도외는 미구현() <br/>
                2. 해당 인터페이스의 목적은 
                (1) 총 요구금액을 내역사업에 배분. 
                (2) 신규사업 총액과 갯수의 결정. 
                (3) 그에 따라서 자연스럽게 계속사업 총액의 결정. 
                까지가 목적이므로 기일치|계속|종료 로 세분하지 않고 전부 계속사업으로 묶어서 총액과 단가만 확인할 수 있도록 하였음
                (계속사업의 세분은 아래 가로장표서 확인가능)
                3. 
            </p>
        </div>
    )
}

export default TempDashboard;