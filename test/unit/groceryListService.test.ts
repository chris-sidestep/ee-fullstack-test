import {describe, expect, test, jest} from '@jest/globals';
import GroceryListService, { GroceryList } from '../../lib/groceryList'
import GroceryCache from '@/lib/groceryCache';

class MockGroceryCache extends GroceryCache {
    returnValue;
    constructor(returnValue: any){
        super()
        this.returnValue = returnValue;
    }
    async getCacheValue(): Promise<GroceryList>{
        return this.returnValue;
    }
    setCacheValue(value: GroceryList): void {
        console.log("Skipping cache set")
    }
    setupCache(): void {
        console.log("skipping setup")
    }
}

describe("Get Grocery List", () => {

    test("Should return a list from the cache", async() => {

        const groceryCache = new MockGroceryCache({items:[{id: "1"}]})
        const groceryService = new GroceryListService(groceryCache) 
        const result = await groceryService.getGroceryList()
        expect(result.items).toHaveLength(1)
        expect(result.items[0].id).toEqual("1")
    })
})

describe("Add Item to Grocery List", () => {

    test("Should add an item to the existing list", async() => {
        const groceryCache = new MockGroceryCache({items:[{id: "1"}]})
        const groceryService = new GroceryListService(groceryCache) 
        const existingList = await groceryService.getGroceryList()
        expect(existingList.items).toHaveLength(1)
        expect(existingList.items[0].id).toEqual("1")

        const updatedList = await groceryService.addGroceryListItem("lemon")
        expect(updatedList.items).toHaveLength(2)
        expect(updatedList.items[1].item).toEqual("lemon")
    })

    test("Shouldn't add an item to the existing list if it already exists", async() => {
        const groceryCache = new MockGroceryCache({items:[{id: "1", item: "ham"}]})
        const groceryService = new GroceryListService(groceryCache) 
        const existingList = await groceryService.getGroceryList()
        expect(existingList.items).toHaveLength(1)
        expect(existingList.items[0].id).toEqual("1")

        const updatedList = await groceryService.addGroceryListItem("ham")
        expect(updatedList.items).toHaveLength(1)
    })

    test("Shouldn't add an item to the existing list if item is blank", async() => {
        const groceryCache = new MockGroceryCache({items:[{id: "1", item: "ham"}]})
        const groceryService = new GroceryListService(groceryCache) 
        const existingList = await groceryService.getGroceryList()
        expect(existingList.items).toHaveLength(1)
        expect(existingList.items[0].id).toEqual("1")

        const updatedList = await groceryService.addGroceryListItem("")
        expect(updatedList.items).toHaveLength(1)
    })
})

describe("Remove Item from Grocery List", () => {

    test("Should mark an item as deleted on the existing list", async() => {
        const groceryCache = new MockGroceryCache({items:[{id: "1", item: "ham"}, {id: "2", item: "banana"}]})
        const groceryService = new GroceryListService(groceryCache) 
        const existingList = await groceryService.getGroceryList()
        expect(existingList.items).toHaveLength(2)
        expect(existingList.items[0].id).toEqual("1")
        expect(existingList.items[0].deleted).toBeFalsy

        const updatedList = await groceryService.deleteGroceryListItem("1")
        expect(updatedList.items).toHaveLength(2)
        expect(updatedList.items[0].item).toEqual("ham")
        expect(updatedList.items[0].deleted).toBeTruthy
    })

    test("Remove item should return false if no match found", async() => {
        const groceryCache = new MockGroceryCache({items:[{id: "1", item: "ham"}, {id: "2", item: "banana"}]})
        const groceryService = new GroceryListService(groceryCache) 
        const existingList = await groceryService.getGroceryList()
        expect(existingList.items).toHaveLength(2)
        expect(existingList.items[0].id).toEqual("1")

        const updatedList = await groceryService.deleteGroceryListItem("NO MATCH")
        expect(updatedList.items[0].deleted).toBeFalsy
        expect(updatedList.items[1].deleted).toBeFalsy
    })
})