import { useState, SyntheticEvent, useEffect } from "react";
import { Container, Stack, Box, Button, TextField } from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabPanel from "@mui/lab/TabPanel";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PausedOrders from "./PausedOrders";
import ProcessOrders from "./ProcessOrders";
import FinishedOrders from "./FinishedOrders";
import "../../../css/order.css";

import { useDispatch } from "react-redux";
import {  Dispatch } from "@reduxjs/toolkit";
import { setPausedOrders, setProcessOrders, setFinishedOrders } from "./slice";
import { Order, OrderInquiry } from "../../../lib/types/orders";
import { OrderStatus } from "../../../lib/enums/order.enum";
import OrderService from "../../services/OrderService";
import { useGlobals } from "../../hooks/useGlobals";
import { useHistory } from "react-router-dom";
import { serverApi } from "../../../lib/config";
import { MemberType } from "../../../lib/enums/member.enum";

/** REDUX SLICE & SELECTOR **/
const actionDispatch = (dispatch: Dispatch) => ({
  setPausedOrders: (data: Order[]) => dispatch(setPausedOrders(data)),
  setProcessOrders: (data: Order[]) => dispatch(setProcessOrders(data)),
  setFinishedOrders: (data: Order[]) => dispatch(setFinishedOrders(data))
});

export default function OrdersPage() {
  const{setPausedOrders, setProcessOrders, setFinishedOrders} = actionDispatch(useDispatch())
  const{orderBuilder, authMember} = useGlobals();
  const history = useHistory();
  const [value, setValue] = useState("1");
  const [orderInquiry, setOrderInquiry] = useState<OrderInquiry>({
    page: 1,
    limit: 5,
    orderStatus: OrderStatus.PAUSE,
  });

  useEffect(() =>{
    const order = new OrderService();

    order
      .getMyOrders({...orderInquiry, orderStatus: OrderStatus.PAUSE})
      .then((data) =>{setPausedOrders(data)})
      .catch((err) => console.log(err))

      order
      .getMyOrders({...orderInquiry, orderStatus: OrderStatus.PROCESS})
      .then((data) =>{setProcessOrders(data)})
      .catch((err) => console.log(err))

      order
      .getMyOrders({...orderInquiry, orderStatus: OrderStatus.FINISH})
      .then((data) =>{setFinishedOrders(data)})
      .catch((err) => console.log(err))

  }, [orderInquiry, orderBuilder])

  const handleChange = (e: SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  
  if(!authMember) history.push("/")
  return (
    <div className="order-page">
      <Container className="order-container">
        {/* LEFT SIDE */}
        <Stack className="order-left">
          <TabContext value={value}>
            <Box className="order-nav-frame">
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  aria-label="basic tabs example"
                  className="table-list"
                >
                  <Tab label="PAUSED ORDERS" value="1" />
                  <Tab label="PROCESS ORDERS" value="2" />
                  <Tab label="FINISHED ORDERS" value="3" />
                </Tabs>
              </Box>
            </Box>
            <Stack className="order-main-content">
              <PausedOrders setValue={setValue} />
              <ProcessOrders setValue={setValue} />
              <FinishedOrders />
            </Stack>
          </TabContext>
        </Stack>

        {/* RIGHT SIDE */}
        <Stack className="order-right">
          <Box className="order-info-box">
            <Box className="member-box">
              <div className="order-user-img">
                <img
                  src= {authMember?.memberImage ?
                      `${serverApi}/${authMember.memberImage}` 
                      : "/icons/default-user.svg"}
                  className="order-user-avatar"
                />
                <div className="order-user-icon-box">
                  <img
                    src={authMember?.memberType === MemberType.RESTAURANT ?
                            "/icons/restaurant.svg" :
                            "/icons/user-badge.svg"} 
                    className="order-user-prof-img"
                  />
                </div>
              </div>
              <span className="order-user-name">{authMember?.memberNick}</span>
              <span className="order-user-prof">{authMember?.memberType}</span>
            </Box>

            <Box className="liner" />

            <Box className="order-user-address">
              <LocationOnIcon />
              <span className="spec-address-txt">{authMember?.memberAddress ? authMember.memberAddress : "Do not exist!"}</span>
            </Box>
          </Box>
          <Box className={"order-info-box2"}>
            <input className="card-input" placeholder="Card number:" ></input>
            <div className="cards-box">
              <input className="card-half-input" placeholder="MM/DD:"></input>
              <input className="card-half-input" placeholder="CVV"></input>
            </div>
            <input className="card-input" placeholder="Name:"></input>
            <div className="cards-img">
              <img className="cards-sty" 
              src="/icons/visa-card.svg" />
              <img className="cards-sty" 
              src="/icons/western-card.svg" />
              <img className="cards-sty" 
             src="/icons/visa-card.svg" />
              <img className="cards-sty" 
               src="/icons/western-card.svg" /> 
            </div>
          </Box>
        </Stack>

       

      </Container>
    </div>
  );
}
