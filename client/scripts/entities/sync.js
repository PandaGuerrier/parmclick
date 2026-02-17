const KEY = "parmesan"

async function getStorage(game) {
    const response = await game.apiManager.axiosInstance.get("/data")
    console.log("Data fetched from server:", response.data)

    if (response.data.data === null) {
        window.location.href = "/auth/login.html"
    }


    game.fromJson(response.data.data)
    game.view.render()
}

function resetLocalStorage(game) {
    game.reset()
    localStorage.setItem(KEY, JSON.stringify(game.toJson()));
    window.location.reload()
}

async function saveToLocalStorage(game) {
    const response = await game.apiManager.axiosInstance.post("/data", {
        data: JSON.stringify(game.toJson())
    })
    console.log("Data saved to server:", response.data)
}


export {getStorage, saveToLocalStorage, resetLocalStorage}