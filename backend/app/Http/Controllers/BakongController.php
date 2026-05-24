<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Http;

class BakongController extends Controller
{
    public function generateQR(Request $request): JsonResponse
{
    $request->validate([
        'amount' => ['required', 'numeric', 'min:0.01'],
    ]);

    $billNumber = 'INV-' . time();
    $amount     = (float) $request->amount;

    $bakongId = env('BAKONG_MERCHANT_ID');
    $name     = 'RUPP Payment';
    $city     = 'Phnom Penh';
    $currency = '840';

    $qrString = $this->buildKHQR($bakongId, $name, $city, $amount, $currency, $billNumber);
    $md5      = md5($qrString);
    $qrImage  = $this->buildQRImage($qrString);

    // ✅ ADD THIS — return qrString so we can inspect it
    return response()->json([
        'qrCode'     => $qrImage,
        'md5'        => $md5,
        'billNumber' => $billNumber,
        'qrString'   => $qrString, // temporary debug field
    ]);
}

   public function checkPayment(Request $request): JsonResponse
{
    $request->validate([
        'md5' => ['required', 'string'],
    ]);

    $response = Http::withHeaders([
        'Authorization' => 'Bearer ' . env('BAKONG_API_TOKEN'),
        'Content-Type'  => 'application/json',
    ])->post(
        'https://api-bakong.nbc.gov.kh/v1/check_transaction_by_md5',  // ✅ hardcoded
        ['md5' => $request->md5]
    );

    $data   = $response->json();
    $isPaid = isset($data['responseCode']) && $data['responseCode'] === 0;

    return response()->json([
        'status'   => $isPaid ? 'paid' : 'pending',
        'response' => $data,
    ]);
}

    /*
      Build a minimal KHQR (EMV QRCPS) string for individual payment.
      Spec: https://bakong.nbc.gov.kh
    */
    private function buildKHQR(
    string $bakongId,
    string $merchantName,
    string $merchantCity,
    float  $amount,
    string $currency,
    string $billNumber
): string {
    $tag = fn(string $id, string $value): string =>
        $id . str_pad(strlen($value), 2, '0', STR_PAD_LEFT) . $value;

    // Tag 29: Merchant Account Information (KHQR Individual format)
    // 00 = AID (Application Identifier for KHQR)
    // 01 = Bakong Account ID
    // ✅ Correct
    $accountInfo = $tag('00', 'A000000440010200')
             . $tag('01', $bakongId);
    $tag29       = $tag('29', $accountInfo);

    // Tag 62: Additional Data Field
    $additional = $tag('01', $billNumber);  // 01 = Bill Number
    $tag62      = $tag('62', $additional);

    // Build full body (without CRC value)
    $body =
        $tag('00', '01') .           // Payload Format Indicator
        $tag('01', '12') .           // Point of Initiation (12 = dynamic)
        $tag29 .                     // Merchant Account Information
        $tag('52', '5999') .         // Merchant Category Code
        $tag('53', $currency) .      // Transaction Currency (840=USD, 116=KHR)
        // ✅ Simple and always valid
        number_format($amount, 2, '.', '') .// Amount
        $tag('58', 'KH') .           // Country Code
        $tag('59', $merchantName) .  // Merchant Name
        $tag('60', $merchantCity) .  // Merchant City
        $tag62 .                     // Additional Data
        '6304';                      // CRC placeholder

    // Append CRC-16/CCITT-FALSE checksum
    $crc = $this->crc16($body);
    return $body . strtoupper(str_pad(dechex($crc), 4, '0', STR_PAD_LEFT));
}

    /*
      CRC-16 CCITT-FALSE (used by EMV QR standard)
     */
    private function crc16(string $data): int
    {
        $crc = 0xFFFF;
        for ($i = 0; $i < strlen($data); $i++) {
            $crc ^= (ord($data[$i]) << 8);
            for ($j = 0; $j < 8; $j++) {
                $crc = ($crc & 0x8000) ? (($crc << 1) ^ 0x1021) : ($crc << 1);
            }
        }
        return $crc & 0xFFFF;
    }
    /**
     * Convert QR string → base64 PNG via free QR API
     */
    private function buildQRImage(string $qrString): string
    {
        $url       = 'https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=' . urlencode($qrString);
        $imageData = @file_get_contents($url);

        if (!$imageData) {
            return '';
        }

        return 'data:image/png;base64,' . base64_encode($imageData);
    }
}