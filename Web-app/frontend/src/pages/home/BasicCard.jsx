import React from 'react'

const categoryItems = [
  { id: 1, width: 'w-1/3', content: 'Category 1' },
  { id: 2, width: 'w-2/3', content: 'Category 2' },
  { id: 3, width: 'w-1/4', content: 'Category 3' },
  { id: 4, width: 'w-3/4', content: 'Category 4' },
]

const Categories = () => {
  return (
    <div className='max-w-screen-2xl container mx-auto xl:px-24 px-4 py-16'>
      <div className='text-center'>
        <div className='flex flex-wrap -mx-2'>
          {categoryItems.map(item => (
            <div key={item.id} className={`h-32 ${item.width} px-2 mb-4`}>
              <div className='bg-gray-200 h-full flex items-center justify-center'>
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