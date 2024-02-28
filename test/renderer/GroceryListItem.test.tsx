import {render} from '@testing-library/react';
import GroceryListItem from '@/app/components/GroceryListItem';
import {describe, expect, test, jest} from '@jest/globals';


describe("GroceryListItem component renderer tests", () => {
    test("Should render a list item OK", () => {
        const {container} = render(
            <GroceryListItem itemId="1" itemName="test" deleted={false} deleteItemHandler={()=> {}}></GroceryListItem>,
        );
        expect(container.getElementsByTagName('input').length).toBe(1);
        expect(container.getElementsByTagName('del').length).toBe(0);
        
    })
})
