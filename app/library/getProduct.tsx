interface getproductprops{
    id:number
}
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


    const fetchproductData = async (props:getproductprops): Promise<ItemType> => {
        try {
          const response = await fetch(`https://fakestoreapi.com/products/${props.id}`);
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const json: ItemType = await response.json();
          return json;
        } catch (error) {
          throw new Error('Error fetching data: ');
        }
      };


export {fetchproductData}