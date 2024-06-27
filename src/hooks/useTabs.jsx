import { useContext } from 'react'
import TabsContext from '../context/TabsProvider';


const useTabs = () => {
    return useContext(TabsContext)
}

export default useTabs;