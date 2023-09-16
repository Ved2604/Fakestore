

interface ItemType {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    rating: {
      rate: number;
      count: number;
    };
  }
  
  interface Product {
    id: string;
    title: string;
    price: string;
    image: string;
  }
  
  const fetchApiData = async (): Promise<Product[]> => {
    try {
      const response = await fetch('https://fakestoreapi.com/products');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const items: ItemType[] = await response.json()as ItemType[];
  
      // Map and transform the data into the desired Product interface
      const transformedData: Product[] = items.map((item) => ({
        id: item.id.toString(), // Assuming id should be a string
        title: item.title,
        price: item.price.toFixed(2), // Convert price to string with 2 decimal places
        image: item.image,
      }));
  
      return transformedData;
    } catch (error) {
      throw new Error('Error fetching data: ');
    }
  };
  
  export { fetchApiData };
  