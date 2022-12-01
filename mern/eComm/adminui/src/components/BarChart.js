import { useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

const BarChart = ({ getAllProductsList }) => {
    let productRating = {};
    console.log("productListBarChart", getAllProductsList)
    productRating = {
        labels: getAllProductsList && getAllProductsList.products && getAllProductsList.products.map((products) => products.name),
        datasets: [
            {
                label: "Products Rating",
                data: getAllProductsList && getAllProductsList.products && getAllProductsList.products.map((products) => products.averageRating),
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
    console.log("barChartData", productRating);
    return <Bar data={productRating} />
}

export default BarChart