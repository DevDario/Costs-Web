const getProjectsFromDB = () =>  JSON.parse(localStorage.getItem('projects')) ?? [] 
const root = document.getElementById('root')
const conditionalMessage = document.getElementById('conditional')

window.onload = () => {

    let data = getProjectsFromDB()

    data.length === 0 ? conditionalMessage.style.display="flex" : conditionalMessage.style.display="none" 

    data.map((project)=>{
        root.innerHTML += 
            `
                <div class="project-card">
                    <div class="card-conteiner">
                        <h3 class="project-name">${project.projectName}</h3>
                        <h5 class="project-budget">Budget:${project.projectBudget} U$<h5/>
                        <p class="project-category">Category:${project.projectCategory}</p>
                    
                        <div class="services">
                            <p>0 Services Added<p>
                        </div>

                        <div class="actions">
                            
                            <div class="edit">
                                <button class="button">Edit <img src="../../images/edit-icon.png" alt="edit icon" /> </button>
                            </div>

                            <div class="delete">
                                <button class="button">Delete <img src="../../images/delete-icon.png" alt="delete icon" /> </button>
                            </div>
                            
                        </div>
                    </div>
                </div>
            `
    })
}