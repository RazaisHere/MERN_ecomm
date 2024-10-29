import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { assets } from '../assets/frontend_assets/assets';
import Title from './Title';
import RelatedProduct from './RelatedProduct';

function Product() {
    const { productId } = useParams();
    const { products, currency,addToCart } = useShop();
    const [productData, setProductData] = useState(false);
    const [image, setImage] = useState("");
    const [selectedSize, setSelectedSize] = useState(""); 

    const fetchProduct = async () => {
        products.forEach((item) => {
            if (item._id === productId) {
                setProductData(item);
                setImage(item.image[0]);
                
            }
        });
    };

    useEffect(() => {
        fetchProduct();
    }, [productId, products]);

    return productData ? (
        <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>
            {/* Product Data */}
            <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row'>
                {/* Product Image */}
                <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
                    <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full '>
                        {productData.image.map((item, index) => (
                            <img
                                onClick={() => setImage(item)}
                                src={item}
                                key={index}
                                className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer'
                                alt=""
                            />
                        ))}
                    </div>

                    <div className='w-full sm:w-[80%]'>
                        <img className='w-full h-auto ' src={image} alt="" />
                    </div>
                </div>

                {/* Product Info */}
                <div className='flex-1'>
                    <h1 className='font-medium text-2xl mt-2'>{productData.name}</h1>
                    <div className='flex items-center gap-1 mt-2'>
                        <img src={assets.star_icon} className='w-3.5' alt="" />
                        <img src={assets.star_icon} className='w-3.5' alt="" />
                        <img src={assets.star_icon} className='w-3.5' alt="" />
                        <img src={assets.star_icon} className='w-3.5' alt="" />
                        <img src={assets.star_dull_icon} className='w-3.5' alt="" />
                        <div className="pl-2">(122)</div>
                    </div>
                    <p className='mt-5 text-3xl font-medium'>{currency}{productData.price}</p>
                    <p className='mt-5 text-gray-500 md:w-4/5'>{productData.description}</p>
                    <div className='flex flex-col gap-4 my-8'>
                        <p>Select Size</p>
                        <div className='flex gap-2 '>
                            {productData.sizes && productData.sizes.map((item, index) => (
                                <button
                                    key={index}
                                    onClick={() => {
                                        setSelectedSize(item); 
                                        
                                    }} 
                                    className={`bg-gray-200 py-2 px-4 rounded ${item === selectedSize ? "border border-orange-500" : ""}`} // Correct class for border
                                >
                                    {item}
                                </button>
                            ))}
                        </div>
                    </div>
                    <button onClick={()=>addToCart(productData._id,selectedSize)} className="bg-black text-white px-8 py-3 text-sm active:bg-white active:text-black active:border active:border-black">ADD  TO CART</button>
                    <hr className='mt-10' />
                    <div className='text-sm text-gray-500 flex flex-col gap-2 mt-4'>
                        <p>
                        100% Original product.
                        </p>
                        <p>
                        Cash on delivery is available on this product.
                        </p>
                        <p>
                        Easy return and exchange policy within 7 days.
                        </p>
                    </div>
                </div>
            </div>
            <div className='mt-20'>
                <div className="flex">
                    <b className='border px-5 py-3 text-sm '> Description</b>
                    <p className='border px-5 py-3 text-sm'>Reviews (122)</p>
                </div>
                <div className="flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500">
                    <p>E-commerce websites typically display products or services along with detailed descriptions, images, prices, and any available variations (e.g., sizes, colors). Each product usually has its own dedicated page with relevant information.</p>
                    <p>E-commerce websites typically display products or services along with detailed descriptions, images, prices, and any available variations (e.g., sizes, colors). Each product usually has its own dedicated page with relevant information.</p>
                </div>

            </div>
            {/* Related Products  */}
            <RelatedProduct  category={productData.category} subCategory={productData.subCategory}/>
        </div>
    ) : <div className='opacity-0'></div>
}

export default Product;