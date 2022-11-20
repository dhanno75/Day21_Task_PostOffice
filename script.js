const getData = async () => {
  try {
    // Get the pincode from the input field
    let num = document.querySelector(".num").value;
    if (num.length > 6 || num.length < 6) {
      alert("Pincode should consist of 6 digits!");
    }

    // Get the pincode details from the api
    const data = await fetch(`https://api.postalpincode.in/pincode/${num}`);
    const pinData = await data.json();
    const PostOffice = pinData[0].PostOffice;

    if (PostOffice === null) {
      alert("Please enter a valid pincode");
    } else {
      renderCity(PostOffice);
      document.querySelector(".num").value = "";
    }
    document.querySelector(".num").value = "";
  } catch (err) {
    document.querySelector(".main-container").innerHTML =
      "Something went wrong!";
  }
};

// Display the post office details
const renderCity = (postOffice) => {
  let details = "";
  postOffice.forEach((po) => {
    details += `
    <div class="col-lg-4 col-sm-12 mb-4 col-container">
      <div class="card">
        <div class="card-header city-name">${po.Name}</div>
        <div class="card-body">
        <ul class="list-group list-group-flush card-text mt-3">
          <li class="list-group-item block">Block: ${po.Block}</li>
          <li class="list-group-item branch">Branch: ${po.BranchType}</li>
          <li class="list-group-item delivery">Delivery status: ${po.DeliveryStatus}</li>
          <li class="list-group-item district">District: ${po.District}</li>
          <li class="list-group-item pincode">Pincode: ${po.Pincode}</li>
          <li class="list-group-item state">State: ${po.State}</li>
          <li class="list-group-item region">Region: ${po.Region}</li>
        </ul>
        </div>
      </div>
    </div>
    `;
  });
  document.querySelector(".main-container").innerHTML += details;
};
