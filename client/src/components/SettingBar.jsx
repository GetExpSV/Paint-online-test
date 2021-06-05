import React from 'react';
import '../styles/toolbar.scss'
import toolState from '../store/toolState'

const SettingBar = () => {
    return (
        <div className={'setting-bar'}>
            <label className={'line-width__label'} htmlFor={'line-width'}> Толщина линии </label>
            <input id={'line-width'} type={'number'} defaultValue={1} min={1} max={50}
            onChange={e=> toolState.setLineWidth(e.target.value)}/>
            <label className={'stroke-color__label'} htmlFor={'stroke-color'}>Цвет обводки</label>
            <input onChange={e => toolState.setStrokeColor(e.target.value)} id={'stroke-color'} type={'color'}/>
        </div>
    );
};

export default SettingBar;