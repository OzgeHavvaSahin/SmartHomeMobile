import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { LogoHeaderProps } from '../../interfaces/components';
import { styles } from './LogoHeader.styles';

const LogoHeader: React.FC<LogoHeaderProps> = ({ title, subtitle, logoSource }) => {
  return (
    <View style={styles.logoContainer}>
      <Image source={logoSource} style={styles.logo} />
      <Text style={styles.welcomeText}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </View>
  );
};

export default LogoHeader;