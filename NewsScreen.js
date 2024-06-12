import React, { useState, useEffect, useRef } from 'react';
import { View, Text, ScrollView, ActivityIndicator, TouchableOpacity, StyleSheet, Modal, TextInput } from 'react-native';
import CommentComponent from './CommentComponent';
import * as Sharing from 'expo-sharing';

const NewsScreen = ({ navigation }) => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedNews, setSelectedNews] = useState(null);
  const [searchKeyword, setSearchKeyword] = useState('');
  const categoryListRef = useRef(null);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async (category = selectedCategory) => {
    try {
      setLoading(true);
      const response = await fetch(`https://newsapi.org/v2/top-headlines?country=tr${category ? `&category=${category}` : ''}&apiKey=f5d30a52f8914ba289e5f375719e9ff3`);
      const data = await response.json();
      const newsWithComments = data.articles.map(article => ({ ...article, comments: [] }));
      setNews(newsWithComments);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching news:', error);
      setLoading(false);
    }
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    fetchNews(category);
  };

  const handleNewsDetail = (selectedNews) => {
    setSelectedNews(selectedNews);
  };

  const handleSearch = () => {
    const filteredNews = news.filter(item =>
      item.title.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      (item.description && item.description.toLowerCase().includes(searchKeyword.toLowerCase()))
    );
    setNews(filteredNews);
  };

  const resetNews = () => {
    fetchNews();
  };

  const handleLike = (index) => {
    const updatedNews = [...news];
    updatedNews[index].liked = !updatedNews[index].liked;
    updatedNews[index].likes = updatedNews[index].likes || 0;
    updatedNews[index].likes += updatedNews[index].liked ? 1 : -1;
    setNews(updatedNews);
  };

  const addComment = (index, comment) => {
    const updatedNews = [...news];
    updatedNews[index].comments.push(comment);
    setNews(updatedNews);
  };

  const navigateToLikedNews = () => {
    navigation.navigate('LikedNews', { likedNews: news.filter(item => item.liked) });
  };

  const shareArticle = async (article) => {
    try {
      await Sharing.shareAsync(article.url, {
        dialogTitle: 'Haberi Paylaş',
        mimeType: 'text/plain',
      });
    } catch (error) {
      console.error('Error sharing article:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TextInput
          placeholder="Haber ara"
          style={styles.searchInput}
          value={searchKeyword}
          onChangeText={(text) => setSearchKeyword(text)}
        />
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Text style={styles.searchButtonText}>Ara</Text>
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={styles.categoriesContainer}>
        <ScrollView
          ref={categoryListRef}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryScrollView}
        >
          <TouchableOpacity
            style={[styles.categoryButton, selectedCategory === null && styles.selectedCategoryButton]}
            onPress={() => handleCategorySelect(null)}
          >
            <Text style={styles.categoryButtonText}>Genel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.categoryButton, selectedCategory === 'business' && styles.selectedCategoryButton]}
            onPress={() => handleCategorySelect('business')}
          >
            <Text style={styles.categoryButtonText}>İş</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.categoryButton, selectedCategory === 'entertainment' && styles.selectedCategoryButton]}
            onPress={() => handleCategorySelect('entertainment')}
          >
            <Text style={styles.categoryButtonText}>Eğlence</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.categoryButton, selectedCategory === 'health' && styles.selectedCategoryButton]}
            onPress={() => handleCategorySelect('health')}
          >
            <Text style={styles.categoryButtonText}>Sağlık</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.categoryButton, selectedCategory === 'science' && styles.selectedCategoryButton]}
            onPress={() => handleCategorySelect('science')}
          >
            <Text style={styles.categoryButtonText}>Bilim</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.categoryButton, selectedCategory === 'sports' && styles.selectedCategoryButton]}
            onPress={() => handleCategorySelect('sports')}
          >
            <Text style={styles.categoryButtonText}>Spor</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.categoryButton, selectedCategory === 'technology' && styles.selectedCategoryButton]}
            onPress={() => handleCategorySelect('technology')}
          >
            <Text style={styles.categoryButtonText}>Teknoloji</Text>
          </TouchableOpacity>
        </ScrollView>
      </ScrollView>
      <TouchableOpacity style={styles.likedNewsButton} onPress={navigateToLikedNews}>
        <Text style={styles.likedNewsButtonText}>Beğenilen Haberler</Text>
      </TouchableOpacity>
      <ScrollView contentContainerStyle={styles.newsContainer}>
        {loading ? (
          <ActivityIndicator size="large" color="blue" />
        ) : news.length === 0 ? (
          <Text style={styles.noNewsText}>Haber bulunamadı.</Text>
        ) : (
          <>
            <Text style={styles.newsTitle}>Haberler</Text>
            {news.map((item, index) => (
              <View key={index} style={styles.newsItem}>
                <TouchableOpacity onPress={() => handleNewsDetail(item)}>
                  <Text style={styles.newsItemTitle}>{item.title}</Text>
                  <Text style={styles.newsItemDetail}>Haber Detayı</Text>
                </TouchableOpacity>
                <View style={styles.actionContainer}>
                  <TouchableOpacity style={styles.likeButton} onPress={() => handleLike(index)}>
                    <Text style={styles.likeButtonText}>{item.liked ? 'Beğenildi' : 'Beğen'}</Text>
                  </TouchableOpacity>
                  <Text style={styles.likeCount}>{item.likes || 0}</Text>
                  <TouchableOpacity style={styles.shareButton} onPress={() => shareArticle(item)}>
                    <Text style={styles.shareButtonText}>Paylaş</Text>
                  </TouchableOpacity>
                </View>
                <CommentComponent comments={item.comments} addComment={(comment) => addComment(index, comment)} />
              </View>
            ))}
          </>
        )}
      </ScrollView>
      <Modal visible={selectedNews !== null} animationType="slide">
        {/* Haber detayları için modal buraya eklenecek */}
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  searchInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  searchButton: {
    backgroundColor: '#4caf50',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginLeft: 10,
  },
  searchButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  categoriesContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  categoryScrollView: {
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  categoryButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  selectedCategoryButton: {
    backgroundColor: '#4caf50',
  },
  categoryButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  newsContainer: {
    flexGrow: 1,
    paddingVertical: 10,
  },
  noNewsText: {
    textAlign: 'center',
    fontSize: 16,
    marginTop: 20,
  },
  newsTitle: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  newsItem: {
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  newsItemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  newsItemDetail: {
    color: 'blue',
    marginTop: 5,
  },
  actionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  likeButton: {
    backgroundColor: 'purple',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    width: 150, // Butonun genişliğini ayarlamak için
    height: 30, // Butonun yüksekliğini ayarlamak için
  },
  likeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  likeCount: {
    fontSize: 12,
    marginRight: 10,
  },
  shareButton: {
    backgroundColor: '#1DA1F2',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    width: 150, // Butonun genişliğini ayarlamak için
    height: 30, // Butonun yüksekliğini ayarlamak için
  },
  shareButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  likedNewsButton: {
    backgroundColor: '#4caf50',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
  likedNewsButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default NewsScreen;
