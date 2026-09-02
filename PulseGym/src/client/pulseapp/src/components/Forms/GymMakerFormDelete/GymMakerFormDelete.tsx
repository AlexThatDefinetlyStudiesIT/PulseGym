import { ChangeEvent, FormEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteGyms, deleteHalls } from '../../redux/actions';
import './GymMakerFormDelete.css';
import { GymApi } from '../../../api';

export const GymMakerFormDel = () => {
    const [title, setTitle] = useState('')
    const dispatch = useDispatch()
    const handleSubmit = async(event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if (!title.trim()) {
            console.log("Для удаления Зала заполните поля.")
            return
        }
        const parsedTitle = parseInt(title,10);
        if (isNaN(parsedTitle)||parsedTitle<=0||title.includes(',')||title.includes('.')){
            console.log("Для удаления Зала значения в полях должны быть натуральными числами.")
            return;
        }
        const gyms =await GymApi.getAllGyms();
        if (gyms.filter((gym)=>gym.id ===parsedTitle).length===0){
            console.log('Нельзя удалить Зал, id которого и так не существует.')
            return;
        }
        dispatch(deleteGyms(title));
        //удалим каскадно связи
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
            <button className="btn submit-btn">Удалить</button>
        </form>
    );
};
