'use client'

import Header from "./Header";
import HorizontalTable from "./horizontalTable/HorizontalTable";
import Line from "./Line";
import SummaryTable from "./SummaryTable";
import Title from "./component/Title";
import BasicCalculator from "./calculators/BasicCalculator";
import UnitCostCalculator from "./calculators/UnitCostCalculator";
import { useState } from "react";
import BottomButtons from "./buttonGroup/BottomButtons";
import LoadingSpinner from "./component/LoadingSpinner";

const Container = () => {
    const [visible, setVisible] = useState(false)
    const [payload, setPayload] = useState("")
    // const [confirmed, setConfirmed] = useState("")
    
    return (
        <>
    
            <Line />

            <Header />

            <Line />
            {
                true ? <LoadingSpinner /> :
                (<>
                    <Title content="개요" />

                    <SummaryTable />

                    <Line />

                    <Title content="가로장표" />

                    <HorizontalTable setPayload={setPayload} setVisible={setVisible} payload={payload} />

                    <Line />

                    {
                        visible && <UnitCostCalculator payload={payload} setVisible={setVisible} setPayload={setPayload} />
                    }

                    <Line />

                    <BottomButtons />

                    <BasicCalculator />
                </>)
            }

        </>
    )
}

export default Container;