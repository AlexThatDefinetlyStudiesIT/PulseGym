import React, { ChangeEvent, useState } from 'react';
import { Header } from '../../Header/Header';
import { Ender } from '../../Ender/Ender';
import GraphView from '../../Graph/graph';
import './Inventory.css'; // Подключаем CSS файл
import { useNavigate } from 'react-router-dom';
import { GymApi } from '../../../api';
import nearestNeighborAlgorithm from '../../../coding/NNAlgorithm';
import ConsoleLogger from '../../consoleLogger/consoleLogger';


export const Inventory = () => {

    const [totalDistance, setTotalDistance] = useState(0);
    const [route, setRoute] = useState<number[]>([]);
    const [titleEntry, setTitleEntry] = useState('')

    const handleRecalculate = async () => {
        const nodesData = await GymApi.getAllGyms();
        const edgesData = await GymApi.getAllHalls();  
        //входая точка задана
        if (!titleEntry.trim() || !parseInt(titleEntry,10)) {
            console.log("Укажите id начальной точки."); 
            return
        }
        var correct = false;
        for (const nId of nodesData){
            if (nId.id===parseInt(titleEntry,10)){
                correct=true;
                break
            }
        }
        if (!correct){
            console.log("Укажите id существующей точки."); 
            return
        }
        // проверка на полноту графа
        if (nodesData.length * (nodesData.length - 1) !== edgesData.length) {
            console.log("Данный граф не является полным, алгоритм невозможен."); 
            return;
        }
        // вызов алгоритма ближайшего соседа с данными узлов и рёбер
        const result = nearestNeighborAlgorithm(nodesData, edgesData,parseInt(titleEntry,10));
        const route = result.route;
        const totalDistance = result.totalDistance;
        const answer = [totalDistance, route];
        // обновление состояния
        setTotalDistance(totalDistance);
        setRoute(route);
    };
    const navigate = useNavigate();
    const handleHalls = () => {
        navigate('/inventory/graphmaker');
    };
    const handleChangeInputValue1 = (event: ChangeEvent<HTMLInputElement>) => {
        setTitleEntry(event.target.value)    
    }
    return (
        <>
            <Header />
            <main className="main-content">
            <section className="text-section">
                        <div>
                            <label className="text-s-tex">Реализация алгоритма для TSP задачи.</label>
                            <label className="text-s-tex">Граф отображает данные из базы данных о залах и маршрутах между ними.
                            </label>
                            <label className="text-s-tex">Итоговая стоимость - сумма весов ребер полученного маршрута.</label>
                            <label className="text-s-tex">Маршрут - полученный маршрут.</label>
                            <label className="text-s-tex">Начальная точка - из какого зала начинается обход.</label>
                            <label className="text-s-tex">Вычислить - выполнить алгоритм для данного графа.</label>
                            <label className="text-s-tex">Редактирование - доступ к CRUD для залов и маршрутов между ними.</label>
                            <label className="text-s-tex">⟳ - обновление страницы (сброс приближения графа и вычислений).</label>
                        </div>
                    </section>
            <div className="console-logger-wrapper">
                <ConsoleLogger />
            </div>
                <section>
                    <section>
                        <label className='title-text'>Задача коммовояжера</label>
                        <label className='title-text2'>Алгоритм ближайшего соседа</label>
                    </section>
                    <section className="outer-section">
                    <section className="graph-section">
                        <div className="graph-container">
                            <GraphView />
                        </div>
                    </section>
                </section>
                </section>
                <section className="additional-section">
                        <div className="additional-content">
                            <label>Итоговая стоимость: {totalDistance}</label>
                            <label>Маршрут: {route}</label>
                            <button onClick={handleRecalculate}>Вычислить</button>
                            <button onClick={handleHalls}>Редактирование</button>
                            <label>Начальная точка id: {titleEntry}</label>
                            <input 
                                value={titleEntry}
                                onChange={handleChangeInputValue1}
                                type="text"
                                className="form-control input-field"
                                id="enterIdInput"
                                />
                        </div>
                    </section>
            </main>
            <Ender />
        </>
    );
};

export default Inventory;
