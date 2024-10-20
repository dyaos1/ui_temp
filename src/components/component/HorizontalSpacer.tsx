interface HorizontalProp {
    x: number
}

const HorizontalSpacer = ( { x }: HorizontalProp ) => {
    return (
        <div style={{ width: `${x}px` }} />
    )
}

export default HorizontalSpacer;