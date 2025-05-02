// src/components/ApiTest/ApiTest.tsx
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { TokenManager, API_URL } from '../api/ApiService';

const ApiTest = () => {
  const [result, setResult] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const checkToken = async () => {
    setLoading(true);
    try {
      const token = await TokenManager.getToken();
      setResult(`Token: ${token ? 'Found' : 'Not found'}`);
    } catch (error: any) {
      setResult(`Token error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const testDirectApi = async () => {
    setLoading(true);
    try {
      const token = await TokenManager.getToken();
      
      // Log complete request details
      console.log('Request URL:', `${API_URL}/Homes/GetAllHomes`);
      console.log('Authorization Header:', token ? 'Bearer token included' : 'No token');
      
      const response = await fetch(`${API_URL}/Homes/GetAllHomes`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          ...(token ? { 'Authorization': `Bearer ${token}` } : {})
        }
      });
      
      // Get response as text first
      const responseText = await response.text();
      console.log('Raw response:', responseText);
      
      setResult(`Status: ${response.status}\n\nResponse: ${responseText}`);
    } catch (error: any) {
      setResult(`API Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>API Connection Test</Text>
      
      <TouchableOpacity 
        style={styles.button} 
        onPress={checkToken} 
        disabled={loading}
      >
        <Text style={styles.buttonText}>Check Auth Token</Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={styles.button} 
        onPress={testDirectApi} 
        disabled={loading}
      >
        <Text style={styles.buttonText}>Test API Directly</Text>
      </TouchableOpacity>
      
      {loading && <ActivityIndicator size="large" color="#0066cc" style={styles.loader} />}
      
      {result ? (
        <View style={styles.resultContainer}>
          <Text style={styles.resultTitle}>Result:</Text>
          <Text style={styles.resultText}>{result}</Text>
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    margin: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#0066cc',
    padding: 12,
    borderRadius: 6,
    marginVertical: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  loader: {
    marginVertical: 16,
  },
  resultContainer: {
    marginTop: 16,
    padding: 12,
    backgroundColor: 'white',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  resultTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  resultText: {
    fontSize: 14,
    fontFamily: 'monospace',
  },
});

export default ApiTest;