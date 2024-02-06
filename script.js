let prod_detail;
let count = 0;
let size;
let color;




async function fetchData(){
    let response = await fetch("https://cdn.shopify.com/s/files/1/0564/3685/0790/files/singleProduct.json?v=1701948448");
    let data = await response.json();
    prod_detail = data.product;
    console.log(data.product);
    renderData() 
    renderColors()
}

function increment(){
    count++;
    updateCount();
}
function decrement(){
    if(count<=0){
        count=0
    }else{
        count--;
    }
    updateCount()
}

function updateCount(){
    const countElement = document.querySelector(".count");
    countElement.textContent = count;
}

function addToCart(){
    let prod_name = prod_detail.title;
    let sentence = `${prod_detail.title} with Color ${color} and Size ${size} added to cart`

    const container = document.getElementById("selected-prod-info")
    container.style.display = "block"
    container.innerText = sentence;
}


function renderColors() {
    const colorsContainer = document.querySelector(".colors");
    (prod_detail.options[0].values).forEach(colorObject => {
        const colorName = Object.keys(colorObject)[0];
        const colorCode = colorObject[colorName];
        const colorBox = document.createElement("div");
        colorBox.addEventListener("click", function(){
            color = colorName;
            colorBox.classList.add("color-box-ticked");
            colorBox.innerText = "✔"
            
        })
        colorBox.classList.add("color-box");
        // colorBox.textContent = colorName;
        colorBox.style.backgroundColor = colorCode;
        colorsContainer.appendChild(colorBox);
    });
}

function renderData(){
    const container_left = document.getElementById("container-left");
    container_left.innerHTML = `
    <div class="product-image-box">
                <img class="product-image" src="./images/Rectangle 4.png" alt="product-image">
            </div>
            <div class="product-thumbnail">
                <div class="flex-product">
                    <img src="./images/Rectangle 6.png" alt="more-images">
                    <img src="./images/Rectangle 6.png" alt="more-images">
                    <img src="./images/Rectangle 6.png" alt="more-images">
                    <img src=${prod_detail.images[3].src} alt="more-images">
                </div>
            </div>`

    const container_right = document.getElementById("container-right");
    container_right.innerHTML = `
    <div class="vendor-name greyy">
                <p class="vendor-name">${prod_detail.vendor}</p>
            </div>

            <div class="product-title">
                <h1>${prod_detail.title}</h1>
            </div>

            <div class="price">
                <h1 class="actual-price">${prod_detail.price} <span class="dicount">35%</span></h1>
                <p class="compare-at-p greyy"><strike>${prod_detail.compare_at_price}</strike></p>
            </div>

            <div class="choose-colors">
                <p class="greyy">Choose a color</p>
                <div class="colors">
        
                </div>
            </div>

            <div class="choose-size">
                <p class="greyy">Choose a Size</p>
                <div class="box-sizes">
                <div class="size">
                    <input type="radio" name="size" value="small"><span style="margin-left:0.2rem;">Small</span>
                </div>
                <div class="size">
                    <input type="radio" name="size" value="medium"><span style="margin-left:0.2rem;">Medium</span>
                </div>
                <div class="size">
                    <input type="radio" name="size" value="large"><span style="margin-left:0.2rem;">Large</span>
                </div>
                <div class="size">
                    <input type="radio" name="size" value="extra-large"><span style="margin-left:0.2rem;">Extra large</span>
                </div>
                <div class="size">
                    <input type="radio" name="size" value="XXL"><span style="margin-left:0.2rem;">XXL</span>
                </div>
            </div>
            
                </div>
            </div>

            <div class="buttons">
                <div class="add-rem">
                    <button onclick="decrement()" class="minus add-sub-btn">-</button>
                    <p class="count add-sub-btn">${count}</p>
                    <button onClick="increment()" class="plus add-sub-btn">+</button>
                </div>
                <div class="add-cart">
                    <button onclick="addToCart()">Add to cart</button>
                </div>
                
            </div>
            <div id="selected-prod-info">
            </div>

            <div class="description">
                ${prod_detail.description}
            </div>

        </div>`

        const radioInputs = document.querySelectorAll('input[type="radio"]');
        radioInputs.forEach((radioInput) => {
        radioInput.addEventListener('change', () => {
        size= radioInput.value
        // console.log("Selected Size:", radioInput.value);
    });
});
}




window.onload = function(){
    fetchData();
}
