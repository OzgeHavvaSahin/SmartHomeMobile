import React, { useEffect, useState } from "react";
import RoomListUI from "./RoomListUI";
import { getAllRoomsbyHomeID  } from "@/src/api/RoomApi";
import { fetchRoomDevices } from "@/src/api/RoomApi";
import { DeviceType } from "@/src/interfaces/components";

export interface Device {
  id: number;
  name: string;
  type: DeviceType;
  description: string;
  isActive: boolean;
  roomId: string;
}

export interface Room {
  id: number;
  name: string;
  devices: Device[];
}

interface RoomListProps {
  ownerId: number;
  onAddDevice: (roomId: number) => void;
  onNavigateToDeviceDetails: (deviceId: number) => void;
}

const RoomList: React.FC<RoomListProps> = ({ ownerId, onAddDevice, onNavigateToDeviceDetails }) => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadRoomsAndDevices = async () => {
      try {
        setLoading(true);
        setError(null);

        const roomList = await getAllRoomsbyHomeID(ownerId);

        const roomsWithDevices: Room[] = await Promise.all(
          roomList.map(async (room: { id: number; name: string }) => {
            const devices = await fetchRoomDevices(Number(room.id));
            return {
              ...room,
              devices,
            };
          })
        );

        setRooms(roomsWithDevices);
      } catch (err) {
        console.error(err);
        setError("Odalar yüklenirken bir hata oluştu.");
      } finally {
        setLoading(false);
      }
    };

    loadRoomsAndDevices();
  }, [ownerId]);



  return (
    <RoomListUI
      rooms={rooms}
      onAddDevice={onAddDevice}
      onNavigateToDeviceDetails={onNavigateToDeviceDetails}
    />
  );
};

export default RoomList;
