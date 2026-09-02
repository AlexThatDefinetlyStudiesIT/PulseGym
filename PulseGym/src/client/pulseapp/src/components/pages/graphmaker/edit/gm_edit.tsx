import { Header } from '../../../Header/Header';
import { Ender } from '../../../Ender/Ender';
import '../graphmaker.css';
import { CRUDNav } from '../../../CRUDNav/CRUDNav';
import { GymMakerFormEdit } from '../../../Forms/GymMakerFormEdit/GymMakerFormEdit';
import { HallMakerFormEdit } from '../../../Forms/HallMakerFormEdit/HallMakerForm';
import ConsoleLogger from '../../../consoleLogger/consoleLogger';

export const GraphMakerEdit = () => {
    return (
        <>
            <Header />
            <div className="console-logger-wrapper">
                <ConsoleLogger />
            </div>
            <main className="main-content">
                <section className="text-container">
                    <p>Чтобы обновить Зал, нужно ввести его текущий id и новый id. Обновить можно только существующий Зал, задав ему новый id, зала с которым еще нет в графе.</p>
                    <p>Чтобы обновить Маршрут, нужно ввести его старые id Залов, новые id Залов и новое время пути. Обновить можно только существующий маршрут, участвующие в новом маршруте Залы должны существовать в графе до добавления Маршрута.</p>
                    <p>При вводе используйте целые положительные числа.</p>
                    <p>Для возвращения к графу перейдите в раздел "Алгоритм".</p>
                </section>
                <section className="forms-container">
                    <CRUDNav/>
                    <div className="forms-wrapper">
                        <GymMakerFormEdit />
                        <HallMakerFormEdit />
                    </div>
                </section>
            </main>
            <Ender />
        </>
    );
};

export default GraphMakerEdit;
