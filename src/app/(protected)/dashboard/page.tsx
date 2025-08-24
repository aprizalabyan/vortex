"use client"

import React, { useState, useEffect } from 'react'
import { Card } from 'primereact/card'
import ClipboardIcon from '@/assets/icons/clipboard.svg'
import ElectricityIcon from '@/assets/icons/electricity.svg'
import ScrollIcon from '@/assets/icons/scroll.svg'
import ProfileIcon from '@/assets/icons/profile.svg'
import { Chart } from 'primereact/chart';
import { Button } from 'primereact/button';
import { ButtonGroup } from 'primereact/buttongroup';

interface StockData {
  'Time Series (Daily)': {
    [key: string]: {
      '1. open': string;
      '2. high': string;
      '3. low': string;
      '4. close': string;
      '5. volume': string;
    }
  }
}

const dummyData = [
  {
    title: "Total Request",
    description: "total of requests in the last 30 days",
    value: 208,
    icon: <ClipboardIcon />,
  },
  {
    title: "Total Gateway",
    description: "Total of existing gateways",
    value: 89,
    icon: <ElectricityIcon />,
  },
  {
    title: "Total Source",
    description: "Total of existing sources",
    value: 622,
    icon: <ScrollIcon />,
  },
  {
    title: "Total User",
    description: "total of registered users",
    value: 120,
    icon: <ProfileIcon />,
  },
]

const dummyData2 = [
  {
    title: "Total Token",
    description: "the total of all types of existing tokens",
    value: 208,
  },
  {
    title: "Total Active",
    description: "total of tokens that are still active and ready to use",
    value: 89,
  },
  {
    title: "Total Revoke",
    description: "total tokens that have been revoked",
    value: 622,
  },
  {
    title: "Total Expired",
    description: "total of expired tokens that are no longer active",
    value: 120,
  },
]

