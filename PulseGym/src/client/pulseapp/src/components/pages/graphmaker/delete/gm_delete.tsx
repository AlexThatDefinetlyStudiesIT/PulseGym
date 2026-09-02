import { Header } from '../../../Header/Header';
import { Ender } from '../../../Ender/Ender';
import '../graphmaker.css';
import { CRUDNav } from '../../../CRUDNav/CRUDNav';
import { HallMakerFormDel } from '../../../Forms/HallMakerFormDelete/HallMakerForm';
import { GymMakerFormDel } from '../../../Forms/GymMakerFormDelete/GymMakerFormDelete';
import ConsoleLogger from '../../../consoleLogger/consoleLogger';

export const GraphMakerDel = () => {
    return (
        <>
            <Header />
            <div className="console-logger-wrapper">
                <ConsoleLogger />
            </div>
            <main className="main-content">
                <section className="text-container">
                    <p>Чтобы удалить Зал, нужно ввести его уникальный id. Удалить можно только существующий Зал. При его удалении автоматически удаляются все Маршруты, связанные с этим Залом.</p>
                    <p>Чтобы удалить Маршрут, нужно ввести id Залов, которые он соединяет. Удалить можно только существующий Маршрут.</p>
                    <p>При вводе используйте целые положительные числа.</p>
                    <p>Для возвращения к графу перейдите в раздел "Алгоритм".</p>
                </section>
                <section className="forms-container">
                    <CRUDNav/>
                    <div className="forms-wrapper">
                        <GymMakerFormDel />
                        <HallMakerFormDel />
                    </div>
                </section>
            </main>
            <Ender />
        </>
    );
};

export default GraphMakerDel;
