import React, { ChangeEvent, FormEvent, useState } from 'react';
import './HallMakerForm.css';
import { useDispatch } from 'react-redux';
import { deleteHalls } from '../../redux/actions';
import { GymApi } from '../../../api';



export const HallMakerFormDel = () => {
    const [titleEntry, setTitleEntry] = useState('')
    const [titleExit, setTitleExit] = useState('')
   
    const dispatch = useDispatch()

    const handleSubmit1 = async (event: FormEvent<HTMLFormElement>) => {
        
        event.preventDefault()
        
        if (!titleEntry.trim()||!titleExit.trim()) {
            console.log('Для удаления Маршрута заполните поля.')
            return
        }
        const parsedEntry = parseInt(titleEntry,10);
        const parsedExit = parseInt(titleExit,10);

        if(isNaN(parsedEntry)||isNaN(parsedExit)||parsedEntry<=0||parsedExit<=0||titleEntry.includes(',')||
        titleEntry.includes('.')||titleExit.includes(',')||titleExit.includes('.')){
            console.log('Для удаления Маршрута значения в полях должны быть натуральными числами.')
            return;
        }

        const halls = await GymApi.getAllHalls();
        const hallIds = halls
            .filter(hall =>
                (hall.enter_id === parsedEntry && hall.exit_id === parsedExit) ||
                (hall.enter_id === parsedExit && hall.exit_id === parsedEntry)
            )
            .map(hall => hall.id.toString());
        if (!hallIds.length){
            console.log('Нельзя удалить несуществующий Маршрут.')
            return;
        }
        
        for (const id of hallIds) {
            dispatch(deleteHalls(id));
        }

        setTitleEntry('')
        setTitleExit('')
        event.stopPropagation();
    }
    const handleChangeInputValue1 = (event: ChangeEvent<HTMLInputElement>) => {
        setTitleEntry(event.target.value)    
    }
    const handleChangeInputValue2 = (event: ChangeEvent<HTMLInputElement>) => {
        setTitleExit(event.target.value)
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
                    type="text"
                    disabled
                    className="form-control input-field"
                    id="exitIdInput"
                />
                
            </div>
            <button className="btn submit-btn">Удалить</button>
        </form>
    );
};
