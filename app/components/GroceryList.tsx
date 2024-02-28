"use client";
import { Box, Button, Card, List, TextField } from "@mui/material";
import {useQueryClient} from 'react-query'

import {
    useMutation,
  } from 'react-query'
import GroceryListItem from "./GroceryListItem";
import { useState } from "react";


interface GroceryListProps {
    data?: any,
    error?: any,
    isLoading: boolean
}
export default function GroceryList({data, error, isLoading}: GroceryListProps){
    const API_PATH = process.env.NEXT_PUBLIC_API_PATH
    const queryClient = useQueryClient()
    
    

    const [newItemName, setNewItemName] = useState("")
    const [addNewItemDisabled, setNewItemDisabled] = useState(true)

    const addGroceryItem = async (item: string) => {
        const response = await fetch(`${API_PATH}/grocery`, {
            method: "POST", 
            headers: {
              "Content-Type": "application/json",
            },
          
            body: JSON.stringify({item: item}),
          });
          setNewItemName("")
          return response.json(); 
    }

    const deleteGroceryItem = async (itemId: string) => {
        
        const response = await fetch(`${API_PATH}/grocery/${itemId}`, {
            method: "DELETE", 
            headers: {
              "Content-Type": "application/json",
            },
          });
          return response.json(); 
    }

    const { mutate: addGroceryItemMutation, isLoading: addLoading } = useMutation(addGroceryItem, {
        onSuccess: data => {
           console.log("Added item to grocery list");
        },
        onError: () => {
            console.log("Error adding item")
        },
        onSettled: () => {
            queryClient.invalidateQueries('groceryList')
        }
     });

     const { mutate: deleteGroceryItemMutation, isLoading: deleteLoading } = useMutation(deleteGroceryItem, {
        onSuccess: data => {
           console.log("Item deleted from grocery list");
        },
        onError: () => {
            console.log("Error deleting item")
        },
        onSettled: () => {
            queryClient.invalidateQueries('groceryList')
        }
        });

    const handleTextFieldChange = (e:any) =>  {
        var value = e.target.value;
        setNewItemDisabled(!value)
        setNewItemName(value) 
    }


    if(isLoading || !data){
        return <Card sx={{padding: "10px", minHeight: "440px", minWidth: "350px"}}>
            <Box className="loading">Loading..</Box></Card>
    }
    else {
        return (
            <Card sx={{padding: "10px", minHeight: "440px", minWidth: "350px"}}>
                <List>
                    {data.items?.map((item: any) => {
                        return <GroceryListItem key={item.id} itemName={item.item} itemId={item.id} deleted={item.deleted} deleteItemHandler={deleteGroceryItemMutation}/>
                    })}
                </List>
                <TextField value={newItemName} id="outlined-basic" label="New Item" variant="outlined"  onChange={(e) => handleTextFieldChange(e)}/>
                <Button sx={{height: "55px"}} disabled={addNewItemDisabled} variant="outlined" onClick={() => addGroceryItemMutation(newItemName)}>Add Item</Button>
            </Card>

        )
    }
}