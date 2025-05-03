import { createAuthRequest } from './ApiService';
import { 
  Room,
} from '../interfaces/components'; // Assuming you've added these to the interfaces file
import { Device } from '../components/RoomList/RoomListUI';

/**
 * Get all rooms for a specific home
 * @returns {Promise<Room[]>} - Array of rooms
 */
export const getAllRooms = async (): Promise<Room[]> => {
  try {
    const response = await createAuthRequest(`/Homes/GetRoomsBy`, 'GET');
    
    console.log('Response status:', response.status);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('API error response:', errorText);
      throw new Error(`API error: ${response.status} ${response.statusText}. ${errorText}`);
    }
    
    const responseText = await response.text();
    console.log('Raw response text:', responseText);
    
    if (!responseText || responseText.trim() === '') {
      return [];
    }
    
    try {
      return JSON.parse(responseText);
    } catch (parseError) {
      console.error('Failed to parse response:', responseText);
      throw new Error('API returned invalid JSON format');
    }
  } catch (error: any) {
    console.error('Get rooms error:', error);
    throw error;
  }
};

/**
/**
 * Get all rooms for a specific home
 * @param {number} homeId - The ID of the home to get rooms for
 * @returns {Promise<Room[]>} - Array of rooms
 */
export const getAllRoomsbyHomeID = async (homeId: number): Promise<Room[]> => {
  try {
    const response = await createAuthRequest(`/Homes/GetRoomsBy/${homeId}`, 'GET');
    
    console.log('Response status:', response.status);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('API error response:', errorText);
      throw new Error(`API error: ${response.status} ${response.statusText}. ${errorText}`);
    }
    
    const responseText = await response.text();
    console.log('Raw response text:', responseText);
    
    if (!responseText || responseText.trim() === '') {
      return [];
    }
    
    try {
      return JSON.parse(responseText);
    } catch (parseError) {
      console.error('Failed to parse response:', responseText);
      throw new Error('API returned invalid JSON format');
    }
  } catch (error: any) {
    console.error('Get rooms error:', error);
    throw error;
  }
};

/**
 * Get a specific room by ID
 * @param {number} roomId - The ID of the room to retrieve
 * @returns {Promise<Room>} - Room details
 */
export const getRoomById = async (roomId: number): Promise<Room> => {
  try {
    const response = await createAuthRequest(`/Rooms/GetRoomBy/${roomId}`, 'GET');
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(errorData?.message || 'Oda detaylarını getirme başarısız oldu');
    }
    
    return await response.json();
  } catch (error: any) {
    console.error('Get room details error:', error);
    throw error;
  }
};

/**
 * Create a new room
 * @param {number} homeId - The ID of the home to add room to
 * @param {object} roomData - The room data to create
 * @returns {Promise<Room>} - The created room
 */
export const createRoom = async (
  homeId: number,
  roomData: { name: string }
): Promise<Room> => {
  try {
    const payload = {
      ...roomData,
      homeId
    };
    
    const response = await createAuthRequest('/Rooms/CreateRoom', 'POST', payload);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(errorData?.message || 'Oda oluşturma başarısız oldu');
    }
    
    return await response.json();
  } catch (error: any) {
    console.error('Create room error:', error);
    throw error;
  }
};

/**
 * Update an existing room
 * @param {number} roomId - The ID of the room to update
 * @param {object} roomData - The updated room data
 * @returns {Promise<Room>} - The updated room
 */
export const updateRoom = async (
  roomId: number, 
  roomData: { name: string }
): Promise<Room> => {
  try {
    const response = await createAuthRequest(`/Rooms/UpdateRoomBy/${roomId}`, 'PUT', roomData);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(errorData?.message || 'Oda güncelleme başarısız oldu');
    }
    
    return await response.json();
  } catch (error: any) {
    console.error('Update room error:', error);
    throw error;
  }
};

/**
 * Delete a room
 * @param {number} roomId - The ID of the room to delete
 * @returns {Promise<void>}
 */
export const deleteRoom = async (roomId: number): Promise<void> => {
  try {
    const response = await createAuthRequest(`/Rooms/DeleteRoomBy/${roomId}`, 'DELETE');
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(errorData?.message || 'Oda silme başarısız oldu');
    }
  } catch (error: any) {
    console.error('Delete room error:', error);
    throw error;
  }
};

/**
 * Fetch all devices for a specific room
 * @param {number} roomId - The ID of the room to fetch devices for
 * @returns {Promise<Device[]>} - Array of devices
 */
export const fetchRoomDevices = async (roomId: number): Promise<Device[]> => {
  try {
    const response = await createAuthRequest(`/Devices/GetAllDevicesByRoom/${roomId}`, 'GET');
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('API error response:', errorText);
      throw new Error(`API error: ${response.status} ${response.statusText}. ${errorText}`);
    }
    
    const responseText = await response.text();
    
    if (!responseText || responseText.trim() === '') {
      return [];
    }
    
    try {
      return JSON.parse(responseText);
    } catch (parseError) {
      console.error('Failed to parse response:', responseText);
      throw new Error('API returned invalid JSON format');
    }
  } catch (error: any) {
    console.error('Fetch room devices error:', error);
    throw error;
  }
};

