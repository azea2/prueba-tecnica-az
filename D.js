function decimalABinario(n) {
    if (n === 0) return '0';

    let binario = '';
    while (n > 0) {
        const residuo = n % 2;
        binario = residuo + binario;
        n = Math.floor(n / 2);
    }

    return binario;
}

function main() {
    const n = parseInt(prompt("Ingrese un número entero positivo (n <= 10000):"));

    if (n >= 0 && n <= 10000) {
        const binario = decimalABinario(n);
        console.log(`El equivalente binario de ${n} es: ${binario}`);
    } else {
        console.log("El número debe ser un entero positivo y estar dentro del rango permitido.");
    }
}

main();

