// SS Development - kod-onizleme.com.tr

document.getElementById("runCode")?.addEventListener("click", function () {
    let code = document.getElementById("codeEditor").value;
    fetch("/execute", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ code })
    })
        .then((response) => response.json())
        .then((data) => {
            document.getElementById("output").innerText = data.output;
        })
        .catch((error) => {
            document.getElementById("output").innerText = "Hata: " + error;
        });
});

// SS Development - kod-onizleme.com.tr

document.getElementById("runCode")?.addEventListener("click", function () {
    const editor = document.getElementById("codeEditor");
    const output = document.getElementById("output");

    if (editor && output) {
        const code = editor.value;

        output.innerHTML = code;
    }
});

// SS Development - kod-onizleme.com.tr

document.getElementById("runCodeCpp")?.addEventListener("click", function () {
    let cppCode = document.getElementById("cppCodeEditor").value;

    
    if (cppCode.includes('std::getline(std::cin,')) {
        let userInput = prompt("Girdi girin:");
        if (userInput) {
           
            cppCode = cppCode.replace(/std::getline\(std::cin, \w+\);/, `input = "${userInput}";`);
        }
    }

    fetch("/execute_cpp", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ code: cppCode })
    })
    .then((response) => response.json())
    .then((data) => {
        document.getElementById("output").innerText = data.output;
    })
    .catch((error) => {
        document.getElementById("output").innerText = "Hata: " + error;
    });
});
// SS Development - kod-onizleme.com.tr

document.getElementById('toggleTheme').addEventListener('click', function() {
    
    if (document.body.classList.contains('white-theme')) {
        document.body.classList.remove('white-theme');
        document.body.classList.add('night-theme');
        document.getElementById('toggleTheme').textContent = '🌙'; // Ay simgesi
    } else {
        document.body.classList.remove('night-theme');
        document.body.classList.add('white-theme');
        document.getElementById('toggleTheme').textContent = '🌞'; // Güneş simgesi
    }
});
// SS Development - kod-onizleme.com.tr