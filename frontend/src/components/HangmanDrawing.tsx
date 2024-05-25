import React from "react"
import styles from "../modules/HangmanDrawing.module.css"

const HEAD = (
    <div className={styles.head} key="head"/>
)

const BODY = (
    <div className={styles.body} key="body"/>
)

const RIGHT_ARM = (
    <div className={styles.rightArm} key="right-arm"/>
)

const LEFT_ARM = (
    <div className={styles.leftArm} key="left-arm"/>
)

const RIGHT_LEG = (
    <div className={styles.rightLeg} key="right-leg"/>
)

const LEFT_LEG = (
    <div className={styles.leftLeg} key="left-leg"/>
)

const BODY_PARTS = [HEAD, BODY, RIGHT_ARM, LEFT_ARM, RIGHT_LEG, LEFT_LEG]

type HangmanDrawingProps = {
    numberOfGuesses: number
}

export function HangmanDrawing({numberOfGuesses}: HangmanDrawingProps) {
    return (
        <div className={styles.hangmanDrawingContainer}>
            {BODY_PARTS.slice(0, numberOfGuesses).map((part, index) => (
                <React.Fragment key={index}>
                    {part}
                </React.Fragment>
            ))}
            <div className={styles.hangmanRod1}
                // style={{
                //     height: "50px",
                //     width: "10px",
                //     background: "white",
                //     marginLeft: "120px",
                //     position: "absolute",
                //     top: 0,
                //     right: 0,
                // }}
            />
            <div className={styles.hangmanRod2}/>
            <div className={styles.hangmanRod3}/>
            <div className={styles.hangmanRod4}/>
        </div>
    )
}