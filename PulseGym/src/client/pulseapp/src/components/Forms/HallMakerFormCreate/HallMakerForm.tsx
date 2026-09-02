import React, { ChangeEvent, FormEvent, useState } from 'react';
import './HallMakerForm.css';
import { useDispatch } from 'react-redux';
import { createHalls, getGyms } from '../../redux/actions';
import { GymApi } from '../../../api';

export const HallMakerForm = () => {
    const titleID="1";
    const [titleEntry, setTitleEntry] = useState('')
    const [titleExit, setTitleExit] = useState('')
    const [titleWeight, setTitleWeight] = useState('')
   
    const dispatch = useDispatch()

    const handleSubmit1 = async(event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if (!titleID.trim()||!titleEntry.trim()||!titleExit.trim()||!titleWeight.trim()) {
            console.log('Для создания Маршрута заполните поля.')
            return
        }
        const parsedEntry = parseInt(titleEntry,10);
        const parsedExit = parseInt(titleExit,10);
        const parsedWeight = parseInt(titleWeight,10);
        if (isNaN(parsedEntry) || parsedEntry <= 0 || isNaN(parsedExit) || parsedExit <= 0 
            || isNaN(parsedWeight) || parsedWeight <= 0|| titleEntry.includes(',')||titleEntry.includes('.')||
            titleExit.includes(',')||titleExit.includes('.')||titleWeight.includes(',')||titleWeight.includes('.')) {
            console.log('Для создания Маршрута значения в полях должны быть натуральными числами.')
            return;
        }
        const nodes = await GymApi.getAllGyms();
        const entryExists = nodes.some((node) => node.id === parsedEntry);
        const exitExists = nodes.some((node) => node.id === parsedExit);
        if (!entryExists || !exitExists) {
            console.log('Один из Залов Маршрута не существует.');
            return;
        }
        const edges = await GymApi.getAllHalls();
        var added_edge = edges.filter((edge) => (edge.enter_id === parsedEntry && edge.exit_id === parsedExit)
        || (edge.enter_id === parsedExit && edge.exit_id === parsedEntry));
        if (added_edge.length>0){
            console.log('Нельзя создать уже существующий Маршрут.')
            return;
        }
        //правило треугольника
        for (var node of nodes){
            var edge1=edges.find(edge => (edge.enter_id === node.id && edge.exit_id === parsedEntry));
            var edge2=edges.find(edge => (edge.enter_id === node.id && edge.exit_id === parsedExit));
            if (edge1!=undefined&&edge2!=undefined){
                if (edge1.weight+edge2.weight < parsedWeight){
                    console.log(`Ребра не могут нарушать правило треугольника. Для пары вершин ${parsedEntry} и ${parsedExit} максмальное расстояние маршрута - ${edge1.weight+edge2.weight}.`)
                    return;
                }
            } 
        }
        dispatch(createHalls(titleID,titleEntry,titleExit,titleWeight))
        setTitleEntry('')
        setTitleExit('')
        setTitleWeight('')
        event.stopPropagation();
    }
    const handleChangeInputValue1 = (event: ChangeEvent<HTMLInputElement>) => {
        setTitleEntry(event.target.value)    
    }
    const handleChangeInputValue2 = (event: ChangeEvent<HTMLInputElement>) => {
        setTitleExit(event.target.value)
    }
    const handleChangeInputValue3 = (event: ChangeEvent<HTMLInputElement>) => {
        setTitleWeight(event.target.value)
    }

    return (
        <form onSubmit={handleSubmit1} className="pass-form mb-3">
            <div className="form-group mb-3">
                <label htmlFor="enterIdInput" className="form-label">
                    Маршрут
                </label>
                <div>Зал А</div>
                <input
                    value={titleEntry}
                    onChange={handleChangeInputValue1}
                    type="text"
                    className="form-control input-field"
                    id="enterIdInput"
                />
                <div>Зал Б</div>
                <input
                    value={titleExit}
                    onChange={handleChangeInputValue2}
                    type="text"
                    className="form-control input-field"
                    id="exitIdInput"
                />
                <div>Время пути</div>
                <input
                    value={titleWeight}
                    onChange={handleChangeInputValue3}
                    type="text"
                    className="form-control input-field"
                    id="weightInput"
                />
            </div>
            <button className="btn submit-btn">Добавить</button>
        </form>
    );
};
