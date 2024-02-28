import GroceryCache from './groceryCache'
import {v4 as uuidv4} from 'uuid';


export type GroceryList = {
    items: GroceryListItem[]
}

export type GroceryListItem = {
    id: string,
    item: string,
    deleted: boolean
}

export default class GroceryListService {
    groceryCache: GroceryCache;
    constructor(groceryCache: GroceryCache){
        this.groceryCache = groceryCache
    }

    async getGroceryList() {
        let data: any = await this.groceryCache.getCacheValue()
        return data
    }

    // Add an item to the 'items' array on the grocery list.
    // Returns the grocery list with the new state (or original state if nothing was added)
    async addGroceryListItem(item: string) {
        const data =  await this.getGroceryList()
        const exists = data.items?.find((existingItem: GroceryListItem) => existingItem.item == item)
        
        if(!exists && item){
            const id = uuidv4()
            if(data.items){
                data.items = [...data.items, {id:uuidv4(), item: item, deleted: false}]
            } else {
                data.items = [{id:uuidv4(), item: item, deleted: false}]
            }
            
            this.groceryCache.setCacheValue(data)
        }
        return data
    }

    // 'Soft' deletes an item on a grocery list
    // Returns the updated grocery list (or the original list if nothingw as deleted)
    async deleteGroceryListItem (id: string){
        const data = await this.getGroceryList()
        if(data.items.find((item: any) => item.id === id)){
            const filtered = data.items.map((item: GroceryListItem) => item.id != id ? item : {...item, deleted: true})
            this.groceryCache.setCacheValue({items: filtered})
            return {items: filtered}
        }
        return data;
    }

    
} 