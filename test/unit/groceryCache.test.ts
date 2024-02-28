import {describe, expect, test, jest} from '@jest/globals';
import GroceryCache from '@/lib/groceryCache';
import { GroceryList } from '@/lib/groceryList';
import { Redis, RedisKey } from 'ioredis';

let mockCacheValue: string;
class MockRedis extends Redis {
    constructor(){
        super()
    }
    async get():Promise<string|null>{
        return mockCacheValue;
    }
    async set(key: RedisKey, value: string): Promise<any>{
        console.log("Skipping cache set")
    }
  
}

describe("Grocery Cache Tests", () => {

    test("Should return data when found in redis", async() => {
        mockCacheValue = JSON.stringify({items:[{id:"1", item:"testItem", deleted: false}]})

        const groceryCache = new GroceryCache(new MockRedis(), {items:[]})
        const result: GroceryList = await groceryCache.getCacheValue()
        expect(result.items).toHaveLength(1)
        expect(result.items[0].item).toEqual("testItem")
    })

    test("Should return default data when none found in redis", async() => {
        mockCacheValue = JSON.stringify({})

        const groceryCache = new GroceryCache(new MockRedis(), {items:[{id:"1", item:"defaultTestItem", deleted: false}]})
        const result: GroceryList = await groceryCache.getCacheValue()
        expect(result.items).toHaveLength(1)
        expect(result.items[0].item).toEqual("defaultTestItem")
    })
})