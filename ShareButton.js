import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import Share from 'react-native-share';

const ShareButton = ({ title, message, url }) => {
  const shareOptions = {
    title: title,
    message: message,
    url: url,
  };

  const shareToSocialMedia = () => {
    Share.open(shareOptions)
      .then((res) => {
        console.log('Successfully shared:', res);
      })
      .catch((err) => {
        err && console.log('Error while sharing:', err);
      });
  };

  return (
    <TouchableOpacity style={styles.shareButton} onPress={shareToSocialMedia}>
      <Text style={styles.shareButtonText}>Paylaş</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  shareButton: {
    backgroundColor: '#1DA1F2', // Twitter mavisi
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  shareButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
  },
});

export default ShareButton;
