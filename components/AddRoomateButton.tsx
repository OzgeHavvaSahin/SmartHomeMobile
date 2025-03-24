// components/AddRoommateButton.tsx
import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Modal, 
  TextInput,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  ActivityIndicator,
  Image
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Define the interface for a new roommate
interface NewRoommate {
  name: string;
  email: string;
  // In a real app, you might add more fields like phone number
}

interface AddRoommateButtonProps {
  houseId: string;
  onAddRoommate: (houseId: string, roommate: NewRoommate) => Promise<boolean>;
  disabled?: boolean;
}

export default function AddRoommateButton({ 
  houseId, 
  onAddRoommate, 
  disabled = false 
}: AddRoommateButtonProps) {
  const [modalVisible, setModalVisible] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAddRoommate = async () => {
    // Validate inputs
    if (name.trim() === '' || email.trim() === '') {
      setError('Lütfen tüm alanları doldurun.');
      return;
    }

    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Lütfen geçerli bir e-posta adresi girin.');
      return;
    }

    setError(null);
    setIsSubmitting(true);

    try {
      // Create the new roommate object
      const newRoommate = {
        name,
        email,
      };

      // Call the async callback function
      const success = await onAddRoommate(houseId, newRoommate);

      if (success) {
        // Reset the form and close the modal
        setName('');
        setEmail('');
        setModalVisible(false);
      } else {
        setError('Ev arkadaşı eklenirken bir hata oluştu. Lütfen tekrar deneyin.');
      }
    } catch (error) {
      console.error('Error in handleAddRoommate:', error);
      setError('Beklenmeyen bir hata oluştu. Lütfen tekrar deneyin.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <TouchableOpacity 
        style={[styles.inviteButton, disabled && styles.disabledButton]}
        onPress={() => setModalVisible(true)}
        disabled={disabled}
      >
        <Ionicons name="person-add-outline" size={16} color="#fff" style={styles.inviteIcon} />
        <Text style={styles.inviteButtonText}>Ev Arkadaşı Ekle</Text>
      </TouchableOpacity>

      {/* Add Roommate Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <KeyboardAvoidingView 
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.modalContainer}
          >
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Ev Arkadaşı Ekle</Text>
              
              {error && (
                <View style={styles.errorContainer}>
                  <Text style={styles.errorText}>{error}</Text>
                </View>
              )}
              
              {/* Default Avatar Preview */}
              <View style={styles.avatarContainer}>
                <Image 
                  source={require('../assets/images/robot.png')} 
                  style={styles.avatarImage} 
                />
                <Text style={styles.avatarHint}>
                  Profil fotoğrafı sistem tarafından oluşturulacak
                </Text>
              </View>
              
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>İsim Soyisim</Text>
                <TextInput
                  style={styles.input}
                  value={name}
                  onChangeText={setName}
                  placeholder="Örn: Ayşe Kaya"
                  editable={!isSubmitting}
                />
              </View>
              
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>E-posta Adresi</Text>
                <TextInput
                  style={styles.input}
                  value={email}
                  onChangeText={setEmail}
                  placeholder="Örn: ayse.kaya@example.com"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  editable={!isSubmitting}
                />
              </View>
              
              <View style={styles.modalButtons}>
                <TouchableOpacity 
                  style={styles.cancelButton}
                  onPress={() => setModalVisible(false)}
                  disabled={isSubmitting}
                >
                  <Text style={styles.cancelButtonText}>İptal</Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={[styles.saveButton, isSubmitting && styles.disabledSaveButton]}
                  onPress={handleAddRoommate}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <ActivityIndicator size="small" color="#fff" />
                  ) : (
                    <Text style={styles.saveButtonText}>Davet Gönder</Text>
                  )}
                </TouchableOpacity>
              </View>
            </View>
          </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  inviteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4CAF50',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginTop: 12,
  },
  inviteIcon: {
    marginRight: 8,
  },
  inviteButtonText: {
    color: '#fff',
    fontWeight: '500',
  },
  disabledButton: {
    opacity: 0.5,
  },
  
  // Modal styles
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    marginHorizontal: 20,
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
    color: '#333',
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  avatarImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 8,
    backgroundColor: '#e0e0e0',
  },
  avatarHint: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 16,
    marginBottom: 8,
    color: '#444',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  errorContainer: {
    backgroundColor: '#FFEBEE',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  errorText: {
    color: '#D32F2F',
    fontSize: 14,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 12,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    marginRight: 8,
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#666',
  },
  saveButton: {
    flex: 1,
    paddingVertical: 12,
    backgroundColor: '#4CAF50',
    borderRadius: 8,
    marginLeft: 8,
    alignItems: 'center',
  },
  disabledSaveButton: {
    opacity: 0.7,
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: 'white',
  },
});