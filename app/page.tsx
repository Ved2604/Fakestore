"use client";
import ProductCard from './components/ProductCard';
import { useEffect, useState, } from 'react';
import Link from 'next/link';
import { fetchApiData } from './library/getAllProducts';
export default function Home() { 

  interface Product {
    id: string;
    title: string;
    price: string;
    image:string;
  }
  const [apiData, setApiData] = useState<Product[]>([]); 
  
  
  useEffect(() => {
    async function fetchData() {
      try {
        const data = await fetchApiData();
        setApiData(data);
      } catch (error) {
        console.error('Error:', error);
      }
    }

    fetchData();
  }, []);

      const productCards = apiData.map((product) => ( 
        <Link href={`./product/${product.id.toString()}`}>
        <ProductCard
          key={product.id} 
          id={product.id}
          title={product.title}
          price={product.price}
          image={product.image} 
          />
        </Link>   
      ));    

  return ( 
    
    <main className="container mx-auto px-4 mt-35">
      <div className='grid grid-cols-3 gap-4' >
      {productCards}
      </div>
    </main>
    
  )
}
