import React, { useState } from 'react';
import { number, string, object } from 'prop-types';
import './Board.css';

const Board = ({boardGrid, size, colour, hoverColour}) => {
    const [showCount, setShowCount] = useState('');
    const [count, setCount] = useState(0);
    let checkList = [];
    let checkedList = [];
    let activeList = [];
  
    const square = (iCoord, jCoord) => {
        const i = parseInt(iCoord), j = parseInt(jCoord);
        let tempChk = [];

        if (i-1 >= 0 && boardGrid[i-1][j]) {
            tempChk.push(`${i-1},${j}`);
        }
        if (i+1 < size && boardGrid[i+1][j]) {
            tempChk.push(`${i+1},${j}`);
        }
        if (j-1 >= 0 && boardGrid[i][j-1]) {
            tempChk.push(`${i},${j-1}`);
        }
        if (j+1 < size && boardGrid[i][j+1]) {
            tempChk.push(`${i},${j+1}`);
        }
    
        checkList.shift();
        const clist = checkList;
        const arrayFiltered = tempChk.filter(val => {
           return checkedList.indexOf(val) === -1;	
        });
        
        checkList = [...new Set([...arrayFiltered,  ...clist])];
    };

    const calcSquare = (ele, i, j) => {
        checkList = [];
        checkedList = [];

        checkList.push(`${i},${j}`);

        while (checkList.length !== 0) {
            const checkItem = checkList[0];
            const splitItem = checkItem.split(',');
            square(splitItem[0], splitItem[1]);
            checkedList.push(`${splitItem[0]},${splitItem[1]}`);
        }

        return checkedList;
    };

    const countSquare = (ele, i, j) => {
        // do nothing if it's non-filled square
        if (!ele) return false; 

        calcSquare(ele, i, j);

        setShowCount(`text-${i}-${j}`);
        setCount(checkedList.length);
    };

    const clearHoverSquare = () => {
        checkedList.forEach(item => {
            const coord = item.split(',');
            document.querySelector(`.btn-${coord[0]}-${coord[1]}`).style.backgroundColor = '';
        });

        activeList.forEach(item => {
            const coord = item.split(',');
            document.querySelector(`.btn-${coord[0]}-${coord[1]}`).style.backgroundColor = colour;
        });
    };

    const hoverSquare = (ele, i, j) => {
        // do nothing if it's non-filled square
        if (!ele) return false; 

        calcSquare(ele, i, j);
        
        checkedList.forEach(item => {
            const coord = item.split(',');
            document.querySelector(`.btn-${coord[0]}-${coord[1]}`).style.backgroundColor = hoverColour;
        });
    };

    const activeStyle = (ele) => {
        return {
            backgroundColor: ele ? colour: ''
        }
    };

    return (
        <div>
            {
                boardGrid.map((item, i) => (
                    <>
                        <br/>
                        {
                            item.map((ele,j) => {
                                const btnItem = `btn-${i}-${j}`;
                                const textItemClass = `text-${i}-${j}`;

                                if (ele) {
                                    activeList.push(`${i},${j}`);
                                }

                                return (
                                    <button
                                        className={`btn ${btnItem}`}
                                        style={activeStyle(ele)}  
                                        onClick={() => countSquare(ele, i, j)}
                                        onMouseEnter = {() => hoverSquare(ele, i, j)}
                                        onMouseLeave = {() => clearHoverSquare(ele, i, j)}>
                                            <span className={showCount === textItemClass ? 'displayCount' : 'hideCount'}>
                                                {count}
                                            </span>
                                    </button>
                                );
                            })
                        }              
                    </>
                ))
            }
        </div>
    )
}

Board.propTypes = {
    size: number,
    boardGrid: object,
    colour: string, 
    hoverColour: string
}

export default Board
