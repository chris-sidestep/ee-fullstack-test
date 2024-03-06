import {Redis} from 'ioredis'
import { GroceryList } from './groceryList';

export default class GroceryCache {
    defaultValue: GroceryList;
    redis: any;

    constructor(redis?: Redis, defaultValue?: GroceryList) {        
        this.redis = redis
        this.setupCache()
        
        if(defaultValue) {
            this.defaultValue = defaultValue
        }
        else {
            this.defaultValue = {
                items: [
                    {id:"1", item:"Bananas", deleted: false},
                    {id:"2", item:"Ham", deleted: false},
                    {id:"3", item:"Tuna", deleted: false},
                    {id:"3", item:"Cling Film", deleted: false}
                ]
            }
        }
         
    }

    setupCache(){
        if(!this.redis){
            this.redis = new Redis() 
        }
        
        this.redis.on('error', (error: unknown) => {
            console.warn('[Redis] Error connecting', error);
        });
        this.redis.on('connect', (event: unknown) => {
            console.warn('Redis Connected');
        });

    }


    setCacheValue (value: GroceryList) {
        if(value.items){
            this.redis.set("groceryList", JSON.stringify(value))
        }        
    }

    async getCacheValue() {
        const cachedData = await this.redis.get("groceryList")
        if(cachedData){
            const parsed = JSON.parse(cachedData)
            if(!parsed || !parsed.items){
                this.setCacheValue(this.defaultValue)
                return this.defaultValue
            }
            return parsed 
        }
        
        return this.defaultValue
         
    }
}
