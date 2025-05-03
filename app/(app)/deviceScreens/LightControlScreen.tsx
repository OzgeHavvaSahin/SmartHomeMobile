import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  SafeAreaView, 
  StatusBar,
  Image 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, router } from 'expo-router';

// // Available colors for the light
// type LightColor = 'red' | 'green' | 'blue' | 'yellow';

// export default function LightControlScreen() {
//   // Get params from Expo Router
//   const params = useLocalSearchParams();
  
//   // Define defaults in case params are missing
//   const defaultParams = {
//     id: '1',
//     name: 'Salon Lambası',
//     isOn: 'false',
//     color: 'yellow'
//   };
  
//   // Use params or defaults
//   const deviceId = params.id as string || defaultParams.id;
//   const deviceName = params.name as string || defaultParams.name;
//   const initialIsOn = params.isOn === 'true';
//   const initialColor = (params.color as string) || defaultParams.color;
  
//   // State to track light status
//   const [isOn, setIsOn] = useState(initialIsOn);
//   const [color, setColor] = useState<LightColor>((initialColor as LightColor) || 'yellow');
//   const [lastToggled, setLastToggled] = useState<Date | null>(null);

//   // Toggle light on/off
//   const toggleLight = () => {
//     setIsOn(!isOn);
//     setLastToggled(new Date());
//   };

//   // Change light color
//   const changeColor = (newColor: LightColor) => {
//     setColor(newColor);
//     setLastToggled(new Date());
    
//     // If light is off, turn it on when color is changed
//     if (!isOn) {
//       setIsOn(true);
//     }
//   };

//   // Get background color based on selected color
//   const getColorValue = (colorName: LightColor): string => {
//     switch (colorName) {
//       case 'red': return '#F44336';
//       case 'green': return '#4CAF50';
//       case 'blue': return '#2196F3';
//       case 'yellow': return '#FFC107';
//       default: return '#FFC107'; // Default to yellow
//     }
//   };

//   // Format last toggled time
//   const formatTime = (date: Date | null) => {
//     if (!date) return 'Henüz değişiklik yok';
    
//     return date.toLocaleTimeString('tr-TR', {
//       hour: '2-digit',
//       minute: '2-digit',
//       second: '2-digit',
//     });
//   };

//   // Go back to previous screen
//   const handleGoBack = () => {
//     router.back();
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <StatusBar barStyle="dark-content" />
      
//       {/* Header with back button */}
//       <View style={styles.header}>
//         <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
//           <Ionicons name="arrow-back" size={24} color="#333" />
//         </TouchableOpacity>
//         <Text style={styles.headerTitle}>Lamba Kontrolü</Text>
//         <View style={styles.placeholderRight} />
//       </View>
      
//       {/* Device name */}
//       <Text style={styles.deviceName}>{deviceName}</Text>
      
//       {/* Light status visualization */}
//       <View style={styles.statusContainer}>
//         <View 
//           style={[
//             styles.lightBulb, 
//             isOn && { backgroundColor: getColorValue(color) },
//             !isOn && styles.lightOff
//           ]} 
//         >
//           <Ionicons 
//             name="bulb-outline" 
//             size={80} 
//             color={isOn ? "#FFF" : "#777"} 
//           />
//         </View>
//         <Text style={[styles.statusText, isOn ? styles.onText : styles.offText]}>
//           {isOn ? 'Lamba Açık' : 'Lamba Kapalı'}
//         </Text>
//       </View>
      
//       {/* Color selection */}
//       <View style={styles.colorContainer}>
//         <Text style={styles.colorTitle}>Renk Seçimi</Text>
//         <View style={styles.colorOptions}>
//           <TouchableOpacity 
//             style={[
//               styles.colorOption, 
//               { backgroundColor: '#F44336' },
//               color === 'red' && styles.selectedColor
//             ]} 
//             onPress={() => changeColor('red')}
//           />
//           <TouchableOpacity 
//             style={[
//               styles.colorOption, 
//               { backgroundColor: '#4CAF50' },
//               color === 'green' && styles.selectedColor
//             ]} 
//             onPress={() => changeColor('green')}
//           />
//           <TouchableOpacity 
//             style={[
//               styles.colorOption, 
//               { backgroundColor: '#2196F3' },
//               color === 'blue' && styles.selectedColor
//             ]} 
//             onPress={() => changeColor('blue')}
//           />
//           <TouchableOpacity 
//             style={[
//               styles.colorOption, 
//               { backgroundColor: '#FFC107' },
//               color === 'yellow' && styles.selectedColor
//             ]} 
//             onPress={() => changeColor('yellow')}
//           />
//         </View>
//       </View>
      
//       {/* Status details */}
//       <View style={styles.detailsContainer}>
//         <View style={styles.detailRow}>
//           <Text style={styles.detailLabel}>Durum:</Text>
//           <View style={styles.statusIndicatorContainer}>
//             <View style={[
//               styles.statusIndicator, 
//               isOn ? { backgroundColor: getColorValue(color) } : styles.offIndicator
//             ]} />
//             <Text style={styles.detailValue}>
//               {isOn ? 'Açık' : 'Kapalı'}
//             </Text>
//           </View>
//         </View>
        
