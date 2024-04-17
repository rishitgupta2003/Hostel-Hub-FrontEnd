import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Carousel from 'react-slick'; // Import the carousel component
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';



function Home() {
  const [products, setProducts] = useState([]);
  // const [carouselProducts, setCarouselProducts] = useState([]);


  useEffect(() => {
    fetchProducts();
    // fetchCarouselProducts();
    fetchProductsForSlider();


  }, []);
  const fetchProductsForSlider = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/v1/product/productBanner');
      if (!response.ok) {
        throw new Error('Failed to fetch slider products');
      }
      const responseData = await response.json();
      console.log(responseData);
      const sliderProducts = responseData.data || [];
      setProducts(sliderProducts);
    } catch (error) {
      console.error('Error fetching slider products:', error);
    }
  };
  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/v1/product/allProducts');
      // console.log(response);
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      const responseData = await response.json();
      const productData = responseData.data || [];
      setProducts(productData);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  if (products.length === 0) {
    return <div>No Products</div>;
  }
  const settings = {
    dots: true,
    infinite: true,
    speed: 100, // Adjust the speed of sliding
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true, // Enable autoplay
    autoplaySpeed: 1000, // Set autoplay speed in milliseconds
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };


  return (
    <div className="container mx-auto px-4 py-18">
      <div className="mb-8">
        <h2 className="text-3xl font-semibold mb-6">Featured Products</h2>
        <div className="overflow-hidden">
          <Carousel {...settings}>
            {products.map((product) => (
              <div key={product._id} className="px-4">
                <Link to={`/product/${product._id}`} className="block">
                  <div className="w-24 h-16 relative overflow-hidden rounded-md">
                    <img
                      src={product.coverImg}
                      alt={product.name}
                      className="absolute top-0 left-0 w-full h-full object-cover object-center cursor-pointer"
                    />
                  </div>
                  <h3 className="text-sm font-semibold mt-2">{product.name}</h3>
                  <p className="text-xs text-gray-600">{product.description}</p>
                  <p className="text-sm font-semibold text-red-500">Price: ₹ {product.price}</p>
                </Link>
              </div>
            ))}
          </Carousel>
      </div>
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-semibold mb-6">New Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product._id}
              className="relative bg-white rounded-lg shadow-md overflow-hidden"
            >
              {/* Wrap the product name inside a Link component */}
              <Link to={`/product/${product._id}`}>
                <img
                  src={product.coverImg}
                  alt={product.name}
                  className="w-full h-48 object-cover object-center cursor-pointer"
                />
              </Link>
              <div className="p-4">
                {/* Also wrap the product name inside the Link component */}
                <Link to={`/product/${product._id}`}>
                  <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                </Link>
                <p className="text-gray-600 mb-4">{product.description}</p>
                <p className="text-lg font-semibold text-blue-500">
                  Price: ₹ {product.price}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>



    </div>
    </div>
  )
}

export default Home;
