import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ErrorMessageProps } from '../../interfaces/components';
import { styles } from './ErrorMessage.styles';


const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  if (!message) return null;
  
  return (
    <View style={styles.errorContainer}>
      <Text style={styles.errorText}>{message}</Text>
    </View>
  );
};

export default ErrorMessage;