import {cleanup, fireEvent, render, screen} from '@testing-library/react';
import GroceryList from '@/app/components/GroceryList';
import {describe, expect, test, jest} from '@jest/globals';
import { QueryClient, QueryClientProvider } from 'react-query';


describe("GroceryList top level component renderer tests", () => {
    const queryClient = new QueryClient()
   
    test("Should render OK with loading spinner when query loading", () => {
        const isLoading = true
        const data = undefined
        const error = {}
        const {container} = render(
            <QueryClientProvider client={queryClient}><GroceryList data={data} isLoading={isLoading} error={error}/></QueryClientProvider>,
        );
        expect(container.getElementsByClassName('loading').length).toBe(1);
    })

    test("Should render OK with grocery list data", () => {
        const isLoading = false
        const data = {items:[{id:"1", item:"test1", deleted: false}, {id:"2", item:"test2", deleted: false}]}
        const error = {}
        const {container} = render(
            <QueryClientProvider client={queryClient}><GroceryList data={data} isLoading={isLoading} error={error}/></QueryClientProvider>,
        );
        expect(container.getElementsByClassName('loading').length).toBe(0);
        expect(container.getElementsByClassName('groceryListItem').length).toBe(2);
    })

    test("Should render a strikethrough on a deleted item's text grocery list data", () => {
        const isLoading = false
        const data = {items:[{id:"1", item:"test1", deleted: false}, {id:"2", item:"test2", deleted: true}]}
        const error = {}
        const {container} = render(
            <QueryClientProvider client={queryClient}><GroceryList data={data} isLoading={isLoading} error={error}/></QueryClientProvider>,
        );
        expect(container.getElementsByClassName('loading').length).toBe(0);
        expect(container.getElementsByClassName('groceryListItem').length).toBe(2);
        //<del> is used to strike through the list item text
        expect(container.getElementsByTagName('del').length).toBe(1);
    })


    
})