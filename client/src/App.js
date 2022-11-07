import React, { useState, useEffect } from "react";
import SushiContainer from "./containers/SushiContainer";
import Table from "./containers/Table";

// Endpoint!
const API = "http://localhost:5042/api/Sushi";

const startState = {
  allSushis: [],
  startIndex: 0,
  bank: 106,
  eatenSushi: [],
};

export const App = () => {
  const [sushis, setSushis] = useState(startState);
  const [currentSushi, setCurrentSushi] = useState(4);
  const [eatSushi, setEatSushi] = useState(0);
  const [money, setMoney] = useState(0);

  useEffect(() => {
    fetch(API)
      .then((res) => res.json())
      .then((allSushis) => setSushis({ ...sushis, allSushis: allSushis }));
  }, []);

  const activePageContent = () => {
    /*Please come up with a logic to display 4 sushis at a time */

    let tempElm_ = {
      allSushis: [],
      bank: 106,
      eatenSushi: [],
    };

    sushis.allSushis.map((data)=>{tempElm_.allSushis.push(data)})

    if(tempElm_ && tempElm_.allSushis && tempElm_.allSushis.length && tempElm_.allSushis.length > 0)
      tempElm_.allSushis = tempElm_.allSushis.slice(currentSushi - 4, currentSushi)

      return tempElm_;
  };

  const moreSushis = () => {
    /*Please come up with a logic to allow users to see the next 4 sushis */
    if(sushis.allSushis.length === currentSushi){
      setCurrentSushi(4)
    }else{
      setCurrentSushi(currentSushi+4)
    }
  };

  const goBack = () => {
    /*Please come up with a logic to allow users to see the previous 4 sushis */
    if(currentSushi === 4){
      setCurrentSushi(sushis.allSushis.length)
    }else{
      setCurrentSushi(currentSushi-4)
    }

  };

  const updateSushis = (id, price) => {
    /*Please come up with a logic prompt users on the following:

      1) If sushi has already been eaten, display an alert that shows "Sushi has been eaten!"
      2) If user's bank balance is less than the price of the sushi selected, display an alert that shows "Insufficient funds!"
      3) Only when the above 2 conditions are satisfied, allow users to eat the sushi. When the sushi is eaten, the sushi will only show
          an empty plate in its original place and there will be an additional empty plate on the table. Please refer to the gif for 
          described behaviour.    
    */
    if(sushis && sushis.allSushis && sushis.bank > 0){
      let selectedSushisIndex = sushis.allSushis.findIndex(x => x.id === id);
      if(price <= sushis.bank){
        sushis.allSushis[selectedSushisIndex].img_url = ''
        sushis.bank -= price;
        sushis.eatenSushi.push(
            sushis.allSushis[selectedSushisIndex]
        );
        setSushis(sushis)
        setEatSushi(id)
      }else{
        alert('Insufficient funds!')
      }
    }else{
      //  throw an error
    }
  };
  const addWallet = () => {
    let text;
    let amount = prompt("Enter an amount:", "100");
    if (amount == null || amount === "") {
      alert('Please enter an amount!')
    } else {
      let money = parseInt(amount)

      if (isNaN(money)){
        alert('Please enter a number value!')
      }else{
        alert(money)
        sushis.bank += money;
        setSushis(sushis)
        setMoney(money)
      }

    }

  }

  return (
    <div className="app">
      <button onClick={addWallet}>Sushi Wallet</button>
      <SushiContainer
          sushis={activePageContent()}
          moreSushis={moreSushis}
          goBack={goBack}
          eatSushi={updateSushis}
      />
      <Table sushiPlate={sushis.eatenSushi} bank={sushis.bank} />

    </div>
  );
};

export default App;
