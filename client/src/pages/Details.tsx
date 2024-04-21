import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export type ProductDetails = {
  productId: number;
  imageUrl: string;
  name: string;
  price: number;
  color: string;
  sizes: number[];
}

export function Details() {
  const {productId} = useParams();
  const [details, setDetails] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<unknown>();

  useEffect(()=>{
    async function loadDetails(){
      try{
        const response = await fetch(
          `/api/p/${productId}`
        );
        if(!response.ok) throw new Error(`Fetch error with status ${response.status}`);
        const result = await response.json();
        setDetails(result);
      }catch(error){
        setError(error)
      }finally{
        setIsLoading(false)
      }
    }
    if (productId) {
      loadDetails();
    }
  },[productId])

  if(isLoading){
    return <div>Loading...</div>
  }

  if(error){
    return <div>
      Cannot load product details due to {' '}
      {error instanceof Error ? error.message : 'unknown error'}.
    </div>
  }

  if(!details){
    return <div>No product details available.</div>
  }

  const { name, imageUrl, price, color, sizes} = details;
  return (
    <div className="flex">
      <div className="w-1/2">
        <img src={imageUrl} alt={name} />
      </div>
      <div className="w-1/2">
        <div>
          <p>{name}</p>
          <p>{price}</p>
          <hr />
        </div>
        <div>
          <p>COLOR: {color}</p>
          <hr />
        </div>
        <div>
          <p>SELECT SIZE:</p>
        </div>
        <button>Add to bag</button>
        <p className="underline">Product details</p>
      </div>
    </div>
  );
}
