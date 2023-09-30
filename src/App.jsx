import React, { useEffect, useState } from 'react';
import "./App.css";
import cartImg from "./assets/grocery-cart.png";

const App = () => {
  // State for the input value and the list of grocery items
  const [inputValue, setInputValue] = useState("");
  const [groceryItems, setGroceryItems] = useState([]);
  const [isCompleted, setIsCompleted] = useState(false);

  // Function to handle changes in the input field
  const handleChangeValue = (e) => {
    setInputValue(e.target.value);
  };

  //! status update
  useEffect(() => {
    showedCompleteStatus();
  }, [groceryItems])
  //! Function to add grocery items when the Enter key is pressed
  const addGroceryItems = (e) => {
    if (e.key === "Enter") {
      if (inputValue) {
        const updatedGroceryList = [...groceryItems];
        const itemIndex = updatedGroceryList.findIndex(item => item.name === inputValue);

        if (itemIndex === -1) {
          //! Add a new item to the list
          updatedGroceryList.push({
            name: inputValue,
            quantity: 1,
            completed: false
          });
        } else {
          //! Increment the quantity if the item already exists
          updatedGroceryList[itemIndex].quantity++;
        }

        //! Update the state with the new grocery items list and clear the input
        setGroceryItems(updatedGroceryList);
        setInputValue("");
      }
    }
  };

  //! Function to remove an item from the grocery list
  const removeItem = (name) => {
    //! Create a new list without the item to be removed
    const updatedGroceryList = [...groceryItems].filter(
      (item) => item.name !== name
    );

    //! Update the state with the new grocery items list
    setGroceryItems(updatedGroceryList);
  }

  //! Function to render the grocery list
  const renderGroceryList = () => {
    return groceryItems.map((item, inx) => (
      <li key={inx}>
        <div className='container'>
          <input type="checkbox"
            onChange={(e) => {
              // console.log(e.target.checked);
              updateCompleteStatus(e.target.checked, inx)
            }}
            value={item.completed}
            checked={item.completed}
          />
          <p>
            {item.name}
            {
              item.quantity > 1 && <span> x{item.quantity}</span>
            }
          </p>
        </div>
        <div>
          <button className='remove-button' onClick={() => removeItem(item.name)}>X</button>
        </div>
      </li>
    ))
  };

  const updateCompleteStatus = (status, index) => {
    const updatedGroceryList = [...groceryItems];
    updatedGroceryList[index].completed = status;
    setGroceryItems(updatedGroceryList);
  }

  const showedCompleteStatus = (e) => {
    if (!groceryItems.length) {
      return setIsCompleted(false);
    }
    let isAllCompleted = true;
    groceryItems.forEach(item => {
      if (!item.completed) isAllCompleted = false;
    })
    setIsCompleted(isAllCompleted);
  }

  return (
    <main className='App'>
      <div>
        <div>
          {
            isCompleted ? <h4 className='success'>You're Done</h4> : null
          }
          <div className='header'>
            <h1>Shopping List</h1>
            <img src={cartImg} alt="image" />
            <input
              type="text"
              placeholder='Add an Item'
              className='item-input'
              onChange={handleChangeValue}
              onKeyDown={addGroceryItems}
              value={inputValue}
            />
          </div>
        </div>
        <ul>
          {renderGroceryList()}
        </ul>
      </div>
    </main>
  );
};

export default App;
