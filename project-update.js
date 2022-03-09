const API_KEY = '3fdd79a9-be85-46bc-893d-14d34ba4355d';

const kontenbaseClient = new kontenbase.KontenbaseClient({
  apiKey: API_KEY,
});

let projects = [];

function getData() {
  const data = JSON.parse(localStorage.getItem('project'));
  if (data) {
    console.log(data);
    let title = document.getElementById('input-title');
    let start = document.getElementById('input-start');
    let end = document.getElementById('input-end');
    let desc = document.getElementById('input-desc');

    title.value = data.title;
    start.value = data.start;
    end.value = data.end;
    desc.value = data.desc;
  } else {
    window.location.href = 'index.html';
  }
}

getData();

function onChangeThumbnail() {
  let thumbnail = document.getElementById('input-thumbnail').files[0];
  let thumbnailName = document.getElementById('choose-thumbnail-group');

  thumbnailName.innerHTML = `You choose file: <span class="text-yellow">${thumbnail.name}</span>`;
}

function cancelUpdateProject() {
  window.location.href = 'index.html';
  localStorage.removeItem('project');
}

async function updateProject() {
  let id = JSON.parse(localStorage.getItem('project'))._id;
  let title = document.getElementById('input-title').value;
  let start = document.getElementById('input-start').value;
  let end = document.getElementById('input-end').value;
  let desc = document.getElementById('input-desc').value;

  const { data, error } = await kontenbaseClient
    .service('projectku')
    .updateById(id, {
      title,
      start,
      end,
      desc,
    });

  if (data) {
    cancelUpdateProject();
  } else {
    console.log(error);
  }
}
