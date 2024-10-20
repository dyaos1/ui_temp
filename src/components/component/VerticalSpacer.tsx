interface VertitalProp {
    y: number
}

const VerticalSpacer = ( { y }: VertitalProp ) => {
    return (
        <div style={{ height: `${y}px` }} />
    )
}

export default VerticalSpacer;