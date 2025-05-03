import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { router } from 'expo-router';
import LogoHeader from '@/src/components/LogoHeader/LogoHeader';
import ErrorMessage from '@/src/components/ErrorMessage/ErrorMessage';
import { useAuth } from '@/src/context/AuthContext';
import SignInForm from '@/src/components/auth/SingInForm';

export default function SignInScreen() {
  // State management
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);
  
  // Get auth context
  const { authState, login, clearError } = useAuth();
  const { loading: isLoading, error: authError, isAuthenticated } = authState;
  
  // Combine local and auth errors
  const error = localError || authError;
  
  // Clear errors when component mounts or unmounts
  useEffect(() => {
    clearError();
    return () => clearError();
  }, []);
  
  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      router.navigate("/(tabs)");
    }
  }, [isAuthenticated]);

  const handleSignIn = async () => {
    // Validate form
    if (!email.trim() || !password.trim()) {
      setLocalError('Lütfen e-posta ve şifrenizi girin.');
      return;
    }
    
    // Clear local errors
    setLocalError(null);

    try {
      // Call login from auth context
      await login({ email, password });
      // Navigation will happen automatically due to the useEffect above
    } catch (error: any) {
      // The error is already set in the context, no need to set it here
      console.error('Sign in error:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}
      >
        <ScrollView contentContainerStyle={styles.scrollView}>
          {/* Logo and Welcome Text */}
          <LogoHeader
            title="Akıllı Ev Uygulamasına Hoş Geldiniz"
            subtitle="Giriş yaparak evinizi kontrol edin"
            logoSource={require('@/src/assets/images/ai.png')}
          />

          {/* Error Message */}
          <ErrorMessage message={error} />

          {/* Login Form */}
          <SignInForm
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            isLoading={isLoading}
            onSubmit={handleSignIn}
            showPassword={showPassword}
            setShowPassword={setShowPassword}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollView: {
    flexGrow: 1,
    padding: 20,
  },
});