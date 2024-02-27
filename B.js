function calcularPagina(resultado) {
    return Math.ceil(resultado / 25); 
}

function main() {
    const casosPrueba = parseInt(prompt("Ingrese la cantidad de casos de prueba:"));
    
    if (casosPrueba <= 100000) {
        const paginas = [];

        for (let i = 0; i < casosPrueba; i++) {
            const resultado = parseInt(prompt(`Ingrese el resultado ${i + 1}:`));

            if (resultado <= 10000) {
                const pagina = calcularPagina(resultado);
                paginas.push(pagina);
            } else {
                console.log(`El resultado ${resultado} está fuera del rango permitido.`);
            }
        }

        console.log("Las páginas en las que aparecerán los resultados son:");
        paginas.forEach((pagina, index) => {
            console.log(`Resultado ${index + 1}: Página ${pagina}`);
        });
    } else {
        console.log("La cantidad de casos de prueba debe ser menor o igual a 100000.");
    }
}

main();
