
export function configureBackend() {
    // array in local storage for project records
    let projects = JSON.parse(localStorage.getItem('projects')) || [{ 
        id: 1,
        riskType: 'Test',
        internal: 'Test',
        owner: 'Test',
        severity: 'Test',
        priority: 'Test',
        riskRaisedDate: 'Test',
        age : '25',
        status : 'Low'
    }];

    // monkey patch fetch to setup fake backend
    let realFetch = window.fetch;
    window.fetch = function (url, opts) {
        return new Promise((resolve, reject) => {
            // wrap in timeout to simulate server api call
            setTimeout(handleRoute, 500);

            function handleRoute() {
                const { method } = opts;
                switch (true) {
                    case url.endsWith('/') && method === 'GET':
                        return getprojects();
                    case url.match(/\/\/\d+$/) && method === 'GET':
                        return getProjectById();
                    case url.endsWith('/') && method === 'POST':
                        return createProject();
                    case url.match(/\/\/\d+$/) && method === 'PUT':
                        return updateProject();
                    case url.match(/\/\/\d+$/) && method === 'DELETE':
                        return deleteProject();
                    default:
                        // pass through any requests not handled above
                        return realFetch(url, opts)
                            .then(response => resolve(response))
                            .catch(error => reject(error));
                }
            }

            // route functions

            function getprojects() {
                return ok(projects);
            }

            function getprojectById() {
                let project = projects.find(x => x.id === idFromUrl());
                return ok(project);
            }
    
            function createProject() {
                const project = body();

                if (projects.find(x => x.email === project.email)) {
                    return error(`project with the email ${project.email} already exists`);
                }

                // assign project id and a few other properties then save
                project.id = newProjectId();
                project.dateCreated = new Date().toISOString();
                delete project.confirmPassword;
                projects.push(project);
                localStorage.setItem('projects', JSON.stringify(projects));

                return ok();
            }
    
            function updateProject() {
                let params = body();
                let project = projects.find(x => x.id === idFromUrl());

                // only update password if included
                if (!params.password) {
                    delete params.password;
                }
                // don't save confirm password
                delete params.confirmPassword;

                // update and save project
                Object.assign(project, params);
                localStorage.setItem('projects', JSON.stringify(projects));

                return ok();
            }
    
            function deleteProject() {
                projects = projects.filter(x => x.id !== idFromUrl());
                localStorage.setItem('projects', JSON.stringify(projects));

                return ok();
            }
    
            // helper functions

            function ok(body) {
                resolve({ ok: true, text: () => Promise.resolve(JSON.stringify(body)) });
            }

            function error(message) {
                resolve({ status: 400, text: () => Promise.resolve(JSON.stringify({ message })) });
            }

            function idFromUrl() {
                const urlParts = url.split('/');
                return parseInt(urlParts[urlParts.length - 1]);
            }

            function body() {
                return opts.body && JSON.parse(opts.body);    
            }

            function newProjectId() {
                return projects.length ? Math.max(...projects.map(x => x.id)) + 1 : 1;
            }
        });
    }
};