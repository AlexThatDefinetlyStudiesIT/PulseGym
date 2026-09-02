import axios from 'axios';
import { IGym, IGymState } from '../components/types/types';
import { IHall, IHallState } from '../components/types/types_hall';

export class GymApi {
    //залы
    static async createGym(gym: Partial<IGym>): Promise<IGymState[]> {
        const res = await axios.post('http://localhost:3001/gyms', gym);
        return res.data;
    }
    static async deleteGym(id: string): Promise<void> {
        await axios.delete(`http://localhost:3001/gyms/${id}`);
    }
    static async getAllGyms(): Promise<IGym[]> {
        const res = await axios.get('http://localhost:3001/gyms');
        return res.data;
    }
    //маршруты
    static async createHall(hall: Partial<IHall>): Promise<IHallState[]> {
        const res = await axios.post('http://localhost:3001/hallways', hall);
        return res.data;
    }
    static async deleteHall(id: string): Promise<void> {
        await axios.delete(`http://localhost:3001/hallways/${id}`);
    }  
    static async getAllHalls(): Promise<IHall[]> {
        const res = await axios.get('http://localhost:3001/hallways');
        return res.data;
    }
}