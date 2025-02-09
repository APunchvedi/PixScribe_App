import { useContext } from "react"
import { plans } from "../assets/assets"
import { assets } from "../assets/assets"
import { AppContext } from '../context/AppContext'
import { motion } from "framer-motion"
import axios from "axios"
import { toast } from "react-toastify"

const BuyCredit = () => {
  const { user, backend_Url, loadCreditsData, token, setShowLogin } = useContext(AppContext)
  
  

  const initPay = async (order) => {
    const options = {
      key: import.meta.env.VITE_RAZOR_PAYKEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: 'Credits Payment',
      description: 'Credits Payment',
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response) => {
        console.log(response);

      }
    }
    const rzp = new window.Razorpay(options)
    rzp.open()
 }
  const paymentRazorPay = async (planId) => {
    {
      try {
        if (!user) {
          setShowLogin(true)
        }

        const {data} = await axios.post(backend_Url + '/api/user/pay-razor', {planId}, {headers: {token}})
        
        if (data.success) {
          initPay(data.order)
        }

      } catch (error) {
        toast.error(error.message)
      }
    }
  }
  return (
    <motion.div 
      className="min-h-[80vh] text-center pt-14 mb-10"
      initial={{opacity: 0.2, y: 100}}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <button className="border border-gray-400 rounded-full px-10 py-2 mb-6"> Our Plans </button>
      <h1 className="text-center text-3xl font-medium mb-6 sm:mb-10">Choose the Plan</h1>
        
      <div className="flex flex-wrap justify-center gap-6 text-left">
        {plans.map((item, index) => ( 
          <div key={index} className="bg-white drop-shadow-sm rounded-lg py-12 px-8 text-gray-600 hover:scale-105 transition-all duration-500">
            <img width={40} src={assets.logo_icon} className="h-10 w-25" />
            <p className="mt-3 mb-1 font-semibold">{item.id}</p>
            <p className="text-sm">{item.desc}</p>
            <p className="mt-6"><span className="text-3xl font-medium"> ${item.price}</span> / {item.credits} Credits</p>
            <button onClick={() =>paymentRazorPay(item.id)} className="w-full bg-orange-500 text-white mt-8 text-sm rounded-md py-2.5 min-w-52 cursor-pointer">{user ? 'Purchase' : 'Get Started'}</button>
            
            </div>
        ))}
      </div>
      
    </motion.div>
  )
}

export default BuyCredit