const DashboardPage = () => {
  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});
  const [chartData2, setChartData2] = useState({});
  const [chartOptions2, setChartOptions2] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStockData = async () => {
      try {
        const response = await fetch(
          'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=IBM&apikey=demo'
        );
        const data: StockData = await response.json();

        const timeSeriesData = data['Time Series (Daily)'];
        const dates = Object.keys(timeSeriesData).slice(0, 30).reverse();
        const closePrices = dates.map(date => parseFloat(timeSeriesData[date]['4. close']));

        const documentStyle = getComputedStyle(document.documentElement);

        const chartData = {
          labels: dates,
          datasets: [
            {
              label: 'IBM Stock Price',
              data: closePrices,
              fill: true,
              borderColor: documentStyle.getPropertyValue('--slate-50'),
              tension: 0.4,
              backgroundColor: '#5575A5B5'
            }
          ]
        };

        const options = {
          maintainAspectRatio: false,
          aspectRatio: 0.6,
          plugins: {
            legend: {
              labels: {
                color: documentStyle.getPropertyValue('--text-color')
              }
            },
            title: {
              display: true,
              text: 'IBM Stock Price (Last 30 Days)',
              color: documentStyle.getPropertyValue('--text-color')
            }
          },
          scales: {
            x: {
              ticks: {
                color: documentStyle.getPropertyValue('--text-color-secondary')
              },
              grid: {
                color: documentStyle.getPropertyValue('--surface-border')
              }
            },
            y: {
              ticks: {
                color: documentStyle.getPropertyValue('--text-color-secondary')
              },
              grid: {
                color: documentStyle.getPropertyValue('--surface-border')
              }
            }
          }
        };

        setChartData(chartData);
        setChartOptions(options);
      } catch (error) {
        console.error('Error fetching stock data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStockData();
  }, []);

  useEffect(() => {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
    const data = {
      labels: ['Theressa Web', 'Robertson', 'Annette Black', 'Jacob Jones', 'Simons'],
      datasets: [
        {
          label: 'Top Request',
          backgroundColor: '#5575A5',
          borderRadius: 8,
          borderSkipped: null,
          barThickness: 20,
          data: [65, 59, 80, 81, 56]
        }
      ]
    };
    const options = {
      indexAxis: 'y',
      maintainAspectRatio: false,
      aspectRatio: 0.8,
      plugins: {
        legend: {
          labels: {
            fontColor: textColor
          }
        }
      },
      scales: {
        x: {
          ticks: {
            color: textColorSecondary,
            font: {
              weight: 500
            }
          },
          grid: {
            display: false,
            drawBorder: false
          }
        },
        y: {
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          }
        }
      }
    };

    setChartData2(data)
    setChartOptions2(options);
  }, []);

  return (
    <section className='flex flex-col gap-4'>
      <div className="grid grid-cols-4 gap-4">
        {dummyData.map((item, i) => (
          <Card className='shadow-none border border-gray-200 p-6' key={i}>
            <div className='flex flex-col gap-2'>
              <div className="flex justify-between items-center">
                {item.icon}
                <span className='text-2xl font-bold'>{item.value}</span>
              </div>
              <span className='font-semibold'>{item.title}</span>
              <p className='text-sm text-gray-400'>{item.description}</p>
            </div>
          </Card>
        ))}
      </div>
      <Card className='shadow-none border border-gray-200 p-6'>
        <div className="card-header flex justify-between">
          <div className="flex flex-col">
            <span className='text-sm text-gray-400'>Timeline</span>
            <span>Data Timeline</span>
          </div>
          <ButtonGroup pt={{ root: { className: 'bg-gray-100 h-fit rounded-lg py-1' } }}>
            <Button label="Month" className='text-xs  text-gray-300 py-2 px-4 rounded-l' pt={{ label: { className: 'font-normal' } }} />
            <Button label="Year" className='text-xs bg-[#5575A5] text-white py-2 px-4 rounded-lg' pt={{ label: { className: 'font-normal' } }} />
            <Button label="Adv" className='text-xs  text-gray-300 py-2 px-4 rounded-r' pt={{ label: { className: 'font-normal' } }} />
          </ButtonGroup>
        </div>
        <div className='border-b border-gray-200 my-2'></div>
        {loading ? (
          <div className="flex justify-center items-center h-full">
            Loading chart data...
          </div>
        ) : (
          <Chart type="line" data={chartData} options={chartOptions} />
        )}
      </Card>
      <div className='grid grid-cols-2 gap-4'>
        <div className="grid grid-cols-2 gap-4">
          {dummyData2.map((item, i) => (
            <Card className={`shadow-none border border-gray-200 p-6 ${i == 0 ? 'bg-[#5575A5] text-white' : ''}`} key={i}>
              <div className='flex flex-col gap-2'>
                <span className='text-2xl font-bold'>{item.value}</span>
                <span className='font-semibold'>{item.title}</span>
                <p className={`text-sm ${i == 0 ? 'text-white' : 'text-gray-400'}`}>{item.description}</p>
              </div>
            </Card>
          ))}
        </div>
        <Card className='shadow-none border border-gray-200 p-6'>
          <div className="card-header flex justify-between">
            <div className="flex flex-col">
              <span className='text-sm text-gray-400'>Top</span>
              <span>Request</span>
            </div>
            <ButtonGroup pt={{ root: { className: 'bg-gray-100 h-fit rounded-lg py-1' } }}>
              <Button label="Month" className='text-xs  text-gray-300 py-2 px-4 rounded-l' pt={{ label: { className: 'font-normal' } }} />
              <Button label="Year" className='text-xs bg-[#5575A5] text-white py-2 px-4 rounded-lg' pt={{ label: { className: 'font-normal' } }} />
              <Button label="Adv" className='text-xs  text-gray-300 py-2 px-4 rounded-r' pt={{ label: { className: 'font-normal' } }} />
            </ButtonGroup>
          </div>
          <div className='border-b border-gray-200 my-2'></div>
          <Chart type="bar" data={chartData2} options={chartOptions2} height='300px' />
        </Card>
      </div>
    </section>
  )
}

export default DashboardPage