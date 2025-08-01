import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Heart, Download, Share } from 'lucide-react-native';
import { useAuth } from '@/contexts/AuthContext';

const { width } = Dimensions.get('window');
const ITEM_WIDTH = (width - 48) / 2;

interface ImageItem {
  id: string;
  url: string;
  title: string;
  author: string;
  liked: boolean;
}

export default function GalleryScreen() {
  const [images, setImages] = useState<ImageItem[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    // Simulate loading images from Pexels
    setTimeout(() => {
      const sampleImages: ImageItem[] = [
        {
          id: '1',
          url: 'https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=400',
          title: 'Mountain Landscape',
          author: 'Naveen Boda',
          liked: false,
        },
        {
          id: '2',
          url: 'https://images.pexels.com/photos/1366919/pexels-photo-1366919.jpeg?auto=compress&cs=tinysrgb&w=400',
          title: 'Ocean Waves',
          author: 'Naveen Boda',
          liked: true,
        },
        {
          id: '3',
          url: 'https://images.pexels.com/photos/1559821/pexels-photo-1559821.jpeg?auto=compress&cs=tinysrgb&w=400',
          title: 'Forest Path',
          author: 'Naveen Boda',
          liked: false,
        },
        {
          id: '4',
          url: 'https://images.pexels.com/photos/1587927/pexels-photo-1587927.jpeg?auto=compress&cs=tinysrgb&w=400',
          title: 'City Lights',
          author: 'Naveen Boda',
          liked: false,
        },
        {
          id: '5',
          url: 'https://images.pexels.com/photos/1323550/pexels-photo-1323550.jpeg?auto=compress&cs=tinysrgb&w=400',
          title: 'Desert Sunset',
          author: 'Naveen Boda',
          liked: true,
        },
        {
          id: '6',
          url: 'https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=400',
          title: 'Tropical Beach',
          author: 'Naveen Boda',
          liked: false,
        },
        {
          id: '7',
          url: 'https://images.pexels.com/photos/1624496/pexels-photo-1624496.jpeg?auto=compress&cs=tinysrgb&w=400',
          title: 'Starry Night',
          author: 'Naveen Boda',
          liked: true,
        },
        {
          id: '8',
          url: 'https://images.pexels.com/photos/1547813/pexels-photo-1547813.jpeg?auto=compress&cs=tinysrgb&w=400',
          title: 'Autumn Leaves',
          author: 'Naveen Boda',
          liked: false,
        },
      ]
        ;
      setImages(sampleImages);
      setLoading(false);
    }, 1500);
  }, []);

  const toggleLike = (id: string) => {
    setImages(prevImages =>
      prevImages.map(image =>
        image.id === id ? { ...image, liked: !image.liked } : image
      )
    );
  };

  const renderImageItem = ({ item }: { item: ImageItem }) => (
    <View style={styles.imageCard}>
      <Image source={{ uri: item.url }} style={styles.image} />
      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.7)']}
        style={styles.imageOverlay}
      >
        <View style={styles.imageInfo}>
          <Text style={styles.imageTitle} numberOfLines={1}>
            {item.title}
          </Text>
          <Text style={styles.imageAuthor} numberOfLines={1}>
            by {item.author}
          </Text>
        </View>
        <View style={styles.imageActions}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => toggleLike(item.id)}
          >
            <Heart
              size={18}
              color={item.liked ? '#EF4444' : '#FFFFFF'}
              fill={item.liked ? '#EF4444' : 'transparent'}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Download size={18} color="#FFFFFF" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Share size={18} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </View>
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#3B82F6" />
          <Text style={styles.loadingText}>Loading beautiful images...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#F8FAFC', '#E2E8F0']}
        style={styles.gradient}
      >
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Gallery</Text>
          <Text style={styles.headerSubtitle}>Welcome back, {user?.name?.split(' ')[0]}!</Text>
        </View>

        <FlatList
          data={images}
          renderItem={renderImageItem}
          keyExtractor={item => item.id}
          numColumns={2}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
          columnWrapperStyle={styles.row}
        />
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  gradient: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#6B7280',
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 16,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#6B7280',
  },
  listContainer: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  row: {
    justifyContent: 'space-between',
  },
  imageCard: {
    width: ITEM_WIDTH,
    height: 240,
    borderRadius: 16,
    marginBottom: 16,
    overflow: 'hidden',
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  imageOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '100%',
    justifyContent: 'flex-end',
    padding: 12,
  },
  imageInfo: {
    marginBottom: 8,
  },
  imageTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 2,
  },
  imageAuthor: {
    fontSize: 12,
    color: '#E5E7EB',
  },
  imageActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});