'use client'

import HTDataRow from "./HTDataRow";
import HorizontalTableHeader from "./HorizontalTableHeader";
import ht from "../../data/ht.json"


interface HorizontalTableProps {
    // eslint-disable-next-line
    setVisible: any
    // eslint-disable-next-line
    setPayload: any
    payload: string
}

const HorizontalTable = ({setPayload, setVisible, payload}: HorizontalTableProps) => {
    return (
        <div className="mx-5 mt-2 mb-5">
            <HorizontalTableHeader />
            {
                ht.data.map(
                    (e, i) => (
                        <HTDataRow 
                            key={e.사업명+i}
                            type={e.타입}
                            bsnsNm={e.사업명}  
                            lastYear={e.전년도}
                            thisYear={e.올해}
                            nextYear={e.수정전}
                            updated={e.수정후}
                            increase={e.증감}
                            increasePercent={e.퍼센트}
                            setVisible={setVisible}
                            setPayload={setPayload}
                            payload={payload}
                        />
                    )
                )
            }


            
        </div>
    )
}

export default HorizontalTable;