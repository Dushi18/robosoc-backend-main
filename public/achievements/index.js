let dataDiv = document.getElementById('data')
let deleteDiv = document.getElementsByClassName('modal')
let deleteDivText = document.getElementsByClassName('delete-text')
deleteDiv[0].style.display = "none"
let idOfachievementToBeDeleted = ""

let stopPropagation = (event)=>{
    event.stopPropagation()
}

let handleDelete = (id, name)=>{
    deleteDiv[0].style.display = "flex"
    deleteDivText[0].textContent = `Are you sure you want to delete achievement ${name} ?` 
    idOfachievementToBeDeleted = id
}

let deleteachievement = ()=>{
    deleteDiv[0].style.display = "none"
    fetch(`/api/achievements?id=${idOfachievementToBeDeleted}`,{
        "method" : "DELETE"
    })
    .then((res)=>{
        if(!res.ok){
            if(res.status===403){
                throw new Error('Access to requested resource is for admin only. Login as admin to access the resource')
            }
        }
        return res.json()
    })
    .then((msg)=>{
        fetchData()
        alert("Achievement deleted successfully")
        deleteDiv[0].style.display = "none"
    })
    .catch((err)=>{
        console.log(err)
        alert(err.message)
    })
}

let discard = ()=>{
    idOfachievementToBeDeleted = ""
    deleteDiv[0].style.display = "none"
}

const fetchData = () => {
    fetch("/api/achievements", { method: "GET" })
        .then((res) => {
            if(!res.ok){
                if(res.status===403){
                    throw new Error('Access to requested resource is for admin only. Login as admin to access the resource')
                }
            }
            return res.json()
        })
        .then((res) => {
            let output = ''
            let achievementsData = res.data
            achievementsData.forEach((data) => {
                output += `
                <div class="single-achievement">
                    <div class="img-src">
                        <img src="/images/${data.image}">
                    </div>
                    <div class="name">
                        <span>${data.heading}</span>
                    </div>
                    <div class="options">
                    <!--Edit--icon-->                        
                        <div onclick="handleEdit('${data._id}', '${data.heading}', '${data.description}','${data.image}', '${data.year}')" id="edit">
                            <svg xmlns="http://www.w3.org/2000/svg" id="edit" width="20" height="20" fill="#4d4848" class="bi bi-pencil-square" viewBox="0 0 16 16">
                                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                            </svg>
                        </div>
                    <!-- Trash bin icon -->
                        <div id="delete" onclick="handleDelete('${data._id}', '${data.heading}')">
                            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24" viewBox="0,0,256,256" id="delete">
                                <g fill="#4d4848" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" id="delete"
                                stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal">
                                    <g transform="scale(4,4)">
                                        <path d="M28,7c-2.757,0 -5,2.243 -5,5v3h-10c-1.104,0 -2,0.896 -2,2c0,1.104 0.896,2 2,2h2.10938l1.68359,30.33203c0.178,3.178 2.80723,5.66797 5.99023,5.66797h18.43359c3.182,0 5.81223,-2.48997 5.99023,-5.66797l1.68359,-30.33203h2.10938c1.104,0 2,-0.896 2,-2c0,-1.104 -0.896,-2 -2,-2h-10v-3c0,-2.757 -2.243,-5 -5,-5zM28,11h8c0.552,0 1,0.449 1,1v3h-10v-3c0,-0.551 0.448,-1 1,-1zM19.11328,19h25.77344l-1.67383,30.10938c-0.059,1.06 -0.93509,1.89063 -1.99609,1.89063h-18.43359c-1.06,0 -1.93709,-0.82967 -1.99609,-1.88867zM32,23.25c-0.967,0 -1.75,0.784 -1.75,1.75v20c0,0.966 0.783,1.75 1.75,1.75c0.967,0 1.75,-0.784 1.75,-1.75v-20c0,-0.966 -0.783,-1.75 -1.75,-1.75zM24.64258,23.25195c-0.965,0.034 -1.7205,0.84259 -1.6875,1.80859l0.69727,20.08594c0.033,0.945 0.81005,1.68945 1.74805,1.68945c0.021,0 0.0415,0 0.0625,0c0.965,-0.034 1.7205,-0.84455 1.6875,-1.81055l-0.69727,-20.08594c-0.034,-0.965 -0.84655,-1.7105 -1.81055,-1.6875zM39.35547,23.25195c-0.967,-0.027 -1.77459,0.7225 -1.80859,1.6875l-0.69727,20.08594c-0.034,0.966 0.7215,1.77655 1.6875,1.81055c0.021,0.001 0.0415,0 0.0625,0c0.938,0 1.71505,-0.74445 1.74805,-1.68945l0.69727,-20.08594c0.034,-0.966 -0.72345,-1.77459 -1.68945,-1.80859z"></path>
                                    </g>
                                </g>
                            </svg>
                        </div>
                    </div>
                </div>

            `
            });
            dataDiv.innerHTML = output
        })
        .catch((err) => {
            console.log(err)
            alert(err.message)
        })
}
fetchData()

//edit form
let editModalDiv = document.querySelectorAll('.modal')[1]
let achievementToBeEdited = ''
let handleEdit = (id,name,description,image,year)=>{
    editModalDiv.style.display = "flex"
    const form = document.querySelector('.form');
    const nameInput = form.querySelector('input[name="name"]');
    const descriptionInput = document.querySelector('.form .textarea');
    const filename = form.querySelector('input[name="file"]');
    const yearInput = form.querySelector('input[name="year"]')
    nameInput.value = name;
    descriptionInput.value = description
    filename.value = image
    yearInput.value = year
    achievementToBeEdited = {id,name,description,image,year}
}
editModalDiv.style.display = "none"
let x = document.getElementById('inputFile')
let file = ""
x.style.display = "none"
let handleClick = ()=>{
    x.click()
}
let handleChange = (e)=>{
    if(e.target.files[0]===undefined){
        return;
    }
    if(e.target.files[0]?.heading){
        let name = e.target.files[0].heading.split('.')
        if(name[name.length-1]!=='png' && name[name.length-1]!=='jpg'){
            e.target.value = null
            alert('Only png and jpg files are allowed')
            return
        }
    }
    document.getElementById('fileName').value = e.target.files[0].name
    file = e.target.files[0]
}
let handleSubmit = (e)=>{
    e.preventDefault()
    let formData = new FormData()
    let form = e.target
    formData.append("name",form.name.value)
    formData.append("description", form.description.value)
    formData.append("year", form.year.value)
    if(file)formData.append("image",file)
    formData.append("id",achievementToBeEdited.id)
    fetch("/api/achievements", {
        method: "PUT",
        body: formData,
        credentials : "include"
    })
    .then(response => {
        if(!response.ok){
            if(response.status===403){
                throw new Error('Access to requested resource is for admin only. Login as admin to access the resource')
            }
        }
        alert('Achievement Updated')
        editModalDiv.style.display = "none"
        fetchData()
        return response.json()
    })
    .then(data => console.log(data))
    .catch(error => {
        console.error(error)
        alert(error.message)
    })
}
let discardChanges = ()=>{
    achievementToBeEdited = {}
    editModalDiv.style.display = "none"
}