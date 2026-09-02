import React, { ChangeEvent, FormEvent, useState } from 'react';
import './HallMakerForm.css';
import { useDispatch } from 'react-redux';
import { createHalls, deleteHalls } from '../../redux/actions';
import { GymApi } from '../../../api';

export const HallMakerFormEdit = () => {
    const [titleEntry, setTitleEntry] = useState('')
    const [titleExit, setTitleExit] = useState('')
    const [titleWeight, setTitleWeight] = useState('')
   
    const [oldtitleEntry, setoldTitleEntry] = useState('')
    const [oldtitleExit, setoldTitleExit] = useState('')

    const dispatch = useDispatch()

    const handleSubmit1 = async(event: FormEvent<HTMLFormElement>) => {
        
        event.preventDefault()
        
        if (!titleEntry.trim()||!titleExit.trim()||!titleWeight.trim()||
        !oldtitleEntry.trim()||!oldtitleExit.trim()) {
            console.log('Для изменения Маршрута заполните поля.')
            return
        }
        const parsedoldEntry = parseInt(oldtitleEntry,10);
        const parsedoldExit = parseInt(oldtitleExit,10);
        const parsedEntry = parseInt(titleEntry,10);
        const parsedExit = parseInt(titleExit,10);
        const parsedWeight = parseInt(titleWeight,10);

        if (isNaN(parsedoldEntry) || parsedoldEntry <= 0 || isNaN(parsedoldExit) || parsedoldExit <= 0
            ||isNaN(parsedEntry)||parsedEntry<=0||isNaN(parsedExit)||parsedExit<=0||
            isNaN(parsedWeight)||parsedWeight<=0|| titleEntry.includes(',')||titleEntry.includes('.')||
            titleExit.includes(',')||titleExit.includes('.')||titleWeight.includes(',')||titleWeight.includes('.')||
            oldtitleEntry.includes(',')||oldtitleEntry.includes('.')||oldtitleExit.includes('.')||
            oldtitleExit.includes(',')) {
            console.log('Для изменения Маршрута значения в полях должны быть натуральными числами.')
            return;
        }

        const halls = await GymApi.getAllHalls();
        const entryExists = halls.filter((node) => (node.enter_id === parsedoldEntry)&&
        (node.exit_id===parsedoldExit));
        const exitExists = halls.filter((node) => (node.enter_id === parsedoldExit)&&
        (node.exit_id===parsedoldEntry));
        
        if (entryExists.length === 0 || exitExists.length === 0) {
            console.log('Нельзя изменить несуществующий Маршрут.');
            return;
        }
 
        const gyms = await GymApi.getAllGyms();
        const entryGym = gyms.some((node) => node.id === parsedEntry);
        const exitGym = gyms.some((node) => node.id === parsedExit);

        if (!entryGym || !exitGym) {
            console.log('Один из Залов нового Маршрута не существует.');
            return;
        }
        //правило треугольника
        for (var anode of gyms){
            var edge1=halls.find(edge => (edge.enter_id === anode.id && edge.exit_id === parsedEntry));
            var edge2=halls.find(edge => (edge.enter_id === anode.id && edge.exit_id === parsedExit));
            if (edge1!=undefined&&edge2!=undefined){
                if (edge1.weight+edge2.weight < parsedWeight){
                    console.log(`Ребра не могут нарушать правило треугольника. Для пары вершин ${parsedEntry} и ${parsedExit} максмальное расстояние маршрута - ${edge1.weight+edge2.weight}.`)
                    return;
                }
            } 
        }

        dispatch(deleteHalls(entryExists[0].id.toString()));
        dispatch(deleteHalls(exitExists[0].id.toString()));
        dispatch(createHalls(entryExists[0].id.toString(),titleEntry,titleExit,titleWeight));
        
        setoldTitleEntry('')
        setoldTitleExit('')
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
    const handleChangeInputValue21 = (event: ChangeEvent<HTMLInputElement>) => {
        setoldTitleEntry(event.target.value)    
    }
    const handleChangeInputValue22 = (event: ChangeEvent<HTMLInputElement>) => {
        setoldTitleExit(event.target.value)
    }

    return (
        <form onSubmit={handleSubmit1} className="pass-form mb-3">
            <div className="form-group mb-3">
                <label htmlFor="enterIdInput" className="form-label">
                    Маршрут
                </label>
                <div className="row">
                    <div className="col-md-6">
                        <div>Зал А старый</div>
                        <input
                            value={oldtitleEntry}
                            onChange={handleChangeInputValue21}
                            type="text"
                            className="form-control input-field"
                            id="enterIdInput"
                        />
                    </div>
                    <div className="col-md-6">
                        <div>Зал Б старый</div>
                        <input
                            value={oldtitleExit}
                            onChange={handleChangeInputValue22}
                            type="text"
                            className="form-control input-field"
                            id="exitIdInput"
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <div>Зал А новый</div>
                        <input
                            value={titleEntry}
                            onChange={handleChangeInputValue1}
                            type="text"
                            className="form-control input-field"
                            id="enterIdInput"
                        />
                    </div>
                    <div className="col-md-6">
                        <div>Зал Б новый</div>
                        <input
                            value={titleExit}
                            onChange={handleChangeInputValue2}
                            type="text"
                            className="form-control input-field"
                            id="exitIdInput"
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <div>Время пути</div>
                        <input
                            value={titleWeight}
                            onChange={handleChangeInputValue3}
                            type="text"
                            className="form-control input-field"
                            id="weightInput"
                        />
                    </div>
                </div>
            </div>
            <button className="btn submit-btn">Изменить</button>
        </form>
    );
};
