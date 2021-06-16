import React, { useState } from 'react';
import { ChromePicker } from 'react-color';
import Grid from '../Grid';
import './Main.css';

const Main = () => {
    const [size, setSize] = useState(null);
    const [colour, setColour] = useState('#ff0000');
    const [displayColorPicker, setDisplayColorPicker] = useState(false);
    const [displayHoverColorPicker, setDisplayHoverColorPicker] = useState(false);
    const [hoverColour, setHoverColour] = useState('#0000ff');

    return (
        <div className='c-main'>
            <div className='c-input'>
                <label className='c-input--label'>Size</label>
                <input 
                    name='size' 
                    type='number'
                    value={size}
                    className='c-input--input'
                    placeholder='Please type a size for creating a NxN grid'
                    onChange={e => setSize(e.target.value)}
                />
            </div>

            <div>
                <div className='c-input'>
                    <label className='c-input--label'>Background Colour</label>
                    <span className='c-input--text'>{colour}</span>
                    <button className='c-input--btn' onClick={() => setDisplayColorPicker(!displayColorPicker)}>
                        Pick Background Colour
                    </button>
                </div>

                { 
                    displayColorPicker ? 
                    (
                        <div className='c-main--bg-picker'>
                            <ChromePicker
                                color={ colour }
                                onChangeComplete={(color) => {
                                    setColour(color.hex);
                                    setDisplayColorPicker(false);
                                }} 
                            />
                        </div>
                    ) 
                    : null 
                }
            </div>

            <div>
                <div className='c-input'>
                    <label className='c-input--label'>Background Hover Colour</label>
                    <span className='c-input--text'>{hoverColour}</span>
                    <button className='c-input--btn' onClick={() => setDisplayHoverColorPicker(!displayHoverColorPicker)}>
                        Pick Hover Colour
                    </button>
                </div>

                { 
                    displayHoverColorPicker ? 
                    (
                        <div className='c-main--bg-picker'>
                            <ChromePicker
                                color={ hoverColour }
                                onChangeComplete={(color) => {
                                    setHoverColour(color.hex);
                                    setDisplayHoverColorPicker(false); 
                                }}
                            />
                        </div>
                    ) 
                    : null 
                }
            </div>
            <Grid size={size} colour={colour} hoverColour={hoverColour}/>
        </div>
    )
};

export default Main;