//         <View style={styles.detailRow}>
//           <Text style={styles.detailLabel}>Renk:</Text>
//           <View style={styles.statusIndicatorContainer}>
//             <View style={[
//               styles.statusIndicator, 
//               { backgroundColor: getColorValue(color) }
//             ]} />
//             <Text style={styles.detailValue}>
//               {color.charAt(0).toUpperCase() + color.slice(1)}
//             </Text>
//           </View>
//         </View>
        
//         <View style={styles.detailRow}>
//           <Text style={styles.detailLabel}>Cihaz ID:</Text>
//           <Text style={styles.detailValue}>{deviceId}</Text>
//         </View>
        
//         <View style={styles.detailRow}>
//           <Text style={styles.detailLabel}>Son Değişiklik:</Text>
//           <Text style={styles.detailValue}>{formatTime(lastToggled)}</Text>
//         </View>
//       </View>
      
//       {/* Bottom action buttons */}
//       <View style={styles.bottomButtonContainer}>
//         {/* Toggle button */}
//         <TouchableOpacity 
//           style={[styles.toggleButton, isOn ? styles.offButton : styles.onButton]} 
//           onPress={toggleLight}
//         >
//           <Text style={styles.toggleButtonText}>
//             {isOn ? 'Lambayı Kapat' : 'Lambayı Aç'}
//           </Text>
//         </TouchableOpacity>
        
//         {/* Power button */}
//         <TouchableOpacity 
//           style={styles.powerButton} 
//           onPress={toggleLight}
//         >
//           <Ionicons 
//             name="power" 
//             size={30} 
//             color={isOn ? "#F44336" : "#4CAF50"} 
//           />
//         </TouchableOpacity>
//       </View>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f8f9fa',
//   },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     paddingHorizontal: 16,
//     paddingVertical: 12,
//     borderBottomWidth: 1,
//     borderBottomColor: '#e0e0e0',
//   },
//   backButton: {
//     padding: 8,
//   },
//   headerTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#333',
//   },
//   placeholderRight: {
//     width: 40, // Same width as back button for centering
//   },
//   deviceName: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     textAlign: 'center',
//     marginTop: 24,
//     marginBottom: 16,
//     color: '#333',
//   },
//   statusContainer: {
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginVertical: 20,
//   },
//   lightBulb: {
//     width: 150,
//     height: 150,
//     borderRadius: 75,
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginBottom: 16,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.3,
//     shadowRadius: 5,
//     elevation: 8,
//   },
//   lightOff: {
//     backgroundColor: '#d1d1d1',
//   },
//   statusText: {
//     fontSize: 22,
//     fontWeight: 'bold',
//   },
//   onText: {
//     color: '#4CAF50',
//   },
//   offText: {
//     color: '#757575',
//   },
//   colorContainer: {
//     marginHorizontal: 16,
//     marginBottom: 20,
//   },
//   colorTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 12,
//     color: '#333',
//   },
//   colorOptions: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },
//   colorOption: {
//     width: 60,
//     height: 60,
//     borderRadius: 30,
//     borderWidth: 1,
//     borderColor: '#ddd',
//   },
//   selectedColor: {
//     borderWidth: 3,
//     borderColor: '#333',
//     transform: [{ scale: 1.1 }],
//   },
//   detailsContainer: {
//     backgroundColor: '#ffffff',
//     borderRadius: 12,
//     padding: 16,
//     marginHorizontal: 16,
//     marginVertical: 12,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 2,
//   },
//   detailRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingVertical: 12,
//     borderBottomWidth: 1,
//     borderBottomColor: '#f0f0f0',
//   },
//   detailLabel: {
//     fontSize: 16,
//     color: '#666',
//   },
//   detailValue: {
//     fontSize: 16,
//     fontWeight: '500',
//     color: '#333',
//   },
//   statusIndicatorContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   statusIndicator: {
//     width: 12,
//     height: 12,
//     borderRadius: 6,
//     marginRight: 8,
//   },
//   offIndicator: {
//     backgroundColor: '#757575',
//   },
//   bottomButtonContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginHorizontal: 16,
//     marginTop: 24,
//     marginBottom: 16,
//   },
//   toggleButton: {
//     flex: 1,
//     paddingVertical: 16,
//     borderRadius: 12,
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginRight: 12,
//   },
//   onButton: {
//     backgroundColor: '#4CAF50', // green
//   },
//   offButton: {
//     backgroundColor: '#F44336', // red
//   },
//   toggleButtonText: {
//     color: '#ffffff',
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   powerButton: {
//     width: 60,
//     height: 60,
//     borderRadius: 30,
//     backgroundColor: '#f0f0f0',
//     alignItems: 'center',
//     justifyContent: 'center',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.2,
//     shadowRadius: 3,
//     elevation: 4,
//   },
// });