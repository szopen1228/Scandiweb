import React, { useState } from 'react';
import './App.css';
import { CgShoppingCart } from 'react-icons/cg';
import { BsTrash } from 'react-icons/bs';
import { RiArrowDownSLine } from 'react-icons/ri';

const PAGE_PRODUCTS = 'products';
const PAGE_CART = 'cart';
const PAGE_DETAILS = 'details';
const MEN = 'Men';
const WOMEN = 'Women';
const KIDS = 'Kids';
const USDValue = 1;
const EURValue = 0.95;
const JPYValue = 135.82;

function App() {
  const [cart, SetCart] = useState([]);
  const [page, setPage] = useState('products');
  const [details, setDetails] = useState([]);

  const addToCart = (product) => {
    let newCart = [...cart];
    let itemInCart = newCart.find(
      (item) => product.name === item.name);
    if (itemInCart) {
      itemInCart.quantity++;
    } else {
      itemInCart = {
        ...product,
        quantity: 1,
      };
      newCart.push(itemInCart);
    }
    SetCart(newCart);
  }

  const [isActive, setIsActive] = useState(false);

  const handleClick = () => {
   setIsActive(current => !current);
 };

  const removeFromCart = (product) => {
    let newCart = [...cart];
    let itemInCart = newCart.find(
      (item) => product.name === item.name);
    if (itemInCart.quantity > 1) {
      itemInCart.quantity--;
      SetCart(newCart);
    }
  }

  const decFromCart = (productToRemove) => {
    SetCart(
      cart.filter((product) => product !== productToRemove)
    );
  }

  const totalCost = () => {
    return cart.reduce(
      (sum, { dolar, quantity }) => sum + dolar * quantity, 0);
  }

  const allCartProducts = () => {
    return cart.reduce(
      (sum, { quantity }) => sum + quantity, 0
    );
  };

  const [isCartShow, CartShow] = useState(false);

  function goToCart() {
    navigateTo(PAGE_CART);
    CartShow(current => !current);
  }
  
  function goToPage() {
    setDetails([]);
    navigateTo(PAGE_PRODUCTS);
  }

  const goToDetails = (product) => {
    setDetails([...details, product]);
    navigateTo(PAGE_DETAILS);
  }

  const navigateTo = (goToPage) => {
    setPage(goToPage);
  }

  const [isHovering, setIsHovering] = useState(false);

  const handleMouseOver = () => {
    setIsHovering(true);
  };
 
  const handleMouseOut = () => {
    setIsHovering(false);
  };

  const [category, setCategory] = useState(WOMEN)

  const getProductsCategory = () => {
    return products.filter(
      (product) => product.category === category);
  };

  const [currency, setCurrency] = useState(USDValue);

  const [image, setImage] = useState(0);

  const [products] = useState([
    {
      name: 'Apollo Sweater',
      dolar: 50.00,
      colors: ['grey','black','green'],
      image: [
        'sweater.jpg',
        'sweater_black.jpg',
        'sweater_green.jpg',
      ],
      category: MEN,
      size: ['XS','S','M','L','XL'],
      cart: <CgShoppingCart className="buyIcon" color="black" fontSize="1.5vw" />,
    },
    {
      name: 'Apollo Bag',
      dolar: 30.00,
      image: [
        'bag.jpg',
        'bag_pink.jpg',
      ],
      category: KIDS,
      colors: ['#ede3d9','pink'],
      size: ['XS','S','M','L','XL'],
      cart: <CgShoppingCart className="buyIcon" color="black" fontSize="1.5vw" />,
    },
    {
      name: 'Apollo Coat',
      dolar: 90.00,
      image: [
        'dress.jpg',
        'dress_darkgrey.jpg',
        'dress_orange.jpg',
      ],
      category: WOMEN,
      colors: ['lightgrey','grey','orange'],
      size: ['XS','S','M','L','XL'],
      cart: <CgShoppingCart className="buyIcon" color="black" fontSize="1.5vw" />,
    },
    {
      name: 'Apollo Shirt',
      dolar: 10.00,
      image: [
        'shirt.jpg',
        'shirt_white.jpg',
        'shirt_red.jpg',
      ],
      category: WOMEN,
      colors: ['brown','#eee','red'],
      size: ['XS','S','M','L','XL'],
      cart: <CgShoppingCart className="buyIcon" color="black" fontSize="1.5vw" />,
    },
    {
      name: 'Jupiter Sweater',
      dolar: 40.00,
      image: [
        'sweater_white.jpg',
        'sweater_yellow.jpg',
        'sweater_blue.jpg',
      ],
      category: MEN,
      colors: ['#eee','yellow','lightblue'],
      size: ['XS','S','M','L','XL'],
      cart: <CgShoppingCart className="buyIcon" color="black" fontSize="1.5vw" />,
    },
    {
      name: 'Jupiter Coat',
      dolar: 80.00,
      image: [
        'coat_yellow.jpg',
        'coat_red.jpg',
      ],
      category: WOMEN,
      colors: ['yellow','red'],
      size: ['XS','S','M','L','XL'],
      cart: <CgShoppingCart className="buyIcon" color="black" fontSize="1.5vw" />,
    },
  ]);

  const renderProducts = () => (
    <>
    <h1>{category}</h1>
    <div className='products'>
        {getProductsCategory().map((product, index) => (
        <div className="product" key={index} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} >
          {isHovering && (<a href="#" onClick={() => addToCart(product)}>{product.cart}</a>)}
          <a href='#' onClick={() => goToDetails(product)}>
          <img alt="Product" src={product.image[0]} />
          <h3>{product.name}</h3>
          <h2>{Math.round(currency * product.dolar).toFixed(2)}</h2>
          </a>
        </div>
        ))}
        </div>
        </>
 )

 const renderDetails = () => (
  <>
        {details.map((product, index) => (
        <div className="details" key={index}>
          <img alt="Product" src={product.image[image]} />
          <h1>{product.name}</h1>
            <div className="detailsPrice">
            <h2>Size:</h2>
            <p>{
                product.size.map((size,index) => (
                  <button style={{backgroundColor: isActive ? 'black' : '', color: isActive ? 'white' : '',}} onClick={handleClick} className="btnSize" key={index}>{size}</button>
                ))
              }
            </p>
            <h2>Color:</h2>
            <p>{
                product.colors.map((color,index) =>(
                  <button onClick={(e)=>setImage(e.target.value)} className='btnColor' value={index} style={{background: color}}></button>
                ))
            }</p>
            <h2>Price: <p>{Math.round(currency * product.dolar).toFixed(2)}</p></h2>
            <button className="btnGreen" onClick={() => addToCart(product)}>ADD TO CART</button>
            <h3>Find stunning women's cocktail dresses and party dresses. Stand out in lace and metallic cocktail dresses and party dresses from all your favorite brands.</h3>
            </div>
        </div>
        ))}
        </>
)

 const renderCart = () => (
  <>
    <h1>CART</h1>
    <div className='productsCart'>
        {cart.map((product, index) => (
        <div className="productCart" key={index}>
          <img alt="Product" src={product.image[image]} />
          <div className="count">
          <button className="btnQuantity" onClick={() => addToCart(product)}>+</button>
          <p>{product.quantity}</p>
          <button className="btnQuantity" onClick={() => removeFromCart(product)}>-</button>
          </div>
          <button className="btnDelete" onClick={() => decFromCart(product)}><BsTrash></BsTrash></button>
          <h3>{product.name}</h3>
          <h2>{Math.round(currency * product.dolar).toFixed(2)}</h2>
          <h2>Size:</h2>
            <div className='cartSize'>{
                product.size.map((size,index) => (
                  <button className="btnSize" key={index}>{size}</button>
                ))
              }
            </div>
          <h2>Color:</h2>
          <div className='cartColor'>{
                product.colors.map((color,index) =>(
                  <button onClick={(e)=>setImage(e.target.value)} className='btnColor' value={index} style={{background: color}}></button>
                ))
            }</div>
        </div>
        ))}
        <div className="price">
        <h2>Tax 21%: <p>{Math.round(currency * totalCost() * 0.21).toFixed(2)}</p></h2>
        <h2>Quantity: <p>{allCartProducts()}</p></h2>
        <h2>Total cost: <p>{Math.round(currency * totalCost()).toFixed(2)}</p></h2>
        <button className='btnGreen'>CHECK OUT</button>
        </div>
        </div>
        </>
 )

 const MiniCart = () => (
  <div className='miniCartbg'>
    <div className='miniCart'>
    <h1>My Bag <p>{allCartProducts()} Items</p></h1>
      {cart.map((product, index) => (
        <div className="productMini" key={index}>
          <img alt="Product" src={product.image[image]}/>
          <div className="countMiniCart">
          <button className='quantity' onClick={() => addToCart(product)}>+</button>
          <p>{product.quantity}</p>
          <button className='quantity' onClick={() => removeFromCart(product)}>-</button>
          </div>
          <button className="Delete" onClick={() => decFromCart(product)}><BsTrash></BsTrash></button>
          <h3>{product.name}</h3>
          <h2>{Math.round(currency * product.dolar).toFixed(2)}</h2>
          <h2>Size:</h2>
            <div className='cartSizeMini'>{
                product.size.map((size,index) => (
                  <button className="btnSize" key={index}>{size}</button>
                ))
              }
            </div>
          <h2>Color:</h2>
          <div className='cartColorMini'>{
                product.colors.map((color,index) =>(
                  <button onClick={(e)=>setImage(e.target.value)} className='btnColor' value={index} style={{background: color}}></button>
                ))
            }</div>
        </div>
        ))}
        <div className="price">
        <h2>Total: <p>{Math.round(currency * totalCost()).toFixed(2)}</p></h2>
        <button className='btnWhite' onClick={() => goToCart()}>VIEW BAG</button>
        <button className='btnGreen'>CHECK OUT</button>
        </div>
      </div>
  </div>
 )

  return (
    <div className="App">
          <header CartShow={CartShow}>
            <div className="menu" onClick={() => goToPage()}>
                <button onClick={(e) => setCategory(e.target.value)} value={WOMEN}>WOMEN</button>
                <button onClick={(e) => setCategory(e.target.value)} value={MEN}>MEN</button>
                <button onClick={(e) => setCategory(e.target.value)} value={KIDS}>KIDS</button>
            </div>
            <img className="logo" src="logo.png" alt="Logo" onClick={() => goToPage()}></img>
            <div className="cart">
                <select name="currency" onChange={(e) => setCurrency(e.target.value)}> <RiArrowDownSLine fontSize="12px"/>
                <option selected value={USDValue}>$ USD</option>
                <option value={EURValue}>€ EUR</option>
                <option value={JPYValue}>¥ JPY</option>
                </select>
                <a href="#" onClick={()=>CartShow(current => !current)}><CgShoppingCart className="cartIcon" color="black" fontSize="20px" /><h5>{allCartProducts()}</h5></a>
            </div>
          </header>
          {isCartShow && <MiniCart CartShow={CartShow} />}
      <div className='Main'>
        {page === PAGE_PRODUCTS && renderProducts()}
        {page === PAGE_CART && renderCart()}
        {page === PAGE_DETAILS && renderDetails()}
      </div>
    </div>
  );
}
export default App;