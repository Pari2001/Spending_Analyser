import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
// import DonutChart from 'react-donut-chart';

ChartJS.register(ArcElement, Tooltip, Legend);
// const lighten = (color, value) => Doughnut.helpers.color(color).lighten(value).rgbString();

const Manage = (props) => {

    // var COLORS = interpolateColors(dataLength, colorScale, colorRangeInfo);

    let len = props.notebook.categories.length;
    const labels = props.notebook.categories;
    const dataset = new Array(len).fill(0);
    props.transaction.forEach((pay, index) => {
        let ii = labels.indexOf(pay.category);
        dataset[ii] += parseInt(pay.amount);
    })
    const data = {
        labels: labels,
        datasets: [
            {
                label: 'Expense(in ₹)',
                data: dataset,
                // [12, 19, 10, 3, 5, 2, 3, 12].slice(0, len),
                // background: lighten,
                backgroundColor: ['#FF69B4', '#87CEEB', '#90EE90', '#FFA07A', '#7B68EE', '#00FF7F', '#FFB6C1', '#87CEFA', '#ADD8E6', '#F0E68C', '#E6E6FA', '#FFE4B5', '#98FB98', '#AFEEEE', '#DB7093', '#FFA500', '#FFDAB9', '#DDA0DD', '#B0E0E6', '#8FBC8F', '#FFC0CB', '#00FF00', '#32CD32', '#FFFF00', '#00FFFF', '#00BFFF', '#9370DB', '#00CED1', '#228B22', '#ADFF2F', '#20B2AA', '#3CB371', '#F0FFF0', '#006400', '#008000', '#7FFF00', '#7CFC00', '#00FF80', '#00FFBF', '#00FFFF', '#008080', '#00BFBF', '#00FFFF', '#0080FF', '#00BF00', '#7FFFD4', '#00FFFF', '#0080BF', '#008080', '#0080FF', '#00BF80', '#00BFFF', '#008080', '#0080FF', '#00BF00', '#7FFFD4', '#00FFFF', '#0080BF', '#008080', '#0080FF', '#00BF80', '#00BFFF', '#008080', '#0080FF', '#00BF00', '#7FFFD4', '#00FFFF', '#0080BF', '#008080', '#0080FF', '#00BF80', '#00BFFF', '#008080', '#0080FF', '#00BF00', '#7FFFD4', '#00FFFF', '#0080BF', '#008080', '#0080FF', '#00BF80', '#00BFFF', '#008080', '#0080FF', '#00BF00', '#7FFFD4', '#00FFFF', '#0080BF', '#008080', '#0080FF'].slice(0, len),
                borderColor: ['#FF69B4', '#87CEEB', '#90EE90', '#FFA07A', '#7B68EE', '#00FF7F', '#FFB6C1', '#87CEFA', '#ADD8E6', '#F0E68C', '#E6E6FA', '#FFE4B5', '#98FB98', '#AFEEEE', '#DB7093', '#FFA500', '#FFDAB9', '#DDA0DD', '#B0E0E6', '#8FBC8F', '#FFC0CB', '#00FF00', '#32CD32', '#FFFF00', '#00FFFF', '#00BFFF', '#9370DB', '#00CED1', '#228B22', '#ADFF2F', '#20B2AA', '#3CB371', '#F0FFF0', '#006400', '#008000', '#7FFF00', '#7CFC00', '#00FF80', '#00FFBF', '#00FFFF', '#008080', '#00BFBF', '#00FFFF', '#0080FF', '#00BF00', '#7FFFD4', '#00FFFF', '#0080BF', '#008080', '#0080FF', '#00BF80', '#00BFFF', '#008080', '#0080FF', '#00BF00', '#7FFFD4', '#00FFFF', '#0080BF', '#008080', '#0080FF', '#00BF80', '#00BFFF', '#008080', '#0080FF', '#00BF00', '#7FFFD4', '#00FFFF', '#0080BF', '#008080', '#0080FF', '#00BF80', '#00BFFF', '#008080', '#0080FF', '#00BF00', '#7FFFD4', '#00FFFF', '#0080BF', '#008080', '#0080FF', '#00BF80', '#00BFFF', '#008080', '#0080FF', '#00BF00', '#7FFFD4', '#00FFFF', '#0080BF', '#008080', '#0080FF'].slice(0, len),
                // backgroundColor: [
                //     'rgba(255, 99, 132, 0.2)',
                //     'rgba(54, 162, 235, 0.2)',
                //     'rgba(0, 0, 0, 0.2)',
                //     'rgba(255, 206, 86, 0.2)',
                //     'rgba(75, 192, 192, 0.2)',
                //     'rgba(153, 102, 255, 0.2)',
                //     'rgba(255, 159, 64, 0.2)',
                //     'rgba(255, 255, 255, 0.2)',
                // ].slice(0, len),
                // borderColor: [
                //     'rgba(255, 99, 132, 1)',
                //     'rgba(54, 162, 235, 1)',
                //     'rgba(0, 0, 0, 1)',
                //     'rgba(255, 206, 86, 1)',
                //     'rgba(75, 192, 192, 1)',
                //     'rgba(153, 102, 255, 1)',
                //     'rgba(255, 159, 64, 1)',
                //     'rgba(255, 255, 255, 1)',
                // ].slice(0, len),
                borderWidth: 1,
            },
        ],
    };

    return (
        <>
            <h2 className="section__title">Doughnut</h2>
            <span className="section__subtitle less__margin__subtitle">Get details of current balance here</span>
            <div className="services__container container flexy">
                <Doughnut
                    className='chart'
                    height={300}
                    width={400}
                    data={data}
                    options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        }} 
                />
            </div>
        </>
    )
}

export default Manage;