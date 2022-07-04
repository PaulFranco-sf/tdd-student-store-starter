import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './Purchases.css';

function Purchases ({ APIURL, setOrdersLoaded, ordersLoaded}){
    
    const [purchases, setPurchases] = useState()
    const [fetchedData, setFetchedData] = useState(false)
    // async function fetchPurchases(){
    //     try{
    //       const response = await axios.get(APIURL + "/purchase")
    //       setPurchases(response.data.purchases)
    //     } catch (e) {
    //       console.log(e);
    //     }
    //   }
    
    function roundTo(n, digits) {
    var negative = false;
    if (digits === undefined) {
        digits = 0;
    }
    if (n < 0) {
        negative = true;
        n = n * -1;
    }
    var multiplicator = Math.pow(10, digits);
    n = parseFloat((n * multiplicator).toFixed(11));
    n = (Math.round(n) / multiplicator).toFixed(digits);
    if (negative) {
        n = (n * -1).toFixed(digits);
    }
    return n;
  }
      useEffect(async () => {
            setOrdersLoaded(true)
            try{
                console.log("fetching")
                const response = await axios.get(APIURL + "/purchase")
                setPurchases(response.data.purchases)
                setFetchedData(true)
              } catch (e) {
                console.log(e);
              }
      }, []);
    console.log(purchases)      

        async function deleteOrder(orderId){
        try{
          const response = await axios.delete(APIURL + "/purchase")
          console.log(response)
        } catch (e) {
          console.log(e);
        }
      }
  return (
    <div className='orderTable'>
        <OrderTable roundTo={roundTo} deleteOrder={deleteOrder} purchases={purchases} fetchedData={fetchedData} />
    </div>
  );
};
export default Purchases;

function OrderTable({ purchases, fetchedData, deleteOrder, roundTo}){
    if (fetchedData == true){
    return(
    <table id="customers">
        <tr>
            <th style={{textAlign: "center"}}>(ID) Customer Name</th>
            <th style={{textAlign: "center"}}>Customer Email</th>
            <th style={{textAlign: "center"}}>Items Ordered</th>
            <th style={{textAlign: "center"}}>Order Total</th>
            <th style={{textAlign: "center"}}>Date Purchased</th>
        </tr>

        {purchases.map((purchase) => {
            {console.log(purchase)}
         return (
            <tr>
                <td> ({purchase.id}) {purchase.purchase.name}</td>
                <td>{purchase.purchase.email}</td>
                <td>{purchase.purchase.shoppingCart.map((item, i) => {
          return (
            <tr key={i} style={{width: "100%"}}>
              <td>{item.name}</td>
              <td>{item.quantity}</td>
              <td>${roundTo(item.price)}</td>
              <td>
                ${(item.price * item.quantity)}
              </td>
            </tr>
          );
        })}</td>

                <td>${roundTo(purchase.purchase.orderTotal)}</td>
                <td>{purchase.purchasedAt} <button onClick={(e) => deleteOrder(purchase.id)}>Delete Order</button></td>
            </tr>
            
            );
            })}
        </table>
    )}
    return(
        <div className='orderTable'>
            Orders not fetched
        </div>
    )
}