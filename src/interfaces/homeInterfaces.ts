export interface GetAllHomesResponse {
    id: number;
    name: string;
    ownerId: number;
  }

export interface CreateHomeRequest {
  ownerID: number;
  name: string;
}  

export interface CreateHomeResponse {
  homeId: number;
  name: string;
}