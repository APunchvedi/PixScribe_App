import { createContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const AppContext = createContext() 

const AppContextProvider = (props) => { 

    const [user, setUser] = useState(null)
    const [showLogin, setShowLogin] = useState(false)
    const [token, setToken] = useState(localStorage.getItem('token'))

    const [credit, setCredit]= useState(false)

    const backend_Url = import.meta.env.VITE_BACKEND_URL

    const navigate = useNavigate()

    const loadCreditsData = async () => {
        try {
            const {data} = await axios.get(backend_Url + '/api/user/credits', {headers: {token}})
            if (data.success) {
                setCredit(data.credits)
                setUser(data.user)
            }
        }
        catch(error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    const generateImage = async (prompt) => {

        try {
            const API_BASE_URL = "https://pixscribe-app-server.onrender.com";
            const {data} = await axios.post(`${API_BASE_URL}/api/image/generate-image`, {prompt}, {headers: {token}})
            
            if (data.success) {
                loadCreditsData()
                return data.resultImage
            } else {
                toast.error(data.message)
                loadCreditsData()
                if (data.creditBalance === 0) {
                    navigate("/buy")
                }
            }
            
        }
        catch(error) {
            toast.error(error.message)
        }
    }

    const logout = () => {
        localStorage.removeItem('token');
        setToken('')
        setUser(null)
    } 

    useEffect(() => {
        if (token) {
            loadCreditsData()
        }
    }, [token])
    

    const value = {
        user, setUser, showLogin, setShowLogin, backend_Url,token, setToken,credit, setCredit, loadCreditsData, logout,generateImage
    }
    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}
AppContextProvider.propTypes = {
    children: PropTypes.node.isRequired
}

export default AppContextProvider
