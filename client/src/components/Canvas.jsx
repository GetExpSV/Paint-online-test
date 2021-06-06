import React, {useEffect, useRef} from 'react';
import '../styles/canvas.scss'
import {observer} from "mobx-react-lite";
import canvasState from '../store/canvasState'
import toolState from '../store/toolState'
import Brush from "../tools/Brush";
import {useParams} from 'react-router-dom'

const Canvas = observer(() => {
    const canvasRef = useRef();
    const usernameRef = useRef();
    const params = useParams()

    useEffect(() => {
        canvasState.setCanvas(canvasRef.current)
        toolState.setTool(new Brush(canvasRef.current))
    }, [])

    useEffect(() => {
        if (canvasState.username) {
            const socket = new WebSocket('ws://localhost:5000/')
            socket.onopen = () => {
                console.log('Подключение установлено')
                socket.send(JSON.stringify({
                    id: params.id,
                    username: canvasState.username,
                    method: 'connection'
                }))
            }

            socket.onmessage = (event) => {
                console.log(event.data)
            }
        }

    }, [canvasState.username])

    const mouseDownHandler = () => {
        canvasState.pushToUndo(canvasRef.current.toDataURL())
    }

    const closeModal = () => {
        canvasState.setUsername(usernameRef.current.value)
        document.querySelector('.modal__window').classList.toggle('modal__window_open')
    }

    return (
        <div className={'canvas'}>
            <div className={'modal__window modal__window_open'}>
                <div className={'modal-window__input'}>
                    <label htmlFor={'user-name'}>Введите имя:</label>
                    <input id={'user-name'} type={'text'} ref={usernameRef}/>
                    <button onClick={closeModal}>Войти</button>
                </div>
            </div>
            <canvas onMouseDown={mouseDownHandler} ref={canvasRef} width={600} height={400}/>
        </div>
    );
});

export default Canvas;