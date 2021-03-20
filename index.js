document.addEventListener('DOMContentLoaded', () => {  
  inputBills()

  const input = document.querySelector('#askedMoneyInput')
  input.addEventListener('click', validateAllFields, false)
  document.querySelector('.ux').textContent = 'Ingresa la cantidad de billetes'

  document.querySelector('#extractMoney').disabled = true

  function validateAllFields(){
    const fulfilledInputs = document.querySelectorAll('.fulfilled')
    if(fulfilledInputs.length === availableBills.length){
      window.extractMoney.disabled = false

      const cards = document.querySelectorAll('.card-remaining')
      cards.forEach(card => {
        document.querySelectorAll('.inputQuantity').forEach(input => {
          input.remove()
        })

        const span = document.createElement('span')
        span.classList.add('remainBill')
        card.appendChild(span)
      })
      input.removeEventListener('click', validateAllFields, false)

      showAvailableMoney()
    } else {
      window.alert('Ingrese cantidades permitidas')
    }
  }
})

class Bill
{
  constructor(v, c)
  {
    this.value = v;
    this.quantity = c;
  }
}

function moneyDelivery()
{
  var askedMoneyInput = document.getElementById("askedMoneyInput");
  askedMoney = parseInt(askedMoneyInput.value);

  if(askedMoney % 5 !==0 || askedMoney <= 0){
    window.alert(`Ingresa una cantidad múltiplo de 5 positivo`)
    askedMoneyInput.value = ''
    return
  }

  for(let bill of availableBills)
  {
    console.log(bill)
    if(askedMoney > 0)
    {
      div = Math.floor(askedMoney / bill.value);
      console.log(div)

      if(div > bill.quantity)
      {
        console.log(bill.quantity)
        bills = bill.quantity;
      }
      else
      {
        bills = div;
      }

      billsDelivered.push( new Bill(bill.value, bills) );
      askedMoney = askedMoney - (bill.value * bills);
    }
  }

  if(askedMoney > 0)
  {
    window.alert(`Soy un cajero malo, he sido malo y no puedo darte esa cantidad :(`)
    askedMoneyInput.value = ''
    billsDelivered = []
    return
  }
  else
  {
    let i = 0
    for(var e of billsDelivered)
    {
      if(e.quantity > 0)
      {
        for(let i = 0; i < e.quantity; i++){
          displayBill(e.value)
        }
      }

      availableBills[i].quantity -= e.quantity
      i++
    }

    document.querySelectorAll('.remainBill').forEach((bill, index) => {
      bill.textContent = `X ${availableBills[index].quantity}`
    })

    showAvailableMoney()
    billsDelivered = []
  }

  // showing vertical scroll
  document.querySelector('.bills-container').style['overflow-y'] = 'scroll'

  // showing info
  document.querySelector('.info').style['display'] = 'inline'
  document.querySelector('.results').style['display'] = 'flex'
}

function displayBill(value) {
  const oneHundred = document.querySelector('.one-hundred')
  const fifty = document.querySelector('.fifty')
  const twenty = document.querySelector('.twenty')
  const ten = document.querySelector('.ten')
  const five = document.querySelector('.five')
  const input = document.querySelector('#askedMoneyInput')
  const button = document.querySelector('#extractMoney')

  let bill = ''
  let id = ''

  switch(value){
    case 100:{
      bill = oneHundred
      id = 'oneHundred'
      break
    }
    case 50:{
      bill = fifty
      id = 'fifty'
      break
    }
    case 20:{
      bill = twenty
      id = 'twenty'
      break
    }
    case 10:{
      bill = ten
      id = 'ten'
      break
    }
    case 5:{
      bill = five
      id = 'five'
      break
    }
  }

  // adding element
  const billImg = document.createElement('img')
  billImg.src = `./images/${value}.png`
  billImg.id = id
  billImg.classList.add('bill')
  bill.append(billImg)

  //quantities
  showInfo()

  //reset
  input.addEventListener('click', reset, true)
  button.addEventListener('click', reset, true)

}

function reset(){
  const input = document.querySelector('#askedMoneyInput')
  const button = document.querySelector('#extractMoney')
  input.removeEventListener('click', reset, true)
  button.removeEventListener('click', reset, true)

    input.value = ''
    // remove elements
    document.querySelectorAll('.bill').forEach(img => img.remove())
    // hide vertical scroll
    document.querySelector('.bills-container').style['overflow-y'] = 'hidden'
    document.querySelector('.info').style['display'] = 'none'
    document.querySelector('.results').style['display'] = 'flex'
    button.addEventListener('click', moneyDelivery, false)
    showInfo()
  }

function showInfo(){
  document.querySelector('#askedMoneyInput').value = ''
  window.quantityOneHundred.textContent = `X ${document.querySelectorAll('#oneHundred').length}`
  window.quantityFifty.textContent = `X ${document.querySelectorAll('#fifty').length}`
  window.quantityTwenty.textContent = `X ${document.querySelectorAll('#twenty').length}`
  window.quantityTen.textContent = `X ${document.querySelectorAll('#ten').length}`
  window.quantityFive.textContent = `X ${document.querySelectorAll('#five').length}`

  window.total.textContent = `${document.querySelectorAll('.bill').length}`
}

function showAvailableMoney(){
  document.querySelector('.ux').textContent = 'Billetes disponibles'

  let total = 0
  availableBills.forEach(bill => {
    total += (bill.value * bill.quantity)
  })


  document.querySelectorAll('.remainBill').forEach((bill, index) => {
    bill.textContent = `X ${availableBills[index].quantity}`
  })
  document.querySelector('.available-money').textContent = `Dinero disponible: $${total > 0 ? total : 0}`

}

function inputBills(){
  const typesOfBills = [100, 50, 20, 10, 5]
  console.log(typesOfBills)
  for(bill in typesOfBills){
    availableBills.push(new Bill(typesOfBills[bill], 0))
  }

  const bills = document.querySelectorAll('.inputQuantity')

  console.log(bills.values)
  bills.forEach((bill, index) => {
    bill.onfocus = function(){
      validateInput(bill)
    }

    bill.addEventListener('change', event => {
      validateInput(bill)

      if(availableBills[index].value === typesOfBills[index]){
        availableBills[index].quantity = Number(event.target.value)
      } else{
        availableBills.push(new bill(typesOfBills[index], Number(event.target.value)))
      }
      showAvailableMoney()
    })
  })
}

function validateInput(input){
  if(input.value !== '' && input.value >= 0){
    input.classList.remove('invalid')
    input.classList.add('fulfilled')
  }else{
    input.classList.remove('fulfilled')
    input.classList.add('invalid')
  }
}

let availableBills = []
let billsDelivered = []


document.getElementById("extractMoney").addEventListener("click", moneyDelivery);


