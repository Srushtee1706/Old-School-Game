import React from 'react';
import styles from "./page.module.css";
import Card from "@/components/Card";
import TicTacToeImage from "/public/tic-tac-toe.svg";
import SudokuImage from "/public/SudokuLogo.webp";
import Snakeladdericon from "/public/Snake-ladder-icon.svg";



const SelectGame = () => {
    return (
        <>
            <div id={styles.bgGrid}>
                <div id={styles.blurGrid}></div>
            </div>
            <div>
                <h1>Choose Your Game</h1>
            </div>

            <div className={styles.cardContainer}>
                <Card image={TicTacToeImage} name={"Tic Tac Toe"} link={"tic-tac-toe/single-player"} backgroundColor={"#FF3737"} textColor={"white"}/>
                <Card image={SudokuImage} name={"sudoku"} link={"sudoku"} backgroundColor={"#22C55E"} />
                 <Card image={Snakeladdericon} name={"Snake Ladder"} link={"snakeladder"} backgroundColor={"blue"} />
            </div>
        </>
    );
};

export default SelectGame;
