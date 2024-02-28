import { useQuery } from "react-query"
import GroceryList from "./GroceryList"

const API_PATH = process.env.NEXT_PUBLIC_API_PATH


export default function App(){
const { isLoading, error, data } = useQuery({ 
    queryKey: ['groceryList'],
    queryFn: () =>
      fetch(`${API_PATH}/grocery`).then((res) =>
        res.json(),
      ),
  })

  return(
    <GroceryList data={data} isLoading={isLoading} error={error}/>
  )
}