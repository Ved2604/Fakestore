import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

interface ProductCardprops{
  id:string  
  image: string
  title: string
  price: string
}

const ProductCard = (props:ProductCardprops) => {
  return ( 
    
    <div className=" p-4 rounded shadow-md">
      <Image src={props.image} alt='Product Image' width={200} height={200}></Image> 
      <h2 className="text-lg font-semibold">{props.title}</h2><p>${props.price}</p>
    </div>
  
  )
}

export default ProductCard