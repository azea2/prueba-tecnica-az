function calcularDesviacionEstandar(n, numeros) {
    const media = numeros.reduce((acc, num) => acc + num, 0) / n;

    const sumaCuadradosDiferencias = numeros.reduce((acc, num) => {
        const diferencia = num - media;
        return acc + diferencia * diferencia;
    }, 0);

    const desviacionEstandar = Math.sqrt(sumaCuadradosDiferencias / n);

    return desviacionEstandar.toFixed(4); 
}

function esNumeroValido(numero) {
    return !isNaN(numero) && isFinite(numero);
}

const N = parseInt(prompt("Ingrese el tamaño del conjunto de datos (N):"));
if (N > 10000) {
    console.log("El tamaño del conjunto de datos no puede ser mayor a 10000.");
} else {
    const conjuntoDatos = [];
    for (let i = 0; i < N; i++) {
        let numero = parseInt(prompt(`Ingrese el número ${i + 1}:`));
        while (!esNumeroValido(numero)) {
            numero = parseInt(prompt(`Ingrese un número válido para el número ${i + 1}:`));
        }
        conjuntoDatos.push(numero);
    }

    const desviacionEstandar = calcularDesviacionEstandar(N, conjuntoDatos);
    console.log("La desviación estándar es:", desviacionEstandar);
}
