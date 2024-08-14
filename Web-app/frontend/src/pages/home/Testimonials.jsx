import React from 'react'

const categoryItems = [
  { id: 1, width: 'w-1/2', content: 'Category 1' },
  { id: 2, width: 'w-1/2', content: 'Category 2' },
 
]

const Categories = () => {
  return (
    <div className='max-w-screen-2xl container mx-auto xl:px-24 px-4 py-16'>
      <div className='text-center'>
        <div className='flex flex-wrap -mx-2'>
          {categoryItems.map(item => (
            <div key={item.id} className={`h-40 ${item.width} px-2 mb-4`}>
              <div className='bg-white h-full flex items-center justify-center rounded-3xl shadow-md'>
                {item.content}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Categories