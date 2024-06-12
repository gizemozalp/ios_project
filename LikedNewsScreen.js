import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

const LikedNewsScreen = ({ route }) => {
  const { likedNews } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Beğenilen Haberler</Text>
      <ScrollView contentContainerStyle={styles.newsContainer}>
        {likedNews.length === 0 ? (
          <Text style={styles.noNewsText}>Beğenilen haber bulunamadı.</Text>
        ) : (
          likedNews.map((item, index) => (
            <View key={index} style={styles.newsItem}>
              <Text style={styles.newsItemTitle}>{item.title}</Text>
              <Text>{item.description}</Text>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  newsContainer: {
    flexGrow: 1,
  },
  noNewsText: {
    textAlign: 'center',
    fontSize: 16,
    marginTop: 20,
  },
  newsItem: {
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  newsItemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default LikedNewsScreen;
