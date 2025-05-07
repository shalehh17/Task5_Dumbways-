document.getElementById('projectForm').addEventListener('submit', function(event) {
  event.preventDefault();

  const name = document.getElementById('projectName').value;
  const startDate = document.getElementById('startDate').value;
  const endDate = document.getElementById('endDate').value;
  const description = document.getElementById('description').value;
  const imageInput = document.getElementById('image');
  const techCheckboxes = document.querySelectorAll('.technologies input:checked');

  const technologies = Array.from(techCheckboxes).map(cb => cb.value);

  const reader = new FileReader();

  reader.onload = function() {
    const imageUrl = reader.result;

    const project = {
      name,
      startDate,
      endDate,
      description,
      technologies,
      imageUrl
    };

    let projects = JSON.parse(localStorage.getItem('projects')) || [];
    projects.push(project);
    localStorage.setItem('projects', JSON.stringify(projects));

    displayProjects();
    document.getElementById('projectForm').reset();
  };

  if (imageInput.files.length > 0) {
    reader.readAsDataURL(imageInput.files[0]);
  } else {
    // Use default placeholder image if no file uploaded
    const project = {
      name,
      startDate,
      endDate,
      description,
      technologies,
      imageUrl: "https://via.placeholder.com/150"
    };
    let projects = JSON.parse(localStorage.getItem('projects')) || [];
    projects.push(project);
    localStorage.setItem('projects', JSON.stringify(projects));

    displayProjects();
    document.getElementById('projectForm').reset();
  }
});

function displayProjects() {
  const projectList = document.getElementById('projectList');
  projectList.innerHTML = '';

  const projects = JSON.parse(localStorage.getItem('projects')) || [];

  projects.forEach((project, index) => {
    const card = document.createElement('div');
    card.className = 'project-card';
    card.style.background = '#fff';
    card.style.padding = '10px';
    card.style.borderRadius = '10px';
    card.style.boxShadow = '0 2px 5px rgba(0,0,0,0.1)';
    card.style.width = '230px';

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

// Load existing projects on page load
document.addEventListener('DOMContentLoaded', displayProjects);
