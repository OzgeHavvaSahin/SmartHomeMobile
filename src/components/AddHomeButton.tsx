// components/AddHomeButton.tsx
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
  ActivityIndicator
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Define the interface for a new house
interface NewHouse {
  name: string;
  address: string;
}

interface AddHomeButtonProps {
  onAddHouse: (house: NewHouse) => Promise<boolean>;
  disabled?: boolean;
}

export default function AddHomeButton({ onAddHouse, disabled = false }: AddHomeButtonProps) {
  const [modalVisible, setModalVisible] = useState(false);
  const [newHouseName, setNewHouseName] = useState('');
  const [newHouseAddress, setNewHouseAddress] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAddHouse = async () => {
    // Validate inputs
    if (newHouseName.trim() === '' || newHouseAddress.trim() === '') {
      setError('Lütfen tüm alanları doldurun.');
      return;
    }

    setError(null);
    setIsSubmitting(true);

    try {
      // Create the new house object
      const newHouse = {
        name: newHouseName,
        address: newHouseAddress,
      };

      // Call the async callback function
      const success = await onAddHouse(newHouse);

      if (success) {
        // Reset the form and close the modal
        setNewHouseName('');
        setNewHouseAddress('');
        setModalVisible(false);
      } else {
        setError('Ev eklenirken bir hata oluştu. Lütfen tekrar deneyin.');
      }
    } catch (error) {
      console.error('Error in handleAddHouse:', error);
      setError('Beklenmeyen bir hata oluştu. Lütfen tekrar deneyin.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <TouchableOpacity 
        style={[
          styles.addHouseButton,
          disabled && styles.disabledButton
        ]}
        onPress={() => setModalVisible(true)}
        disabled={disabled}
      >
        <Ionicons name="add-circle-outline" size={20} color="#4CAF50" style={styles.addIcon} />
        <Text style={styles.addHouseButtonText}>Yeni Ev Ekle</Text>
      </TouchableOpacity>

      {/* Add House Modal */}
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
              <Text style={styles.modalTitle}>Yeni Ev Ekle</Text>
              
              {error && (
                <View style={styles.errorContainer}>
                  <Text style={styles.errorText}>{error}</Text>
                </View>
              )}
              
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Ev Adı</Text>
                <TextInput
                  style={styles.input}
                  value={newHouseName}
                  onChangeText={setNewHouseName}
                  placeholder="Örn: Ana Ev, Yazlık Ev"
                  editable={!isSubmitting}
                />
              </View>
              
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Adres</Text>
                <TextInput
                  style={styles.input}
                  value={newHouseAddress}
                  onChangeText={setNewHouseAddress}
                  placeholder="Örn: İstanbul, Kadıköy"
                  multiline
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
                  onPress={handleAddHouse}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <ActivityIndicator size="small" color="#fff" />
                  ) : (
                    <Text style={styles.saveButtonText}>Kaydet</Text>
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
  addHouseButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#4CAF50',
    borderRadius: 8,
    borderStyle: 'dashed',
  },
  addIcon: {
    marginRight: 8,
  },
  addHouseButtonText: {
    color: '#4CAF50',
    fontWeight: '500',
  },
  disabledButton: {
    opacity: 0.5,
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
  disabledSaveButton: {
    opacity: 0.7,
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
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
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
  saveButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: 'white',
  },
});