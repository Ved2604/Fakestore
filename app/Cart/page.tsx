"use client";
import { useState,useEffect} from 'react'

const Cartpage = () => {  
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
    const [cartlist, setCartlist] = useState<ItemType[]>([]);
    useEffect(() => {

        const storedCart = localStorage.getItem('cart');
        if (storedCart) {
          setCartlist(JSON.parse(storedCart));
        }
      }, []);
     
    let total=0;  
    cartlist.map((item)=>(
      total+= item?.price
    ))

    const handleremove =(item:ItemType)=>{
        const updatedCartList = cartlist.filter((cartItem) => cartItem.id !== item.id);
        setCartlist(updatedCartList);
        localStorage.setItem('cart', JSON.stringify(updatedCartList));
    }


  return (
    <div>
       <div className="container mx-auto">
      
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {cartlist.map((item) => (
            <div
              key={item.id}
              className="mt-20 p-4 rounded-lg shadow-lg"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-32 h-32 object-cover rounded-md mb-2"
              />
              <h5 className="text-lg text-gray-800 font-semibold">{item.title}</h5>
              <p className="text-2xl text-yellow-500 mb-2">${item.price}</p>
              <button
                className="bg-yellow-500 text-white px-4 py-2 rounded-md mt-4 hover:bg-yellow-600 transition duration-300 ease-in-out"
                onClick={() => handleremove(item)}
              >
                Remove
              </button>
            </div>
          ))} 
          <div className="mt-8 text-center">
          <h2 className="text-3xl font-semibold">Total:</h2>
          <p className="text-2xl text-yellow-500">${total.toFixed(2)}</p>
        </div>
        </div>
      </div> 
       
    </div>
  )
}

export default Cartpage