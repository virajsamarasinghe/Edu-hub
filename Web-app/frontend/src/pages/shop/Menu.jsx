import React, { useEffect, useState, useRef } from 'react';
import Cards from '../../components/Cards';
import { FaFilter } from "react-icons/fa";

const Menu = () => {
    const [menu, setMenu] = useState([]);
    const [filteredItems, setFilteredItems] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [sortOption, setSortOption] = useState("default");
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(8);
    const [loading, setLoading] = useState(true);

    const shopSectionRef = useRef(null); // Add this line

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("http://localhost:6001/menu");
                const data = await response.json();
                setMenu(data);
                setFilteredItems(data);
            } catch (error) {
                console.log("Error fetching data", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const filterItems = (category) => {
        const filtered = category === "all" ? menu : menu.filter((item) => item.category === category);
        setFilteredItems(filtered);
        setSelectedCategory(category);
        setCurrentPage(1);
    };

    const showAll = () => {
        setFilteredItems(menu);
        setSelectedCategory("all");
        setCurrentPage(1);
    };

    const handleSortChange = (option) => {
        setSortOption(option);
        let sortedItems = [...filteredItems];

        switch (option) {
            case "A-Z":
                sortedItems.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case "Z-A":
                sortedItems.sort((a, b) => b.name.localeCompare(a.name));
                break;
            case "low-to-high":
                sortedItems.sort((a, b) => a.price - b.price);
                break;
            case "high-to-low":
                sortedItems.sort((a, b) => b.price - a.price);
                break;
            default:
                break;
        }

        setFilteredItems(sortedItems);
        setCurrentPage(1);
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const scrollToShopSection = () => {
        shopSectionRef.current.scrollIntoView({ behavior: 'smooth' }); // Smooth scroll to the section
    };

    if (loading) {
        return <div className="text-center py-4">Loading...</div>;
    }

    return (
        <div>
            {/* Menu banner */}
            <div className='section-container bg-yellow-400'>
                <div className='py-48 flex flex-col justify-center items-center gap-8'>
                    <div className='text-center space-y-7 px-4'>
                        <h2 className='md:text-5xl text-4xl font-bold md:leading-snug leading-snug'>
                            For the love of stunning 
                            <span className='text-pink'> FASHION</span>
                        </h2>
                        <p className='text-xl text-[#4a4a4a] md:w-4/5 mx-auto'>
                            Come with family and experience the joy of our stunning fashion pieces, from classic essentials to rich statement items, refreshing trends, and more all at an affordable price.
                        </p>
                        <button onClick={scrollToShopSection} className='btn bg-pink px-8 py-3 font-semibold text-white rounded-full'>Order Now</button>
                    </div>
                </div>
            </div>

            {/* Menu shop section */}
            <div className='section-container' ref={shopSectionRef}>
                {/* Filtering and sorting */}
                <div className='flex flex-col md:flex-row flex-wrap md:justify-between items-center space-y-3 mb-8'>
                    <div className='flex flex-row justify-start md:items-center md:gap-8 gap-4 flex-wrap'>
                        <button onClick={showAll} className={selectedCategory === "all" ? "active" : ""}>All</button>
                        <button onClick={() => filterItems("cups")} className={selectedCategory === "cups" ? "active" : ""}>Dresses</button>
                        <button onClick={() => filterItems("rolls")} className={selectedCategory === "rolls" ? "active" : ""}>T-Shirts</button>
                        <button onClick={() => filterItems("milkshakes")} className={selectedCategory === "milkshakes" ? "active" : ""}>Blouses</button>
                        <button onClick={() => filterItems("bars")} className={selectedCategory === "bars" ? "active" : ""}>Ladies pants</button>
                        <button onClick={() => filterItems("cones")} className={selectedCategory === "cones" ? "active" : ""}>Skirt</button>
                    </div>

                    <div className='flex justify-end mb-4 rounded-sm'>
                        <div className='bg-pink p-2'>
                            <FaFilter className='h-4 w-4 text-white'/>
                        </div>
                        <select name="sort" id="sort" onChange={(e) => handleSortChange(e.target.value)} value={sortOption} className='bg-pink text-white px-2 py-1 rounded-sm'>
                            <option value="default">Default</option>
                            <option value="A-Z">A-Z</option>
                            <option value="Z-A">Z-A</option>
                            <option value="low-to-high">Low to High</option>
                            <option value="high-to-low">High to Low</option>
                        </select>
                    </div>
                </div>

                {/* Product card */}
                <div className='grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-4'>
                    {currentItems.map((item) => (
                        <Cards key={item._id} item={item}/>
                    ))}
                </div>
            </div>

            {/* Pagination */}
            <div className='flex justify-center my-8'>
                <button
                    onClick={() => setCurrentPage(prevPage => Math.max(prevPage - 1, 1))}
                    className='mx-1 px-3 py-1 rounded-full bg-gray-200'
                    disabled={currentPage === 1}
                >
                    Previous
                </button>
                {
                    Array.from({ length: Math.ceil(filteredItems.length / itemsPerPage) }).map((_, index) => (
                        <button
                            key={index + 1}
                            onClick={() => paginate(index + 1)}
                            className={`mx-1 px-3 py-1 rounded-full ${currentPage === index + 1 ? "bg-pink text-white" : "bg-gray-200"}`}
                        >
                            {index + 1}
                        </button>
                    ))
                }
                <button
                    onClick={() => setCurrentPage(prevPage => Math.min(prevPage + 1, Math.ceil(filteredItems.length / itemsPerPage)))}
                    className='mx-1 px-3 py-1 rounded-full bg-gray-200'
                    disabled={currentPage === Math.ceil(filteredItems.length / itemsPerPage)}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default Menu;
