export default {
  async fetch(request) {
    return new Response(`<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8" />
  <title>Extractor IP:PORT + Statistik Negara 🇺🇳</title>
  <script>
    function flagEmoji(cc) {
      return cc.toUpperCase().replace(/./g, c =>
        String.fromCodePoint(127397 + c.charCodeAt(0))
      );
    }

    async function ambilData() {
      const urlInput = document.getElementById('urls').value.trim().split('\\n');
      const fileInput = document.getElementById('file').files[0];
      let hasilGabungan = [];

      for (const url of urlInput) {
        if (url.trim() === '') continue;
        try {
          const res = await fetch(url);
          const text = await res.text();
          hasilGabungan.push(text);
        } catch (e) {
          alert('Gagal fetch URL: ' + url);
        }
      }

      if (fileInput) {
        const text = await fileInput.text();
        hasilGabungan.push(text);
      }

      prosesData(hasilGabungan.join('\\n'));
    }

    function prosesData(raw) {
      const lines = raw.split('\\n').map(l => l.trim()).filter(l => l.includes(','));
      const ipPortSet = new Set();
      const lengkapList = [];
      const negaraStat = {};

      for (const line of lines) {
        const [ip, port, cc, ...rest] = line.split(',');
        const isp = rest.join(',').trim();
        const ipPort = \`\${ip}:\${port}\`;

        if (ipPortSet.has(ipPort)) continue; // ✅ Hanya 1x per IP:PORT

        ipPortSet.add(ipPort);
        lengkapList.push(\`\${ip},\${port},\${cc},\${isp}\`);

        if (cc) negaraStat[cc] = (negaraStat[cc] || 0) + 1;
      }

      const sortedNegara = Object.entries(negaraStat)
        .sort((a, b) => b[1] - a[1])
        .map(([cc, count]) =>
          \`<div>\${flagEmoji(cc)} <strong>\${cc}</strong>: \${count}</div>\`)
        .join('');
      document.getElementById('statistik').innerHTML = sortedNegara;

      document.getElementById('hasilIpPort').value = [...ipPortSet].join('\\n');
      document.getElementById('hasilLengkap').value = lengkapList.join('\\n');

      document.getElementById('totalInfo').textContent = 
        \`🔢 Total baris mentah: \${lines.length} | IP:PORT unik: \${ipPortSet.size}\`;
    }

    function salin(id) {
      const text = document.getElementById(id).value;
      navigator.clipboard.writeText(text);
    }

    function unduh(id, nama) {
      const text = document.getElementById(id).value;
      const blob = new Blob([text], { type: 'text/plain' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = nama;
      link.click();
    }
  </script>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-black text-white font-mono p-4">
  <h1 class="text-xl font-bold mb-4">Extractor IP:PORT + Statistik Negara</h1>

  <textarea id="urls" rows="4" class="w-full p-2 bg-gray-800 text-white mb-2 rounded resize-y" placeholder="Tempel URL file .txt di sini... (1 per baris)"></textarea>
  <input type="file" id="file" accept=".txt" class="mb-4 block text-sm">
  <button onclick="ambilData()" class="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded w-full mb-2">Ambil & Ekstrak</button>

  <div id="totalInfo" class="text-sm text-gray-400 mb-4"></div>

  <div class="mb-4">
    <h2 class="text-lg font-bold mb-2">📊 Statistik Negara</h2>
    <div id="statistik" class="bg-gray-900 text-white p-3 rounded text-sm grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-x-4 gap-y-1"></div>
  </div>

  <div class="mb-4">
    <h2 class="font-semibold mb-1">🎯 Hasil IP:PORT</h2>
    <textarea id="hasilIpPort" class="w-full h-48 bg-gray-900 text-white p-2 rounded resize overflow-auto"></textarea>
    <div class="flex gap-2 mt-2">
      <button onclick="salin('hasilIpPort')" class="bg-blue-700 px-4 py-1 rounded">Salin IP:PORT</button>
      <button onclick="unduh('hasilIpPort','ipport.txt')" class="bg-blue-700 px-4 py-1 rounded">Unduh IP:PORT</button>
    </div>
  </div>

  <div class="mb-4">
    <h2 class="font-semibold mb-1">🧾 Hasil Lengkap (tanpa duplikat IP:PORT)</h2>
    <textarea id="hasilLengkap" class="w-full h-48 bg-gray-900 text-white p-2 rounded resize overflow-auto"></textarea>
    <div class="flex gap-2 mt-2">
      <button onclick="salin('hasilLengkap')" class="bg-blue-700 px-4 py-1 rounded">Salin Lengkap</button>
      <button onclick="unduh('hasilLengkap','lengkap.txt')" class="bg-blue-700 px-4 py-1 rounded">Unduh Lengkap</button>
    </div>
  </div>
</body>
</html>`, {
      headers: {
        'content-type': 'text/html; charset=utf-8',
      },
    });
  }
}
