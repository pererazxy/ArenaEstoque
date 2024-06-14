import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, Alert, Image } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { api } from '../services/api';
import logo from '../assets/logo.png'



export default function ProductManagement({ updatedProducts }) {
  const navigation = useNavigation();
  const [products, setProducts] = useState([]);
  const [productName, setProductName] = useState('');
  const [productQuantity, setProductQuantity] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);

  const fetchProducts = async () => {
    try {
      const response = await api.get('products');
      setProducts(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await api.get('categories');
      setCategories(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      fetchCategories();
    }, [])
  );

  async function addProduct() {
    if (!productName.trim() || !selectedCategory) {
      Alert.alert("Erro", "Por favor, preencha todos os campos necessários.");
      return;
    }
  
    const quantity = parseInt(productQuantity, 10);
  
    try {
      if (editingProduct !== null) {
        const productId = products[editingProduct].id;
        await api.patch(`products/${productId}`, {
          name: productName,
          amount: quantity,
          categoryId: selectedCategory, // Ajuste aqui para usar o ID da categoria selecionada
        });
        Alert.alert("Sucesso", "Produto editado com sucesso!");
      } else {
        await api.post('products', {
          name: productName,
          amount: quantity,
          categoryId: selectedCategory, // Ajuste aqui para usar o ID da categoria selecionada
        });
        Alert.alert("Sucesso", "Produto adicionado com sucesso!");
      }
  
      setProductName('');
      setProductQuantity('');
      setSelectedCategory('');
      setEditingProduct(null);
      fetchProducts();
    } catch (error) {
      console.log(error);
      Alert.alert("Erro", "Não foi possível adicionar/editar o produto.");
    }
  }
  
  function editProduct(index) {
    const product = products[index];
    if (product) {
      setProductName(product.name || '');
      setProductQuantity(product.quantity !== undefined ? product.quantity.toString() : '');
      setSelectedCategory(product.category || '');
      setEditingProduct(index);
    }
  }

  async function deleteProduct(index) {
    Alert.alert(
      "Confirmar Exclusão",
      "Você tem certeza que deseja excluir este produto?",
      [
        {
          text: "Cancelar",
          style: "cancel"
        },
        {
          text: "OK",
          onPress: async () => {
            try {
              await api.delete(`products/${index}`);
              fetchProducts();
              Alert.alert("Sucesso", "Produto excluído com sucesso!");
            } catch (error) {
              console.log(error);
              Alert.alert("Erro", "Não foi possível excluir o produto.");
            }
          }
        }
      ]
    );
  }
  function updateQuantity(index, quantity) {
    const updatedProducts = products.map((product, i) =>
      i === index ? { ...product, quantity } : product
    );
    setProducts(updatedProducts);
  }

  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.image} />
      <Text style={styles.title}>Gerenciamento de Produtos</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome do Produto"
        placeholderTextColor="#737373"
        color="#fff"
        value={productName}
        onChangeText={setProductName}
      />
      <TextInput
        style={styles.input}
        placeholder="Quantidade"
        placeholderTextColor="#737373"
        color="#fff"
        value={productQuantity}
        keyboardType="numeric"
        onChangeText={setProductQuantity}
      />
      <Picker
        selectedValue={selectedCategory}
        onValueChange={(itemValue) => setSelectedCategory(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Selecione uma Categoria" value="" />
        {categories.map((category, index) => (
         <Picker.Item key={index} label={category.name} value={category.id} />
        ))}
      </Picker>
      <Button
        title={editingProduct !== null ? "Editar Produto" : "Adicionar Produto"}
        onPress={addProduct}
        color={"red"}
      />
      <FlatList
        data={products}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.productItem}>
            <View>
              <Text style={styles.productName}>{item.name}</Text>
              <Text>Categoria: {item.category.name}</Text> 
              <Text>Quantidade: {item.amount}</Text>
            </View>
            <View style={styles.buttonsContainer}>
              <Button color="red" title="Editar" onPress={() => editProduct(index)} />
              <Button color="red" title="Excluir" onPress={() => deleteProduct(item.id)} />
              <TextInput
                style={styles.quantityInput}
                placeholder="Atualizar Quantidade"
                keyboardType="numeric"
                onChangeText={(text) => updateQuantity(index, parseInt(text, 10))}
              />
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#000',
  },
  image: {
    alignSelf: "center",
    left: 20
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#fff',
    textAlign: "center"
  },
  input: {
    height: 40,
    borderColor: '#ff0000',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
    backgroundColor: '#000',
  },
  picker: {
    height: 50,
    marginBottom: 16,
    backgroundColor: '#fff',
    color: '#737373',

  },
  productItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor: '#fff',
  },
  productName: {
    fontSize: 18,
  },
  buttonsContainer: {
    flexDirection: 'column',
  },
  quantityInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginTop: 8,
    paddingHorizontal: 8,
    backgroundColor: '#fff',
  },
});
