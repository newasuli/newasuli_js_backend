import {Request, Response} from 'express';
import {Menu} from '../models/Menu.js'
const fetchMenu = async (req: Request, res: Response) => {
  try {
    const menu = await Menu.find();
    res.status(200).json({ status: 'success', data: menu });
  } catch (error: any) {
    res.status(500).json({ error: 'Failed to fetch menu' });
  }
}

export { fetchMenu };