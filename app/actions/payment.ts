'use server';
import crypto from 'crypto';

export async function createWayForPayInvoice(amountUAH: number, reference: string, destination: string) {
  // Для тестування можна просто залишити ці змінні без `.env`
  // Потім замініть 'test_merch_n1' на ваш Merchant Login, а ключ на ваш Секретний ключ з кабінету WayForPay.
  const merchantAccount = process.env.WAYFORPAY_MERCHANT_ACCOUNT || 'test_merch_n1';
  const merchantSecretKey = process.env.WAYFORPAY_MERCHANT_SECRET_KEY || 'flk3409refn54t54t*FNJRET';
  const merchantDomainName = process.env.NEXT_PUBLIC_SITE_URL || 'https://svisyv.in.ua';

  const orderDate = Math.floor(Date.now() / 1000).toString();
  const amountStr = amountUAH.toString(); // Без '.00', якщо це ціле число, щоб збігалося з JSON
  const currency = 'UAH';
  
  // Дані про товар/послугу
  const productName = [destination];
  const productCount = ['1'];
  const productPrice = [amountStr];

  /** Формування підпису HMAC_MD5 для безпеки платежу */
  const stringToSign = [
    merchantAccount,
    merchantDomainName,
    reference,
    orderDate,
    amountStr,
    currency,
    ...productName,
    ...productCount,
    ...productPrice
  ].join(';');

  const signature = crypto.createHmac('md5', merchantSecretKey).update(stringToSign, 'utf8').digest('hex');

  const payload = {
    transactionType: "CREATE_INVOICE",
    merchantAccount,
    merchantAuthType: "SimpleSignature",
    merchantDomainName,
    merchantSignature: signature,
    apiVersion: 1,
    language: "UA",
    returnUrl: `${merchantDomainName}/#booking`,
    orderReference: reference,
    orderDate: parseInt(orderDate),
    amount: Number(amountStr),
    currency,
    productName,
    productPrice: [Number(amountStr)],
    productCount: [1]
  };

  try {
    const response = await fetch('https://api.wayforpay.com/api', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      console.error('WayForPay API Network Error:', await response.text());
      return { success: false, error: 'Помилка платіжного шлюзу (WFP)' };
    }

    const data = await response.json();
    
    // В API WayForPay 1100 означає успіх
    if (data.reasonCode && data.reasonCode !== 1100) {
      console.error('WayForPay Logic Error:', data);
      return { success: false, error: `Помилка генерації платежу (Код: ${data.reasonCode})` };
    }

    // Повертаємо посилання на готову сторінку оплати (з Apple Pay / Google Pay)
    return { success: true, pageUrl: data.invoiceUrl };

  } catch (error) {
    console.error('WayForPay Exception:', error);
    return { success: false, error: 'Помилка підключення до платіжного шлюзу' };
  }
}
