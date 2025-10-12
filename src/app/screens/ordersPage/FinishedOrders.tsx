import React, { useState } from "react";
import { Stack, Box } from "@mui/material";
import TabPanel from "@mui/lab/TabPanel";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import axios from "axios";
import { retrieveFinishedOrders } from "./selector";
import { serverApi } from "../../../lib/config";
import { Order, OrderItem } from "../../../lib/types/orders";
import { Product } from "../../../lib/types/product";
import { OrderStatus } from "../../../lib/enums/order.enum";

/** REDUX SELECTOR **/
const finishedOrdersRetriever = createSelector(
  retrieveFinishedOrders,
  (finishedOrders) => ({ finishedOrders })
);

export default function FinishedOrders() {
  const { finishedOrders } = useSelector(finishedOrdersRetriever);
  const [reviewText, setReviewText] = useState<string>("");

  const submitReview = async () => {
    if (!reviewText) return alert("Please write a review before submitting.");

    try {
      const lastOrderId = finishedOrders?.[finishedOrders.length - 1]?._id;
      await axios.post(`${serverApi}/api/orders/review`, {
        orderId: lastOrderId,
        text: reviewText,
      });

      setReviewText("");
      alert("Thank you for your feedback!");
    } catch (err) {
      console.error(err);
      alert("Failed to submit review.");
    }
  };

  return (
    <TabPanel value={"3"}>
      <Stack spacing={4}>
        {/* All finished orders */}
        {finishedOrders?.map((order: Order) => (
          <Box key={order._id} className="order-main-box">
            <Box className="order-box-scroll">
              {order?.orderItems?.map((item: OrderItem) => {
                const product: Product = order.productData.find(
                  (p: Product) => p._id === item.productId
                )!;
                const imagePath = `${serverApi}/${product?.productImages[0]}`;
                return (
                  <Box key={item._id} className="orders-name-price">
                    <img src={imagePath} className="order-dish-img" />
                    <p className="title-dish">{product?.productName}</p>
                    <Box className="price-box">
                      <p>${item.itemPrice}</p>
                      <img src="/icons/close.svg" />
                      <p>{item.itemQuantity}</p>
                      <img src="/icons/pause.svg" />
                      <p>${item.itemQuantity * item.itemPrice}</p>
                    </Box>
                  </Box>
                );
              })}
            </Box>

            <Box className="total-price-box">
              <Box className="box-total">
                <p>Product price</p>
                <p>${order.orderTotal - order.orderDelivery}</p>
                <img src="/icons/plus.svg" />
                <p>Delivery cost</p>
                <p>${order.orderDelivery}</p>
                <img src="/icons/pause.svg" />
                <p>Total</p>
                <p>${order.orderTotal}</p>
              </Box>
            </Box>
          </Box>
        ))}

        {/* Review section — sahifa ohirida chiqadi */}
        {finishedOrders?.length > 0 && (
          <Box className="review-container">
            <p className="review-title">Share your experience</p>
            <textarea
              className="review-textarea"
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              placeholder="Write your feedback here..."
              rows={4}
            />
            <button className="review-submit" onClick={submitReview} color="secondary">
              Submit Review
            </button>
          </Box>
        )}

        {/* No orders */}
        {!finishedOrders?.length && (
          <Box className="no-orders">
            <img src="/icons/noimage-list.svg" alt="no orders" />
          </Box>
        )}
      </Stack>
    </TabPanel>
  );
}
