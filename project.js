const API_KEY = '3fdd79a9-be85-46bc-893d-14d34ba4355d';

const kontenbaseClient = new kontenbase.KontenbaseClient({
  apiKey: API_KEY,
});

let projects = [];

async function getData() {
  const { data, error } = await kontenbaseClient.service('projectku').find();
  console.log(data);
  if (data) {
    projects = data;
    renderProject();
  } else {
    console.log(error);
  }
}

getData();

function renderProject() {
  const projectContainer = document.getElementById('project-container');

  projectContainer.innerHTML = '';

  for (let i = 0; i < projects.length; i++) {
    console.log(projects[i]);
    let id = projects[i]._id;
    projectContainer.innerHTML += `
    <div class="card">
        <img src="" />
        <h3>${projects[i].title}</h3>
        <div class="date">${getFullTime(projects[i].start)} - ${getFullTime(
      projects[i].end
    )}</div>
        <p>${projects[i].desc}</p>
        <div class="btn-group">
            <button class="btn-edit" onclick="getProjectToEdit('${
              projects[i]
            }')">Edit</button>
            <button class="btn-delete" type="button" onclick="deleteProject('${id}','${
      projects[i].title
    }')">Delete</button>
        </div>
    </div>`;
  }
}

async function addProject() {
  let title = document.getElementById('input-title').value;
  let start = document.getElementById('input-start').value;
  let end = document.getElementById('input-end').value;
  let desc = document.getElementById('input-desc').value;
  let thumbnail = [document.getElementById('input-thumbnail').files[0]];

  let project = {
    title,
    start,
    end,
    desc,
    // thumbnail,
  };

  const { data, error } = await kontenbaseClient
    .service('projectku')
    .create(project);

  if (data) {
    getData();
  } else {
    console.log(error);
  }
}

async function deleteProject(id, title) {
  const isConfirm = confirm(`Ingin menghapus project: ${title} ?`);

  if (isConfirm) {
    const { data, error } = await kontenbaseClient
      .service('projectku')
      .deleteById(id);

    if (data) {
      getData();
    }
  }
}

function getProjectToEdit(data) {
  return console.log(data);
  localStorage.setItem('project', JSON.stringify(data));
  const dataProject = localStorage.getItem('project');
  console.log(dataProject);
}

function onChangeThumbnail() {
  let thumbnail = document.getElementById('input-thumbnail').files[0];
  let thumbnailName = document.getElementById('choose-thumbnail-group');

  thumbnailName.innerHTML = `You choose file: <span class="text-yellow">${thumbnail.name}</span>`;
}

function getFullTime(time) {
  let timeDate = new Date(time);
  const day = timeDate.getDate();
  const monthName = month[timeDate.getMonth()];
  const year = timeDate.getFullYear();

  return `${day} ${monthName}`;
}

let month = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
