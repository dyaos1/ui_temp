// interface HeaderProps {
//     key: number
// }

import DropDown from "./component/DropDown";
import VerticalSpacer from "./component/VerticalSpacer";

const Header = () => {
    return (
        <div>
            
            <VerticalSpacer y={20} />

            <div className="grid grid-cols-8 gap-10">
                <div className="text-center">사업명</div>
                <div>소재부품기술개발</div>
            </div>
            
            <VerticalSpacer y={20} />

            <div className="grid grid-cols-8 gap-10">
                <div className="text-center">생성년도</div>
                <DropDown defaultValue="2024년" menuItems={["2022년", "2023년", "2024년"]} />
            </div>

            <VerticalSpacer y={20} />
        </div>
    )
}

export default Header;