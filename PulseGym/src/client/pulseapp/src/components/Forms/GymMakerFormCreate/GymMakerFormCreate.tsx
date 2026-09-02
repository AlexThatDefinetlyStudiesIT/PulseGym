import { ChangeEvent, FormEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { createGyms } from '../../redux/actions';
import './GymMakerFormCreate.css'
import { GymApi } from '../../../api';

export const GymMakerForm = () => {
    const [title, setTitle] = useState('')
   
    const dispatch = useDispatch()

    const handleSubmit = async(event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if (!title.trim()) {
            console.log('Для создания Зала заполните поля.')
            return
        }
        const parsedTitle = parseInt(title,10);
        if (isNaN(parsedTitle) || parsedTitle <= 0||title.includes(',')||title.includes('.')) {
            console.log('Для создания Зала значения в полях должны быть натуральными числами.')
            return;
        }
        const gyms =await GymApi.getAllGyms();
        if (gyms.filter((gym)=>gym.id ===parsedTitle).length>0){
            console.log('Нельзя создать Зал, id которого уже используется.')
            return;
        }

        dispatch(createGyms(parsedTitle))
        setTitle('')
        event.stopPropagation();
    }

    const handleChangeInputValue = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value)
    }
    return (
        <form onSubmit={handleSubmit} className="pass-form mb-3">
            <div className="form-group mb-3">
                <label htmlFor="idInput" className="form-label">
                    Зал
                </label>
                <div>id</div>
                <input
                    onChange={handleChangeInputValue}
                    value={title}
                    type="text"
                    className="form-control input-field"
                    id="idInput"
                />
            </div>
            <button className="btn submit-btn">Добавить</button>
        </form>
    );
};
