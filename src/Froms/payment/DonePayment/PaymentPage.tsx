import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useLocation } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import './PaymentPage.css'
import { addTicket } from '../../../Redux/Myticket/MyTicket.Slice';
import { resetMovieBooking } from '../../../Redux/MovieBooking/MovieBooking.Slice';
import Navbar from '../../../components/Navbar/Navbar';
import Footer from '../../../components/Footer/Footer';
import { addPaymentThunk } from '../../../Redux/payment/add-payment.Thunk';
import getCookies from '../../../pages/getCookies';
import toast from 'react-hot-toast';

const PaymentPage = () => {
  const url =useLocation()
  const urlid=url.pathname;
  const dispatch =useDispatch();
  const navigate = useNavigate();

  const [randomnumberss, setRandomnumberss] = useState<number>(0);
  // console.log("randomnumberss",randomnumberss)

  const { selectedMovie, randomnumber,tractionID,selectedmyshowID,selectedTheater,selectedDate,selectedTime, selecteddimension,selectedtotal, selectsite,selectdiscount ,selectfinalprice} = useSelector((state: any) => state.movieBooking);

  // const { addpaymentData, addpaymentloading, addpaymenterror } = useSelector((state: any) => state.addpayment)

  useEffect(()=>{
    document.title="Payment"
  },[])

  const changedatafromslice=async()=>{


    try{

      const userDataValues = getCookies('userData');
      console.log("userDataValues", userDataValues)
      let tokenWithoutQuotes
      if (userDataValues !== null) {
        tokenWithoutQuotes = userDataValues.replace(/"/g, '');
        console.log("token", tokenWithoutQuotes)
      } else {
        console.error('userDataValue is null');
      }


      const data= await dispatch<any>(addPaymentThunk({
        myshowid: selectedmyshowID,
        tractionID:tractionID,
        token: tokenWithoutQuotes || ''
      }))
      console.log("paymentdata",data)
      if(data.payload.id){
        navigate(`/MymovieHome`)
      }
      else{
        toast.error("payment pendding")
      }




      if (selectedMovie && selectedDate && selectedTime && selecteddimension && selectsite) {
        dispatch(addTicket({
          movie: selectedMovie,
          theater: selectedTheater,
          date: selectedDate,
          time: selectedTime,
          dimension: selecteddimension,
          totalPrice: selectedtotal,
          seats: selectsite,
          discount: selectdiscount,
          finalAmount: selectfinalprice,
          randomnumber: randomnumberss,
        }));

        dispatch(resetMovieBooking());
      }

      else {
        console.log(selectedMovie)
        console.log(selectedDate)
        console.log(selectedTime)
        console.log(selecteddimension)
        console.log(selectedtotal)
        console.log(selectsite)
        console.log(selectdiscount)
        console.log(selectfinalprice)
      }

      



    }catch(error){

    }

    
     
  
    
    

 
    
  }

  useEffect(() => {
    const randomnumbers = Math.floor(Math.random() * 999);
     console.log("randomnumbers", randomnumbers)
     setRandomnumberss(randomnumbers); 
  }, [])

  return (
    <div>
      <Navbar/>
          <div className='payment-maincon'>
              <div className='widthofcon'>
                <h1 className='payment-success'>Payment successful!</h1>
                <div className='payment-second'>
                  <div className='paymentpage-img'>
                  <img src='https://github.com/dharmik2003/poster_movie/blob/main/Payment/Clapperboard.png?raw=true' className='paymentimg1'/>
                  <img src='https://github.com/dharmik2003/poster_movie/blob/main/Payment/Movie%20Roll.png?raw=true' className='paymentimg2'/>
                </div>
                </div>
                {/* <p>{randomnumberss}</p> */}
                <div className='paymentdesrc'>Transaction details have been sent to your email, you can also check other ticket details in my ticket either on the website or on your smartphone.</div>
                <div className='myticket-div'>
                  <div className='Myticket'>
                    <div onClick={() => changedatafromslice()} className="buybuttext">My Ticket</div>
                    {/* <NavLink to={`/MymovieHome`} onClick={() => changedatafromslice()} className="buybuttext">My Ticket</NavLink> */}
                </div>
                </div>
                {/* <button onClick={changedatafromslice}>click me</button> */}
             </div>
          </div>
        {/* <NavLink to="#" onClick={changedatafromslice}>My Ticket</NavLink> */}
        <hr/>
        <Footer/>
    </div>
  )
}

export default PaymentPage


