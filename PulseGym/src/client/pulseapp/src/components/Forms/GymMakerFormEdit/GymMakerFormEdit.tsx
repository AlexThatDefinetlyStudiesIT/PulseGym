import React, { ChangeEvent, FormEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './GymMakerFormEdit.css';
import { createGyms, deleteGyms, deleteHalls } from '../../redux/actions';
import { GymApi } from '../../../api';


export const GymMakerFormEdit = () => {
    const [title, setTitle] = useState('')
    const [newtitle, setnewTitle] = useState('')
    const dispatch = useDispatch()
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    if (!title.trim()||!newtitle.trim()){
        console.log('Для изменения Зала заполните поля.');
        return;
    }
    const parsedTitle = parseInt(title, 10);
    const newparsedTitle = parseInt(newtitle, 10);
    if (isNaN(parsedTitle)||isNaN(newparsedTitle)||parsedTitle<=0||newparsedTitle<=0||
    title.includes(',')||title.includes('.')||newtitle.includes(',')||newtitle.includes(',')){
        console.log('Для изменения Зала значения в полях должны быть натуральными числами.')
        return;
    }

    const gyms =await GymApi.getAllGyms();
    if (gyms.filter((gym)=>gym.id ===parsedTitle).length===0){
        console.log('Нельзя изменить несуществующий Зал.')
        return;
    }
    if (gyms.filter((gym)=>gym.id ===newparsedTitle).length===1){
        console.log('Нельзя изменить Зал на другой Зал, id которого уже используется.')
        return;
    }


    const gymObject = {
        id: title,
        new_id: parseInt(newtitle, 10)
    };


    dispatch(deleteGyms(gymObject.id));
    //удалим каскадно связи
    if (parsedTitle!= newparsedTitle){
        const halls = await GymApi.getAllHalls();

        const hallIds = halls
            .filter(hall =>
                (hall.enter_id === parsedTitle || hall.exit_id === parsedTitle)
            )
            .map(hall => hall.id.toString());
        if (hallIds.length){
            for (const id of hallIds) {
                dispatch(deleteHalls(id));
            }
        }
    }

    dispatch(createGyms(gymObject.new_id));

    setnewTitle('');
    setTitle('');
};

    const handleChangeInputValue = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value)
    }
    const handleChangeInputValue1 = (event: ChangeEvent<HTMLInputElement>) => {
        setnewTitle(event.target.value)
    }
    return (
        <form onSubmit={handleSubmit} className="pass-form mb-3">
            <div className="form-group mb-3">
                <label htmlFor="idInput" className="form-label">
                    Зал
                </label>
                <div>id старый</div>
                <input
                    onChange={handleChangeInputValue}
                    value ={title}
                    type="text"
                    className="form-control input-field"
                    id="idInput"
                />
                <div>id новый</div>
                <input
                    onChange={handleChangeInputValue1}
                    value={newtitle}
                    type="text"
                    className="form-control input-field"
                    id="idInput"
                />
            </div>
            <button className="btn submit-btn">Изменить</button>
        </form>
    );
};
