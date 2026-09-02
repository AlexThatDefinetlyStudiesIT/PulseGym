import { Routes, Route } from 'react-router-dom';
import { Home } from '../pages/home/Home';
import { Inventory } from '../pages/inventory/Inventory';
import GraphMakerDel from '../pages/graphmaker/delete/gm_delete';
import { GraphMakerCreate } from '../pages/graphmaker/create/gm_create';
import GraphMakerEdit from '../pages/graphmaker/edit/gm_edit';

export const Layout = () => {
    return (
        <div className="content">
            <div className="routes">
                <Routes>
                    <Route path='/inventory' element={<Inventory />} />
                    <Route path='/inventory/graphmaker' element={<GraphMakerCreate />} />
                    <Route path='/inventory/graphmaker/del' element={<GraphMakerDel />} />
                    <Route path='/inventory/graphmaker/edit' element={<GraphMakerEdit />} />
                    <Route path='/' element={<Home />} />
                </Routes>
            </div>
        </div>
    );
}

export default Layout;
