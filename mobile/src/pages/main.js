import React, {useState, useEffect} from 'react';
import api from '../services/api';

import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet
} from 'react-native';

const Main = ({navigation}) => {

  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [productInfo, setProductInfo] = useState({});

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async (page = 1) => {
    const response = await api.get(`/products?page=${page}`);
    const {docs, ...productInfo} = response.data;
    const newDocs = [...products, ...docs];
    setProducts(newDocs);
    setProductInfo(productInfo);
    setPage(page);
  };

  const loadMore = () => {
    if (page === productInfo.totalPages) return;
    const pageNumber = page + 1;
    loadProducts(pageNumber);
  };

  const renderItem = ({item}) => (
    <View style={styles.productContainer}>
      <Text style={styles.producTitle}>{item.title}</Text>
      <Text style={styles.productDescription}>{item.description}</Text>
      <TouchableOpacity style={styles.productButton} onPress={() => {
        navigation.navigate('Product', {product: item});
      }}>
        <Text style={styles.productButtonText}>Acessar</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        keyExtractor={item => item._id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        onEndReached={loadMore}
        onEndReachedThreshold={0.1}
      />
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA'
  },
  list: {
    padding: 20,
  },
  productContainer: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 5,
    padding: 20,
    marginBottom: 20
  },
  productTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333'
  },
  productDescription: {
    fontSize: 16,
    color: '#999',
    marginTop: 5,
    lineHeight: 24
  },
  productButton: {
    height: 42,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#DA552F',
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10
  },
  productButtonText: {
    fontSize: 16,
    color: '#DA552F',
    fontWeight: 'bold'
  }

});

export default Main;