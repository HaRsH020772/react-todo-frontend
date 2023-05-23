exports.storeTaskAPI = (todo) => {

    const URI = `${process.env.REACT_APP_PROD_URL}/store-task`;
    let reqInfo = {
        method: "POST",
        headers: {
            Accept: '*/*',
            'Content-Type': 'application/json'
          },
        body: JSON.stringify(todo),
    };

    const response = fetch(URI, reqInfo)
    .then(res => res.json())
    .then(data => {
        return data;
    })
    .catch(err => console.log(err));

    return response;
}

exports.getAllTodos = (taskIdList) => {

    const URI = `${process.env.REACT_APP_PROD_URL}/get-tasks`;

    if(!taskIdList || taskIdList === [])
        return [];

    let reqInfo = {
        method: "POST",
        body: JSON.stringify({
            taskIdList
        }),
        headers: {
            "Content-Type": "application/json"
        }
    };
    
    const response = fetch(URI, reqInfo)
    .then(res => res.json())
    .then(data => data)
    .catch(err => console.log(err));

    return response;
}

exports.updateATodo = (todoDetail) => {

    const URI = `${process.env.REACT_APP_PROD_URL}/update-task`;

    let reqInfo = {
        method: "PUT",
        body: JSON.stringify({
            todoDetail
        }),
        headers: {
            "Content-Type": "application/json"
        }
    };

    const response = fetch(URI, reqInfo)
    .then(res => res.json())
    .then(data => data)
    .catch(err => console.log(err));

    return response;
}

exports.completeTodo = (todoDetail) => {
    
    const URI = `${process.env.REACT_APP_PROD_URL}/complete-task`;

    console.log(todoDetail);

    let reqInfo = {
        method: "PUT",
        body: JSON.stringify({
            todoDetail
        }),
        headers: {
            "Content-Type": "application/json"
        }
    };

    const response = fetch(URI, reqInfo)
    .then(res => res.json())
    .then(data => data)
    .catch(err => console.log(err));

    return response;
}