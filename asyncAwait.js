function esperar(){
    return new Promise(resolve => {
        setTimeout(resolve, 2000)
    })
}

async function ejecutarTarea(){
    console.log('Iniciando tarea...');
    await esperar()
    console.log('La tarea se ha completado');
}

async function ejecutar(){
    console.log('Comenzar programa...');
    await ejecutarTarea()
    console.log('Programa finalizo.');
}

ejecutar()