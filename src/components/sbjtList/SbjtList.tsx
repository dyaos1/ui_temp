import SbjtListHeader from "./SbjtListHeader";
import sbjt_list from "../../data/sbjt_list.json"
import SbjtListRow from "./SbjtListRow";

const SbjtList = () => {

    return (
        <div className="mx-5 mt-2 mb-5">
            <SbjtListHeader />
            {
                sbjt_list.data.map((e, i) => (
                    <SbjtListRow 
                        key={e.과제명+i}
                        type={e.타입}
                        name={e.과제명}
                        period={e.기간}
                        organization={e.주관기관}
                        subOrganizations={e.국내참여기관}
                        yearBeforeLast={e["N-2"]}
                        lastYear={e["N-1"]}
                        thisYear={e.N}
                        nextYear={e["N+1"]}
                        nation={e.국가}
                        foreign={e.해외기관}
                    />
                )
                )
            }
        </div>
    )
}

export default SbjtList;