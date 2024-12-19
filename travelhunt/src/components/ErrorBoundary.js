import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };  // Update state to display fallback UI
  }

  componentDidCatch(error, errorInfo) {
    console.log('Error caught in ErrorBoundary: ', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Something went wrong.</Text>
        </View>
      );
    }

    return this.props.children;  // Render children if no error
  }
}

const styles = StyleSheet.create({
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FF6F61',  // You can customize the background color
  },
  errorText: {
    color: '#FAF9F6',  // Text color for error message
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default ErrorBoundary;
