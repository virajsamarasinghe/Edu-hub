import React from 'react';

const Dashboard = () => {
  const userName = "User";

  const pieData = [
    { label: '', value: 300, color: '#FF6384' },
    { label: 'Chocolate', value: 250, color: '#36A2EB' },
    { label: 'Strawberry', value: 100, color: '#FFCE56' },
    { label: 'Mint', value: 150, color: '#4BC0C0' },
    { label: 'Cookie Dough', value: 200, color: '#9966FF' }
  ];

  const total = pieData.reduce((acc, data) => acc + data.value, 0);
  let cumulativeValue = 0;

  const stats = [
    { title: 'Revenue', value: 'Rs.50,000', color: 'bg-green-400' },
    { title: 'Users', value: '1,200', color: 'bg-blue-400' },
    { title: 'Menu Items', value: '50', color: 'bg-orange-400' },
    { title: 'Orders', value: '500', color: 'bg-purple-600' },
  ];

  return (
    <div className='section-container bg-gradient-to-r from-[#FFDE59] from-0% to-[#FFDE59] to-100% py-8 px-4'>
      <div className='container mx-auto'>
        {/* Greeting Section */}
        <div className='py-4'>
          <h2 className='text-4xl font-bold'>Hi, {userName}!</h2>
        </div>

        {/* Main Content */}
        <div className='flex flex-col md:flex-row gap-8'>
          {/* Pie Chart */}
          <div className='md:w-1/2'>
            <div className='py-4'>
              <h3 className='text-2xl font-semibold'>Item Sales by Flavours</h3>
              <svg viewBox="0 0 32 32" width="100%" height="100%">
                {pieData.map((data, index) => {
                  const startAngle = (cumulativeValue / total) * 360;
                  const endAngle = ((cumulativeValue + data.value) / total) * 360;
                  cumulativeValue += data.value;
                  const largeArcFlag = endAngle - startAngle > 180 ? 1 : 0;
                  const x1 = 16 + 16 * Math.cos((Math.PI * startAngle) / 180);
                  const y1 = 16 + 16 * Math.sin((Math.PI * startAngle) / 180);
                  const x2 = 16 + 16 * Math.cos((Math.PI * endAngle) / 180);
                  const y2 = 16 + 16 * Math.sin((Math.PI * endAngle) / 180);
                  return (
                    <path
                      key={index}
                      d={`M16,16 L${x1},${y1} A16,16 0 ${largeArcFlag},1 ${x2},${y2} z`}
                      fill={data.color}
                      stroke="#fff"
                      strokeWidth="0.5"
                    />
                  );
                })}
              </svg>
              <ul className='mt-4'>
                {pieData.map((data, index) => (
                  <li key={index} className='flex items-center'>
                    <span className='inline-block w-4 h-4 mr-2' style={{ backgroundColor: data.color }}></span>
                    {data.label}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Statistics Boxes */}
          <div className='md:w-1/2 mt-8 md:mt-0'>
            <div className='grid grid-cols-1 gap-4'>
              {stats.map((stat, index) => (
                <div key={index} className={`p-6 rounded-lg shadow-md ${stat.color} flex flex-col items-center justify-center`}>
                  <h4 className='text-xl font-bold mb-2'>{stat.title}</h4>
                  <p className='text-2xl'>{stat.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
