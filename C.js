function obtenerMatrizTranspuesta(matriz) {
    const filas = matriz.length;
    const columnas = matriz[0].length;

    const transpuesta = [];
    for (let i = 0; i < columnas; i++) {
        transpuesta.push([]);
    }

    for (let i = 0; i < filas; i++) {
        for (let j = 0; j < columnas; j++) {
            transpuesta[j].push(matriz[i][j]);
        }
    }

    return transpuesta;
}

function main() {
    const n = parseInt(prompt("Ingrese el número de filas (n):"));
    const m = parseInt(prompt("Ingrese el número de columnas (m):"));

    const matriz = [];
    for (let i = 0; i < n; i++) {
        const fila = prompt(`Ingrese los elementos de la fila ${i + 1} separados por coma:`).split(',').map(Number);
        matriz.push(fila);
    }

    const transpuesta = obtenerMatrizTranspuesta(matriz);

    console.log("La matriz traspuesta es:");
    transpuesta.forEach(fila => {
        console.log(fila.join(' '));
    });
}

main();
