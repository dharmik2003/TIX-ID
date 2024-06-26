import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export interface Addpayment {
  // userId: number
  myshowid: number;
  token: string ;
  tractionID:string;
}

export const addPaymentThunk = createAsyncThunk(
  "addPaymentThunk",
  async (addpayment: Addpayment, { rejectWithValue }) => {
    const { myshowid, tractionID, token } =
      addpayment;
    try {
      const response = await axios.post(
        "http://localhost:5001/payment/addpayment",
        {
          myshowId: myshowid,
          tractionid: tractionID
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const mushowresult = response.data.payload;
      console.log("myshow payload", mushowresult);
      return mushowresult;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
