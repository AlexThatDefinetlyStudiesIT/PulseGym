import { Header } from '../../../Header/Header';
import { Ender } from '../../../Ender/Ender';
import '../graphmaker.css';
import { CRUDNav } from '../../../CRUDNav/CRUDNav';
import { HallMakerForm } from '../../../Forms/HallMakerFormCreate/HallMakerForm';
import { GymMakerForm } from '../../../Forms/GymMakerFormCreate/GymMakerFormCreate';
import ConsoleLogger from '../../../consoleLogger/consoleLogger';

export const GraphMakerCreate = () => {
    return (
        <>
            <Header />
            <div className="console-logger-wrapper">
                <ConsoleLogger />
            </div>
            <main className="main-content">
                <section className="text-container">
                    
                    <p>Чтобы добавить Зал, нужно ввести его уникальный id.</p>
                    <p>Чтобы добавить Маршрут, нужно ввести id двух сущестуствующих Залов и длину маршрута. Парный маршрут (из зала Б в зал А) создается автоматически.</p>
                    <p>При вводе используйте целые положительные числа.</p>
                    <p>Для возвращения к графу перейдите в раздел "Алгоритм".</p>
                </section>
                
                <section className="forms-container">
                    <CRUDNav/>
                    <div className="forms-wrapper">
                        <GymMakerForm />
                        <HallMakerForm />
                    </div>
                </section>
            </main>
            <Ender />
        </>
    );
};

export default GraphMakerCreate;
