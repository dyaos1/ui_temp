'use client'

import Header from "./Header";
import HorizontalTable from "./horizontalTable/HorizontalTable";
import Line from "./Line";
import SummaryTable from "./SummaryTable";
import Title from "./component/Title";
// import BasicCalculator from "./calculators/BasicCalculator";
import UnitCostCalculator from "./calculators/UnitCostCalculator";
import { useEffect, useState } from "react";
import BottomButtons from "./buttonGroup/BottomButtons";
import LoadingMark from "./component/LoadingMark";
import { ht_mapper } from "@/data/ht_mapper";

const Container = () => {
    const [visible, setVisible] = useState(false)
    const [payload, setPayload] = useState("")
    const [rowCount, setRowCount] = useState(0)

    const [HT, setHT] = useState(
        ht_mapper().data
    )

    const [spinner, setSpinner] = useState(true)

    useEffect(() => {
        setTimeout(() => {setSpinner(false)}, 300)
    }, [])
    
    return (
        <>
    
            <Line />

            <Header />

            <Line />
            {
                spinner ? <LoadingMark /> :
                (<>
                    <Title content="개요" />

                    <SummaryTable />

                    <Line />

                    <Title content="가로장표" />

                    {
                        visible && <UnitCostCalculator setVisible={setVisible} payload={payload} rowCount={rowCount} HT={HT} setHT={setHT} />
                    }

                    <HorizontalTable setVisible={setVisible} data={HT} setPayload={setPayload} setRowCount={setRowCount} />

                    <Line />

                    <div className="flex flex-col justify-items-center text-center">
                        <p>...</p>
                        <p className="text-lg font-bold">후략</p>
                    </div>

                    <Line />

                    <BottomButtons />

                    {/* <BasicCalculator /> */}

            
                </>)
            }

        </>
    )
}

export default Container;