<?php
// api/status.php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

// ── KONFIGURASI ──
$channelId = '1383196958725898240';

// ⚠️ GANTI DENGAN TOKEN BARU DARI DISCORD DEVELOPER PORTAL
$botToken = 'MTM4MzE5ODYyNTM2NjI4MjM3MA.GFgHst.cVdRc4dKeqP-iOEJplY2gKShEqOXsI40O3FnlY';

// ── AMBIL DATA DARI DISCORD ──
$url = "https://discord.com/api/v10/channels/1383196958725898240";
$ch = curl_init($url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    "Authorization: Bot {$botToken}",
    "User-Agent: DiscordSRV-Proxy/1.0"
]);
$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

// ── KIRIM RESPONSE ──
if ($httpCode === 200) {
    echo $response;
} else {
    echo json_encode([
        'error' => true,
        'message' => "Gagal ambil data (HTTP {$httpCode})",
        'debug' => $response
    ]);
}
?>