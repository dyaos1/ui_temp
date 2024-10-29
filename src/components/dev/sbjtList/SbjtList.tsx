import SbjtListHeader from "./SbjtListHeader";
import SbjtListRow from "./SbjtListRow";

interface SbjtListDisplay {
    type: string
    name: string
    period: string
    mainOrg: string
    subOrgs: string
    lastYear: string
    thisYear: string
    demand: string
    nextYear: string
    nation: string
    foreign: string
}

interface SbjtList2Props {
    year: number
    sbjtList: SbjtListDisplay[]
}
const SbjtList2 = ({year, sbjtList}: SbjtList2Props) => {

    return (
        <div className="mx-5 mt-2 mb-5">
            <SbjtListHeader year={year} />            
            {
                sbjtList.map((e, i) => (
                    <SbjtListRow
                        key={"과제리스트"+i}
                        type={e.type}
                        name={e.name}
                        period={e.period}
                        mainOrg={e.mainOrg}
                        subOrgs={e.subOrgs}
                        lastYear={e.lastYear}
                        thisYear={e.thisYear}
                        demand={e.demand}
                        nextYear={e.nextYear}
                        nation={e.nation}
                        foreign={e.foreign}
                    />
                )
                )
            }
        </div>
    )
}

export default SbjtList2;