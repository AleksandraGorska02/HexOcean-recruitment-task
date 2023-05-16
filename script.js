const form = document.getElementById("dish-form");
const typeField = document.getElementById("type");
const pizzaFields = document.getElementById("pizza-fields");
const soupFields = document.getElementById("soup-fields");
const sandwichFields = document.getElementById("sandwich-fields");

typeField.addEventListener("change", function () {
  const selectedType = typeField.value;

  hideAllFields();

  if (selectedType === "pizza") {
    pizzaFields.classList.remove("hidden");
  } else if (selectedType === "soup") {
    soupFields.classList.remove("hidden");
  } else if (selectedType === "sandwich") {
    sandwichFields.classList.remove("hidden");
  }
});

function hideAllFields() {
  pizzaFields.classList.add("hidden");
  soupFields.classList.add("hidden");
  sandwichFields.classList.add("hidden");
}

form.addEventListener("submit", async function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const preparationTime = document.getElementById("preparation_time").value;
  const type = document.getElementById("type").value;
  const noOfSlices = document.getElementById("no_of_slices").value;
  const diameter = document.getElementById("diameter").value;
  const spicinessScale = document.getElementById("spiciness_scale").value;
  const slicesOfBread = document.getElementById("slices_of_bread").value;

  const data = {
    name,
    preparation_time: preparationTime,
    type,
  };

  if (type === "pizza") {
    data.no_of_slices = parseInt(noOfSlices);
    data.diameter = parseFloat(diameter);
  } else if (type === "soup") {
    data.spiciness_scale = parseInt(spicinessScale);
  } else if (type === "sandwich") {
    data.slices_of_bread = parseInt(slicesOfBread);
  }

  const url = "https://umzzcc503l.execute-api.us-west-2.amazonaws.com/dishes/";

  const response = await fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const text = await response.text();

  console.log(text);
});
