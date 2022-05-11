import React, { useEffect } from 'react'
import { Bar, Chart } from 'react-chartjs-2';
import { Chart as ChartJs } from 'chart.js/auto'; // Helps to prevent registration error

function BarChart(props) {
  console.log("pops.data:", props.data);
  let labels = [], costs = [];
  if (Object.keys(props.data).length > 0) {
    props.data.forEach(ele => {
      labels.push(ele.name)
      costs.push(ele.cost);
    })

    console.log("Label: ", labels);
    console.log("costs: ", costs);
  }


  return (
    <div>
      <Bar
        data={{
          labels: labels,
          datasets: [{
            label: props.name,
            data: costs,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
              'rgb(255, 99, 132)',
              'rgb(54, 162, 235)',
              'rgba(255, 159, 64)',
            ],
            borderWidth: 1

          }]

        }}

        height={400}
        width={600}

        options={{
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }}
      />

    </div>
  )
}

export default BarChart