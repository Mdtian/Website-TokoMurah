// Mock data - replace with actual API calls
const mockProducts = [
  {
    id: 1,
    name: "Nasi Goreng Spesial",
    price: 35000,
    description: "Nasi goreng dengan seafood segar, telur, dan sayuran",
    category: "main course",
    image: "/images/nasi-goreng.jpg"
  },
  {
    id: 2,
    name: "Ayam Bakar Madu",
    price: 45000,
    description: "Ayam bakar dengan bumbu madu spesial dan sambal terasi",
    category: "main course",
    image: "/images/ayam-bakar.jpg"
  },
  {
    id: 3,
    name: "Gado-Gado",
    price: 28000,
    description: "Salad sayuran dengan bumbu kacang khas Indonesia",
    category: "appetizer",
    image: "/images/gado-gado.jpg"
  },
  {
    id: 4,
    name: "Es Jeruk Segar",
    price: 15000,
    description: "Minuman jeruk segar dengan es dan mint",
    category: "beverage",
    image: "/images/es-jeruk.jpg"
  },
  {
    id: 5,
    name: "Sate Ayam",
    price: 32000,
    description: "Sate ayam dengan bumbu kacang dan lontong",
    category: "main course",
    image: "/images/sate-ayam.jpg"
  },
  {
    id: 6,
    name: "Teh Manis Es",
    price: 12000,
    description: "Teh manis dingin yang menyegarkan",
    category: "beverage",
    image: "/images/teh-manis.jpg"
  }
];

export const searchProducts = async (searchTerm) => {
  // Simulate API call delay
  return new Promise((resolve) => {
    setTimeout(() => {
      if (!searchTerm) {
        resolve(mockProducts);
      } else {
        const filtered = mockProducts.filter(product =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.category.toLowerCase().includes(searchTerm.toLowerCase())
        );
        resolve(filtered);
      }
    }, 500);
  });
};

export const getProductById = async (id) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const product = mockProducts.find(p => p.id === parseInt(id));
      resolve(product);
    }, 300);
  });
};