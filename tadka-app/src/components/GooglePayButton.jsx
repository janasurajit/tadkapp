import { useEffect, useRef, useState } from 'react'

// Standard Google Pay Web API config.
// This uses Google's published TEST environment + the "example" gateway,
// which Google provides specifically for integration testing.
// To go live: switch environment to 'PRODUCTION', set a real gatewayMerchantId
// issued by your payment processor, and register a merchantId with Google Pay.
const baseCardPaymentMethod = {
  type: 'CARD',
  parameters: {
    allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
    allowedCardNetworks: ['AMEX', 'DISCOVER', 'INTERAC', 'JCB', 'MASTERCARD', 'VISA'],
  },
  tokenizationSpecification: {
    type: 'PAYMENT_GATEWAY',
    parameters: {
      gateway: 'example',
      gatewayMerchantId: 'exampleGatewayMerchantId',
    },
  },
}

export default function GooglePayButton({ amount, onSuccess, onError }) {
  const containerRef = useRef(null)
  const [status, setStatus] = useState('loading') // loading | ready | unavailable

  useEffect(() => {
    let cancelled = false

    function init() {
      if (!window.google || !window.google.payments) {
        // pay.js hasn't finished loading yet — retry shortly
        setTimeout(init, 300)
        return
      }

      const client = new window.google.payments.api.PaymentsClient({ environment: 'TEST' })

      client
        .isReadyToPay({
          apiVersion: 2,
          apiVersionMinor: 0,
          allowedPaymentMethods: [baseCardPaymentMethod],
        })
        .then((res) => {
          if (cancelled) return
          if (res.result) {
            const button = client.createButton({
              buttonType: 'pay',
              buttonSizeMode: 'fill',
              onClick: () => handleClick(client),
            })
            containerRef.current?.replaceChildren(button)
            setStatus('ready')
          } else {
            setStatus('unavailable')
          }
        })
        .catch(() => setStatus('unavailable'))
    }

    function handleClick(client) {
      const paymentDataRequest = {
        apiVersion: 2,
        apiVersionMinor: 0,
        allowedPaymentMethods: [baseCardPaymentMethod],
        merchantInfo: {
          merchantId: '12345678901234567890',
          merchantName: 'Tadka Kitchen',
        },
        transactionInfo: {
          totalPriceStatus: 'FINAL',
          totalPrice: amount.toFixed(2),
          currencyCode: 'INR',
          countryCode: 'IN',
        },
      }

      client
        .loadPaymentData(paymentDataRequest)
        .then((paymentData) => onSuccess?.(paymentData))
        .catch((err) => {
          if (err.statusCode !== 'CANCELED') onError?.(err)
        })
    }

    init()
    return () => {
      cancelled = true
    }
  }, [amount, onSuccess, onError])

  return (
    <div>
      <div ref={containerRef} style={{ minHeight: 48 }} />
      {status === 'unavailable' && (
        <p style={{ fontSize: 12.5, color: 'var(--color-ink-soft)', marginTop: 8 }}>
          Google Pay isn't available on this browser/device — use the card option below instead.
        </p>
      )}
    </div>
  )
}
