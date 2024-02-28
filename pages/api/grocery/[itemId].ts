import GroceryCache from '@/lib/groceryCache'
import GroceryListService from '@/lib/groceryList'
import { Redis } from 'ioredis'
import type { NextApiRequest, NextApiResponse } from 'next'
const groceryCache = new GroceryCache(new Redis(), {items: [{id:"1", item: "Bananas", deleted: false}]})
const groceryService = new GroceryListService(groceryCache)

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { itemId } = req.query

  if(req.method == "DELETE" && itemId){
    const data = await groceryService.deleteGroceryListItem(itemId as string)
    if(data){
      res.status(204).end()
    }
    else {
      res.status(500).json({message: "error deleting item"})
    }
  }
}