const form      = document.querySelector('#task-form');
const taskList 	= document.querySelector('.collection');
const clearBtn  = document.querySelector('.clear-tasks');
const filter    = document.querySelector('#filter');
const taskInput = document.querySelector('#task');



loadEventListeners();


function loadEventListeners() {
    
	document.addEventListener('DOMContentLoaded', ambilTugas);

	form.addEventListener('submit', addTask);
	taskList.addEventListener('click', removeTask);
	clearBtn.addEventListener('click', clearTasks);
	filter.addEventListener('keyup', filterTasks);
	
}

function ambilTugas() {
	let tasks;

	if (localStorage.getItem('tasks') === null){
		tasks = [];
	}else {
		tasks = JSON.parse(localStorage.getItem('tasks'));
	}

	tasks.forEach(function(task){
		const li     = document.createElement('li');

		li.className = 'collection-item';

		li.appendChild(document.createTextNode(task));

		const link = document.createElement('a');

		link.className = 'delete-item secondary-content';
		link.innerHTML = '<i class="fa fa-remove"></i>';

		li.appendChild(link);

		taskList.appendChild(li);
	});

}





function addTask(e) {
	if (taskInput.value === ''){
		alert('data berhasil disimpan');
	}


	const li     = document.createElement('li');

	li.className = 'collection-item';

	li.appendChild(document.createTextNode(taskInput.value));

	const link = document.createElement('a');

	link.className = 'delete-item secondary-content';
	link.innerHTML = '<i class="fa fa-remove"></i>';

	li.appendChild(link);

	taskList.appendChild(li);


	simpanData(taskInput.value);

	taskInput.value = '';

	e.preventDefault();
}

function simpanData(task){
	let tasks;
	if (localStorage.getItem('tasks') === null){
		tasks = [];
	}else {
		tasks = JSON.parse(localStorage.getItem('tasks'));
	}
	tasks.push(task);

	localStorage.setItem('tasks', JSON.stringify(tasks));
}


function removeTask(e)
{
	if(e.target.parentElement.classList.contains('delete-item')){
		if(confirm('apakah anda yakin ingin hapus data nya !')){
			e.target.parentElement.parentElement.remove();
		}
	}

	hapusDataLocal(e.target.parentElement.parentElement);
}

function hapusDataLocal(taskItem){
	let tasks;
	if (localStorage.getItem('tasks') === null){
		tasks = [];
	}else {
		tasks = JSON.parse(localStorage.getItem('tasks'));
	}

	tasks.forEach(function(task, index){
		if(taskItem.textContent === task){
			tasks.splice(index, 1);
		}
	});

	localStorage.setItem('tasks', JSON.stringify(tasks));
}


function clearTasks()
{
	while(taskList.firstChild){
		taskList.removeChild(taskList.firstChild);
	}

	hapusDataSemua();
}

function hapusDataSemua(){
	localStorage.clear();
}


function filterTasks(e)
{
	const text = e.target.value.toLowerCase();

	document.querySelectorAll('.collection-item').forEach(function(task)
	{
		const item = task.firstChild.textContent;
		if(item.toLowerCase().indexOf(text) != -1)
		{
			task.style.display = 'block';
		}else {
			task.style.display = 'none';
		}
	});
}