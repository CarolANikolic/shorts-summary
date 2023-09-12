const AppName = () => {
    const appContainer = document.createElement("div");
    appContainer.id = "app";
    appContainer.className = "app-container"

    appContainer.innerHTML = `
    <img src="/logo.svg" alt="Logo">
    <h1 class="app-container__title">Shorts Summary</h1>
    `

    return appContainer
}

export default AppName