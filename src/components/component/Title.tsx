import HorizontalSpacer from "./HorizontalSpacer";
import VerticalSpacer from "./VerticalSpacer";

interface Content {
    content: string
}

const Title = ( {content} : Content ) => {
    return (
        <div>
            <VerticalSpacer y={10} />

            <div className="flex flex-row">
                <HorizontalSpacer x={15} />
                <div className="text-lg font-semibold">
                    {content}
                </div>
            </div>
        </div>
    )
}

export default Title;