'use client'
import { useEffect, useState } from "react"

interface SecurityProp {
    // eslint-disable-next-line
    setSecurityVisible: any
}

const Security = ({setSecurityVisible}: SecurityProp) => {
    const [state, setState] = useState("")
    // eslint-disable-next-line
    const password = (e: any) => {
        setState(e.target.value)
    }

    useEffect(() => {
        if (state === "241125") {
            setSecurityVisible(false)
        }
    }, [state])

    return (
        <div className = "fixed inset-0 z-50 w-full h-full flex flex-col px-10">
            <p>비밀번호를 입력하시오</p>
            <div>
                <input 
                    className="border-2 border-black"
                    type="password"
                    value={state}
                    onChange={password}
                />
            </div>
        </div>
    )
}

export default Security;