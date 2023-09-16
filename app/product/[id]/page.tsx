"use client";
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { fetchproductData } from '@/app/library/getProduct';



function Page({ params }: { params: { id: number } }) {
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
 type CartList=number[]
  const [Item, SetItem] = useState<ItemType | undefined>(undefined);
  const [cartlist,setCartlist]=useState<ItemType[]>([]) 
  

  useEffect(() => {

    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setCartlist(JSON.parse(storedCart));
    }
  }, []);
 
   
  useEffect(() => {
    async function fetchData() {
      try {
        const data = await fetchproductData(params);
        SetItem(data);
      } catch (error) {
        console.error('Error:', error);
      }
    }

    fetchData();
  }, []);

  const handleadd = (product: ItemType) => {
    if (product) {
      
      const isItemInCart = cartlist.some((item) => item.id === product.id);
  
      if (isItemInCart) {
        
        const updatedCartList = cartlist.filter((item) => item.id !== product.id);
        setCartlist(updatedCartList);
        localStorage.setItem('cart', JSON.stringify(updatedCartList));
      } else {
       
        const updatedCartList = [...cartlist, product];
        setCartlist(updatedCartList);
        localStorage.setItem('cart', JSON.stringify(updatedCartList));
      }
    }
  };
  
  if (Item) {
    return (
      <div className="bg-gradient-to-br from-pink-500 via-purple-500 to-blue-500 min-h-screen p-8">
       
        <div className="container mx-auto p-4">
          <div className="flex flex-col md:flex-row items-center">
            
            <div className="w-full md:w-1/2">
              <Image
                src={Item.image}
                height={500}
                width={500}
                alt={Item?.title}
                className="object-contain"
              />
            </div>

            
            <div className="md:w-1/2 md:pl-8 mt-4 md:mt-0">
              <p className="text-base text-gray-900">{Item.category}</p>
              <h1 className="text-3xl text-white font-bold mb-2">{Item.title}</h1>
              <p className="text-2xl text-yellow-500 mb-2">${Item.price}</p>
              <p className="text-white">{Item.description}</p>
              <h3 className="text-2xl text-yellow-500 mt-4">
                {Item.rating.rate} ⭐
              </h3>
              <p className="text-white">Number of reviews: {Item.rating.count}</p> 
              <button onClick={()=>handleadd(Item)}
                
                className="bg-yellow-500 text-white px-4 py-2 rounded-md mt-4 hover:bg-yellow-600 transition duration-300 ease-in-out"
              >{cartlist.some((item) => item.id === Item?.id)
                ? 'Remove from Cart'
                : 'Add to Cart'}</button> 
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Page;
