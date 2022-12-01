import { useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

const LineChart = ({ getAllOrdersList }) => {
    const fDateTime = (dateData) => {
        const date = new Date(dateData);
        const year = date.getFullYear();
        const month = date.getMonth();
        const dateDay = date.getDate();
        return `${dateDay}/${month}/${year}`
    }
    let ordersList = {};
    ordersList = {
        labels: getAllOrdersList && getAllOrdersList.orders && getAllOrdersList.orders.map((orders) => fDateTime(orders?.updatedAt)),
        datasets: [
            {
                label: "Total",
                data: getAllOrdersList && getAllOrdersList.orders && getAllOrdersList.orders.map((orders) => orders?.total),
                backgroundColor: [
                    "rgba(75,192,192,1)",
                    "#ecf0f1",
                    "#50AF95",
                    "#f3ba2f",
                    "#2a71d0",
                ],
                borderColor: "black",
                borderWidth: 2,
            },
            {
                label: "Subtotal",
                data: getAllOrdersList && getAllOrdersList.orders && getAllOrdersList.orders.map((orders) => orders?.subtotal),
                backgroundColor: [
                    "rgba(75,192,192,1)",
                    "#ecf0f1",
                    "#50AF95",
                    "#f3ba2f",
                    "#2a71d0",
                ],
                borderColor: "black",
                borderWidth: 2,
            },
            {
                label: "Tax",
                data: getAllOrdersList && getAllOrdersList.orders && getAllOrdersList.orders.map((orders) => orders?.tax),
                backgroundColor: [
                    "rgba(75,192,192,1)",
                    "#ecf0f1",
                    "#50AF95",
                    "#f3ba2f",
                    "#2a71d0",
                ],
                borderColor: "black",
                borderWidth: 2,
            },
            {
                label: "Shipping Fee",
                data: getAllOrdersList && getAllOrdersList.orders && getAllOrdersList.orders.map((orders) => orders?.shippingFee),
                backgroundColor: [
                    "rgba(75,192,192,1)",
                    "#ecf0f1",
                    "#50AF95",
                    "#f3ba2f",
                    "#2a71d0",
                ],
                borderColor: "black",
                borderWidth: 2,
            },
        ],
    }
    return <Line data={ordersList} />
}

export default LineChart