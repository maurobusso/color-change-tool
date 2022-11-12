const input = document.querySelector('#input-field')
const inputColor = document.querySelector('#input-color')
const sliderText = document.querySelector('#slider-text')
const slider = document.querySelector('#slider')
const alteredColor = document.querySelector('#altered-color')
const alteredColorText = document.querySelector('#altered-color-text')
const lightenText = document.querySelector('#lighten-text')
const darkenText = document.querySelector('#darken-text')
const toggleBtn = document.querySelector('#toggle-btn')


toggleBtn.addEventListener('click', toggleClass)

function toggleClass(){
    if(toggleBtn.classList.contains('toggled')){
        toggleBtn.classList.remove('toggled')
        lightenText.classList.remove('unselected')
        darkenText.classList.add('unselected')
    }else{
        toggleBtn.classList.add('toggled')
        lightenText.classList.add('unselected')
        darkenText.classList.remove('unselected')
    }
    reset()
}


input.addEventListener('keyup', changeColor)

function changeColor() {
    const hex = input.value
    if(isValidHex(hex) === false) return; 

    const removeHex = hex.replace('#', '')
    inputColor.style.backgroundColor = '#' + removeHex

    reset()
}

const isValidHex = (hex) => {
    const removeHex = hex.replace('#', '')
    const reg = /^([0-9A-F]{3}){1,2}$/i
    
    if ((removeHex.length === 3 || removeHex.length === 6 ) && reg.test(removeHex)){
        return true
    }else{
        return false
    }
}
//tests console.log(isValidHex('#000000))
//      console.log(isValidHex('#000))
//      console.log(isValidHex('#fffffff))
//      console.log(isValidHex('#bbb))
//      console.log(isValidHex('#de))
//      console.log(isValidHex('#azz909))



function convertHexToRgb(hex) {
    if(!isValidHex(hex)){
        return null
    }

    let strippedHex = hex.replace('#', '')

    if(strippedHex.length === 3){
        strippedHex = strippedHex[0] + strippedHex[0]
        + strippedHex[1] + strippedHex[1]
        + strippedHex[2] + strippedHex[2]
    }
    
    const r = parseInt(strippedHex.substring(0,2), 16)
    const g = parseInt(strippedHex.substring(2,4), 16)
    const b = parseInt(strippedHex.substring(4,6), 16)

    return {r,g,b}
}

// test: console.log(convertHexToRgb('fff'))



function convertRGBToHex(r,g,b) {

    const firstPair = ("0" + r.toString(16)).slice(-2);
    const secondPair = ("0" + g.toString(16)).slice(-2);
    const thirdPair = ("0" + b.toString(16)).slice(-2);
  
    const hex = "#" + firstPair + secondPair + thirdPair;
    return hex;
}

// test: console.log(convertRGBToHex(0,255,255))




function alterColor(hex, percentage) {

    const {r,g,b} = convertHexToRgb(hex)

    const amount = Math.floor((percentage / 100) * 255)

    const newR = inRange( r, amount )
    const newG = inRange( g, amount )
    const newB = inRange( b, amount )

    return convertRGBToHex(newR,newG,newB)
    
}

//test alterColor('000', -30)

function inRange(hex, amount){
    const newHex = hex + amount
    if(newHex > 255){
        return 255
    }else if(newHex < 0){
        return 0
    }else{
        return newHex
    }
}


//change slider percentage

slider.addEventListener('input', slide)

function slide(){

    if(!isValidHex(input.value)) return 

    sliderText.innerText = `${slider.value}%`

    const additionalValue = toggleBtn.classList.contains('toggled') ? -slider.value : slider.value

    const alteredHex = alterColor(input.value, additionalValue)
    alteredColor.style.backgroundColor = alteredHex
    alteredColorText.innerText = `Altered Color ${alteredHex}`
}


function reset() {
    sliderText.innerText = '0%'
    slider.value = 0
    alteredColor.style.backgroundColor = input.value
    alteredColorText.innerText = `Altered Color ${input.value}`

}