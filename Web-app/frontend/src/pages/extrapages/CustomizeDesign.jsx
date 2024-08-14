import React from 'react';

const BlogPage = () => {
    const posts = [
        {
            id: 1,
            title: 'Back to School: Top 5 Must-Have Outfits for Girls',
            author: 'Jane Doe',
            date: 'August 4, 2024',
            summary: 'As summer comes to an end and the school year begins, it’s time to refresh those wardrobes with stylish and comfortable outfits. Whether your little one is heading to elementary school or middle school, having the perfect back-to-school wardrobe is essential. In this post, we’ll highlight the top 5 must-have outfits for girls that are both trendy and practical',
            content: 'As summer ends, refresh her wardrobe with these top 5 must-have outfits: Denim overalls paired with striped tees and sneakers offer casual chic. Athleisure sets with bright colors and comfy shoes are perfect for active days. Classic plaid skirts matched with white blouses and Mary Janes give a preppy look. Floral dresses with sandals and a denim jacket add a touch of boho beauty. Finally, layer cardigans over graphic tees for cool weather versatility. Stay stylish for the school year'
        },
        {
            id: 2,
            title: 'Back to School: Top 5 Must-Have Outfits for Girls',
            author: 'Jane Doe',
            date: 'August 4, 2024',
            summary: 'As summer comes to an end and the school year begins, it’s time to refresh those wardrobes with stylish and comfortable outfits. Whether your little one is heading to elementary school or middle school, having the perfect back-to-school wardrobe is essential. In this post, we’ll highlight the top 5 must-have outfits for girls that are both trendy and practical',
            content: 'As summer ends, refresh her wardrobe with these top 5 must-have outfits: Denim overalls paired with striped tees and sneakers offer casual chic. Athleisure sets with bright colors and comfy shoes are perfect for active days. Classic plaid skirts matched with white blouses and Mary Janes give a preppy look. Floral dresses with sandals and a denim jacket add a touch of boho beauty. Finally, layer cardigans over graphic tees for cool weather versatility. Stay stylish for the school year'
        },
        {
            id: 3,
            title: 'Back to School: Top 5 Must-Have Outfits for Girls',
            author: 'Jane Doe',
            date: 'August 4, 2024',
            summary: 'As summer comes to an end and the school year begins, it’s time to refresh those wardrobes with stylish and comfortable outfits. Whether your little one is heading to elementary school or middle school, having the perfect back-to-school wardrobe is essential. In this post, we’ll highlight the top 5 must-have outfits for girls that are both trendy and practical',
            content: 'As summer ends, refresh her wardrobe with these top 5 must-have outfits: Denim overalls paired with striped tees and sneakers offer casual chic. Athleisure sets with bright colors and comfy shoes are perfect for active days. Classic plaid skirts matched with white blouses and Mary Janes give a preppy look. Floral dresses with sandals and a denim jacket add a touch of boho beauty. Finally, layer cardigans over graphic tees for cool weather versatility. Stay stylish for the school year'
        },
        {
            id: 4,
            title: 'Back to School: Top 5 Must-Have Outfits for Girls',
            author: 'Jane Doe',
            date: 'August 4, 2024',
            summary: 'As summer comes to an end and the school year begins, it’s time to refresh those wardrobes with stylish and comfortable outfits. Whether your little one is heading to elementary school or middle school, having the perfect back-to-school wardrobe is essential. In this post, we’ll highlight the top 5 must-have outfits for girls that are both trendy and practical',
            content: 'As summer ends, refresh her wardrobe with these top 5 must-have outfits: Denim overalls paired with striped tees and sneakers offer casual chic. Athleisure sets with bright colors and comfy shoes are perfect for active days. Classic plaid skirts matched with white blouses and Mary Janes give a preppy look. Floral dresses with sandals and a denim jacket add a touch of boho beauty. Finally, layer cardigans over graphic tees for cool weather versatility. Stay stylish for the school year'
        }
        // Add more posts as needed
    ];

    return (
        <div className="max-w-screen-2xl container mx-auto xl:px-20 px-4">
      <div className='section-container bg-yellow-400 mb-8'>
        <div className='py-48 flex flex-col justify-center items-center gap-8'>
          <div className='text-center space-y-7 px-4'>
            <h2 className='md:text-5xl text-4xl font-bold md:leading-snug leading-snug'>
            Explore the latest
              <span className='text-pink'> Fashion Diaries</span>
            </h2>
            <p className='text-xl text-[#4a4a4a] md:w-4/5 mx-auto'>
            Explore the latest trends, fashion tips, and styling advice for girls. Stay updated with our seasonal collections, discover unique outfit ideas, and get inspired by our style guides. Join our community of fashion enthusiasts and make every outfit count.
            </p>
            
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold mb-6"></h1>
            {posts.map(post => (
                <div key={post.id} className="mb-8">
                    <h2 className="text-2xl font-semibold mb-2">{post.title}</h2>
                    <p className="text-gray-600 mb-1">By {post.author} on {post.date}</p>
                    <p className="text-gray-800 mb-4">{post.summary}</p>
                    <button
                        onClick={() => alert(post.content)}
                        className="text-blue-500 hover:underline"
                    >
                        Read more
                    </button>
                </div>
            ))}
        </div>
        </div>
    );
};

export default BlogPage;
