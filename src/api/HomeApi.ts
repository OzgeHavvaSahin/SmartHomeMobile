import { createAuthRequest } from './ApiService';
import
 { GetAllHomesResponse,
   CreateHomeRequest,   
   CreateHomeResponse
 } from '../interfaces/components'; // You'll need to create this interface

/**
 * Get all homes for the authenticated user
 * @returns {Promise<GetAllHomesResponse[]>} - Array of homes
 */
export const getAllHomes = async (): Promise<GetAllHomesResponse[]> => {
  try {
    const response = await createAuthRequest('/Homes/GetAllHomes', 'GET');
    
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
    console.error('Get homes error:', error);
    throw error;
  }
};
/**
* Get a specific home by HomeID
 * @param {number} ownerId - The ID of the home to retrieve
  * @returns {Promise<GetAllHomesResponse>} - Home details
 */
export const getHomeByHomeId = async (ownerId: number): Promise<GetAllHomesResponse> => {
  try {
    const response = await createAuthRequest(`/Homes/GetHomeBy/${ownerId}`, 'GET');
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Ev detaylarını getirme başarısız oldu');
    }
    
    return data;
  } catch (error: any) {
    console.error('Get home details error:', error);
    throw error;
  }
};

/**
* Get a specific home by ID
 * @param {number} ownerId - The ID of the home to retrieve
  * @returns {Promise<GetAllHomesResponse>} - Home details
 */
export const getHomesbyOwnerId = async (ownerId: number): Promise<GetAllHomesResponse[]> => {
  try {
    const response = await createAuthRequest(`/Homes/GetAllHomesByUser/${ownerId}`, 'GET');
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Ev detaylarını getirme başarısız oldu');
    }
    
    return data;
  } catch (error: any) {
    console.error('Get home details error:', error);
    throw error;
  }
};


/**
 * Create a new home
 * @param {CreateHomeRequest} homeData - The home data to create
 * @returns {Promise<CreateHomeResponse>} - The created home
 */
export const createHome = async (homeData: CreateHomeRequest ): Promise<CreateHomeResponse> => {
  try {
    const response = await createAuthRequest('/Homes/CreateHome', 'POST', homeData);
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Ev oluşturma başarısız oldu');
    }
    
    return data;
  } catch (error: any) {
    console.error('Create home error:', error);
    throw error;
  }
};

/**
 * Update an existing home
 * @param {number} ownerId - The ID of the home to update
 * @param {object} homeData - The updated home data
 * @returns {Promise<Home>} - The updated home
 */
// export const updateHome = async (
//   ownerId: number, 
//   homeData: { name: string }
// ): Promise<Home> => {
//   try {
//     const response = await createAuthRequest(`/Homes/${ownerId}`, 'PUT', homeData);
    
//     const data = await response.json();
    
//     if (!response.ok) {
//       throw new Error(data.message || 'Ev güncelleme başarısız oldu');
//     }
    
//     return data;
//   } catch (error: any) {
//     console.error('Update home error:', error);
//     throw error;
//   }
// };

/**
 * Delete a home
 * @param {number} ownerId - The ID of the home to delete
 * @returns {Promise<void>}
 */
export const deleteHome = async (ownerId: number): Promise<void> => {
  try {
    const response = await createAuthRequest(`/Homes/DeleteHomeBy/${ownerId}`, 'DELETE');
    
    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.message || 'Ev silme başarısız oldu');
    }
  } catch (error: any) {
    console.error('Delete home error:', error);
    throw error;
  }
};