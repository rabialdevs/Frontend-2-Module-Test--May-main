let menuitems = [];
let orderitems = [];

document
  .getElementById("get_menu_btn")
  ?.addEventListener("click", async () => getMenu());

document.getElementById("takeorder")?.addEventListener("click", async () => {
  let orders = [];
  try {
    orders = await takeOrder();
    orderitems = orders;
  } catch (e) {
    alert(e);
    return;
  }

  console.log("Orders taken for:");
  console.table(orders);

  console.log("Preparing order...");
  await orderPrep();
  await payOrder();
  thankyouFnc();
});

async function getMenu() {
  try {
    let response = await fetch(
      "https://raw.githubusercontent.com/saksham-accio/f2_contest_3/main/food.json"
    );

    let divForMenu = [];

    menuitems = await response.json();
    menuitems.forEach((val, _) => {
      let div = document.createElement("div");
      div.innerHTML = `<img height="200rem" width="306rem" src=${val.imgSrc} alt="">
          <h4>${val.name}</h4>
          <h6>${val.price}</h6>`;

      divForMenu.push(div);
    });

    let menuSection = document.createElement("div");
    for (let i = 0; i < divForMenu.length; i++) {
      menuSection.appendChild(divForMenu[i]);
    }

    document.body.appendChild(menuSection);
  } catch (e) {
    alert(e);
  }
}

function takeOrder() {
  if (menuitems.length === 0) {
    return Promise.reject("Get the menu first!");
  }

  let randoms = [];
  while (randoms.length < 3) {
    const randomIndex = Math.floor(Math.random() * menuitems.length);
    const randomElement = menuitems[randomIndex];

    if (!randoms.includes(randomElement)) {
      randoms.push(randomElement);
    }
  }

  let promise = new Promise((resolve) => {
    setTimeout(() => {
      resolve(randoms);
    }, 2500);
  });
  return promise;
}

function orderPrep() {
  return new Promise((resolve) => {
    setTimeout(() => {
      return resolve({ order_status: true, paid: false });
    }, 1500);
  });
}

function payOrder() {
  return new Promise((resolve) => {
    setTimeout(() => {
      return resolve({ order_status: true, paid: true });
    }, 1000);
  });
}

function thankyouFnc() {
  alert("Thank you for eating with us today");
}
