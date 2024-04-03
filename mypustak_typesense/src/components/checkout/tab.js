import React from 'react'

export default function Paymenttab() {
    return (
        <div>
            <div className="tabs">
                <button className="tablinks"
                    style={{
                        borderBottom: this.state.allOrders ? "5px solid blue" : "none",
                        backgroundColor: this.state.allOrders ? "#ddd" : "#fff"
                    }}
                    onClick={this.tabHandleAllOrderClick}>All Orders</button>
                <button className="tablinks"
                    style={{
                        borderBottom: this.state.unshipOrders ? "5px solid blue" : "none",
                        backgroundColor: this.state.unshipOrders ? "#ddd" : "#fff"
                    }}
                    onClick={this.tabHandleUnShipOrderClick}>Unshipped Orders</button>
                <div></div>
                <button className="tablinks"
                    style={{
                        borderBottom: this.state.shippedOrders ? "5px solid blue" : "none",
                        backgroundColor: this.state.shippedOrders ? "#ddd" : "#fff"
                    }}
                    onClick={this.tabHandleShippedOrderClick}>Shipped Orders</button>
                <button className="tablinks"
                    style={{
                        borderBottom: this.state.deliveredOrders ? "5px solid blue" : "none",
                        backgroundColor: this.state.deliveredOrders ? "#ddd" : "#fff"
                    }}
                    onClick={this.tabHandleDeliveredOrderClick}>Delivered Orders</button>
                <button className="tablinks"
                    style={{
                        borderBottom: this.state.returnedOrders ? "5px solid blue" : "none",
                        backgroundColor: this.state.returnedOrders ? "#ddd" : "#fff"
                    }}
                    onClick={this.tabHandleReturnedOrderClick}>Returned Orders</button>
                {/* <button className="tablinks"
              style={{borderBottom:this.state.deliveredandcompletedOrders?"5px solid blue":"none",
              backgroundColor:this.state.deliveredandcompletedOrders?"#ddd":"#fff"}}
              onClick={this.tabHandleDeliveredandCompletedOrderClick}>Delivered and Completed Orders</button>
              <button className="tablinks"
              style={{borderBottom:this.state.returnedandcompletedOrders?"5px solid blue":"none",
              backgroundColor:this.state.returnedandcompletedOrders?"#ddd":"#fff"}}
              onClick={this.tabHandleReturnedandCompletedOrderClick}>Returned and Completed Orders</button> */}
            </div>
            <style jsx>
                {`
            table {
              border: 1px solid #ddd;
              font-size: 12px;
              text-align: center;
              border-collapse: collapse;
              margin-top:10px;
              width:100%;
            }
            tr {
              // border:1px 2px solid  #ddd;
            }
            tr:hover{
              background-color: lightblue;
            }
            td {
              font-size: 12px;
              border: 1px solid #ddd;
              padding: 8px 0px;
              margin-left: 5px;
              text-align:center;
            }
            .tabs {
              overflow: hidden;
              border-bottom: 5px solid #f1f1f1;
              display:flex;
              justify-content: space-between;
          }
          .tabs button {
              background-color: inherit;
              float: left;
              color: #0070E7;
              border: none;
              outline: none;
              cursor: pointer;
              padding: 10px 12px;
              transition: 0.3s;
              font-size: 13px;
              font-weight: 600;
              width: 100%;
              height: 52px;
          }
          .tabs button:hover {
          background-color: #ddd !important;
          }
          @media screen and (max-width:1050px){
              .tabs button {
                  font-size: 11px;
              }
          }
          @media screen and (max-width:850px){
              .tabs button {
                  width: 25%;
                  height: 60px;
                  font-size: 10px;    
              }
          }
          `}
            </style>
        </div>
    )
}
