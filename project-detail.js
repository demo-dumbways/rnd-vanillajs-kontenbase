function renderProject() {
  let data = JSON.parse(localStorage.getItem('project'));

  console.log(data);

  //   // set up
  //   let start = moment(data.start); // some random moment in time (in ms)
  //   let end = moment(data.end); // some random moment after start (in ms)
  //   let diff = end.diff(start);

  //   // execution
  //   let f = moment.utc(diff).format('HH:mm:ss.SSS');

  //   console.log(f);

  let detailProject = document.getElementById('container-detail-project');

  detailProject.innerHTML = `
    <div class="detail-top">
        <div class="left"><img src="${
          data.thumbnail
            ? data.thumbnail[0].url
            : 'https://pngimg.com/uploads/ferrari/ferrari_PNG102823.png'
        }" /></div>
        <div class="right">
            <h3 class="text-yellow">${data.title}</h3>
            <!--<h5>Durasi</h5>-->
            <span></span>
            <h5>Start</h5>
            <span>${data.start}</span>
            <h5>End</h5>
            <span>${data.end}</span>
            <div>
            <button onclick="backToHome()">Back</button>
            </div>
        </div>
    </div>
    <p>${data.desc}</p>`;
}

renderProject();

function backToHome() {
  window.location.href = 'index.html';
}
