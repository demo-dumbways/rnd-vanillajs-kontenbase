const API_KEY = '3fdd79a9-be85-46bc-893d-14d34ba4355d';

const kontenbaseClient = new kontenbase.KontenbaseClient({
  apiKey: API_KEY,
});

let projects = [];

async function getData() {
  await kontenbaseClient.auth.login({
    email: 'jody@mail.com',
    password: '1234',
  });

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
    let id = projects[i]._id;
    projectContainer.innerHTML += `
    <div class="card">
        <img src="${
          projects[i].thumbnail
            ? projects[i].thumbnail[0].url
            : 'https://pngimg.com/uploads/ferrari/ferrari_PNG102823.png'
        }" />
        <h3><a href="detail-project.html" onclick="getProjectById('${id}')">${
      projects[i].title
    }</a></h3>
        <div class="date">${getFullTime(projects[i].start)} - ${getFullTime(
      projects[i].end
    )}</div>
        <p>${projects[i].desc}</p>
        <div class="btn-group">
            <button class="btn-edit" onclick="getProjectById('${id}')">Edit</button>
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
  let thumbnail = document.getElementById('input-thumbnail').files[0];

  const { data: dataThumbnail, error: errorThumbnail } =
    await kontenbaseClient.storage.upload(thumbnail);

  if (errorThumbnail) {
    return console.log(errorThumbnail);
  }

  let project = {
    title,
    start,
    end,
    desc,
    thumbnail: [dataThumbnail],
  };

  console.log(project);

  const { data, error } = await kontenbaseClient
    .service('projectku')
    .create(project);

  if (error) {
    console.log(error);
  }

  projects = data;

  getData();

  alert('Success Add Project ' + title);
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

function getProjectById(id) {
  const data = projects.find((item) => item._id == id);

  localStorage.setItem('project', JSON.stringify(data));

  window.location.href = 'update-project.html';
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
