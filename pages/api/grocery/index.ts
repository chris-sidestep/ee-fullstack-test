import type { NextApiRequest, NextApiResponse } from 'next'
import GroceryListService from '@/lib/groceryList'; 
import GroceryCache from '@/lib/groceryCache';
import { Redis } from 'ioredis';

type ResponseData = {
  message: string
}

const groceryCache = new GroceryCache(new Redis(), {items: [{id:"1", item: "Bananas", deleted: false}]})
const groceryService = new GroceryListService(groceryCache)

 
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  
  if(req.method == "GET"){
    const data = await groceryService.getGroceryList()
    res.status(200).json(data)
  }
  else if(req.method == "POST"){   
    const text = req.body.item;
    if(!text){
      return res.status(400)
    }
    else {
      const id = groceryService.addGroceryListItem(text)
      let status = 201
      if(!id){
        status = 500;
      }
      return res.status(status).json({message: "success"})
    }
    
  }
   
}