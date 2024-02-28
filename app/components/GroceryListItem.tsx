import { Checkbox, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";

interface GroceryListItemProps {
    deleteItemHandler: any, 
    itemName: string, 
    itemId: string, 
    deleted: boolean
}
export default function GroceryListItem({deleteItemHandler, itemName, itemId, deleted} : GroceryListItemProps){
    return (
        <ListItem key={itemId} >
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ 'aria-labelledby': itemId }}
                  disabled = {deleted}
                  onChange={() => deleteItemHandler(itemId)}
                  checked={deleted}
                />
              </ListItemIcon>
              {deleted && (
                <del><ListItemText id={itemName} primary={itemName} className="groceryListItem"/></del>
              )}
              {!deleted && (
                <ListItemText id={itemName} primary={itemName} className="groceryListItem"/>
              )}
             
           
        </ListItem>
    )
}