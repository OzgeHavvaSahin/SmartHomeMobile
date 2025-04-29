import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    formContainer: {
      marginBottom: 20,
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#f5f5f5',
      borderRadius: 8,
      marginBottom: 16,
      paddingHorizontal: 12,
      borderWidth: 1,
      borderColor: '#e0e0e0',
    },
    inputIcon: {
      marginRight: 10,
    },
    input: {
      flex: 1,
      paddingVertical: 16,
      fontSize: 16,
      color: '#333',
    },
    passwordVisibility: {
      padding: 10,
    },
    forgotPassword: {
      alignSelf: 'flex-end',
      marginBottom: 20,
    },
    forgotPasswordText: {
      color: '#4CAF50',
      fontSize: 14,
    },
    signInButton: {
      backgroundColor: '#4CAF50',
      borderRadius: 8,
      paddingVertical: 16,
      alignItems: 'center',
    },
    disabledButton: {
      opacity: 0.7,
    },
    signInButtonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold',
    },
    signUpContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginTop: 20,
    },
    signUpText: {
      color: '#666',
      fontSize: 14,
      marginRight: 5,
    },
    signUpLink: {
      color: '#4CAF50',
      fontSize: 14,
      fontWeight: 'bold',
    },
  });