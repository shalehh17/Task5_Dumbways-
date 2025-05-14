document.getElementById('projectForm').addEventListener('submit', function (event) {
  event.preventDefault();

  const name = document.getElementById('projectName').value;
  const startDate = document.getElementById('startDate').value;
  const endDate = document.getElementById('endDate').value;
  const description = document.getElementById('description').value;
  const imageInput = document.getElementById('image');

  const technologies = [...document.querySelectorAll('.technologies input')]
    .filter(input => input.checked)
    .map(input => input.value);

  // ⬇️ Debug Output
  showDebugOutput({ name, startDate, endDate, description, technologies });

  const saveProject = (imageUrl) => {
    const project = { name, startDate, endDate, description, technologies, imageUrl };
    const projects = JSON.parse(localStorage.getItem('projects')) || [];
    localStorage.setItem('projects', JSON.stringify([...projects, project]));

    displayProjects();
    document.getElementById('projectForm').reset();
  };

  if (imageInput.files.length > 0) {
    const reader = new FileReader();
    reader.onload = () => saveProject(reader.result);
    reader.readAsDataURL(imageInput.files[0]);
  } else {
    saveProject("https://via.placeholder.com/150");
  }
});

function displayProjects() {
  const projectList = document.getElementById('projectList');
  projectList.innerHTML = '';

  const projects = JSON.parse(localStorage.getItem('projects')) || [];

  projects.map(project => {
    const card = document.createElement('div');
    card.className = 'project-card';
    card.style.cssText = `
      background: #fff;
      padding: 10px;
      border-radius: 10px;
      box-shadow: 0 2px 5px rgba(0,0,0,0.1);
      width: 230px;
    `;

    card.innerHTML = `
      <img src="${project.imageUrl}" alt="Project Image" style="width:100%; height:150px; object-fit:cover; border-radius:8px;" />
      <h4 style="margin: 10px 0 5px 0;">${project.name}</h4>
      <p style="margin: 0; font-size: 13px; color: #555;">${project.startDate} - ${project.endDate}</p>
      <p style="font-size: 14px; margin-top: 10px;">${project.description}</p>
      <p style="font-size: 13px; color: #333; margin-top: 10px;"><strong>Technologies:</strong> ${project.technologies.join(', ')}</p>
    `;

    projectList.appendChild(card);
  });
}

document.addEventListener('DOMContentLoaded', displayProjects);

// ⬇️ Fungsi khusus debug
function showDebugOutput(data) {
  const debugBox = document.getElementById('debugOutput');
  debugBox.innerHTML = `
    <strong>Debug Output:</strong>
    <p><strong>Project Name:</strong> ${data.name}</p>
    <p><strong>Start Date:</strong> ${data.startDate}</p>
    <p><strong>End Date:</strong> ${data.endDate}</p>
    <p><strong>Description:</strong> ${data.description}</p>
    <p><strong>Technologies:</strong></p>
    <ul>${data.technologies.map(tech => `<li>${tech}</li>`).join('')}</ul>
  `;
}
