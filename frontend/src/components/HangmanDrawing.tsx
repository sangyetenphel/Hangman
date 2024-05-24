import React from "react"

const HEAD = (
    <div key="head" style={{
        width: "50px",
        height: "50px",
        borderRadius: "100%",
        border: "10px solid white",
        position: "absolute",
        top: "45px",
        right: "-20px",
    }}/>
)

const BODY = (
    <div key="body" style={{
        width: "10px",
        height: "100px",
        background: "white",
        position: "absolute",
        top: "90px",
        right: "0",
    }}/>
)

const RIGHT_ARM = (
    <div key="right-arm" style={{
        width: "100px",
        height: "10px",
        background: "white",
        position: "absolute",
        top: "130px",
        right: "-100px",
        rotate: "-30deg",
        transformOrigin: "left bottom",
    }}/>
)

const LEFT_ARM = (
    <div key="left-arm" style={{
        width: "100px",
        height: "10px",
        background: "white",
        position: "absolute",
        top: "130px",
        right: "10px",
        rotate: "30deg",
        transformOrigin: "right bottom",
    }}/>
)

const RIGHT_LEG = (
    <div key="right-leg" style={{
        width: "100px",
        height: "10px",
        background: "white",
        position: "absolute",
        top: "180px",
        right: "-90px",
        rotate: "60deg",
        transformOrigin: "left bottom",
    }}/>
)

const LEFT_LEG = (
    <div key="left-leg" style={{
        width: "100px",
        height: "10px",
        background: "white",
        position: "absolute",
        top: "180px",
        right: "0",
        rotate: "-60deg",
        transformOrigin: "right bottom",
    }}/>
)

const BODY_PARTS = [HEAD, BODY, RIGHT_ARM, LEFT_ARM, RIGHT_LEG, LEFT_LEG]

type HangmanDrawingProps = {
    numberOfGuesses: number
}

export function HangmanDrawing({numberOfGuesses}: HangmanDrawingProps) {
    return (
        <div style={{ position: "relative"}}>
            {BODY_PARTS.slice(0, numberOfGuesses).map((part, index) => (
                <React.Fragment key={index}>
                    {part}
                </React.Fragment>
            ))}
            <div
                style={{
                    height: "50px",
                    width: "10px",
                    background: "white",
                    marginLeft: "120px",
                    position: "absolute",
                    top: 0,
                    right: 0,
                }}
            />
            <div
                style={{
                    height: "10px",
                    width: "200px",
                    background: "white",
                    marginLeft: "120px",
                }}
            />
            <div
                style={{
                    height: "400px",
                    width: "10px",
                    background: "white",
                    marginLeft: "120px",
                }}
            />
            <div style={{ height: "10px", width: "250px", background: "white"}}/>
        </div>
    )
}