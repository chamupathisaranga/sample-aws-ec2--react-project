import type { Item, CreateItemDto, UpdateItemDto } from '../types/item';

const API_URL = 'http://44.198.184.186:3000/items';

export const itemService = {
  async getAllItems(): Promise<Item[]> {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error('Failed to fetch items');
      return response.json();
    } catch (error) {
      console.error('Error fetching items:', error);
      throw error;
    }
  },

  async getItem(id: number): Promise<Item> {
    try {
      const response = await fetch(`${API_URL}/${id}`);
      if (!response.ok) throw new Error('Failed to fetch item');
      return response.json();
    } catch (error) {
      console.error(`Error fetching item ${id}:`, error);
      throw error;
    }
  },

  async createItem(data: CreateItemDto): Promise<Item> {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('Failed to create item');
      return response.json();
    } catch (error) {
      console.error('Error creating item:', error);
      throw error;
    }
  },

  async updateItem(id: number, data: UpdateItemDto): Promise<Item> {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('Failed to update item');
      return response.json();
    } catch (error) {
      console.error(`Error updating item ${id}:`, error);
      throw error;
    }
  },

  async deleteItem(id: number): Promise<void> {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete item');
    } catch (error) {
      console.error(`Error deleting item ${id}:`, error);
      throw error;
    }
  },
};
