import { DeviceType } from "../interfaces/components";

// Get appropriate icon based on device type
export const getDeviceIcon = (type: DeviceType, isActive: boolean) => {
  switch (type) {
    case 'light':
      return isActive 
        ? require('../assets/images/light.png')
        : require('../assets/images/light.png');
    case 'doorSensor':
      return isActive 
        ? require('../assets/images/door-closed.png')
        : require('../assets/images/door-open.png');
    case 'windowSensor':
      return isActive 
        ? require('../assets/images/window-closed.png')
        : require('../assets/images/window-open.png');
    case 'camera':
      return isActive 
        ? require('../assets/images/camera.png')
        : require('../assets/images/camera.png');
    default:
      return require('../assets/images/robot.png');
  }
};

// Get status text based on device type and state
export const getStatusText = (type: DeviceType, isActive: boolean) => {
  switch (type) {
    case 'light':
      return isActive ? 'Açık' : 'Kapalı';
    case 'doorSensor':
      return isActive ? 'Kapalı' : 'Açık'; // Note the reversal for sensors
    case 'windowSensor':
      return isActive ? 'Kapalı' : 'Açık'; // Note the reversal for sensors
    case 'camera':
      return isActive ? 'Aktif' : 'Pasif';
    default:
      return isActive ? 'Açık' : 'Kapalı';
  }
};