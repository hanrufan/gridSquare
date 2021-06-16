import React from 'react';
import { number, string } from 'prop-types';
import Board from '../Board';

const Grid = ({size, colour, hoverColour}) => {
    const arraySize = size ? parseInt(size) : size;
    const board = new Array(arraySize).fill(0).map(() => new Array(arraySize).fill(0));
    const boardGrid = board.map(item => item.map(ele => Math.round(Math.random())));

    return (
        <>
        {
            size ? (<Board boardGrid={boardGrid} size={size} colour={colour} hoverColour={hoverColour}/>) : null
        }
        </>
    );
};

Grid.propTypes = {
    size: number,
    colour: string,
    hoverColour: string
};

export default Grid;
