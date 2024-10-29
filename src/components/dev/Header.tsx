// interface HeaderProps {
//     key: number
// }

import DropDown from "../component/DropDown";
import VerticalSpacer from "../component/VerticalSpacer";

interface HeaderProps {
    year: number
    // eslint-disable-next-line
    setYear: any
    years: number[]
}

const Header = ({year, setYear, years}: HeaderProps) => {
    return (
        <div>
            <VerticalSpacer y={20} />

            <div className="grid grid-cols-8 gap-10">
                <div className="text-center">사업명</div>
                <div>소재부품장비혁신Lab기술개발사업</div>
            </div>
            
            <VerticalSpacer y={20} />

            <div className="grid grid-cols-8 gap-10">
                <div className="text-center">생성년도</div>
                <DropDown lastYear={year} years={years} setYear={setYear} />
            </div>

            <VerticalSpacer y={20} />
        </div>
    )
}

export default Header;